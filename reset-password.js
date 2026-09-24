/* ============================================================
   VISIT GUBBIO — Reset Password Page
   Usa il client ufficiale Supabase JS (via CDN) e il normale
   flusso "password recovery" di Supabase Auth.
   Nessun token personalizzato, nessuna password temporanea,
   nessun salvataggio su database: solo Supabase Auth API.
   ============================================================ */

(() => {
  "use strict";

  // ------------------------------------------------------------
  // CONFIGURAZIONE — stessi valori usati in lib/main.dart
  // L'anon key è pubblica per design (protetta da RLS lato Supabase),
  // è la stessa già distribuita dentro l'app Flutter.
  // ------------------------------------------------------------
  const SUPABASE_URL = "https://kcoglivbakjyxszoruka.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtjb2dsaXZiYWtqeXhzem9ydWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNDA0NTcsImV4cCI6MjA4ODYxNjQ1N30.ICFTE2V6Y62BjT2gagazjLvyW8RZIZUji_D575hC5sY";

  const MIN_PASSWORD_LENGTH = 8;
  // Tempo massimo di attesa per la verifica del link di recovery
  const RECOVERY_TIMEOUT_MS = 4000;

  const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      detectSessionInUrl: true,
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  // ------------------------------------------------------------
  // Elementi DOM
  // ------------------------------------------------------------
  const stateLoading = document.getElementById("state-loading");
  const stateForm = document.getElementById("state-form");
  const stateSuccess = document.getElementById("state-success");
  const stateInvalid = document.getElementById("state-invalid");

  const form = document.getElementById("reset-form");
  const passwordInput = document.getElementById("password");
  const passwordConfirmInput = document.getElementById("password-confirm");
  const errorPassword = document.getElementById("error-password");
  const errorPasswordConfirm = document.getElementById("error-password-confirm");
  const errorGeneral = document.getElementById("error-general");
  const submitBtn = document.getElementById("submit-btn");
  const submitLabel = document.getElementById("submit-label");
  const submitSpinner = document.getElementById("submit-spinner");

  function showState(state) {
    [stateLoading, stateForm, stateSuccess, stateInvalid].forEach((el) => {
      el.classList.toggle("hidden", el !== state);
    });
  }

  function clearFieldErrors() {
    errorPassword.textContent = "";
    errorPasswordConfirm.textContent = "";
    errorGeneral.textContent = "";
  }

  function setSubmitting(isSubmitting) {
    submitBtn.disabled = isSubmitting;
    submitSpinner.classList.toggle("hidden", !isSubmitting);
    submitLabel.textContent = isSubmitting ? "Attendere…" : "Cambia password";
  }

  // ------------------------------------------------------------
  // Mostra/nascondi password
  // ------------------------------------------------------------
  document.querySelectorAll(".toggle-visibility").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (!input) return;
      input.type = input.type === "password" ? "text" : "password";
    });
  });

  // ------------------------------------------------------------
  // Traduzione errori Supabase in messaggi utente (nessun dettaglio tecnico)
  // ------------------------------------------------------------
  function translateUpdateError(err) {
    const message = (err && err.message ? err.message : "").toLowerCase();

    if (message.includes("password") && message.includes("least")) {
      return `La password deve contenere almeno ${MIN_PASSWORD_LENGTH} caratteri.`;
    }
    if (message.includes("same") || message.includes("different")) {
      return "La nuova password deve essere diversa da quella attuale.";
    }
    if (message.includes("session") || message.includes("token") || message.includes("expired") || message.includes("jwt")) {
      return "La sessione di recupero non è più valida. Richiedi un nuovo link dall'app.";
    }
    if (message.includes("network") || message.includes("fetch")) {
      return "Errore di connessione. Verifica la rete e riprova.";
    }
    return "Non è stato possibile aggiornare la password. Riprova.";
  }

  // ------------------------------------------------------------
  // Validazione form
  // ------------------------------------------------------------
  function validateForm() {
    clearFieldErrors();
    let valid = true;

    const password = passwordInput.value;
    const confirm = passwordConfirmInput.value;

    if (!password) {
      errorPassword.textContent = "Inserisci la nuova password.";
      valid = false;
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      errorPassword.textContent = `La password deve contenere almeno ${MIN_PASSWORD_LENGTH} caratteri.`;
      valid = false;
    }

    if (!confirm) {
      errorPasswordConfirm.textContent = "Conferma la nuova password.";
      valid = false;
    } else if (valid && password !== confirm) {
      errorPasswordConfirm.textContent = "Le password non coincidono.";
      valid = false;
    }

    return valid;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const { error } = await supabaseClient.auth.updateUser({
        password: passwordInput.value,
      });

      if (error) throw error;

      // Chiude la sessione di recovery sul browser: l'utente rientrerà
      // dall'app con le proprie credenziali normali.
      await supabaseClient.auth.signOut();

      showState(stateSuccess);
    } catch (err) {
      errorGeneral.textContent = translateUpdateError(err);
      setSubmitting(false);
    }
  });

  // ------------------------------------------------------------
  // Verifica del link di recovery
  //
  // Supabase gestisce il recovery in due modi possibili a seconda
  // della configurazione del progetto:
  //  1) Flusso implicito: i token arrivano nell'hash dell'URL
  //     (#access_token=...&type=recovery). Il client li rileva da solo
  //     (detectSessionInUrl) ed emette l'evento 'PASSWORD_RECOVERY'.
  //  2) Flusso PKCE: l'URL contiene ?code=... e va scambiato con una
  //     sessione tramite exchangeCodeForSession.
  // In entrambi i casi, se il link è scaduto o non valido, Supabase
  // aggiunge parametri di errore (error, error_code, error_description)
  // che intercettiamo per mostrare subito lo stato "link non valido".
  // ------------------------------------------------------------

  function hasUrlError() {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const query = new URLSearchParams(window.location.search);
    return hash.get("error") || query.get("error");
  }

  async function tryExchangePkceCode() {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");
    if (!code) return false;

    try {
      const { error } = await supabaseClient.auth.exchangeCodeForSession(window.location.href);
      return !error;
    } catch {
      return false;
    }
  }

  let resolved = false;

  function resolveOnce(hasValidRecoverySession) {
    if (resolved) return;
    resolved = true;
    showState(hasValidRecoverySession ? stateForm : stateInvalid);
  }

  async function initRecoveryCheck() {
    if (hasUrlError()) {
      resolveOnce(false);
      return;
    }

    // Ascolta l'evento ufficiale emesso da Supabase per il recovery flow.
    supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        resolveOnce(true);
      }
    });

    // Percorso PKCE: scambia il "code" con una sessione valida.
    const exchanged = await tryExchangePkceCode();
    if (exchanged) {
      resolveOnce(true);
      return;
    }

    // Fallback: se dopo l'inizializzazione risulta già una sessione attiva
    // (es. hash già processato da detectSessionInUrl), consideriamola valida.
    const { data } = await supabaseClient.auth.getSession();
    if (data && data.session) {
      resolveOnce(true);
      return;
    }

    // Timeout di sicurezza: se non arriva nessuna sessione di recovery
    // entro pochi secondi, il link non è utilizzabile.
    setTimeout(() => resolveOnce(false), RECOVERY_TIMEOUT_MS);
  }

  initRecoveryCheck();
})();
