// ============================================================
// VISIT GUBBIO — Home
// ============================================================

// ------------------------------------------------------------
// LINK DELL'APP: incolla qui gli indirizzi degli store.
// Finché un link è vuoto, il pulsante mostra "Prossimamente".
// ------------------------------------------------------------
var APP_STORE_URL = "";
var GOOGLE_PLAY_URL = "";

(function () {
  var TEXTS = {
    it: {
      title: "Visit Gubbio · La guida di Gubbio sul tuo telefono",
      heroTitle: "Gubbio, a portata di mano",
      heroText: "L'app per visitare la città: cosa vedere, dove mangiare, dove dormire e cosa succede oggi, tutto in un unico posto.",
      download: "Scarica su",
      coming: "Prossimamente su",
      featuresTitle: "Cosa trovi nell'app",
      f1Title: "Mappa della città",
      f1Text: "Luoghi, servizi ed eventi del giorno su un'unica mappa, con i filtri che scegli tu.",
      f2Title: "Luoghi da visitare",
      f2Text: "Palazzi, chiese e monumenti da scoprire, con schede e informazioni utili.",
      f3Title: "Itinerari",
      f3Text: "Percorsi a tappe per girare Gubbio senza perdere nulla.",
      f4Title: "Eventi",
      f4Text: "Il calendario sempre aggiornato di quello che succede in città.",
      f5Title: "Mangiare e dormire",
      f5Text: "Ristoranti, bar e hotel, con le recensioni dei visitatori.",
      f6Title: "Storia",
      f6Text: "Le epoche e i racconti che hanno fatto Gubbio.",
      tagline: "Scopri. Vivi. Ricorda.",
      privacy: "Privacy",
      terms: "Termini e condizioni"
    },
    en: {
      title: "Visit Gubbio · Your guide to Gubbio on your phone",
      heroTitle: "Gubbio at your fingertips",
      heroText: "The app for visiting the city: what to see, where to eat, where to stay and what's on today, all in one place.",
      download: "Download on",
      coming: "Coming soon to",
      featuresTitle: "What's in the app",
      f1Title: "City map",
      f1Text: "Places, services and today's events on a single map, with the filters you choose.",
      f2Title: "Places to visit",
      f2Text: "Palaces, churches and monuments to discover, with useful details for each one.",
      f3Title: "Itineraries",
      f3Text: "Step-by-step routes to see Gubbio without missing a thing.",
      f4Title: "Events",
      f4Text: "An up-to-date calendar of what's happening in town.",
      f5Title: "Eat & stay",
      f5Text: "Restaurants, bars and hotels, with reviews from visitors.",
      f6Title: "History",
      f6Text: "The eras and stories that shaped Gubbio.",
      tagline: "Discover. Live. Remember.",
      privacy: "Privacy",
      terms: "Terms and conditions"
    },
    de: {
      title: "Visit Gubbio · Dein Gubbio-Reiseführer auf dem Handy",
      heroTitle: "Gubbio immer griffbereit",
      heroText: "Die App für deinen Besuch: was du sehen kannst, wo du essen und übernachten kannst und was heute los ist, alles an einem Ort.",
      download: "Laden im",
      coming: "Demnächst bei",
      featuresTitle: "Das findest du in der App",
      f1Title: "Stadtkarte",
      f1Text: "Orte, Services und die Veranstaltungen des Tages auf einer Karte, mit Filtern nach deiner Wahl.",
      f2Title: "Sehenswürdigkeiten",
      f2Text: "Paläste, Kirchen und Denkmäler entdecken, mit nützlichen Informationen zu jedem Ort.",
      f3Title: "Routen",
      f3Text: "Etappenrouten, damit du in Gubbio nichts verpasst.",
      f4Title: "Veranstaltungen",
      f4Text: "Der aktuelle Kalender mit allem, was in der Stadt passiert.",
      f5Title: "Essen & Übernachten",
      f5Text: "Restaurants, Bars und Hotels mit Bewertungen von Besuchern.",
      f6Title: "Geschichte",
      f6Text: "Die Epochen und Erzählungen, die Gubbio geprägt haben.",
      tagline: "Entdecken. Erleben. Erinnern.",
      privacy: "Datenschutz",
      terms: "Nutzungsbedingungen"
    },
    fr: {
      title: "Visit Gubbio · Votre guide de Gubbio sur votre téléphone",
      heroTitle: "Gubbio à portée de main",
      heroText: "L'application pour visiter la ville : que voir, où manger, où dormir et que faire aujourd'hui, tout au même endroit.",
      download: "Télécharger sur",
      coming: "Bientôt sur",
      featuresTitle: "Dans l'application",
      f1Title: "Carte de la ville",
      f1Text: "Lieux, services et événements du jour sur une seule carte, avec les filtres de votre choix.",
      f2Title: "Lieux à visiter",
      f2Text: "Palais, églises et monuments à découvrir, avec des informations utiles pour chacun.",
      f3Title: "Itinéraires",
      f3Text: "Des parcours par étapes pour visiter Gubbio sans rien manquer.",
      f4Title: "Événements",
      f4Text: "Le calendrier à jour de ce qui se passe en ville.",
      f5Title: "Manger et dormir",
      f5Text: "Restaurants, bars et hôtels, avec les avis des visiteurs.",
      f6Title: "Histoire",
      f6Text: "Les époques et les récits qui ont façonné Gubbio.",
      tagline: "Découvrir. Vivre. Se souvenir.",
      privacy: "Confidentialité",
      terms: "Conditions d'utilisation"
    }
  };

  var SUPPORTED = ["it", "en", "de", "fr"];
  var STORES = [
    { id: "store-ios", url: APP_STORE_URL },
    { id: "store-android", url: GOOGLE_PLAY_URL }
  ];

  // Stessa logica delle altre pagine: scelta salvata, ?lang=, lingua del telefono, italiano.
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

  function apply(lang) {
    var dict = TEXTS[lang];
    document.documentElement.lang = lang;
    document.title = dict.title;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = dict[el.getAttribute("data-i18n")];
    });
    STORES.forEach(function (store) {
      document.querySelector("#" + store.id + " [data-store-label]").textContent =
        store.url ? dict.download : dict.coming;
    });
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
  }

  STORES.forEach(function (store) {
    var link = document.getElementById(store.id);
    if (store.url) {
      link.href = store.url;
    } else {
      link.classList.add("is-coming");
    }
  });

  document.querySelectorAll(".lang-switch button").forEach(function (b) {
    b.addEventListener("click", function () {
      var lang = b.getAttribute("data-lang");
      try { localStorage.setItem("vg_lang", lang); } catch (e) {}
      apply(lang);
    });
  });

  apply(pickLanguage());
})();
