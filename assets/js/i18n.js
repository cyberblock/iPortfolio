/**
 * Bilingual content switcher (EN / ES).
 *
 * The HTML ships in English and is the English dictionary: every
 * translatable node carries data-i18n="key", and its original text is read
 * from the page on load. Only the Spanish strings live here.
 *
 * Fires a "langchange" event on document after each switch, so site.js can
 * refresh anything built from translated text.
 */
(function () {
  "use strict";

  var STORAGE_KEY = 'iportfolio-lang';

  /* One CV per language, applied to every [data-cv-link] anchor. */
  var CV_LINKS = {
    en: 'https://drive.google.com/file/d/1NSNz3xb3n5yRvxEUv8sly80ucPqWb6rh/view?usp=drive_link',
    es: 'https://drive.google.com/file/d/1WCk9frLLmU5dkSjRsWMqYxxX5AH8AtvE/view?usp=sharing'
  };

  var ES = {
    'skip': 'Saltar al contenido',

    'nav.experience': 'Experiencia',
    'nav.work': 'Proyectos',
    'nav.services': 'Qué hago',
    'nav.contact': 'Contacto',

    'hero.fact.role': 'Ingeniero de desarrollo de software',
    'hero.fact.place': 'Coruña, España',
    'hero.fact.lang': 'Español (nativo), inglés B1',
    'hero.fact.edu': 'Ingeniería en Informática, 2019',
    'hero.statement': 'Modernizo los sistemas que una empresa no puede apagar.',
    'hero.rail.1': 'Ocho años entregando a producción',
    'hero.rail.2': 'De Zend a Laminas sin caída de servicio',
    'hero.rail.3': 'Diez APIs empresariales y contando',
    'hero.rail.4': 'Ahora en Netex Learning, abierto a nuevas oportunidades',
    'hero.cv': 'Descargar mi CV',

    'marquee': 'Encendida desde el siglo II. Reconstruida en 1788. Nunca apagada.',

    'about.title': 'Sigue encendido',
    'about.a.role': 'Ingeniero de desarrollo de software',
    'about.a.text': 'Ocho años entre arquitectura de software, desarrollo full-stack y modernización de sistemas. Hago avanzar plataformas legacy sin dejarlas fuera de servicio.',
    'about.b.role': 'A Coruña, siglo II, reconstruida en 1788',
    'about.b.text': 'Un faro romano, modernizado alrededor de su núcleo original y nunca apagado. Es la vara con la que mido cada migración.',
    'about.c.name': 'Donde los sistemas se encuentran',
    'about.c.role': 'REST, SOAP, OAuth 2.0, DDD',
    'about.c.text': 'Casi todo mi trabajo está en los bordes: ERPs, CRMs, proveedores de identidad y pasarelas de pago, unidos con arquitectura hexagonal para que el núcleo siga limpio.',

    'exp.title': 'Ocho años, sin apagarse',
    'exp.dial': 'Elige un año y mira qué mantenía en marcha',
    'exp.part.eng': 'Ingeniería',
    'exp.part.early': 'Soporte e infraestructura',
    'exp.part.edu': 'Formación',

    'exp.netex.place': 'En remoto',
    'exp.netex.date': 'Oct 2023 a hoy',
    'exp.netex.b1': 'Responsable técnico de la evolución del ERP corporativo (Workspace): mejoras de arquitectura y de rendimiento.',
    'exp.netex.b2': 'Migración progresiva de Zend Framework a Laminas con retrocompatibilidad y sin caída de servicio.',
    'exp.netex.b3': 'Contenericé el entorno de desarrollo y despliegue con Docker y Docker Compose.',
    'exp.netex.b4': 'Integraciones empresariales: API de HubSpot, Microsoft Dynamics NAV (SOAP) y Microsoft Sign-In (Azure AD, OAuth 2.0, OpenID Connect) para SSO.',

    'exp.ipg.place': 'A Coruña, híbrido',
    'exp.ipgfs.date': 'Jul a oct 2023',
    'exp.ipgfs.b1': 'E-commerce de comida a domicilio Xavou! en Laravel y Vue.js, con panel de administración y geolocalización con Google Maps.',
    'exp.ipgfs.b2': 'Pipelines de GitLab CI/CD, autenticación JWT y varias pasarelas de pago (Stripe, PayPal).',
    'exp.ipgbe.date': 'Jul 2022 a jun 2023',
    'exp.ipgbe.b1': 'Plataforma de venta de productos digitales con pasarela de pago y gestión de licencias, en Spring Boot con DDD y arquitectura hexagonal.',
    'exp.ipgbe.b2': 'Chat web de WhatsApp sobre la API de Vonage: sesiones, plantillas de mensajes y multimedia.',
    'exp.ipgbe.b3': 'CRM sobre la API de Namecheap que automatiza dominios, certificados SSL/TLS y DNS.',
    'exp.ipgbe.b4': 'Notificaciones en tiempo real en Microsoft Teams con webhooks de Graph API y Adaptive Cards.',

    'exp.elo.role': 'Desarrollador web',
    'exp.elo.place': 'Vigo',
    'exp.elo.date': 'Nov 2021 a jul 2022',
    'exp.elo.b1': 'CMS y CRM a medida en PHP nativo, con los patrones MVC y Repository.',
    'exp.elo.b2': 'Integraciones REST y SOAP con plataformas de entretenimiento, con OAuth, rate limiting y caché.',
    'exp.elo.b3': 'Scraper en Python con rotación automática de IP por VPN y proxies rotativos.',
    'exp.elo.b4': 'Microservicio de generación de PDF con colas de trabajo y almacenamiento en CDN.',

    'exp.tury.role': 'Analista programador',
    'exp.tury.date': 'Jul a oct 2021',
    'exp.tury.b1': 'Mantenimiento de un sistema de gestión de almacén legacy: refactorización de módulos y optimización de consultas.',
    'exp.tury.b2': 'Integración bidireccional con Amazon Seller Central (SP-API) que sincroniza catálogo, pedidos y stock en tiempo real.',

    'exp.jor.role': 'Desarrollador web y especialista en bases de datos',
    'exp.jor.date': 'Sep 2019 a ene 2021',
    'exp.jor.b1': 'Migración de módulos legacy a Laravel con SOLID y MVC, reduciendo la deuda técnica más de un 60 %.',
    'exp.jor.b2': 'Replicación de SQL Server (transaccional y de mezcla) para alta disponibilidad y recuperación ante desastres.',
    'exp.jor.b3': 'Procedimientos almacenados, triggers y T-SQL avanzado; trabajos de SQL Server Agent para índices y copias de seguridad.',
    'exp.jor.b4': 'Integración bidireccional con el ERP Profit 2K8 mediante sus APIs y procedimientos almacenados.',

    'exp.rg2.role': 'Desarrollador web freelance',
    'exp.rg2.date': 'Dic 2018 a ene 2022',
    'exp.rg2.b1': 'Desarrollo web independiente para clientes, en paralelo a mis puestos en plantilla.',

    'exp.emb.role': 'Analista de sistemas',
    'exp.emb.date': 'Oct 2018 a ene 2019',
    'exp.emb.desc': 'Infraestructura TI empresarial, monitorización con PRTG, firewall WatchGuard (UTM, VPN sitio a sitio) y soporte del ERP Profit 2K8.',
    'exp.ban.role': 'Analista de soporte help desk',
    'exp.ban.date': 'Abr a sep 2018',
    'exp.ban.desc': 'Soporte remoto de nivel 2 para departamentos corporativos y agencias de todo el país, con tickets medidos por SLA.',

    'exp.edu.role': 'Ingeniería en Informática',
    'exp.cv': 'El CV completo, en PDF',

    'work.title': 'Proyectos',
    'work.erp.title': 'Modernización del ERP Workspace',
    'work.erp.desc': 'Un ERP corporativo migrado de Zend Framework a Laminas con retrocompatibilidad total y sin caída de servicio, junto a un entorno en contenedores y SSO con Azure AD.',
    'work.ecom.title': 'Tienda de productos digitales',
    'work.ecom.desc': 'Plataforma de venta de productos digitales con pagos y gestión de licencias, en Spring Boot, con DDD y una arquitectura hexagonal que deja los proveedores de pago en los bordes.',
    'work.food.title': 'Xavou! comida a domicilio',
    'work.food.desc': 'Marketplace de comida a domicilio en Laravel y Vue.js, con panel completo para restaurantes y una capa de Google Maps para zonas de reparto y seguimiento de pedidos.',
    'work.spapi.title': 'Sincronización con Amazon',
    'work.spapi.desc': 'Integración bidireccional con Amazon Seller Central que mantiene catálogo, pedidos y stock sincronizados en tiempo real contra un sistema de almacén legacy.',
    'work.side.coffee': 'Proyecto personal, HTML y SASS',
    'work.side.coffee.desc': 'Un blog estático sobre café, hecho con HTML y SASS.',
    'work.side.estate': 'Proyecto personal, PHP',
    'work.side.estate.desc': 'Listado inmobiliario con back end en PHP.',
    'work.side.store': 'Proyecto personal, JavaScript',
    'work.side.store.desc': 'Interfaz de tienda en JavaScript puro.',
    'work.more': 'Más en GitHub',

    'services.title': 'Qué hago',
    'services.legacy.title': 'Modernización de sistemas legacy',
    'services.legacy.desc': 'Migraciones de framework con retrocompatibilidad, para que la plataforma siga funcionando mientras avanza.',
    'services.api.title': 'Integración de APIs',
    'services.api.desc': 'Integraciones REST y SOAP con ERPs, CRMs, proveedores de identidad y pasarelas de pago, con OAuth 2.0 y SSO.',
    'services.fullstack.title': 'Desarrollo full-stack',
    'services.fullstack.desc': 'Plataformas web de punta a punta: Laravel, Spring Boot o Laminas detrás, Angular, Vue o React delante.',
    'services.db.title': 'Bases de datos y rendimiento',
    'services.db.desc': 'Optimización de consultas, procedimientos almacenados y replicación de SQL Server para alta disponibilidad.',
    'services.docker.title': 'Docker y CI/CD',
    'services.docker.desc': 'Entornos en contenedores y pipelines de GitLab que hacen los despliegues repetibles y aburridos.',
    'services.scraping.title': 'Scraping y automatización',
    'services.scraping.desc': 'Pipelines de extracción en Python con rotación de proxies y colas de trabajo.',

    'skills.title': 'Las herramientas con que entrego',
    'skills.cat.architecture': 'Arquitectura.',
    'skills.microservices': 'Microservicios',
    'skills.cat.databases': 'Bases de datos.',
    'skills.db.rest': 'procedimientos almacenados, replicación, optimización de consultas.',
    'skills.cat.devops': 'DevOps y herramientas.',
    'skills.cat.apis': 'APIs.',

    'contact.title': 'Contacto',
    'contact.place': 'Coruña, o en remoto',
    'contact.cv': 'CV en PDF',
    'contact.hello': 'Hola',
    'contact.cta': 'Escríbeme por LinkedIn',

    'footer.invite': '¿Tienes un sistema que no puede parar?',
    'footer.cta': 'Escríbeme por LinkedIn',
    'footer.cv': 'CV',
    'footer.credits': 'Diseñado y desarrollado por mí.',
    'footer.pictures': 'Fotografías:'
  };

  /* The page itself is the English dictionary. */
  var EN = {};
  Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
    var key = el.getAttribute('data-i18n');
    if (!(key in EN)) EN[key] = el.textContent.replace(/\s+/g, ' ').trim();
  });

  var DICT = { en: EN, es: ES };
  var current = null;

  function apply(lang) {
    var dict = DICT[lang] || EN;

    document.documentElement.lang = lang;

    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      var value = dict[el.getAttribute('data-i18n')];
      if (typeof value === 'string') el.textContent = value;
    });

    var cv = CV_LINKS[lang] || CV_LINKS.en;
    Array.prototype.forEach.call(document.querySelectorAll('[data-cv-link]'), function (el) {
      el.setAttribute('href', cv);
    });

    Array.prototype.forEach.call(document.querySelectorAll('.lang-btn'), function (btn) {
      var on = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    current = lang;
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* private mode: the choice just doesn't stick */ }
  }

  function preferredLang() {
    try {
      var stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'es') return stored;
    } catch (e) { /* ignore */ }
    var browser = (window.navigator.language || 'en').toLowerCase();
    return browser.indexOf('es') === 0 ? 'es' : 'en';
  }

  apply(preferredLang());

  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.lang-btn') : null;
    if (!btn) return;
    var lang = btn.getAttribute('data-lang');
    if (!lang || lang === current) return;
    apply(lang);
  });

})();
