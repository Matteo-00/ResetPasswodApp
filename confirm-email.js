(() => {
  "use strict";

  const SUPABASE_URL =
    "https://kcoglivbakjyxszoruka.supabase.co";

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

  async function confermaEmail() {
    try {
      console.log("URL:", window.location.href);
      console.log("SEARCH:", window.location.search);
      console.log("HASH:", window.location.hash);

      const params = new URLSearchParams(window.location.search);

      const tokenHash = params.get("token_hash");
      const type = params.get("type");

      console.log("token_hash presente:", !!tokenHash);
      console.log("type:", type);

      /*
       * CASO 1:
       * Supabase ci ha mandato direttamente token_hash.
       */
      if (tokenHash) {
        console.log("Verifica tramite token_hash...");

        const { data, error } =
          await supabaseClient.auth.verifyOtp({
            token_hash: tokenHash,
            type: type || "email",
          });

        if (error) {
          console.error(
            "Errore verifyOtp:",
            error
          );

          showState(stateInvalid);
          return;
        }

        console.log(
          "Email verificata tramite token_hash!"
        );

        await creaProfilo();

        return;
      }

      /*
       * CASO 2:
       * Supabase ha già elaborato il link
       * e ha creato una sessione.
       */
      const {
        data: { session },
        error: sessionError,
      } = await supabaseClient.auth.getSession();

      console.log("SESSION:", session);
      console.log(
        "SESSION ERROR:",
        sessionError
      );

      if (sessionError || !session) {
        console.error(
          "Nessuna sessione trovata."
        );

        showState(stateInvalid);
        return;
      }

      await creaProfilo();

    } catch (error) {
      console.error(
        "Errore conferma email:",
        error
      );

      showState(stateInvalid);
    }
  }

  async function creaProfilo() {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabaseClient.auth.getUser();

      if (userError || !user) {
        console.error(
          "Utente non disponibile:",
          userError
        );

        showState(stateInvalid);
        return;
      }

      console.log(
        "UTENTE CONFERMATO:",
        user
      );

      const nome =
        user.user_metadata?.nome ?? "";

      const cognome =
        user.user_metadata?.cognome ?? "";

      const email =
        user.email ?? "";

      /*
       * Controlliamo se esiste già
       */
      const {
        data: existingUser,
        error: existingError,
      } = await supabaseClient
        .from("utenti")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (existingError) {
        console.error(
          "Errore controllo utenti:",
          existingError
        );

        showState(stateInvalid);
        return;
      }

      /*
       * Creiamo il profilo se non esiste
       */
      if (!existingUser) {
        const {
          error: insertError,
        } = await supabaseClient
          .from("utenti")
          .insert({
            id: user.id,
            nome: nome,
            cognome: cognome,
            email: email,
          });

        if (insertError) {
          console.error(
            "ERRORE INSERT UTENTI:",
            insertError
          );

          showState(stateInvalid);
          return;
        }

        console.log(
          "PROFILO CREATO CORRETTAMENTE!"
        );
      } else {
        console.log(
          "PROFILO GIÀ PRESENTE."
        );
      }

      /*
       * SUCCESSO
       */
      showState(stateSuccess);

      /*
       * Puliamo l'URL
       */
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );

    } catch (error) {
      console.error(
        "Errore creazione profilo:",
        error
      );

      showState(stateInvalid);
    }
  }

  /*
   * Avvio
   */
  confermaEmail();

})();
