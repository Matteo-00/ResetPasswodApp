(() => {
  "use strict";

  const SUPABASE_URL =
    "https://kcoglivbakjyxszoruka.supabase.co";

  // METTI QUI LA STESSA ANON KEY CHE HAI NEL reset-password.js
  const SUPABASE_ANON_KEY =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtjb2dsaXZiYWtqeXhzem9ydWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNDA0NTcsImV4cCI6MjA4ODYxNjQ1N30.ICFTE2V6Y62BjT2gagazjLvyW8RZIZUji_D575hC5sY";

  const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      auth: {
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );

  const stateLoading = document.getElementById("state-loading");
  const stateSuccess = document.getElementById("state-success");
  const stateInvalid = document.getElementById("state-invalid");

  function showState(state) {
    [stateLoading, stateSuccess, stateInvalid].forEach((el) => {
      el.classList.toggle("hidden", el !== state);
    });
  }

  function hasUrlError() {
    const hash = new URLSearchParams(
      window.location.hash.replace(/^#/, "")
    );

    const query = new URLSearchParams(window.location.search);

    return (
      hash.get("error") ||
      query.get("error") ||
      hash.get("error_code") ||
      query.get("error_code")
    );
  }

  async function creaUtente() {
    try {
      // Controlliamo eventuali errori nel link
      if (hasUrlError()) {
        console.error("Link di conferma non valido.");
        showState(stateInvalid);
        return;
      }

      // Diamo tempo a Supabase di elaborare il token
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Recuperiamo l'utente autenticato
      const { data, error } =
        await supabaseClient.auth.getUser();

      if (error || !data.user) {
        console.error(
          "Utente non disponibile:",
          error
        );

        showState(stateInvalid);
        return;
      }

      const user = data.user;

      console.log("EMAIL CONFERMATA");
      console.log("User ID:", user.id);
      console.log("Email:", user.email);
      console.log("Metadata:", user.user_metadata);

      const nome = user.user_metadata?.nome ?? "";
      const cognome = user.user_metadata?.cognome ?? "";
      const email = user.email ?? "";

      // Controlliamo se esiste già il profilo
      const { data: existingUser, error: existingError } =
        await supabaseClient
          .from("utenti")
          .select("id")
          .eq("id", user.id)
          .maybeSingle();

      if (existingError) {
        console.error(
          "Errore controllo utente:",
          existingError
        );

        showState(stateInvalid);
        return;
      }

      // Se non esiste, lo creiamo
      if (!existingUser) {
        const { error: insertError } =
          await supabaseClient
            .from("utenti")
            .insert({
              id: user.id,
              nome: nome,
              cognome: cognome,
              email: email,
            });

        if (insertError) {
          console.error(
            "Errore inserimento utenti:",
            insertError
          );

          showState(stateInvalid);
          return;
        }

        console.log(
          "UTENTE INSERITO CORRETTAMENTE IN utenti"
        );
      } else {
        console.log(
          "Utente già presente nella tabella utenti."
        );
      }

      // Tutto completato
      showState(stateSuccess);

      // Puliamo l'URL
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );

    } catch (error) {
      console.error(
        "Errore durante la conferma email:",
        error
      );

      showState(stateInvalid);
    }
  }

  // Quando Supabase completa l'autenticazione
  supabaseClient.auth.onAuthStateChange(
    async (event, session) => {

      console.log("Auth event:", event);

      if (
        (event === "SIGNED_IN" ||
          event === "INITIAL_SESSION") &&
        session
      ) {
        await creaUtente();
      }
    }
  );

  // Avviamo comunque il controllo
  creaUtente();

})();
