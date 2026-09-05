/**
 * Bilingual content switcher (EN / ES).
 *
 * The HTML ships in English; every translatable node carries data-i18n="key".
 * This file owns the Typed.js hero effect too, so the rotating strings can be
 * swapped along with the rest of the copy.
 *
 * Loaded before main.js on purpose.
 */
(function () {
  "use strict";

  var STORAGE_KEY = 'iportfolio-lang';

  var TYPED = {
    en: 'enterprise software, APIs that connect systems, resilient backends',
    es: 'software empresarial, APIs que conectan sistemas, backends que aguantan'
  };

  /* One CV per language — applied to every [data-cv-link] anchor. */
  var CV_LINKS = {
    en: 'https://drive.google.com/file/d/1NSNz3xb3n5yRvxEUv8sly80ucPqWb6rh/view?usp=drive_link',
    es: 'https://drive.google.com/file/d/1WCk9frLLmU5dkSjRsWMqYxxX5AH8AtvE/view?usp=sharing'
  };

  var DICT = {
    en: {
      'profile.role': 'Software Development Engineer',

      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.experience': 'Experience',
      'nav.skills': 'Skills',
      'nav.work': 'Work',
      'nav.services': 'Services',
      'nav.contact': 'Contact',

      'hero.eyebrow': 'Coruña, Spain · Open to new roles',
      'hero.lead': 'I build',
      'hero.summary': 'Software Development Engineer with 8+ years modernizing enterprise systems — framework migrations with zero downtime, hexagonal architecture and DDD, and REST/SOAP integrations that connect ERPs, CRMs and payment platforms.',
      'hero.cta.work': 'View my work',
      'hero.cta.cv': 'Download CV',
      'hero.stat.years': 'Years of experience',
      'hero.stat.apis': 'Enterprise APIs integrated',
      'hero.stat.debt': 'Technical debt on legacy migration',

      'about.title': 'About',
      'about.subtitle': 'Computer engineer and software developer based in Coruña. I design and modernize the systems businesses run on every day.',
      'about.status': 'Currently at Netex Learning · Open to new roles',
      'about.p1': 'Eight years across software architecture, full-stack development and enterprise system modernization. I take legacy platforms that can’t afford downtime and move them forward — progressive framework migrations, containerized environments, and clean boundaries between domain and infrastructure.',
      'about.p2': 'Most of my work lives where systems meet: RESTful and SOAP integrations with ERPs, CRMs, identity providers and payment gateways. I work with hexagonal architecture, DDD, microservices and Docker, and I care about the query plan as much as the class diagram.',
      'about.fact.location': 'Location:',
      'about.fact.location.v': 'Coruña, Spain',
      'about.fact.experience': 'Experience:',
      'about.fact.experience.v': '8+ years',
      'about.fact.education': 'Education:',
      'about.fact.languages': 'Languages:',
      'about.fact.languages.v': 'Spanish (native) · English B1',
      'about.fact.focus': 'Focus:',
      'about.fact.focus.v': 'Architecture · APIs · Legacy modernization',

      'exp.title': 'Experience',
      'exp.subtitle': 'Eight years of roles across Spain and Venezuela — from IT support into backend engineering, database work and software architecture.',
      'exp.cv': 'Full CV (PDF)',

      'tag.fulltime': 'Full-time',
      'tag.positions': '2 positions',
      'tag.freelance': 'Freelance',
      'tag.contract': 'Contract',

      'exp.netex.date': 'Oct 2023 — Present',
      'exp.netex.where': ' · Remote · 3 yr',
      'exp.netex.b1': 'Technical lead on the evolution of the corporate ERP (Workspace) — architectural improvements and performance optimization.',
      'exp.netex.b2': 'Progressive migration from Zend Framework to Laminas with backward compatibility and zero downtime.',
      'exp.netex.b3': 'Containerized the development and deployment environment with Docker and Docker Compose.',
      'exp.netex.b4': 'Enterprise integrations: HubSpot API, Microsoft Dynamics NAV (SOAP) and Microsoft Sign-In (Azure AD, OAuth 2.0 / OpenID Connect) for SSO.',

      'exp.ipglobal.where': 'A Coruña, Spain · Hybrid · 1 yr 4 mo',
      'exp.ipglobal.fs.date': 'Jul 2023 — Oct 2023 · 4 mo',
      'exp.ipglobal.fs.b1': 'Xavou! food-delivery e-commerce in Laravel and Vue.js, with admin panel and Google Maps geolocation.',
      'exp.ipglobal.fs.b2': 'GitLab CI/CD pipelines, JWT authentication and multiple payment gateways (Stripe, PayPal).',
      'exp.ipglobal.be.date': 'Jul 2022 — Jun 2023 · 1 yr',
      'exp.ipglobal.be.b1': 'Built an e-commerce platform for digital products with payment gateway and license management, applying DDD and hexagonal architecture on Spring Boot.',
      'exp.ipglobal.be.b2': 'WhatsApp web chat on the Vonage API — session management, message templates and media handling.',
      'exp.ipglobal.be.b3': 'CRM with Namecheap API integration automating domain, SSL/TLS certificate and DNS management.',
      'exp.ipglobal.be.b4': 'Real-time Microsoft Teams notifications through Graph API webhooks and Adaptive Cards.',

      'exp.elo.role': 'Web Developer',
      'exp.elo.date': 'Nov 2021 — Jul 2022',
      'exp.elo.where': ' · Vigo, Spain · 9 mo',
      'exp.elo.b1': 'Custom CMS/CRM in native PHP, applying the MVC and Repository patterns.',
      'exp.elo.b2': 'Multi-API integration (REST/SOAP) with entertainment platforms, including OAuth, rate limiting and caching.',
      'exp.elo.b3': 'Python web scraper with automatic IP rotation over VPN, rotating proxies and anti-bot-detection techniques.',
      'exp.elo.b4': 'Dynamic PDF generation microservice with queue workers and CDN storage.',

      'exp.rg2.role': 'Web Developer',
      'exp.rg2.date': 'Dec 2018 — Jan 2022',
      'exp.rg2.where': ' · Venezuela · 3 yr 2 mo',
      'exp.rg2.b1': 'Independent web development for clients, running alongside my in-house roles.',
      'exp.rg2.b2': '[ADD 2–3 REPRESENTATIVE PROJECTS OR CLIENT TYPES]',
      'exp.rg2.stack': '[ADD STACK]',

      'exp.tury.role': 'Analyst Programmer',
      'exp.tury.date': 'Jul 2021 — Oct 2021',
      'exp.tury.where': ' · Galicia, Spain · 4 mo',
      'exp.tury.b1': 'Maintained a legacy warehouse-management system, refactoring modules and optimizing queries.',
      'exp.tury.b2': 'Two-way Amazon Seller Central (SP-API) integration automating catalogue, order and stock synchronization in real time.',

      'exp.jorinacha.role': 'Web Developer & Database Specialist',
      'exp.jorinacha.date': 'Sep 2019 — Jan 2021',
      'exp.jorinacha.where': ' · Caracas, Venezuela · 1 yr 5 mo',
      'exp.jorinacha.b1': 'Migrated legacy modules to Laravel under SOLID and MVC, cutting technical debt by more than 60%.',
      'exp.jorinacha.b2': 'Implemented SQL Server replication (transactional and merge) for high availability and disaster recovery.',
      'exp.jorinacha.b3': 'Built and optimized stored procedures, triggers and advanced T-SQL; SQL Server Agent jobs for index maintenance and backup strategy.',
      'exp.jorinacha.b4': 'Two-way integration with the Profit 2K8 ERP through proprietary APIs and stored procedures.',

      'exp.earlier': 'Earlier roles',
      'exp.embassy.role': 'Systems Analyst',
      'exp.embassy.date': 'Oct 2018 — Jan 2019',
      'exp.embassy.desc': 'Enterprise IT infrastructure, PRTG monitoring, WatchGuard firewall (UTM, site-to-site VPN) and Profit 2K8 ERP support.',
      'exp.bancaribe.role': 'Help Desk Support Analyst',
      'exp.bancaribe.date': 'Apr — Sep 2018',
      'exp.bancaribe.desc': 'Level-2 remote support for corporate departments and branches nationwide, with SLA-tracked ticket management.',
      'exp.education': 'Education',

      'skills.title': 'Skills',
      'skills.subtitle': 'The stack I have shipped production work with, grouped the way I actually use it.',
      'skills.cat.architecture': 'Architecture',
      'skills.microservices': 'Microservices',
      'skills.cat.devops': 'DevOps & Tools',
      'skills.cat.databases': 'Databases',
      'skills.replication': 'Replication',
      'skills.queryopt': 'Query Optimization',
      'skills.cat.apis': 'APIs & Integrations',

      'work.title': 'Work',
      'work.subtitle': 'Systems I have designed, migrated and integrated in production, plus a few things I built on my own time.',
      'work.professional': 'Selected professional work',
      'work.present': 'PRESENT',
      'work.erp.title': 'Workspace ERP modernization',
      'work.erp.desc': 'Progressive migration of a corporate ERP from Zend Framework to Laminas with full backward compatibility and zero downtime, alongside a containerized environment and enterprise SSO through Azure AD.',
      'work.ecom.title': 'Digital products e-commerce',
      'work.ecom.desc': 'Sales platform for digital products with payment gateway and license management, built on Spring Boot with domain-driven design and a hexagonal architecture that keeps payment providers at the edges.',
      'work.food.title': 'food delivery',
      'work.food.desc': 'Food-delivery marketplace in Laravel and Vue.js with a full restaurant admin panel and a geolocation layer on Google Maps for delivery zones and order tracking.',
      'work.spapi.title': 'Amazon SP-API catalogue sync',
      'work.spapi.desc': 'Two-way integration with Amazon Seller Central that keeps catalogue, orders and stock synchronized in real time against a legacy warehouse-management system.',
      'work.side': 'Side projects',
      'work.side.coffee': 'Static site · HTML, SASS',
      'work.side.realestate': 'Real-estate listings · PHP',
      'work.side.store': 'Storefront UI · JavaScript',
      'work.more': 'See more on GitHub',

      'services.title': 'Services',
      'services.subtitle': 'Where I can help, based on what I have actually shipped.',
      'services.legacy.title': 'Legacy modernization',
      'services.legacy.desc': 'Progressive framework migrations with backward compatibility, so the platform keeps running while it moves forward.',
      'services.api.title': 'API integration',
      'services.api.desc': 'REST and SOAP integrations with ERPs, CRMs, identity providers and payment gateways — including OAuth 2.0 and SSO.',
      'services.fullstack.title': 'Full-stack development',
      'services.fullstack.desc': 'Web platforms end to end — Laravel, Spring Boot or Laminas on the back, Angular, Vue or React on the front.',
      'services.db.title': 'Databases & performance',
      'services.db.desc': 'Query optimization, stored procedures and SQL Server replication for high availability and disaster recovery.',
      'services.docker.title': 'Docker & CI/CD',
      'services.docker.desc': 'Containerized environments with Docker Compose and GitLab pipelines that make deployments repeatable and boring.',
      'services.scraping.title': 'Scraping & automation',
      'services.scraping.desc': 'Python data-extraction pipelines with proxy rotation and queue workers, for the data your business model needs.',

      'contact.title': 'Let’s work together',
      'contact.subtitle': 'Have a project in mind, or a legacy system that needs a way forward? Send me a message on LinkedIn.',
      'contact.cta': 'Connect on LinkedIn',
      'contact.location': 'Coruña, Spain · Remote',

      'footer.credits': 'Designed and built by me'
    },

    es: {
      'profile.role': 'Ingeniero de Software',

      'nav.home': 'Inicio',
      'nav.about': 'Sobre mí',
      'nav.experience': 'Experiencia',
      'nav.skills': 'Tecnologías',
      'nav.work': 'Proyectos',
      'nav.services': 'Servicios',
      'nav.contact': 'Contacto',

      'hero.eyebrow': 'Coruña, España · Abierto a nuevas oportunidades',
      'hero.lead': 'Desarrollo',
      'hero.summary': 'Software Development Engineer con más de 8 años modernizando sistemas enterprise: migraciones de framework sin downtime, arquitectura hexagonal y DDD, e integraciones REST/SOAP que conectan ERPs, CRMs y pasarelas de pago.',
      'hero.cta.work': 'Ver mi trabajo',
      'hero.cta.cv': 'Descargar CV',
      'hero.stat.years': 'Años de experiencia',
      'hero.stat.apis': 'APIs enterprise integradas',
      'hero.stat.debt': 'Deuda técnica en migración legacy',

      'about.title': 'Sobre mí',
      'about.subtitle': 'Ingeniero informático y desarrollador de software en Coruña. Diseño y modernizo los sistemas con los que las empresas trabajan cada día.',
      'about.status': 'Actualmente en Netex Learning · Abierto a nuevas oportunidades',
      'about.p1': 'Ocho años en arquitectura de software, desarrollo full-stack y modernización de sistemas enterprise. Cojo plataformas legacy que no se pueden permitir una parada y las llevo hacia adelante: migraciones progresivas de framework, entornos containerizados y límites claros entre dominio e infraestructura.',
      'about.p2': 'La mayor parte de mi trabajo vive donde los sistemas se encuentran: integraciones RESTful y SOAP con ERPs, CRMs, proveedores de identidad y pasarelas de pago. Trabajo con arquitectura hexagonal, DDD, microservicios y Docker, y me importa tanto el plan de ejecución de una query como el diagrama de clases.',
      'about.fact.location': 'Ubicación:',
      'about.fact.location.v': 'Coruña, España',
      'about.fact.experience': 'Experiencia:',
      'about.fact.experience.v': '+8 años',
      'about.fact.education': 'Formación:',
      'about.fact.languages': 'Idiomas:',
      'about.fact.languages.v': 'Español (nativo) · Inglés B1',
      'about.fact.focus': 'Enfoque:',
      'about.fact.focus.v': 'Arquitectura · APIs · Legacy',

      'exp.title': 'Experiencia',
      'exp.subtitle': 'Ocho años de recorrido entre España y Venezuela: del soporte IT a la ingeniería backend, las bases de datos y la arquitectura de software.',
      'exp.cv': 'CV completo (PDF)',

      'tag.fulltime': 'Jornada completa',
      'tag.positions': '2 puestos',
      'tag.freelance': 'Autónomo',
      'tag.contract': 'Obra o servicio',

      'exp.netex.date': 'Oct 2023 — Actualidad',
      'exp.netex.where': ' · En remoto · 3 años',
      'exp.netex.b1': 'Liderazgo técnico en la evolución del ERP corporativo (Workspace): mejoras arquitectónicas y optimización de rendimiento.',
      'exp.netex.b2': 'Migración progresiva de Zend Framework a Laminas con compatibilidad backward y cero downtime.',
      'exp.netex.b3': 'Infraestructura containerizada de desarrollo y despliegue con Docker y Docker Compose.',
      'exp.netex.b4': 'Integraciones enterprise: HubSpot API, Microsoft Dynamics NAV (SOAP) y Microsoft Sign-In (Azure AD, OAuth 2.0 / OpenID Connect) para SSO.',

      'exp.ipglobal.where': 'A Coruña, España · Híbrido · 1 año 4 meses',
      'exp.ipglobal.fs.date': 'Jul 2023 — Oct 2023 · 4 meses',
      'exp.ipglobal.fs.b1': 'Xavou!, e-commerce de food delivery en Laravel y Vue.js, con panel de administración y geolocalización sobre Google Maps.',
      'exp.ipglobal.fs.b2': 'CI/CD con pipelines de GitLab, autenticación JWT y múltiples pasarelas de pago (Stripe, PayPal).',
      'exp.ipglobal.be.date': 'Jul 2022 — Jun 2023 · 1 año',
      'exp.ipglobal.be.b1': 'Plataforma e-commerce de productos digitales con pasarela de pagos y gestión de licencias, aplicando DDD y arquitectura hexagonal sobre Spring Boot.',
      'exp.ipglobal.be.b2': 'Chat web de WhatsApp con la API de Vonage: gestión de sesiones, plantillas de mensajes y media handling.',
      'exp.ipglobal.be.b3': 'CRM con integración de la API de Namecheap para gestión automatizada de dominios, certificados SSL/TLS y DNS.',
      'exp.ipglobal.be.b4': 'Notificaciones en tiempo real en Microsoft Teams mediante webhooks de Graph API y Adaptive Cards.',

      'exp.elo.role': 'Programador Web',
      'exp.elo.date': 'Nov 2021 — Jul 2022',
      'exp.elo.where': ' · Vigo, España · 9 meses',
      'exp.elo.b1': 'CMS/CRM a medida en PHP nativo, aplicando los patrones MVC y Repository.',
      'exp.elo.b2': 'Integración multi-API (REST/SOAP) con plataformas de entretenimiento, con OAuth, rate limiting y caching.',
      'exp.elo.b3': 'Web scraper en Python con rotación automática de IP mediante VPN, proxies rotativos y técnicas anti-bot detection.',
      'exp.elo.b4': 'Microservicio de generación dinámica de PDF con queue workers y almacenamiento en CDN.',

      'exp.rg2.role': 'Desarrollador Web',
      'exp.rg2.date': 'Dic 2018 — Ene 2022',
      'exp.rg2.where': ' · Venezuela · 3 años 2 meses',
      'exp.rg2.b1': 'Desarrollo web para clientes en paralelo a mis puestos en plantilla.',
      'exp.rg2.b2': '[AÑADIR 2-3 PROYECTOS O TIPOS DE CLIENTE REPRESENTATIVOS]',
      'exp.rg2.stack': '[AÑADIR STACK]',

      'exp.tury.role': 'Analista Programador',
      'exp.tury.date': 'Jul 2021 — Oct 2021',
      'exp.tury.where': ' · Galicia, España · 4 meses',
      'exp.tury.b1': 'Mantenimiento de un sistema legacy de warehouse management, con refactorización de módulos y optimización de queries.',
      'exp.tury.b2': 'Integración bidireccional con Amazon Seller Central (SP-API), automatizando la sincronización de catálogo, pedidos y stock en tiempo real.',

      'exp.jorinacha.role': 'Programador Web y Especialista en BD',
      'exp.jorinacha.date': 'Sep 2019 — Ene 2021',
      'exp.jorinacha.where': ' · Caracas, Venezuela · 1 año 5 meses',
      'exp.jorinacha.b1': 'Migración de módulos legacy a Laravel aplicando SOLID y MVC, reduciendo la deuda técnica en más de un 60%.',
      'exp.jorinacha.b2': 'Replicación de SQL Server (transaccional y merge) para alta disponibilidad y disaster recovery.',
      'exp.jorinacha.b3': 'Desarrollo y optimización de stored procedures, triggers y T-SQL avanzado; jobs de SQL Server Agent para índices y estrategia de backup.',
      'exp.jorinacha.b4': 'Integración bidireccional con el ERP Profit 2K8 mediante APIs propietarias y stored procedures.',

      'exp.earlier': 'Primeros pasos',
      'exp.embassy.role': 'Analista de Sistemas',
      'exp.embassy.date': 'Oct 2018 — Ene 2019',
      'exp.embassy.desc': 'Infraestructura IT enterprise, monitorización con PRTG, firewall WatchGuard (UTM, VPN site-to-site) y soporte del ERP Profit 2K8.',
      'exp.bancaribe.role': 'Analista de Soporte',
      'exp.bancaribe.date': 'Abr — Sep 2018',
      'exp.bancaribe.desc': 'Soporte remoto nivel 2 a departamentos corporativos y sucursales a nivel nacional, con gestión de tickets y seguimiento de SLA.',
      'exp.education': 'Formación',

      'skills.title': 'Tecnologías',
      'skills.subtitle': 'El stack con el que he llevado trabajo a producción, agrupado como realmente lo uso.',
      'skills.cat.architecture': 'Arquitectura',
      'skills.microservices': 'Microservicios',
      'skills.cat.devops': 'DevOps y herramientas',
      'skills.cat.databases': 'Bases de datos',
      'skills.replication': 'Replicación',
      'skills.queryopt': 'Optimización de queries',
      'skills.cat.apis': 'APIs e integraciones',

      'work.title': 'Proyectos',
      'work.subtitle': 'Sistemas que he diseñado, migrado e integrado en producción, y algunas cosas que he construido por mi cuenta.',
      'work.professional': 'Trabajo profesional destacado',
      'work.present': 'ACTUALIDAD',
      'work.erp.title': 'Modernización del ERP Workspace',
      'work.erp.desc': 'Migración progresiva de un ERP corporativo de Zend Framework a Laminas con compatibilidad backward completa y cero downtime, junto a un entorno containerizado y SSO enterprise con Azure AD.',
      'work.ecom.title': 'E-commerce de productos digitales',
      'work.ecom.desc': 'Plataforma de venta de productos digitales con pasarela de pagos y gestión de licencias, sobre Spring Boot, con DDD y una arquitectura hexagonal que mantiene los proveedores de pago en los bordes.',
      'work.food.title': 'food delivery',
      'work.food.desc': 'Marketplace de comida a domicilio en Laravel y Vue.js, con panel de administración para restaurantes y una capa de geolocalización sobre Google Maps para zonas de reparto y seguimiento de pedidos.',
      'work.spapi.title': 'Sincronización de catálogo con Amazon SP-API',
      'work.spapi.desc': 'Integración bidireccional con Amazon Seller Central que mantiene catálogo, pedidos y stock sincronizados en tiempo real contra un sistema legacy de warehouse management.',
      'work.side': 'Proyectos personales',
      'work.side.coffee': 'Sitio estático · HTML, SASS',
      'work.side.realestate': 'Portal inmobiliario · PHP',
      'work.side.store': 'Interfaz de tienda · JavaScript',
      'work.more': 'Ver más en GitHub',

      'services.title': 'Servicios',
      'services.subtitle': 'En lo que puedo ayudar, según lo que realmente he llevado a producción.',
      'services.legacy.title': 'Modernización de legacy',
      'services.legacy.desc': 'Migraciones progresivas de framework con compatibilidad backward, para que la plataforma siga funcionando mientras avanza.',
      'services.api.title': 'Integración de APIs',
      'services.api.desc': 'Integraciones REST y SOAP con ERPs, CRMs, proveedores de identidad y pasarelas de pago, incluyendo OAuth 2.0 y SSO.',
      'services.fullstack.title': 'Desarrollo full-stack',
      'services.fullstack.desc': 'Plataformas web de principio a fin: Laravel, Spring Boot o Laminas por detrás; Angular, Vue o React por delante.',
      'services.db.title': 'Bases de datos y rendimiento',
      'services.db.desc': 'Optimización de queries, stored procedures y replicación de SQL Server para alta disponibilidad y disaster recovery.',
      'services.docker.title': 'Docker y CI/CD',
      'services.docker.desc': 'Entornos containerizados con Docker Compose y pipelines de GitLab que hacen que los despliegues sean repetibles y aburridos.',
      'services.scraping.title': 'Scraping y automatización',
      'services.scraping.desc': 'Pipelines de extracción de datos en Python con rotación de proxies y queue workers, para los datos que tu modelo de negocio necesita.',

      'contact.title': 'Trabajemos juntos',
      'contact.subtitle': '¿Tienes un proyecto en mente, o un sistema legacy que necesita un camino hacia adelante? Escríbeme por LinkedIn.',
      'contact.cta': 'Conectar en LinkedIn',
      'contact.location': 'Coruña, España · En remoto',

      'footer.credits': 'Diseñado y desarrollado por mí'
    }
  };

  var typedInstance = null;
  var current = null;

  function initTyped(lang) {
    var el = document.querySelector('.typed');
    if (!el) return;
    el.setAttribute('data-typed-items', TYPED[lang]);
    if (typeof Typed === 'undefined') return;
    if (typedInstance) {
      typedInstance.destroy();
      el.textContent = '';
    }
    typedInstance = new Typed('.typed', {
      strings: TYPED[lang].split(','),
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  function apply(lang) {
    var dict = DICT[lang] || DICT.en;

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
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    initTyped(lang);
    current = lang;

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
