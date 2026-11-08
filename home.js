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
      terms: "Termini e condizioni",
      aboutTitle: "Chi siamo",
      aboutText: "Due ragazzi di Gubbio, una città da raccontare.",
      aboutCta: "Conoscici",
      sponsorTitle: "Grazie a chi crede in Gubbio",
      sponsorText: "Questo progetto è reso possibile dagli sponsor e dalle attività del territorio che ogni giorno scelgono di sostenerlo.",
      sponsorCta: "Scopri chi ci sostiene",
      heroContact: "Hai bisogno di noi? Contattaci",
      more: "Scopri di più",
      close: "Chiudi",
      dialogCta: "Scrivici per saperne di più",
      f1Long: "Ristoranti, luoghi, parcheggi ed eventi di oggi sulla stessa mappa, anche in vista satellitare. Scegli cosa vedere e trova subito la strada.",
      f2Long: "Palazzi, chiese e monumenti con la loro scheda. Trovi anche i servizi utili per muoverti in città, come ascensori e bagni, e puoi salvare i preferiti.",
      f3Long: "Percorsi già pronti, divisi in tappe: apri l'itinerario e segui la città passo dopo passo.",
      f4Long: "Gli appuntamenti in città, compresi quelli importati dal sito del Comune di Gubbio, sempre con la fonte e il link all'originale.",
      f5Long: "Dove fermarti per una crescia, un aperitivo o la notte: ristoranti, bar e hotel con le recensioni di chi ci è già stato.",
      f6Long: "Dalle origini ai giorni nostri: un viaggio tra le epoche e i racconti della città, da leggere prima o durante la visita.",
      contactHello: "Ciao! Siamo qui per te",
      contactIntro: "Visit Gubbio nasce dalla passione per la nostra città. Ci farà un enorme piacere sentirti: scrivici quando vuoi!",
      contactJoinTitle: "Diventa nostro collaboratore",
      contactJoinText: "Hai un locale, una bottega, un agriturismo o una storia da raccontare su Gubbio? Entra a far parte di Visit Gubbio e aiutaci a far conoscere la città a chi la visita.",
      contactHelpTitle: "Domande o problemi?",
      contactHelpText: "Qualcosa non funziona o hai un'idea per migliorare l'app? Scrivici: ti rispondiamo volentieri e il più presto possibile.",
      contactWrite: "Scrivici un'email",
      contactEmailTitle: "LA NOSTRA EMAIL",
      contactCopy: "Copia indirizzo",
      contactCopied: "Indirizzo copiato",
      contactThanks: "Grazie di cuore per aver scelto Visit Gubbio",
      contactSubjectJoin: "Voglio collaborare con Visit Gubbio",
      contactSubjectHelp: "Domanda o problema su Visit Gubbio",
      dialogSubject: "Informazioni su Visit Gubbio"
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
      terms: "Terms and conditions",
      aboutTitle: "About us",
      aboutText: "Two guys from Gubbio, one town to share.",
      aboutCta: "Meet us",
      sponsorTitle: "Thanks to those who believe in Gubbio",
      sponsorText: "This project is made possible by the sponsors and local businesses who choose to support it every day.",
      sponsorCta: "See who supports us",
      heroContact: "Need us? Get in touch",
      more: "Learn more",
      close: "Close",
      dialogCta: "Write to us to find out more",
      f1Long: "Restaurants, places, car parks and today's events on the same map, with satellite view too. Choose what to see and find your way straight away.",
      f2Long: "Palaces, churches and monuments, each with its own page. You'll also find useful services for getting around, such as lifts and toilets, and you can save your favourites.",
      f3Long: "Ready-made routes divided into stops: open an itinerary and follow the city step by step.",
      f4Long: "What's on in town, including events imported from the Municipality of Gubbio website, always with the source and a link to the original.",
      f5Long: "Where to stop for a crescia, a drink or the night: restaurants, bars and hotels with reviews from people who have been there.",
      f6Long: "From the origins to the present day: a journey through the city's eras and stories, to read before or during your visit.",
      contactHello: "Hi! We are here for you",
      contactIntro: "Visit Gubbio is born from our love for our town. We would be delighted to hear from you: write to us any time!",
      contactJoinTitle: "Become one of our collaborators",
      contactJoinText: "Do you have a restaurant, a shop, a farm stay or a story to tell about Gubbio? Join Visit Gubbio and help us show the town to those who visit.",
      contactHelpTitle: "Questions or problems?",
      contactHelpText: "Something not working, or an idea to improve the app? Write to us: we will be happy to reply as soon as possible.",
      contactWrite: "Send us an email",
      contactEmailTitle: "OUR EMAIL",
      contactCopy: "Copy address",
      contactCopied: "Address copied",
      contactThanks: "Thank you from the heart for choosing Visit Gubbio",
      contactSubjectJoin: "I would like to collaborate with Visit Gubbio",
      contactSubjectHelp: "Question or problem about Visit Gubbio",
      dialogSubject: "Information about Visit Gubbio"
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
      terms: "Nutzungsbedingungen",
      aboutTitle: "Über uns",
      aboutText: "Zwei Freunde aus Gubbio, eine Stadt zum Erzählen.",
      aboutCta: "Lerne uns kennen",
      sponsorTitle: "Danke an alle, die an Gubbio glauben",
      sponsorText: "Dieses Projekt wird durch die Sponsoren und Betriebe der Region möglich, die es jeden Tag unterstützen.",
      sponsorCta: "Unsere Unterstützer",
      heroContact: "Brauchst du uns? Schreib uns",
      more: "Mehr erfahren",
      close: "Schließen",
      dialogCta: "Schreib uns für mehr Infos",
      f1Long: "Restaurants, Orte, Parkplätze und die heutigen Veranstaltungen auf einer Karte, auch in der Satellitenansicht. Wähle aus, was du sehen möchtest, und finde sofort den Weg.",
      f2Long: "Paläste, Kirchen und Denkmäler mit eigener Seite. Außerdem findest du nützliche Services für unterwegs, etwa Aufzüge und Toiletten, und kannst Favoriten speichern.",
      f3Long: "Fertige Routen, in Etappen aufgeteilt: Öffne eine Route und entdecke die Stadt Schritt für Schritt.",
      f4Long: "Termine in der Stadt, auch von der Website der Gemeinde Gubbio übernommen, immer mit Quelle und Link zum Original.",
      f5Long: "Wo du für eine Crescia, einen Aperitif oder die Nacht einkehren kannst: Restaurants, Bars und Hotels mit Bewertungen von anderen Gästen.",
      f6Long: "Von den Anfängen bis heute: eine Reise durch die Epochen und Erzählungen der Stadt, zum Lesen vor oder während des Besuchs.",
      contactHello: "Hallo! Wir sind für dich da",
      contactIntro: "Visit Gubbio entsteht aus der Liebe zu unserer Stadt. Wir freuen uns riesig, von dir zu hören: schreib uns jederzeit!",
      contactJoinTitle: "Werde einer unserer Mitarbeiter",
      contactJoinText: "Hast du ein Lokal, ein Geschäft, einen Agriturismo oder eine Geschichte über Gubbio zu erzählen? Werde Teil von Visit Gubbio und hilf uns, die Stadt ihren Besuchern näherzubringen.",
      contactHelpTitle: "Fragen oder Probleme?",
      contactHelpText: "Funktioniert etwas nicht oder hast du eine Idee, wie wir die App verbessern können? Schreib uns: wir antworten gern und so schnell wie möglich.",
      contactWrite: "E-Mail schreiben",
      contactEmailTitle: "UNSERE E-MAIL",
      contactCopy: "Adresse kopieren",
      contactCopied: "Adresse kopiert",
      contactThanks: "Von Herzen danke, dass du Visit Gubbio gewählt hast",
      contactSubjectJoin: "Ich möchte mit Visit Gubbio zusammenarbeiten",
      contactSubjectHelp: "Frage oder Problem zu Visit Gubbio",
      dialogSubject: "Informationen zu Visit Gubbio"
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
      terms: "Conditions d'utilisation",
      aboutTitle: "Qui sommes-nous",
      aboutText: "Deux gars de Gubbio, une ville à raconter.",
      aboutCta: "Faites connaissance",
      sponsorTitle: "Merci à ceux qui croient en Gubbio",
      sponsorText: "Ce projet est rendu possible par les sponsors et les commerces locaux qui choisissent chaque jour de le soutenir.",
      sponsorCta: "Découvrir nos soutiens",
      heroContact: "Besoin de nous ? Contactez-nous",
      more: "En savoir plus",
      close: "Fermer",
      dialogCta: "Écrivez-nous pour en savoir plus",
      f1Long: "Restaurants, lieux, parkings et événements du jour sur la même carte, également en vue satellite. Choisissez ce que vous voulez voir et trouvez aussitôt votre chemin.",
      f2Long: "Palais, églises et monuments, chacun avec sa fiche. Vous trouverez aussi des services utiles pour vous déplacer, comme les ascenseurs et les toilettes, et vous pourrez enregistrer vos favoris.",
      f3Long: "Des parcours prêts à l'emploi, divisés en étapes : ouvrez un itinéraire et suivez la ville pas à pas.",
      f4Long: "Les rendez-vous en ville, y compris ceux importés du site de la Commune de Gubbio, toujours avec la source et le lien vers l'original.",
      f5Long: "Où s'arrêter pour une crescia, un apéritif ou la nuit : restaurants, bars et hôtels avec les avis de ceux qui y sont allés.",
      f6Long: "Des origines à nos jours : un voyage à travers les époques et les récits de la ville, à lire avant ou pendant la visite.",
      contactHello: "Bonjour ! Nous sommes là pour vous",
      contactIntro: "Visit Gubbio est né de la passion pour notre ville. Nous serons ravis de vous lire : écrivez-nous quand vous voulez !",
      contactJoinTitle: "Devenez notre collaborateur",
      contactJoinText: "Vous avez un restaurant, une boutique, un agritourisme ou une histoire à raconter sur Gubbio ? Rejoignez Visit Gubbio et aidez-nous à faire découvrir la ville à ceux qui la visitent.",
      contactHelpTitle: "Des questions ou des problèmes ?",
      contactHelpText: "Quelque chose ne fonctionne pas ou vous avez une idée pour améliorer l'application ? Écrivez-nous : nous répondrons avec plaisir et au plus vite.",
      contactWrite: "Nous envoyer un e-mail",
      contactEmailTitle: "NOTRE E-MAIL",
      contactCopy: "Copier l'adresse",
      contactCopied: "Adresse copiée",
      contactThanks: "Merci de tout cœur d'avoir choisi Visit Gubbio",
      contactSubjectJoin: "Je souhaite collaborer avec Visit Gubbio",
      contactSubjectHelp: "Question ou problème sur Visit Gubbio",
      dialogSubject: "Informations sur Visit Gubbio"
    }
  };

  var EMAIL = "visitgubbioapp@gmail.com";
  var FEATURE_IMAGES = { 1: "albero", 2: "palazzo", 3: "anfiteatro", 4: "balestra", 5: "crescia", 6: "san_francesco" };
  var current = "it";
  
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

  function mailto(subject) {
    return "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject);
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
    document.querySelectorAll("[data-mail-subject]").forEach(function (el) {
      el.href = mailto(dict[el.getAttribute("data-mail-subject")]);
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

  // ------------------------------------------------------------
  // Comparsa degli elementi durante lo scorrimento
  // ------------------------------------------------------------
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

  // ------------------------------------------------------------
  // Finestra di dettaglio
  // ------------------------------------------------------------
  var dialog = document.getElementById("feature-dialog");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function openFeature(id) {
    var dict = TEXTS[current];
    document.getElementById("dialog-image").src = "img/" + FEATURE_IMAGES[id] + ".png";
    document.getElementById("dialog-title").textContent = dict["f" + id + "Title"];
    document.getElementById("dialog-text").textContent = dict["f" + id + "Long"];
    document.getElementById("dialog-cta").href = mailto(dict.dialogSubject);
    dialog.classList.remove("closing");
    dialog.showModal();
  }

  function closeFeature() {
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

  document.querySelectorAll(".feature").forEach(function (button) {
    button.addEventListener("click", function () {
      openFeature(button.getAttribute("data-feature"));
    });
  });
  document.getElementById("dialog-close").addEventListener("click", closeFeature);
  dialog.addEventListener("cancel", function (event) {
    event.preventDefault();
    closeFeature();
  });
  // Clic sullo sfondo scuro
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      var r = dialog.getBoundingClientRect();
      var inside = event.clientX >= r.left && event.clientX <= r.right &&
        event.clientY >= r.top && event.clientY <= r.bottom;
      if (!inside) closeFeature();
    }
  });

  // ------------------------------------------------------------
  // Copia dell'indirizzo email
  // ------------------------------------------------------------
  var toast = document.getElementById("toast");
  var toastTimer;

  function showToast(text) {
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2200);
  }

  function copyFallback() {
    var field = document.createElement("textarea");
    field.value = EMAIL;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    field.remove();
    showToast(ok ? TEXTS[current].contactCopied : EMAIL);
  }

  document.getElementById("copy-email").addEventListener("click", function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(function () {
        showToast(TEXTS[current].contactCopied);
      }, copyFallback);
    } else {
      copyFallback();
    }
  });
})();
