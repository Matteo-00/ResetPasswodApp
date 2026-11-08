// ============================================================
// VISIT GUBBIO — Chi siamo
// ============================================================

(function () {
  var TEXTS = {
    it: {
      title: "Chi siamo · Visit Gubbio",
      back: "Torna alla home",
      heroTitle: "Ciao, siamo Matteo e Leonardo!",
      heroText: "Due ragazzi nati e cresciuti a Gubbio, con un'idea semplice: farti vivere la nostra città come la viviamo noi.",
      s1Title: "Perché è nato Visit Gubbio",
      s1Text1: "Gubbio è casa nostra. Qui siamo nati, qui siamo cresciuti e qui ogni strada, ogni piazza e ogni scalinata ha qualcosa da raccontarci.",
      s1Text2: "Spesso, però, vediamo chi arriva nella nostra città ripartire senza averne colto fino in fondo la vera essenza, quella degli eugubini. Non per mancanza di interesse, ma perché non aveva le informazioni giuste al momento giusto. Ed è un peccato.",
      s2Title: "Cosa vogliamo fare",
      s2Text1: "Vogliamo rendere il più accessibile possibile la vera esperienza di visitare Gubbio. Non solo cosa vedere, ma anche dove sedersi a mangiare, cosa succede oggi in città e perché certe cose, qui, contano così tanto.",
      s2Text2: "Abbiamo messo tutto in un'app, con la cura che metteremmo nel consigliare la nostra città a un amico che viene a trovarci per la prima volta.",
      peopleTitle: "Piacere di conoscerti",
      matteoRole: "26 anni · Informatico e software developer",
      matteoText: "Eugubino doc, vive tra righe di codice e vicoli medievali. Porta nel progetto la passione per la tecnologia e la voglia di farla sentire semplice a chiunque.",
      leonardoRole: "34 anni · Ingegnere meccanico",
      leonardoText: "Eugubino doc anche lui, ragiona da ingegnere: se una cosa si può far funzionare meglio, va fatta funzionare meglio. Anche il modo di scoprire la sua città.",
      closeTitle: "Se vieni a Gubbio, vogliamo che te ne vada sentendoti un po' eugubino anche tu",
      closeText: "Hai un consiglio, una storia da raccontare o vuoi solo salutarci? Ci fa sempre piacere.",
      closeCta: "Scrivici",
      tagline: "Scopri. Vivi. Ricorda.",
      privacy: "Privacy",
      terms: "Termini e condizioni"
    },
    en: {
      title: "About us · Visit Gubbio",
      back: "Back to home",
      heroTitle: "Hi, we're Matteo and Leonardo!",
      heroText: "Two guys born and raised in Gubbio, with a simple idea: helping you experience our town the way we do.",
      s1Title: "Why we created Visit Gubbio",
      s1Text1: "Gubbio is our home. We were born here, we grew up here, and every street, square and stairway has something to tell us.",
      s1Text2: "Yet we often see people visit our town and leave without really grasping its true essence, the spirit of the people of Gubbio. Not for lack of interest, but because they didn't have the right information at the right moment. And that's a shame.",
      s2Title: "What we want to do",
      s2Text1: "We want to make the real experience of visiting Gubbio as accessible as possible. Not just what to see, but also where to sit down for a meal, what's happening in town today and why certain things matter so much here.",
      s2Text2: "We put it all in an app, with the care we'd take recommending our town to a friend coming to see us for the first time.",
      peopleTitle: "Nice to meet you",
      matteoRole: "26 years old · Computer scientist and software developer",
      matteoText: "Gubbio born and bred, he lives between lines of code and medieval alleys. He brings to the project a passion for technology and the desire to make it feel simple for everyone.",
      leonardoRole: "34 years old · Mechanical engineer",
      leonardoText: "Also Gubbio born and bred, he thinks like an engineer: if something can work better, it should. And that includes the way people discover his town.",
      closeTitle: "If you come to Gubbio, we want you to leave feeling a little bit eugubino too",
      closeText: "Got some advice, a story to share, or just want to say hello? We're always glad to hear from you.",
      closeCta: "Write to us",
      tagline: "Discover. Live. Remember.",
      privacy: "Privacy",
      terms: "Terms and conditions"
    },
    de: {
      title: "Über uns · Visit Gubbio",
      back: "Zurück zur Startseite",
      heroTitle: "Hallo, wir sind Matteo und Leonardo!",
      heroText: "Zwei in Gubbio geborene und aufgewachsene Freunde mit einer einfachen Idee: Du sollst unsere Stadt so erleben, wie wir sie erleben.",
      s1Title: "Warum es Visit Gubbio gibt",
      s1Text1: "Gubbio ist unser Zuhause. Hier sind wir geboren und aufgewachsen, und jede Straße, jeder Platz und jede Treppe hat uns etwas zu erzählen.",
      s1Text2: "Oft sehen wir aber, dass Besucher wieder abreisen, ohne das wahre Wesen der Stadt und ihrer Menschen wirklich erfasst zu haben. Nicht aus mangelndem Interesse, sondern weil ihnen im richtigen Moment die richtigen Informationen gefehlt haben. Und das ist schade.",
      s2Title: "Was wir erreichen wollen",
      s2Text1: "Wir wollen das echte Erlebnis eines Besuchs in Gubbio so zugänglich wie möglich machen. Nicht nur, was es zu sehen gibt, sondern auch, wo man gut essen kann, was heute in der Stadt los ist und warum bestimmte Dinge hier so viel bedeuten.",
      s2Text2: "All das haben wir in eine App gepackt, mit der Sorgfalt, mit der wir unsere Stadt einem Freund empfehlen würden, der uns zum ersten Mal besucht.",
      peopleTitle: "Schön, dich kennenzulernen",
      matteoRole: "26 Jahre · Informatiker und Softwareentwickler",
      matteoText: "Ein echter Eugubiner, zu Hause zwischen Codezeilen und mittelalterlichen Gassen. Er bringt die Leidenschaft für Technik ins Projekt und den Wunsch, sie für alle einfach zu machen.",
      leonardoRole: "34 Jahre · Maschinenbauingenieur",
      leonardoText: "Ebenfalls ein echter Eugubiner, und er denkt wie ein Ingenieur: Was besser funktionieren kann, soll auch besser funktionieren. Auch die Art, seine Stadt zu entdecken.",
      closeTitle: "Wenn du nach Gubbio kommst, sollst du dich beim Abschied selbst ein bisschen als Eugubiner fühlen",
      closeText: "Du hast einen Tipp, eine Geschichte oder willst einfach Hallo sagen? Wir freuen uns immer.",
      closeCta: "Schreib uns",
      tagline: "Entdecken. Erleben. Erinnern.",
      privacy: "Datenschutz",
      terms: "Nutzungsbedingungen"
    },
    fr: {
      title: "Qui sommes-nous · Visit Gubbio",
      back: "Retour à l'accueil",
      heroTitle: "Bonjour, nous sommes Matteo et Leonardo !",
      heroText: "Deux gars nés et élevés à Gubbio, avec une idée simple : vous faire vivre notre ville comme nous la vivons.",
      s1Title: "Pourquoi Visit Gubbio est né",
      s1Text1: "Gubbio, c'est chez nous. Nous y sommes nés, nous y avons grandi, et chaque rue, chaque place et chaque escalier a quelque chose à nous raconter.",
      s1Text2: "Pourtant, nous voyons souvent des visiteurs repartir sans avoir vraiment saisi la véritable essence de la ville et de ses habitants. Non par manque d'intérêt, mais parce qu'ils n'avaient pas les bonnes informations au bon moment. Et c'est dommage.",
      s2Title: "Ce que nous voulons faire",
      s2Text1: "Nous voulons rendre la véritable expérience d'une visite à Gubbio aussi accessible que possible. Pas seulement que voir, mais aussi où s'attabler, ce qui se passe aujourd'hui en ville et pourquoi certaines choses comptent tant ici.",
      s2Text2: "Nous avons tout mis dans une application, avec le soin que nous mettrions à recommander notre ville à un ami qui vient nous voir pour la première fois.",
      peopleTitle: "Enchantés",
      matteoRole: "26 ans · Informaticien et développeur logiciel",
      matteoText: "Enfant de Gubbio, il vit entre lignes de code et ruelles médiévales. Il apporte au projet sa passion pour la technologie et l'envie de la rendre simple pour tous.",
      leonardoRole: "34 ans · Ingénieur mécanicien",
      leonardoText: "Enfant de Gubbio lui aussi, il raisonne en ingénieur : si une chose peut mieux fonctionner, elle doit mieux fonctionner. Y compris la façon de découvrir sa ville.",
      closeTitle: "Si vous venez à Gubbio, nous voulons que vous repartiez en vous sentant un peu eugubin vous aussi",
      closeText: "Un conseil, une histoire à partager ou simplement envie de nous saluer ? Cela nous fait toujours plaisir.",
      closeCta: "Écrivez-nous",
      tagline: "Découvrir. Vivre. Se souvenir.",
      privacy: "Confidentialité",
      terms: "Conditions d'utilisation"
    }
  };

  var SUPPORTED = ["it", "en", "de", "fr"];

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
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
  }

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
})();
