(() => {
  "use strict";

  const SUPABASE_URL =
    "https://kcoglivbakjyxszoruka.supabase.co";

  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtjb2dsaXZiYWtqeXhzem9ydWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNDA0NTcsImV4cCI6MjA4ODYxNjQ1N30.ICFTE2V6Y62BjT2gagazjLvyW8RZIZUji_D575hC5sY";


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


  const stateLoading =
    document.getElementById("state-loading");

  const stateSuccess =
    document.getElementById("state-success");

  const stateInvalid =
    document.getElementById("state-invalid");


  function showState(state) {

    [
      stateLoading,
      stateSuccess,
      stateInvalid
    ].forEach((el) => {

      el.classList.toggle(
        "hidden",
        el !== state
      );

    });
  }


  function hasUrlError() {

    const hash = new URLSearchParams(
      window.location.hash.replace(/^#/, "")
    );

    const query = new URLSearchParams(
      window.location.search
    );

    return (
      hash.get("error") ||
      query.get("error") ||
      hash.get("error_code") ||
      query.get("error_code")
    );
  }


  async function verifyEmail() {

    try {

      // Se Supabase ha restituito un errore
      // direttamente nell'URL
      if (hasUrlError()) {

        showState(stateInvalid);

        return;
      }


      // Attendiamo che Supabase elabori
      // il token presente nell'URL.
      await new Promise((resolve) => {
        setTimeout(resolve, 800);
      });


      const {
        data,
        error
      } = await supabaseClient.auth.getSession();


      if (error) {
        showState(stateInvalid);
        return;
      }


      if (data && data.session) {

        // Email verificata correttamente.
        showState(stateSuccess);

        // Rimuove token e parametri dall'URL.
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );

        return;
      }


      // Nessuna sessione valida.
      showState(stateInvalid);

    } catch (error) {

      console.error(
        "Errore durante la conferma email:",
        error
      );

      showState(stateInvalid);
    }
  }


  // Nel caso Supabase emetta l'evento
  // dopo il caricamento della pagina.
  supabaseClient.auth.onAuthStateChange(
    (event, session) => {

      if (
        event === "SIGNED_IN" &&
        session
      ) {

        showState(stateSuccess);

        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }

    }
  );


  verifyEmail();

})();
