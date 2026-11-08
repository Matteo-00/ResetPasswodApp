// ============================================================
// VISIT GUBBIO — Pagina sostenitori
// Legge i dati dalle stesse tabelle Supabase dell'app.
// L'anon key è pubblica per design, è la stessa di reset-password.js.
// ============================================================

(function () {
  var SUPABASE_URL = "https://kcoglivbakjyxszoruka.supabase.co";
  var SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtjb2dsaXZiYWtqeXhzem9ydWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNDA0NTcsImV4cCI6MjA4ODYxNjQ1N30.ICFTE2V6Y62BjT2gagazjLvyW8RZIZUji_D575hC5sY";

  // Da dove prendere i sostenitori (stesse tabelle dell'app)
  var SOURCES = [
    { table: "ristoranti" },
    { table: "bar" },
    { table: "hotel" },
    { table: "luoghi", filter: "&tipo=eq.agriturismo" }
  ];
  var EMAIL = "visitgubbioapp@gmail.com";

  var TEXTS = {
    it: {
      title: "I nostri sostenitori · Visit Gubbio",
      back: "Torna alla home",
      heroTitle: "Chi rende possibile Visit Gubbio",
      heroText: "Le attività che credono in questo progetto e nella nostra città. Tocca un logo per conoscerle meglio.",
      visitSite: "Visita il sito",
      close: "Chiudi",
      empty: "Presto troverai qui tutti i nostri sostenitori.",
      error: "Al momento non riusciamo a mostrare i sostenitori. Riprova tra poco.",
      joinTitle: "Vuoi esserci anche tu?",
      joinText: "Hai un'attività a Gubbio? Scrivici e sostieni il progetto insieme a noi.",
      joinCta: "Scrivici un'email",
      joinSubject: "Voglio sostenere Visit Gubbio",
      tagline: "Scopri. Vivi. Ricorda.",
      privacy: "Privacy",
      terms: "Termini e condizioni"
    },
    en: {
      title: "Our supporters · Visit Gubbio",
      back: "Back to home",
      heroTitle: "Who makes Visit Gubbio possible",
      heroText: "The businesses that believe in this project and in our town. Tap a logo to get to know them.",
      visitSite: "Visit the website",
      close: "Close",
      empty: "All our supporters will be listed here soon.",
      error: "We can't show our supporters right now. Please try again shortly.",
      joinTitle: "Would you like to join them?",
      joinText: "Do you run a business in Gubbio? Write to us and support the project with us.",
      joinCta: "Send us an email",
      joinSubject: "I would like to support Visit Gubbio",
      tagline: "Discover. Live. Remember.",
      privacy: "Privacy",
      terms: "Terms and conditions"
    },
    de: {
      title: "Unsere Unterstützer · Visit Gubbio",
      back: "Zurück zur Startseite",
      heroTitle: "Wer Visit Gubbio möglich macht",
      heroText: "Die Betriebe, die an dieses Projekt und an unsere Stadt glauben. Tippe auf ein Logo, um sie kennenzulernen.",
      visitSite: "Website besuchen",
      close: "Schließen",
      empty: "Bald findest du hier alle unsere Unterstützer.",
      error: "Die Unterstützer können gerade nicht angezeigt werden. Versuche es gleich noch einmal.",
      joinTitle: "Möchtest du auch dabei sein?",
      joinText: "Du hast einen Betrieb in Gubbio? Schreib uns und unterstütze das Projekt gemeinsam mit uns.",
      joinCta: "E-Mail schreiben",
      joinSubject: "Ich möchte Visit Gubbio unterstützen",
      tagline: "Entdecken. Erleben. Erinnern.",
      privacy: "Datenschutz",
      terms: "Nutzungsbedingungen"
    },
    fr: {
      title: "Nos soutiens · Visit Gubbio",
      back: "Retour à l'accueil",
      heroTitle: "Ceux qui rendent Visit Gubbio possible",
      heroText: "Les commerces qui croient en ce projet et en notre ville. Touchez un logo pour mieux les connaître.",
      visitSite: "Visiter le site",
      close: "Fermer",
      empty: "Vous trouverez bientôt ici tous nos soutiens.",
      error: "Impossible d'afficher nos soutiens pour le moment. Réessayez dans un instant.",
      joinTitle: "Vous voulez en faire partie ?",
      joinText: "Vous avez un commerce à Gubbio ? Écrivez-nous et soutenez le projet avec nous.",
      joinCta: "Nous envoyer un e-mail",
      joinSubject: "Je souhaite soutenir Visit Gubbio",
      tagline: "Découvrir. Vivre. Se souvenir.",
      privacy: "Confidentialité",
      terms: "Conditions d'utilisation"
    }
  };

  var SUPPORTED = ["it", "en", "de", "fr"];
  var SKELETONS = 8;
  var current = "it";
  var sponsors = null;   // righe della tabella, null finché non arrivano
  var loadFailed = false;
  var translations = {}; // { en: { idSponsor: { descrizione: "..." } } }

  var grid = document.getElementById("sponsor-grid");
  var message = document.getElementById("sponsor-message");
  var dialog = document.getElementById("sponsor-dialog");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function pickLanguage() {
    var saved = null;
    try { saved = localStorage.getItem("vg_lang"); } catch (e) {}
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;

    var fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl && SUPPORTED.indexOf(fromUrl.slice(0, 2)) !== -1) {
      return fromUrl.slice(0, 2);
    }

    var list = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "it"];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i]).slice(0, 2).toLowerCase();
      if (SUPPORTED.indexOf(code) !== -1) return code;
    }
    return "it";
  }

  // ------------------------------------------------------------
  // Dati
  // ------------------------------------------------------------
  function query(path) {
    return fetch(SUPABASE_URL + "/rest/v1/" + path, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: "Bearer " + SUPABASE_ANON_KEY
      }
    }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    });
  }

  function loadSponsors() {
    var failures = 0;
    return Promise.all(SOURCES.map(function (source) {
      return query(
        source.table + "?select=id,nome,descrizione,image_url,sito_web" + (source.filter || "")
      ).catch(function () {
        failures++;
        return [];
      });
    })).then(function (lists) {
      // Mostra quello che è arrivato; errore solo se non ha risposto nessuna tabella
      if (failures === SOURCES.length) throw new Error("no data");
      return lists.reduce(function (all, list) { return all.concat(list); }, []);
    });
  }

  // Le traduzioni sono facoltative: se mancano resta l'italiano, come in app.
  function loadTranslations(lang) {
    if (lang === "it" || translations[lang]) return Promise.resolve();
    return query(
      "content_translations?select=entity_id,content&entity_type=in.(" +
      SOURCES.map(function (source) { return source.table; }).join(",") +
      ")&language_code=eq." + lang
    ).then(function (rows) {
      var map = {};
      rows.forEach(function (row) { map[row.entity_id] = row.content || {}; });
      translations[lang] = map;
    }).catch(function () {});
  }

  function description(sponsor) {
    var t = translations[current] && translations[current][sponsor.id];
    var text = t && typeof t.descrizione === "string" ? t.descrizione.trim() : "";
    return text || (sponsor.descrizione || "").trim();
  }

  // Accetta solo indirizzi web veri; aggiunge https:// se manca.
  function safeUrl(value) {
    var text = String(value || "").trim();
    if (!text) return null;
    if (!/^[a-z][a-z0-9+.-]*:/i.test(text)) text = "https://" + text;
    try {
      var url = new URL(text);
      return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
    } catch (e) {
      return null;
    }
  }

  // ------------------------------------------------------------
  // Interfaccia
  // ------------------------------------------------------------
  function logoElement(sponsor) {
    var box = document.createElement("span");
    box.className = "sponsor-mark";

    var initial = document.createElement("span");
    initial.className = "sponsor-initial";
    initial.textContent = (sponsor.nome || "?").trim().charAt(0).toUpperCase();
    box.appendChild(initial);

    var src = safeUrl(sponsor.image_url);
    if (src) {
      var img = document.createElement("img");
      img.alt = "";
      img.loading = "lazy";
      img.src = src;
      img.addEventListener("error", function () { img.remove(); });
      box.appendChild(img);
    }
    return box;
  }

  function showSkeletons() {
    for (var i = 0; i < SKELETONS; i++) {
      var li = document.createElement("li");
      li.className = "sponsor-skeleton";
      li.setAttribute("aria-hidden", "true");
      grid.appendChild(li);
    }
  }

  function render() {
    grid.textContent = "";
    message.hidden = true;

    if (loadFailed || (sponsors && !sponsors.length)) {
      message.textContent = TEXTS[current][loadFailed ? "error" : "empty"];
      message.hidden = false;
      return;
    }

    sponsors.forEach(function (sponsor, index) {
      var li = document.createElement("li");
      li.className = "sponsor-item";
      li.style.setProperty("--i", Math.min(index, 16));

      var button = document.createElement("button");
      button.type = "button";
      button.className = "sponsor-tile";
      button.appendChild(logoElement(sponsor));

      var name = document.createElement("span");
      name.className = "sponsor-name";
      name.textContent = sponsor.nome;
      button.appendChild(name);

      button.addEventListener("click", function () { openSponsor(sponsor); });
      li.appendChild(button);
      grid.appendChild(li);
    });
  }

  function apply(lang) {
    current = lang;
    var dict = TEXTS[lang];
    document.documentElement.lang = lang;
    document.title = dict.title;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = dict[el.getAttribute("data-i18n")];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", dict[el.getAttribute("data-i18n-aria")]);
    });
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    document.getElementById("join-link").href =
      "mailto:" + EMAIL + "?subject=" + encodeURIComponent(dict.joinSubject);

    if (sponsors || loadFailed) {
      loadTranslations(lang).then(function () {
        if (current === lang) render();
      });
    }
  }

  // ------------------------------------------------------------
  // Finestra di dettaglio
  // ------------------------------------------------------------
  function openSponsor(sponsor) {
    var logoBox = document.getElementById("dialog-logo");
    logoBox.textContent = "";
    logoBox.appendChild(logoElement(sponsor));

    document.getElementById("dialog-title").textContent = sponsor.nome;

    var text = document.getElementById("dialog-text");
    var value = description(sponsor);
    text.textContent = value;
    text.hidden = !value;

    var link = document.getElementById("dialog-link");
    var url = safeUrl(sponsor.sito_web);
    link.hidden = !url;
    if (url) link.href = url; else link.removeAttribute("href");

    dialog.classList.remove("closing");
    dialog.showModal();
  }

  function closeSponsor() {
    if (!dialog.open || dialog.classList.contains("closing")) return;
    if (reduceMotion.matches) {
      dialog.close();
      return;
    }
    dialog.classList.add("closing");
    dialog.addEventListener("animationend", function done(event) {
      if (event.target !== dialog) return;
      dialog.removeEventListener("animationend", done);
      dialog.classList.remove("closing");
      dialog.close();
    });
  }

  document.getElementById("dialog-close").addEventListener("click", closeSponsor);
  dialog.addEventListener("cancel", function (event) {
    event.preventDefault();
    closeSponsor();
  });
  dialog.addEventListener("click", function (event) {
    if (event.target !== dialog) return;
    var r = dialog.getBoundingClientRect();
    var inside = event.clientX >= r.left && event.clientX <= r.right &&
      event.clientY >= r.top && event.clientY <= r.bottom;
    if (!inside) closeSponsor();
  });

  // ------------------------------------------------------------
  // Avvio
  // ------------------------------------------------------------
  document.querySelectorAll(".lang-switch button").forEach(function (b) {
    b.addEventListener("click", function () {
      var lang = b.getAttribute("data-lang");
      try { localStorage.setItem("vg_lang", lang); } catch (e) {}
      apply(lang);
    });
  });

  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (el) { observer.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add("in"); });
  }

  apply(pickLanguage());
  showSkeletons();

  loadSponsors().then(function (rows) {
    sponsors = rows
      .filter(function (row) { return row.nome && row.nome.trim(); })
      .sort(function (a, b) { return a.nome.localeCompare(b.nome, "it"); });
    return loadTranslations(current);
  }).catch(function () {
    loadFailed = true;
  }).then(render);
})();
