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

  async function creaUtente() {
    try {
      console.log("URL:", window.location.href);
      console.log("HASH:", window.location.hash);
      console.log("QUERY:", window.location.search);

      /*
       * Aspettiamo che Supabase elabori il link
       * di conferma presente nell'URL.
       */
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const {
        data: { session },
        error: sessionError,
      } = await supabaseClient.auth.getSession();

      console.log("SESSION:", session);
      console.log("SESSION ERROR:", sessionError);

      if (sessionError || !session) {
        console.error(
          "Nessuna sessione trovata dopo la conferma."
        );

        showState(stateInvalid);
        return;
      }

      const {
        data: { user },
        error: userError,
      } = await supabaseClient.auth.getUser();

      console.log("USER:", user);
      console.log("USER ERROR:", userError);

      if (userError || !user) {
        console.error(
          "Impossibile recuperare l'utente."
        );

        showState(stateInvalid);
        return;
      }

      console.log("EMAIL CONFERMATA!");
      console.log("ID:", user.id);
      console.log("EMAIL:", user.email);
      console.log("METADATA:", user.user_metadata);

      const nome = user.user_metadata?.nome ?? "";
      const cognome = user.user_metadata?.cognome ?? "";
      const email = user.email ?? "";

      /*
       * Controlliamo se il profilo esiste già
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
       * Se non esiste, lo creiamo
       */
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
            "ERRORE INSERT UTENTI:",
            insertError
          );

          showState(stateInvalid);
          return;
        }

        console.log(
          "UTENTE INSERITO CORRETTAMENTE!"
        );
      } else {
        console.log(
          "UTENTE GIÀ PRESENTE."
        );
      }

      showState(stateSuccess);

      /*
       * Puliamo il token dall'URL
       */
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );

    } catch (error) {
      console.error(
        "ERRORE CONFERMA EMAIL:",
        error
      );

      showState(stateInvalid);
    }
  }

  /*
   * Aspettiamo gli eventi di Supabase
   */
  supabaseClient.auth.onAuthStateChange(
    (event, session) => {
      console.log(
        "AUTH EVENT:",
        event,
        session
      );

      if (session) {
        creaUtente();
      }
    }
  );

  /*
   * Avvio
   */
  creaUtente();

})();
