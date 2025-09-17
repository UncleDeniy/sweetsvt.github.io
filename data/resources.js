window.itResources = [
    // Программирование - Основные ресурсы
    {
        id: 1,
        title: "FreeCodeCamp",
        description: "Бесплатные курсы по программированию с сертификатами. Идеально для начинающих.",
        link: "https://www.freecodecamp.org/",
        tags: ["javascript", "html", "css", "python", "бесплатно", "курсы", "сертификаты", "для начинающих"],
        type: "course",
        category: "programming",
        subcategory: "frontend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 2,
        title: "Roadmap.sh",
        description: "Пошаговые руководства для различных IT-специальностей с дорожными картами.",
        link: "https://roadmap.sh/",
        tags: ["roadmap", "карьера", "обучение", "frontend", "backend", "devops", "guidelines", "plan"],
        type: "program",
        category: "career",
        dateAdded: new Date().toISOString()
    },
    {
        id: 3,
        title: "CSS-Tricks",
        description: "Лучшие практики и руководства по CSS и веб-разработке.",
        link: "https://css-tricks.com/",
        tags: ["css", "веб-разработка", "дизайн", "frontend", "flexbox", "grid", "анимации"],
        type: "article",
        category: "design",
        subcategory: "frontend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 4,
        title: "Visual Studio Code",
        description: "Бесплатный редактор кода с огромным количеством расширений.",
        link: "https://code.visualstudio.com/",
        tags: ["vscode", "редактор", "ide", "программирование", "инструменты", "бесплатно", "расширения"],
        type: "tool",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 5,
        title: "The Odin Project",
        description: "Бесплатный учебный план для веб-разработчиков с реальными проектами.",
        link: "https://www.theodinproject.com/",
        tags: ["веб-разработка", "курсы", "проекты", "fullstack", "javascript", "ruby", "бесплатно"],
        type: "course",
        category: "programming",
        subcategory: "fullstack",
        dateAdded: new Date().toISOString()
    },

    // Программирование - Статьи и руководства
    {
        id: 10,
        title: "TypeScript в деталях: настраиваем tsconfig.json правильно",
        description: "Полное руководство по tsconfig.json: разбор каждого параметра и его влияния на разработку.",
        link: "https://proglib.io/p/typescript-v-detalyah-nastraivaem-tsconfig-json-pravilno-2024-11-21",
        tags: ["typescript", "настройка", "руководство", "статья", "config", "компилятор"],
        type: "article",
        category: "programming",
        subcategory: "backend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 12,
        title: "Как добавить программируемый поиск от Google на свой сайт?",
        description: "Пошаговое руководство: создание, настройка поисковой системы от Google и встраивание кода на сайт.",
        link: "https://itchief.ru/javascript/programmable-gse",
        tags: ["поиск", "google", "веб-разработка", "интеграция", "статья", "api", "javascript"],
        type: "article",
        category: "programming",
        subcategory: "frontend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 24,
        title: "Advanced Bash-Scripting Guide",
        description: "Подробное руководство по написанию bash-скриптов на русском языке.",
        link: "https://www.opennet.ru/docs/RUS/bash_scripting_guide/",
        tags: ["bash", "скрипты", "linux", "руководство", "документация", "shell", "автоматизация"],
        type: "article",
        category: "linux",
        subcategory: "book",
        dateAdded: new Date().toISOString()
    },
    {
        id: 32,
        title: "Что такое XSS-уязвимость?",
        description: "Статья о том, как работает XSS, почему браузеры доверяют вредоносному коду и как защитить сайт от таких атак.",
        link: "https://thecode.media/chto-takoe-xss-uyazvimost/",
        tags: ["безопасность", "xss", "веб-разработка", "статья", "уязвимости", "security", "web"],
        type: "article",
        category: "cybersecurity",
        dateAdded: new Date().toISOString()
    },
    {
        id: 38,
        title: "Веб-приложение для прогноза погоды на Vue JS",
        description: "Статья о создании проекта на Vue JS для получения данных о погоде с помощью API OpenWeatherMap.",
        link: "https://tproger.ru/articles/prilozhenie-dlya-prognoza-pogody-na-vue-js",
        tags: ["vue", "javascript", "api", "проект", "статья", "frontend", "погода", "openweathermap"],
        type: "article",
        category: "programming",
        subcategory: "frontend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 45,
        title: "OAuth 2.0: фреймворк авторизации",
        description: "Статья о причинах решений в дизайне протокола OAuth2 и разборе наиболее часто встречаемых грантов авторизации.",
        link: "https://habr.com/ru/companies/beget/articles/886874/",
        tags: ["oauth", "безопасность", "авторизация", "статья", "api", "security", "authentication"],
        type: "article",
        category: "cybersecurity",
        dateAdded: new Date().toISOString()
    },
    {
        id: 64,
        title: "Margin и padding в CSS: как сразу сделать грамотно?",
        description: "Статья о ключевых отличиях между margin и padding в CSS, а также о трюках для улучшения UI/UX вашего сайта.",
        link: "https://tproger.ru/articles/margin-i-padding-v-css--kak-srazu-sdelat-gramotno",
        tags: ["css", "верстка", "ui/ux", "статья", "frontend", "layout", "web design"],
        type: "article",
        category: "design",
        subcategory: "frontend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 71,
        title: "1С-Битрикс: что это такое и как его использовать",
        description: "Статья о CMS 1С-Битрикс: отличия от WordPress, необходимость программирования, начало работы.",
        link: "https://blog.skillfactory.ru/1s-bitriks/",
        tags: ["cms", "битрикс", "веб-разработка", "статья", "php", "wordpress", "comparison"],
        type: "article",
        category: "programming",
        subcategory: "backend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 72,
        title: "SSH-подключение: что это и как использовать",
        description: "Материал с примерами о SSH-подключении: получение удаленного доступа к компьютеру.",
        link: "https://thecode.media/ssh-podklyuchenie/",
        tags: ["ssh", "сеть", "безопасность", "удаленный доступ", "статья", "linux", "server"],
        type: "article",
        category: "devops",
        dateAdded: new Date().toISOString()
    },
    {
        id: 73,
        title: "Идентификация, аутентификация, авторизация",
        description: "Статья о разнице между идентификацией, аутентификацией и авторизацией в системах безопасности.",
        link: "https://blog.skillfactory.ru/identifikatsiya-autentifikatsiya-avtorizatsiya/",
        tags: ["безопасность", "аутентификация", "авторизация", "статья", "security", "identity"],
        type: "article",
        category: "cybersecurity",
        dateAdded: new Date().toISOString()
    },
    {
        id: 75,
        title: "Ошибка 503 на сайте: что означает и как исправить",
        description: "Статья о значении кода состояния 503, причинах его появления и методах решения для пользователей и разработчиков.",
        link: "https://blog.skillfactory.ru/oshibka-503-na-sayte-chto-eto-oznachaet-i-kak-vse-ispravit/",
        tags: ["веб-разработка", "ошибки", "http", "статья", "devops", "server", "troubleshooting"],
        type: "article",
        category: "programming",
        subcategory: "backend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 76,
        title: "HTTP-запросы: структура, методы, строка статуса и коды состояния",
        description: "Статья о структуре HTTP-запросов, методах, статусной строке и кодах состояния.",
        link: "https://habr.com/ru/articles/865040/",
        tags: ["http", "веб-разработка", "сеть", "статья", "api", "rest", "web"],
        type: "article",
        category: "programming",
        subcategory: "backend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 78,
        title: "От монолита до микросервисов: как устроена архитектура ПО",
        description: "Статья об архитектуре программного обеспечения: от монолитных приложений до микросервисов.",
        link: "https://blog.skillfactory.ru/ot-monolita-do-mikroservisov-kak-ustroena-arhitektura-po/",
        tags: ["архитектура", "микросервисы", "монолит", "статья", "backend", "design patterns", "scalability"],
        type: "article",
        category: "programming",
        subcategory: "backend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 79,
        title: "12 полезных инструментов для разработчиков",
        description: "Обзор инструментов для тестирования кода, отладки, хостинга и оптимизации веб-производительности.",
        link: "https://nuancesprog.ru/p/25528/",
        tags: ["инструменты", "разработка", "продуктивность", "статья", "обзор", "tools", "productivity"],
        type: "article",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 80,
        title: "AI для frontend: модели для генерации интерфейса",
        description: "Статья о вариантах использования ИИ для генерации интерфейсов, их преимуществах и нюансах.",
        link: "https://tproger.ru/articles/ai-dlya-frontend--modeli-dlya-generacii-interfejsa",
        tags: ["ии", "frontend", "генерация интерфейса", "статья", "ai", "ui", "automation"],
        type: "article",
        category: "ai",
        dateAdded: new Date().toISOString()
    },
    {
        id: 81,
        title: "Большой гайд по JavaScript",
        description: "Подборка полезных статей для изучения и прокачки навыков в JavaScript для новичков и опытных разработчиков.",
        link: "https://tproger.ru/articles/javascript--bolwoj-gajd-ot-tproger",
        tags: ["javascript", "гайд", "статьи", "обучение", "frontend", "ecmascript", "web development"],
        type: "article",
        category: "programming",
        subcategory: "frontend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 82,
        title: "CSS-селекторы. Шпаргалка для новичков",
        description: "Статья о типах CSS-селекторов, их использовании и отличиях для привязки стилевых свойств к элементам.",
        link: "https://htmlacademy.ru/blog/css/selectors",
        tags: ["css", "селекторы", "верстка", "шпаргалка", "статья", "frontend", "web design"],
        type: "cheatsheet",
        category: "design",
        subcategory: "frontend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 85,
        title: "Что такое динамическое программирование: методы, примеры, ошибки",
        description: "Статья о методе динамического программирования для решения сложных задач путем разбиения на подзадачи.",
        link: "https://blog.skillfactory.ru/chto-takoe-dinamicheskoe-programmirovanie/",
        tags: ["алгоритмы", "динамическое программирование", "статья", "программирование", "optimization", "dp"],
        type: "article",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 87,
        title: "Обзор лучших инструментов для ведения проектов и задач",
        description: "Подборка из 15 платформ для систематизации профессиональных и личных задач и организации проектного управления.",
        link: "https://tproger.ru/articles/obzor-luchwih-instrumentov-dlya-vedeniya-proektov-i-zadach",
        tags: ["инструменты", "управление проектами", "задачи", "продуктивность", "статья", "pm", "task management"],
        type: "article",
        category: "productivity",
        dateAdded: new Date().toISOString()
    },
    {
        id: 88,
        title: "20 команд Linux, которые не стоит запускать",
        description: "Статья о опасных командах Linux, которые могут уничтожить систему, данные или оставить сервер без защиты.",
        link: "https://tproger.ru/articles/20-komand-linux--kotorye-ne-stoit-zapuskat--libo-zapuskat-s-osoboj-ostorozhnostyu",
        tags: ["linux", "безопасность", "команды", "администрирование", "статья", "security", "dangerous"],
        type: "article",
        category: "linux",
        dateAdded: new Date().toISOString()
    },
    {
        id: 90,
        title: "Топ-12 лучших программ для сжатия фото без потери качества",
        description: "Обзор программ и онлайн-сервисов для сжатия фотографий без потери качества.",
        link: "https://tproger.ru/articles/top-12-luchwih-programm-dlya-szhatiya-foto-bez-poteri-kachestva",
        tags: ["инструменты", "изображения", "сжатие", "оптимизация", "статья", "обзор", "photos", "compression"],
        type: "article",
        category: "design",
        dateAdded: new Date().toISOString()
    },

    // Видео курсы и уроки
    {
        id: 7,
        title: "Frontend Roadmap 2025: Что и зачем учить?",
        description: "Актуальная карта изучения Frontend с полного нуля. Рассмотрены только самые необходимые технологии.",
        link: "https://www.youtube.com/watch?v=c5zUbDDIKcE",
        tags: ["frontend", "roadmap", "карьера", "обучение", "видео", "2025", "guide"],
        type: "video",
        category: "profession",
        subcategory: "frontend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 9,
        title: "Полный курс по CSS Flexbox за 1 час",
        description: "Изучите технологию Flexbox с нуля и научитесь использовать её в своих проектах для удобного размещения элементов.",
        link: "https://www.youtube.com/watch?v=XXlw7TUxRVY",
        tags: ["css", "flexbox", "верстка", "обучение", "видео", "layout", "web design"],
        type: "video",
        category: "design",
        subcategory: "frontend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 11,
        title: "Фреймворк Tailwind CSS: полный курс с нуля",
        description: "Научитесь работать с Tailwind CSS — фреймворком, который предоставляет готовые классы для быстрого создания интерфейсов.",
        link: "https://www.youtube.com/watch?v=rW38WPa4ekA",
        tags: ["tailwind", "css", "фреймворк", "курс", "видео", "frontend", "utility", "styling"],
        type: "video",
        category: "design",
        subcategory: "frontend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 14,
        title: "Angular за 5 часов",
        description: "Обучение по созданию социальной сети на Angular: компоненты, API, роутинг, авторизация, RxJS и интерсепторы.",
        link: "https://www.youtube.com/watch?v=BVIffUyYlUk",
        tags: ["angular", "фреймворк", "курс", "видео", "frontend", "typescript", "spa"],
        type: "video",
        category: "programming",
        subcategory: "frontend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 18,
        title: "Топовые Linux инструменты",
        description: "Обзор инструментов для Linux, которые делают рабочий процесс удобнее и продуктивнее.",
        link: "https://youtu.be/AIht4qAgL6o?si=zqIHWT-p1IRilQzf",
        tags: ["linux", "инструменты", "обзор", "видео", "продуктивность", "tools", "utilities"],
        type: "video",
        category: "linux",
        dateAdded: new Date().toISOString()
    },
    {
        id: 34,
        title: "Vue JS: полный курс c нуля",
        description: "Видеокурс по Vue 3: основы, работа с данными, компоненты, взаимодействие с сервером, оптимизация, развертывание.",
        link: "https://www.youtube.com/watch?v=1rRD9uMF92o",
        tags: ["vue", "javascript", "фреймворк", "курс", "видео", "frontend", "composition api"],
        type: "video",
        category: "programming",
        subcategory: "frontend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 60,
        title: "Fullstack-курс: облачное хранилище на NextJS + NestJS",
        description: "Продвинутый курс по созданию облачного хранилища (Middle/Senior): база данных, авторизация, загрузка файлов, фронтенд.",
        link: "https://youtu.be/_oR1p79t6gw?si=pcOvu2X22B9wT23h",
        tags: ["nextjs", "nestjs", "fullstack", "курс", "видео", "cloud", "typescript", "nodejs"],
        type: "video",
        category: "programming",
        subcategory: "fullstack",
        dateAdded: new Date().toISOString()
    },
    {
        id: 62,
        title: "Figma с нуля за 1 час",
        description: "Видеокурс по основам графического дизайна и создания интерфейсов в Figma — популярном инструменте для веб и UX/UI-дизайнеров.",
        link: "https://youtu.be/sTdmUdsfOkY?si=h5iPmmf0lrBjDPxL",
        tags: ["figma", "дизайн", "ui/ux", "курс", "видео", "design tools", "prototyping"],
        type: "video",
        category: "design",
        subcategory: "ux-ui",
        dateAdded: new Date().toISOString()
    },
    {
        id: 63,
        title: "Уроки Figma для начинающих",
        description: "Курс по построению веб-дизайна в Figma с нуля. Обучение созданию UI и UX дизайна для веб-сайтов и приложений.",
        link: "https://youtube.com/playlist?list=PL0lO_mIqDDFXUJfMPcm1ezfcYSOHNNCZ4&si=i89udvzc2o02Gubv",
        tags: ["figma", "дизайн", "ui/ux", "курс", "видео", "для начинающих", "tutorial"],
        type: "video",
        category: "design",
        subcategory: "ux-ui",
        dateAdded: new Date().toISOString()
    },
    {
        id: 65,
        title: "Web Design Playground, 2nd Edition (2024)",
        description: "Практический курс по созданию современных адаптивных веб-сайтов с использованием HTML5, CSS3, JavaScript и принципов UI/UX дизайна.",
        link: "https://t.me/+kQ5Nlf4rZ5djZmFi",
        tags: ["веб-дизайн", "html", "css", "javascript", "ui/ux", "книга", "курс", "responsive"],
        type: "course",
        category: "design",
        subcategory: "ux-ui",
        dateAdded: new Date().toISOString()
    },
    {
        id: 70,
        title: "Изучение Rust с нуля",
        description: "Видеокурс по изучению языка Rust для начинающих: синтаксис, создание проектов.",
        link: "https://youtube.com/playlist?list=PL0lO_mIqDDFU_3UaxCF6p98ELxXpAyHpW&si=sdUXn7i2Y_F6z8kO",
        tags: ["rust", "программирование", "курс", "видео", "для начинающих", "systems", "performance"],
        type: "video",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 74,
        title: "JWT, keycloak, session, basic auth, OAuth 2.0 – теория и код",
        description: "Большой видеогайд по всем видам авторизации: Basic auth, сессии, JWT, SSO, OAuth 2.0, Keycloak.",
        link: "https://youtu.be/QacZVserfIU?si=QaCnXKDDuxfBOC_5",
        tags: ["авторизация", "jwt", "oauth", "keycloak", "безопасность", "видео", "гайд", "authentication"],
        type: "video",
        category: "cybersecurity",
        dateAdded: new Date().toISOString()
    },
    {
        id: 77,
        title: "Выбор окружения рабочего стола для Linux",
        description: "Видео о том, что такое среда рабочего стола в Linux и как выбрать подходящую для себя.",
        link: "https://youtu.be/T30B_yJVPjE?si=WxYGeaNqsWeL4TQp",
        tags: ["linux", "окружение рабочего стола", "gui", "видео", "для начинающих", "desktop", "de"],
        type: "video",
        category: "linux",
        dateAdded: new Date().toISOString()
    },
    {
        id: 83,
        title: "Микросервисы на пальцах: API-Gateway, API-composition, BFF",
        description: "Видеоурок о базовых шаблонах микросервисной архитектуры: API-Gateway, API-Composition и BFF.",
        link: "https://youtu.be/ygKmmGj1hDY?si=Jj0-hI2d3vvhLB6x",
        tags: ["микросервисы", "архитектура", "api", "видео", "backend", "microservices", "design patterns"],
        type: "video",
        category: "programming",
        subcategory: "backend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 84,
        title: "Fedora Linux: Большой обзор и установка",
        description: "Видеоурок о дистрибутиве Fedora Linux: его особенностях, передовых технологиях и процессе установка.",
        link: "https://youtu.be/3KSRIBNjvjw?si=ZKojIFBySY8mOQ2B",
        tags: ["linux", "fedora", "дистрибутивы", "обзор", "видео", "установка", "tutorial"],
        type: "video",
        category: "linux",
        subcategory: "fedora",
        dateAdded: new Date().toISOString()
    },
    {
        id: 86,
        title: "Что такое RPC и gRPC за 10 минут",
        description: "Видеоурок о RPC и gRPC: назначение, преимущества, архитектура, HTTP/2, сжатие заголовков, Protobuf.",
        link: "https://youtu.be/bfdF4AJELDc?si=CdCK_ulshcXttyiz",
        tags: ["rpc", "grpc", "сеть", "архитектура", "видео", "backend", "microservices", "api"],
        type: "video",
        category: "programming",
        subcategory: "backend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 89,
        title: "Что происходит после ввода адреса в браузере?",
        description: "Видеоурок о процессе загрузки веб-страницы: от DNS-запросов до обработки на сервере и отрисовки в браузере.",
        link: "https://youtu.be/YPIbtiAuw7A?si=vws1NLyYHSLzg0Fy",
        tags: ["веб-разработка", "браузер", "dns", "http", "видео", "гайд", "networking", "web"],
        type: "video",
        category: "programming",
        subcategory: "frontend",
        dateAdded: new Date().toISOString()
    },

    // Инструменты и утилиты
    {
        id: 8,
        title: "Yotako.io",
        description: "Инструмент для конвертации дизайна из Sketch и Adobe XD в код на различных языках и фреймворках с помощью ИИ.",
        link: "https://yotako.io/",
        tags: ["инструменты", "дизайн", "ии", "конвертер", "frontend", "sketch", "xd", "ai"],
        type: "tool",
        category: "design",
        dateAdded: new Date().toISOString()
    },
    {
        id: 13,
        title: "Million Lint",
        description: "Расширение для VSCode для React, которое автоматически исправляет «медленный» код.",
        link: "https://marketplace.visualstudio.com/items?itemName=million.million-lint",
        tags: ["инструменты", "vscode", "react", "плагин", "оптимизация", "performance", "linting"],
        type: "tool",
        category: "programming",
        subcategory: "frontend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 15,
        title: "Siteliner",
        description: "Инструмент для SEO-анализа сайта. Поиск дублирующегося контента, неработающих ссылок и многое другое.",
        link: "https://www.siteliner.com/",
        tags: ["инструменты", "seo", "анализ", "оптимизация", "web", "marketing", "audit"],
        type: "tool",
        category: "productivity",
        dateAdded: new Date().toISOString()
    },
    {
        id: 17,
        title: "CSS-генератор теней в стиле Neumorphism",
        description: "Онлайн-инструмент для создания красивой тени для элементов с гибкими настройками и возможностью копирования CSS-кода.",
        link: "https://neumorphism.io/",
        tags: ["инструменты", "css", "дизайн", "генератор", "neumorphism", "ui", "shadow", "design"],
        type: "tool",
        category: "design",
        dateAdded: new Date().toISOString()
    },
    {
        id: 19,
        title: "Logoit",
        description: "Бесплатный конструктор логотипов с готовыми шаблонами. Можно менять цвет, линии, угол наклона или использовать рандомную генерацию.",
        link: "https://logoit.ghostkode.com/",
        tags: ["инструменты", "дизайн", "логотипы", "конструктор", "бесплатно", "branding", "logo"],
        type: "tool",
        category: "design",
        dateAdded: new Date().toISOString()
    },
    {
        id: 20,
        title: "Amino Live CSS Editor",
        description: "Аддон, позволяющий отслеживать внешний вид сайта в реальном времени при написании CSS.",
        link: "https://aminoeditor.com/",
        tags: ["инструменты", "css", "плагин", "разработка", "real-time", "live", "editor"],
        type: "tool",
        category: "programming",
        subcategory: "frontend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 21,
        title: "AI Icon Generator",
        description: "Генератор логотипов, иконок и артов в PNG высокого качества по описанию без фона и вотермарок.",
        link: "https://ai-icon.top/",
        tags: ["инструменты", "ии", "дизайн", "иконки", "логотипы", "генератор", "ai", "icons"],
        type: "tool",
        category: "design",
        dateAdded: new Date().toISOString()
    },
    {
        id: 25,
        title: "Dangerzone",
        description: "Инструмент для превращения подозрительных PDF, документов и изображений в безопасные версии.",
        link: "https://dangerzone.rocks/",
        tags: ["безопасность", "инструменты", "конвертер", "windows", "macos", "linux", "security", "pdf"],
        type: "tool",
        category: "cybersecurity",
        dateAdded: new Date().toISOString()
    },
    {
        id: 29,
        title: "MyIP",
        description: "Усовершенствованный инструмент для работы с IP-адресами: проверка DNS-утечек, WebRTC-соединений, скорости интернета.",
        link: "https://github.com/jason5ng32/MyIP",
        tags: ["инструменты", "сеть", "ip", "безопасность", "opensource", "privacy", "network"],
        type: "tool",
        category: "cybersecurity",
        dateAdded: new Date().toISOString()
    },
    {
        id: 36,
        title: "InstaCharts",
        description: "Онлайн-сервис для быстрого создания визуализаций данных (графики, диаграммы) в браузере с использованием готовых шаблонов.",
        link: "https://instacharts.io/",
        tags: ["инструменты", "визуализация", "данные", "графики", "charts", "data", "analytics"],
        type: "tool",
        category: "data-science",
        dateAdded: new Date().toISOString()
    },
    {
        id: 37,
        title: "Screenshot-to-Code",
        description: "Инструмент для преобразования скриншотов, макетов и дизайнов Figma в чистый код с использованием ИИ.",
        link: "https://github.com/abi/screenshot-to-code",
        tags: ["ии", "инструменты", "конвертер", "figma", "frontend", "opensource", "ai", "automation"],
        type: "tool",
        category: "ai",
        dateAdded: new Date().toISOString()
    },
    {
        id: 39,
        title: "QuillBot",
        description: "Нейросеть для написания и обработки текстов: перефразирование, проверка грамматики, антиплагиат, саммаризация, перевод.",
        link: "https://quillbot.com/",
        tags: ["ии", "текст", "письмо", "образование", "инструменты", "ai", "writing", "paraphrase"],
        type: "tool",
        category: "ai",
        dateAdded: new Date().toISOString()
    },
                {
                    id: 40,
                    title: "YouLearn",
                    description: "ИИ-репетитор, который превращает любой материал в учебник, создает саммари, викторины и карточки. Работает с видео, аудио и ссылками.",
                    link: "https://www.youlearn.ai/",
                    tags: ["ии", "образование", "обучение", "репетитор"],
                    type: "tool",
                    category: "ai",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 41,
                    title: "Qwen Deep Research",
                    description: "ИИ для генерации глубоких исследований по любой теме с возможностью скачивания результата в PDF.",
                    link: "https://chat.qwen.ai/?inputFeature=deep_research",
                    tags: ["ии", "исследование", "академия", "текст"],
                    type: "tool",
                    category: "ai",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 42,
                    title: "Appalchemy",
                    description: "Сервис для создания полноценных приложений с помощью ИИ: от дизайна до реализации фич, с возможностью правок.",
                    link: "http://appalchemy.ai/",
                    tags: ["ии", "разработка", "no-code", "low-code", "инструменты"],
                    type: "tool",
                    category: "ai",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 43,
                    title: "Typebot",
                    description: "Конструктор для визуального создания продвинутых чат-ботов с интеграцией в веб и мобильные приложения, сбором результатов и настройкой.",
                    link: "https://github.com/baptisteArno/typebot.io",
                    tags: ["чат-боты", "инструменты", "конструктор", "opensource"],
                    type: "tool",
                    category: "programming",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 44,
                    title: "Buster",
                    description: "Расширение для браузера для автоматического решения каптч одним нажатием кнопки. Для Chrome, Edge, Opera и Firefox.",
                    link: "https://github.com/dessant/buster",
                    tags: ["расширение", "каптча", "автоматизация", "инструменты", "opensource"],
                    type: "tool",
                    category: "productivity",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 45,
                    title: "OAuth 2.0: фреймворк авторизации",
                    description: "Статья о причинах решений в дизайне протокола OAuth2 и разборе наиболее часто встречаемых грантов авторизации.",
                    link: "https://habr.com/ru/companies/beget/articles/886874/",
                    tags: ["oauth", "безопасность", "авторизация", "статья"],
                    type: "article",
                    category: "security",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 46,
                    title: "Dark Reader",
                    description: "Плагин для браузера, добавляющий темную тему на все сайты с возможностью настройки параметров шрифта.",
                    link: "https://chromewebstore.google.com/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh?hl=en",
                    tags: ["расширение", "браузер", "доступность", "темы"],
                    type: "tool",
                    category: "productivity",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 47,
                    title: "Online Image Tools",
                    description: "Онлайн-фоторедактор в браузере без регистрации: удаление фона, раскрашивание фото, улучшение качества, стирание объектов.",
                    link: "https://www.i2img.com/",
                    tags: ["инструменты", "изображения", "редактор", "ии"],
                    type: "tool",
                    category: "design",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 48,
                    title: "GetVM",
                    description: "Сервис для запуска Linux, IDE и других приложений в боковой панели браузера для обучения, программирования и тестирования.",
                    link: "https://getvm.io/",
                    tags: ["инструменты", "виртуальная машина", "linux", "разработка", "обучение"],
                    type: "tool",
                    category: "programming",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 49,
                    title: "Pwn College",
                    description: "Образовательная платформа для практического изучения кибербезопасности через задания на основе реальных сценариев.",
                    link: "https://pwn.college/",
                    tags: ["кибербезопасность", "обучение", "практика", "задания"],
                    type: "course",
                    category: "security",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 50,
                    title: "File Converter",
                    description: "Инструмент для конвертации и сжатия файлов через контекстное меню проводника Windows. Использует ffmpeg, ImageMagick, Ghostscript.",
                    link: "https://github.com/Tichau/FileConverter",
                    tags: ["инструменты", "конвертер", "windows", "файлы", "opensource"],
                    type: "tool",
                    category: "productivity",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 51,
                    title: "Awesome Russian IT",
                    description: "Коллекция лучших IT-ресурсов на русском языке: библиотеки, фреймворки, статьи, книги, курсы, сообщества.",
                    link: "https://github.com/unchase/awesome-russian-it",
                    tags: ["коллекция", "ресурсы", "github", "каталог", "русский"],
                    type: "list",
                    category: "other",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 52,
                    title: "Project Euler",
                    description: "Ресурс с сложными математическими и алгоритмическими задачами для программистов, чтобы развивать логическое мышление.",
                    link: "https://euler.jakumo.org/",
                    tags: ["алгоритмы", "математика", "задачи", "логика", "обучение"],
                    type: "interactive",
                    category: "programming",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 53,
                    title: "SadServers",
                    description: "Платформа для практики администрирования Linux-серверов через решение реальных проблем (DNS, место на диске, systemd и т.п.).",
                    link: "https://sadservers.com/",
                    tags: ["linux", "администрирование", "практика", "серверы", "задачи"],
                    type: "interactive",
                    category: "devops",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 54,
                    title: "Humanize",
                    description: "Сервис для удаления следов нейросетей из текста, чтобы обойти антиплагиат и сделать текст более 'человеческим'.",
                    link: "https://t.me/+QUHqknlzO5thNTU6",
                    tags: ["ии", "текст", "антиплагиат", "образование", "инструменты"],
                    type: "tool",
                    category: "ai",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 55,
                    title: "Selectext",
                    description: "Расширение для копирования кода прямо из видео на YouTube и других платформ в ваш редактор кода.",
                    link: "https://chromewebstore.google.com/detail/selectext-copy-text-from/gkkdmjjodidppndkbkhhknakbeflbomf",
                    tags: ["расширение", "браузер", "продуктивность", "обучение"],
                    type: "tool",
                    category: "productivity",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 56,
                    title: "Distrosea",
                    description: "Сервис для быстрого тест-драйва более 70 Linux-дистрибутивов с разными окружениями прямо в браузере.",
                    link: "https://distrosea.com/",
                    tags: ["linux", "дистрибутивы", "тестирование", "браузер", "инструменты"],
                    type: "tool",
                    category: "devops",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 57,
                    title: "Optimizilla",
                    description: "Онлайн-оптимизатор изображений (JPEG, GIF, PNG) с предпросмотром и настройкой качества для каждого файла.",
                    link: "https://imagecompressor.com/",
                    tags: ["инструменты", "изображения", "оптимизация", "сжатие"],
                    type: "tool",
                    category: "design",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 58,
                    title: "Photopea",
                    description: "Полнофункциональный онлайн-аналог Photoshop, работающий прямо в браузере. Бесплатно и без установки.",
                    link: "https://www.photopea.com/",
                    tags: ["инструменты", "дизайн", "редактор", "photoshop", "онлайн"],
                    type: "tool",
                    category: "design",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 59,
                    title: "PostgreSQL IDE for VS Code",
                    description: "Мощное расширение от Microsoft для работы с PostgreSQL в VS Code: визуализация схем, AI (Copilot), IntelliSense, запуск в Docker.",
                    link: "https://marketplace.visualstudio.com/items?itemName=ms-ossdata.vscode-pgsql",
                    tags: ["расширение", "vscode", "postgresql", "базы данных", "инструменты"],
                    type: "tool",
                    category: "programming",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 60,
                    title: "Fullstack-курс: облачное хранилище на NextJS + NestJS",
                    description: "Продвинутый курс по созданию облачного хранилища (Middle/Senior): база данных, авторизация, загрузка файлов, фронтенд.",
                    link: "https://youtu.be/_oR1p79t6gw?si=pcOvu2X22B9wT23h",
                    tags: ["nextjs", "nestjs", "fullstack", "курс", "видео", "cloud"],
                    type: "video",
                    category: "programming",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 61,
                    title: "Toolfolio",
                    description: "Огромная коллекция полезных инструментов: нейросети, бесплатные аналоги программ, библиотеки плагинов для Figma, Framer и др.",
                    link: "https://toolfolio.io/",
                    tags: ["коллекция", "инструменты", "ресурсы", "каталог"],
                    type: "list",
                    category: "other",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 62,
                    title: "Figma с нуля за 1 час",
                    description: "Видеокурс по основам графического дизайна и создания интерфейсов в Figma — популярном инструменте для веб и UX/UI-дизайнеров.",
                    link: "https://youtu.be/sTdmUdsfOkY?si=h5iPmmf0lrBjDPxL",
                    tags: ["figma", "дизайн", "ui/ux", "курс", "видео"],
                    type: "video",
                    category: "design",
                    dateAdded: new Date().toISOString()
                },
    {
        id: 63,
        title: "Уроки Figma для начинающих",
        description: "Курс по построению веб-дизайна в Figma с нуля. Обучение созданию UI и UX дизайна для веб-сайтов и приложений.",
        link: "https://youtube.com/playlist?list=PL0lO_mIqDDFXUJfMPcm1ezfcYSOHNNCZ4&si=i89udvzc2o02Gubv",
        tags: ["figma", "дизайн", "ui/ux", "курс", "видео", "для начинающих"],
        type: "video",
        category: "design",
        dateAdded: new Date().toISOString()
    },
    {
        id: 64,
        title: "Margin и padding в CSS: как сразу сделать грамотно?",
        description: "Статья о ключевых отличиях между margin и padding в CSS, а также о трюках для улучшения UI/UX вашего сайта.",
        link: "https://tproger.ru/articles/margin-i-padding-v-css--kak-srazu-sdelat-gramotno",
        tags: ["css", "верстка", "ui/ux", "статья", "frontend"],
        type: "article",
        category: "design",
        dateAdded: new Date().toISOString()
    },
    {
        id: 65,
        title: "Web Design Playground, 2nd Edition (2024)",
        description: "Практический курс по созданию современных адаптивных веб-сайтов с использованием HTML5, CSS3, JavaScript и принципов UI/UX дизайна.",
        link: "https://t.me/+kQ5Nlf4rZ5djZmFi",
        tags: ["веб-дизайн", "html", "css", "javascript", "ui/ux", "книга", "курс"],
        type: "course",
        category: "design",
        dateAdded: new Date().toISOString()
    },
    {
        id: 66,
        title: "Dotfiles PewDiePie для Arch + Hyprland",
        description: "Конфигурационные файлы (dotfiles) PewDiePie для Arch Linux и оконного менеджера Hyprland.",
        link: "https://github.com/pewdiepie-archdaemon/dionysus",
        tags: ["linux", "arch", "hyprland", "dotfiles", "настройка", "github"],
        type: "reference",
        category: "devops",
        dateAdded: new Date().toISOString()
    },
    {
        id: 67,
        title: "3D Визуализация архитектуры LLM",
        description: "Интерактивная 3D визуализация, позволяющая изучить устройство больших языковых моделей (LLM) таких как GPT-2, nanoGPT, GPT-2 XL и GPT-3.",
        link: "https://bbycroft.net/llm",
        tags: ["ии", "llm", "визуализация", "3d", "образование", "нейросети"],
        type: "interactive",
        category: "ai",
        dateAdded: new Date().toISOString()
    },
    {
        id: 68,
        title: "ConfMap",
        description: "Опенсорс инструмент для преобразования YAML и JSON-конфигов в интерактивные майнд-мапы. Поиск по ключам, сворачивание веток.",
        link: "https://confmap.com/",
        tags: ["инструменты", "yaml", "json", "визуализация", "конфиги", "opensource"],
        type: "tool",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 69,
        title: "sshx",
        description: "Инструмент для совместной работы в терминале через браузер. Общий доступ по ссылке, видимые курсоры, чат.",
        link: "https://sshx.io/",
        tags: ["инструменты", "ssh", "терминал", "совместная работа", "дебаггинг"],
        type: "tool",
        category: "devops",
        dateAdded: new Date().toISOString()
    },
    {
        id: 70,
        title: "Изучение Rust с нуля",
        description: "Видеокурс по изучению языка Rust для начинающих: синтаксис, создание проектов.",
        link: "https://youtube.com/playlist?list=PL0lO_mIqDDFU_3UaxCF6p98ELxXpAyHpW&si=sdUXn7i2Y_F6z8kO",
        tags: ["rust", "программирование", "курс", "видео", "для начинающих"],
        type: "video",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 71,
        title: "1С-Битрикс: что это такое и как его использовать",
        description: "Статья о CMS 1С-Битрикс: отличия от WordPress, необходимость программирования, начало работы.",
        link: "https://blog.skillfactory.ru/1s-bitriks/",
        tags: ["cms", "битрикс", "веб-разработка", "статья"],
        type: "article",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 72,
        title: "SSH-подключение: что это и как использовать",
        description: "Материал с примерами о SSH-подключении: получение удаленного доступа к компьютеру.",
        link: "https://thecode.media/ssh-podklyuchenie/",
        tags: ["ssh", "сеть", "безопасность", "удаленный доступ", "статья"],
        type: "article",
        category: "devops",
        dateAdded: new Date().toISOString()
    },
    {
        id: 73,
        title: "Идентификация, аутентификация, авторизация",
        description: "Статья о разнице между идентификацией, аутентификацией и авторизацией в системах безопасности.",
        link: "https://blog.skillfactory.ru/identifikatsiya-autentifikatsiya-avtorizatsiya/",
        tags: ["безопасность", "аутентификация", "авторизация", "статья"],
        type: "article",
        category: "security",
        dateAdded: new Date().toISOString()
    },
    {
        id: 74,
        title: "JWT, keycloak, session, basic auth, OAuth 2.0 – теория и код",
        description: "Большой видеогайд по всем видам авторизации: Basic auth, сессии, JWT, SSO, OAuth 2.0, Keycloak.",
        link: "https://youtu.be/QacZVserfIU?si=QaCnXKDDuxfBOC_5",
        tags: ["авторизация", "jwt", "oauth", "keycloak", "безопасность", "видео", "гайд"],
        type: "video",
        category: "security",
        dateAdded: new Date().toISOString()
    },
    {
        id: 75,
        title: "Ошибка 503 на сайте: что означает и как исправить",
        description: "Статья о значении кода состояния 503, причинах его появления и методах решения для пользователей и разработчиков.",
        link: "https://blog.skillfactory.ru/oshibka-503-na-sayte-chto-eto-oznachaet-i-kak-vse-ispravit/",
        tags: ["веб-разработка", "ошибки", "http", "статья", "devops"],
        type: "article",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 76,
        title: "HTTP-запросы: структура, методы, строка статуса и коды состояния",
        description: "Статья о структуре HTTP-запросов, методах, статусной строке и кодах состояния.",
        link: "https://habr.com/ru/articles/865040/",
        tags: ["http", "веб-разработка", "сеть", "статья"],
        type: "article",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 77,
        title: "Выбор окружения рабочего стола для Linux",
        description: "Видео о том, что такое среда рабочего стола в Linux и как выбрать подходящую для себя.",
        link: "https://youtu.be/T30B_yJVPjE?si=WxYGeaNqsWeL4TQp",
        tags: ["linux", "окружение рабочего стола", "gui", "видео", "для начинающих"],
        type: "video",
        category: "devops",
        dateAdded: new Date().toISOString()
    },
    {
        id: 78,
        title: "От монолита до микросервисов: как устроена архитектура ПО",
        description: "Статья об архитектуре программного обеспечения: от монолитных приложений до микросервисов.",
        link: "https://blog.skillfactory.ru/ot-monolita-do-mikroservisov-kak-ustroena-arhitektura-po/",
        tags: ["архитектура", "микросервисы", "монолит", "статья", "backend"],
        type: "article",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 79,
        title: "12 полезных инструментов для разработчиков",
        description: "Обзор инструментов для тестирования кода, отладки, хостинга и оптимизации веб-производительности.",
        link: "https://nuancesprog.ru/p/25528/",
        tags: ["инструменты", "разработка", "продуктивность", "статья", "обзор"],
        type: "article",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 80,
        title: "AI для frontend: модели для генерации интерфейса",
        description: "Статья о вариантах использования ИИ для генерации интерфейсов, их преимуществах и нюансах.",
        link: "https://tproger.ru/articles/ai-dlya-frontend--modeli-dlya-generacii-interfejsa",
        tags: ["ии", "frontend", "генерация интерфейса", "статья", "ai"],
        type: "article",
        category: "ai",
        dateAdded: new Date().toISOString()
    },
    {
        id: 81,
        title: "Большой гайд по JavaScript",
        description: "Подборка полезных статей для изучения и прокачки навыков в JavaScript для новичков и опытных разработчиков.",
        link: "https://tproger.ru/articles/javascript--bolwoj-gajd-ot-tproger",
        tags: ["javascript", "гайд", "статьи", "обучение", "frontend"],
        type: "article",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 82,
        title: "CSS-селекторы. Шпаргалка для новичков",
        description: "Статья о типах CSS-селекторов, их использовании и отличиях для привязки стилевых свойств к элементам.",
        link: "https://htmlacademy.ru/blog/css/selectors",
        tags: ["css", "селекторы", "верстка", "шпаргалка", "статья", "frontend"],
        type: "article",
        category: "design",
        dateAdded: new Date().toISOString()
    },
    {
        id: 83,
        title: "Микросервисы на пальцах: API-Gateway, API-composition, BFF",
        description: "Видеоурок о базовых шаблонах микросервисной архитектуры: API-Gateway, API-Composition и BFF.",
        link: "https://youtu.be/ygKmmGj1hDY?si=Jj0-hI2d3vvhLB6x",
        tags: ["микросервисы", "архитектура", "api", "видео", "backend"],
        type: "video",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 84,
        title: "Fedora Linux: Большой обзор и установка",
        description: "Видеоурок о дистрибутиве Fedora Linux: его особенностях, передовых технологиях и процессе установки.",
        link: "https://youtu.be/3KSRIBNjvjw?si=ZKojIFBySY8mOQ2B",
        tags: ["linux", "fedora", "дистрибутивы", "обзор", "видео", "установка"],
        type: "video",
        category: "devops",
        dateAdded: new Date().toISOString()
    },
    {
        id: 85,
        title: "Что такое динамическое программирование: методы, примеры, ошибки",
        description: "Статья о методе динамического программирования для решения сложных задач путем разбиения на подзадачи.",
        link: "https://blog.skillfactory.ru/chto-takoe-dinamicheskoe-programmirovanie/",
        tags: ["алгоритмы", "динамическое программирование", "статья", "программирование"],
        type: "article",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 86,
        title: "Что такое RPC и gRPC за 10 минут",
        description: "Видеоурок о RPC и gRPC: назначение, преимущества, архитектура, HTTP/2, сжатие заголовков, Protobuf.",
        link: "https://youtu.be/bfdF4AJELDc?si=CdCK_ulshcXttyiz",
        tags: ["rpc", "grpc", "сеть", "архитектура", "видео", "backend"],
        type: "video",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 87,
        title: "Обзор лучших инструментов для ведения проектов и задач",
        description: "Подборка из 15 платформ для систематизации профессиональных и личных задач и организации проектного управления.",
        link: "https://tproger.ru/articles/obzor-luchwih-instrumentov-dlya-vedeniya-proektov-i-zadach",
        tags: ["инструменты", "управление проектами", "задачи", "продуктивность", "статья"],
        type: "article",
        category: "productivity",
        dateAdded: new Date().toISOString()
    },
    {
        id: 88,
        title: "20 команд Linux, которые не стоит запускать",
        description: "Статья о опасных командах Linux, которые могут уничтожить систему, данные или оставить сервер без защиты.",
        link: "https://tproger.ru/articles/20-komand-linux--kotorye-ne-stoit-zapuskat--libo-zapuskat-s-osoboj-ostorozhnostyu",
        tags: ["linux", "безопасность", "команды", "администрирование", "статья"],
        type: "article",
        category: "devops",
        dateAdded: new Date().toISOString()
    },
    {
        id: 89,
        title: "Что происходит после ввода адреса в браузере?",
        description: "Видеоурок о процессе загрузки веб-страницы: от DNS-запросов до обработки на сервере и отрисовки в браузере.",
        link: "https://youtu.be/YPIbtiAuw7A?si=vws1NLyYHSLzg0Fy",
        tags: ["веб-разработка", "браузер", "dns", "http", "видео", "гайд"],
        type: "video",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 90,
        title: "Топ-12 лучших программ для сжатия фото без потери качества",
        description: "Обзор программ и онлайн-сервисов для сжатия фотографий без потери качества: от веб-инструментов до десктопных утилит.",
        link: "https://tproger.ru/articles/top-12-luchwih-programm-dlya-szhatiya-foto-bez-poteri-kachestva",
        tags: ["инструменты", "изображения", "сжатие", "оптимизация", "статья", "обзор"],
        type: "article",
        category: "design",
        dateAdded: new Date().toISOString()
    },
    {
        id: 91,
        title: "Ubuntu Server: полное руководство по настройке",
        description: "Подробное руководство по установке и настройке Ubuntu Server для начинающих системных администраторов.",
        link: "https://help.ubuntu.com/community/ServerGuide",
        tags: ["ubuntu", "сервер", "настройка", "администрирование", "linux"],
        type: "article",
        category: "linux",
        subcategory: "ubuntu",
        dateAdded: new Date().toISOString()
    },
    {
        id: 92,
        title: "Bash-скрипты для автоматизации задач",
        description: "Коллекция полезных bash-скриптов для автоматизации рутинных задач в Linux.",
        link: "https://github.com/awesome-lists/awesome-bash",
        tags: ["bash", "скрипты", "автоматизация", "linux", "github"],
        type: "script",
        category: "linux",
        subcategory: "bash",
        dateAdded: new Date().toISOString()
    },
    {
        id: 93,
        title: "Arch Linux установка с нуля",
        description: "Видеоруководство по установке Arch Linux с подробными объяснениями каждого шага.",
        link: "https://youtu.be/PQgyW10xD8s",
        tags: ["arch linux", "установка", "руководство", "видео", "linux"],
        type: "video",
        category: "linux",
        subcategory: "arch",
        dateAdded: new Date().toISOString()
    },
    {
        id: 94,
        title: "CentOS 8 настройка сервера",
        description: "Статья по настройке веб-сервера на CentOS 8 с Apache, MySQL и PHP.",
        link: "https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-centos-8",
        tags: ["centos", "сервер", "lamp", "настройка", "linux"],
        type: "article",
        category: "linux",
        subcategory: "centos",
        dateAdded: new Date().toISOString()
    },
    {
        id: 95,
        title: "Debian скрипты для системного администрирования",
        description: "Полезные скрипты для управления пакетами, мониторинга и резервного копирования в Debian.",
        link: "https://github.com/Fa-r27-aD/LinuxMegaTools",
        tags: ["debian", "скрипты", "администрирование", "linux", "github"],
        type: "script",
        category: "linux",
        subcategory: "debian",
        dateAdded: new Date().toISOString()
    },
    {
        id: 96,
        title: "Fedora Workstation обзор и настройка",
        description: "Подробный обзор Fedora Workstation и руководство по настройке для разработчиков.",
        link: "https://fedoramagazine.org/tag/getting-started/",
        tags: ["fedora", "рабочая станция", "настройка", "обзор", "linux"],
        type: "article",
        category: "linux",
        subcategory: "fedora",
        dateAdded: new Date().toISOString()
    },
    {
        id: 97,
        title: "Kali Linux для пентестинга",
        description: "Курс по использованию Kali Linux для тестирования на проникновение и кибербезопасности.",
        link: "https://www.kali.org/training/",
        tags: ["kali linux", "пентестинг", "безопасность", "курс", "linux"],
        type: "course",
        category: "linux",
        subcategory: "kali",
        dateAdded: new Date().toISOString()
    },
    {
        id: 98,
        title: "Linux Mint для начинающих",
        description: "Полное руководство по Linux Mint для пользователей, переходящих с Windows.",
        link: "https://linuxmint.com/documentation.php",
        tags: ["linux mint", "для начинающих", "руководство", "linux"],
        type: "article",
        category: "linux",
        subcategory: "mint",
        dateAdded: new Date().toISOString()
    },
    {
        id: 99,
        title: "OpenSUSE настройка сервера",
        description: "Руководство по настройке сервера на OpenSUSE Leap с YaST.",
        link: "https://en.opensuse.org/SDB:Setting_up_a_server",
        tags: ["opensuse", "сервер", "yast", "настройка", "linux"],
        type: "article",
        category: "linux",
        subcategory: "opensuse",
        dateAdded: new Date().toISOString()
    },
    {
        id: 100,
        title: "Red Hat Enterprise Linux документация",
        description: "Официальная документация по Red Hat Enterprise Linux для системных администраторов.",
        link: "https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/",
        tags: ["red hat", "rhel", "документация", "администрирование", "linux"],
        type: "reference",
        category: "linux",
        subcategory: "redhat",
        dateAdded: new Date().toISOString()
    },

    // Новые ресурсы для Windows
    {
        id: 101,
        title: "Windows 10 оптимизация для разработчиков",
        description: "Руководство по оптимизации Windows 10 для повышения производительности при разработке.",
        link: "https://devblogs.microsoft.com/visualstudio/optimizing-visual-studio-performance-on-windows-10/",
        tags: ["windows 10", "оптимизация", "разработка", "производительность"],
        type: "article",
        category: "windows",
        subcategory: "windows10",
        dateAdded: new Date().toISOString()
    },
    {
        id: 102,
        title: "Windows 11 настройка для программистов",
        description: "Подробная настройка Windows 11 для комфортной работы программиста.",
        link: "https://www.xda-developers.com/how-to-set-up-windows-11-for-developers/",
        tags: ["windows 11", "настройка", "программирование", "разработка"],
        type: "article",
        category: "windows",
        subcategory: "windows11",
        dateAdded: new Date().toISOString()
    },
    {
        id: 103,
        title: "PowerShell скрипты для автоматизации",
        description: "Коллекция полезных PowerShell скриптов для автоматизации задач в Windows.",
        link: "https://github.com/PowerShellMafia/PowerSploit",
        tags: ["powershell", "скрипты", "автоматизация", "windows", "github"],
        type: "script",
        category: "windows",
        subcategory: "powershell",
        dateAdded: new Date().toISOString()
    },
    {
        id: 104,
        title: "Windows Server 2019 настройка",
        description: "Руководство по установке и настройке Windows Server 2019 для начинающих.",
        link: "https://docs.microsoft.com/en-us/windows-server/get-started-19/get-started-19",
        tags: ["windows server", "сервер", "настройка", "администрирование"],
        type: "article",
        category: "windows",
        subcategory: "windowsserver",
        dateAdded: new Date().toISOString()
    },
    {
        id: 105,
        title: "Batch скрипты для Windows",
        description: "Полезные batch-скрипты для автоматизации рутинных задач в Windows.",
        link: "https://github.com/npocmaka/batch.scripts",
        tags: ["batch", "скрипты", "автоматизация", "windows", "github"],
        type: "script",
        category: "windows",
        subcategory: "batch",
        dateAdded: new Date().toISOString()
    },
    {
        id: 106,
        title: "Windows Terminal настройка",
        description: "Руководство по настройке Windows Terminal для продуктивной работы.",
        link: "https://docs.microsoft.com/en-us/windows/terminal/",
        tags: ["windows terminal", "терминал", "настройка", "продуктивность"],
        type: "article",
        category: "windows",
        subcategory: "terminal",
        dateAdded: new Date().toISOString()
    },
    {
        id: 107,
        title: "Windows Subsystem for Linux (WSL)",
        description: "Полное руководство по установке и использованию WSL в Windows 10/11.",
        link: "https://docs.microsoft.com/en-us/windows/wsl/",
        tags: ["wsl", "linux", "windows", "разработка", "руководство"],
        type: "article",
        category: "windows",
        subcategory: "wsl",
        dateAdded: new Date().toISOString()
    },
    {
        id: 108,
        title: "Реестр Windows: полезные твики",
        description: "Коллекция полезных настроек реестра Windows для оптимизации системы.",
        link: "https://www.tenforums.com/tutorials/",
        tags: ["реестр", "windows", "оптимизация", "твики", "настройка"],
        type: "article",
        category: "windows",
        subcategory: "registry",
        dateAdded: new Date().toISOString()
    },
    {
        id: 109,
        title: "Windows задачи по планировщику",
        description: "Полезные задачи для планировщика заданий Windows для автоматизации.",
        link: "https://www.windowscentral.com/how-create-automated-tasks-using-task-scheduler-windows-10",
        tags: ["планировщик", "задачи", "автоматизация", "windows"],
        type: "article",
        category: "windows",
        subcategory: "taskscheduler",
        dateAdded: new Date().toISOString()
    },
    {
        id: 110,
        title: "Windows безопасность и защита",
        description: "Руководство по настройке безопасности в Windows 10/11.",
        link: "https://www.microsoft.com/security/blog/",
        tags: ["безопасность", "windows", "защита", "настройка"],
        type: "article",
        category: "windows",
        subcategory: "security",
        dateAdded: new Date().toISOString()
    },
    
    // Новые ресурсы для категории Профессии
    {
        id: 111,
        title: "Frontend Developer Roadmap 2024",
        description: "Актуальная дорожная карта для фронтенд-разработчиков с полным стеком технологий.",
        link: "https://roadmap.sh/frontend",
        tags: ["frontend", "roadmap", "карьера", "обучение"],
        type: "program",
        category: "profession",
        subcategory: "frontend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 112,
        title: "Backend Developer Roadmap",
        description: "Полный путь становления бэкенд-разработчика от основ до продвинутых технологий.",
        link: "https://roadmap.sh/backend",
        tags: ["backend", "roadmap", "карьера", "сервер"],
        type: "program",
        category: "profession",
        subcategory: "backend",
        dateAdded: new Date().toISOString()
    },
    {
        id: 113,
        title: "FullStack Developer Guide",
        description: "Комплексное руководство по становлению fullstack-разработчика.",
        link: "https://www.freecodecamp.org/news/how-to-become-a-full-stack-developer/",
        tags: ["fullstack", "руководство", "карьера", "разработка"],
        type: "article",
        category: "profession",
        subcategory: "fullstack",
        dateAdded: new Date().toISOString()
    },
    {
        id: 114,
        title: "DevOps Roadmap 2024",
        description: "Актуальный путь изучения DevOps с инструментами и практиками.",
        link: "https://roadmap.sh/devops",
        tags: ["devops", "roadmap", "инфраструктура", "automation"],
        type: "program",
        category: "profession",
        subcategory: "devops",
        dateAdded: new Date().toISOString()
    },
    {
        id: 115,
        title: "Data Scientist Career Path",
        description: "Полное руководство по карьере в Data Science с необходимыми навыками.",
        link: "https://www.datacamp.com/career-tracks/data-scientist",
        tags: ["data science", "карьера", "ml", "аналитика"],
        type: "program",
        category: "profession",
        subcategory: "data-scientist",
        dateAdded: new Date().toISOString()
    },
    {
        id: 116,
        title: "Machine Learning Engineer",
        description: "Путь становления ML engineer с проектами и ресурсами.",
        link: "https://github.com/microsoft/ML-For-Beginners",
        tags: ["machine learning", "ai", "карьера", "проекты"],
        type: "course",
        category: "profession",
        subcategory: "ml-engineer",
        dateAdded: new Date().toISOString()
    },
    {
        id: 117,
        title: "QA Engineer Handbook",
        description: "Полное руководство по тестированию программного обеспечения.",
        link: "https://github.com/denysdovhan/wtfjs",
        tags: ["qa", "тестирование", "руководство", "качество"],
        type: "reference",
        category: "profession",
        subcategory: "qa",
        dateAdded: new Date().toISOString()
    },
    {
        id: 207,
        title: "UX/UI Design Roadmap",
        description: "Дорожная карта для дизайнеров интерфейсов и пользовательского опыта.",
        link: "https://roadmap.sh/ux-design",
        tags: ["ux", "ui", "design", "карьера"],
        type: "program",
        category: "profession",
        subcategory: "ux-ui",
        dateAdded: new Date().toISOString()
    },
    {
        id: 208,
        title: "Mobile Developer Guide",
        description: "Руководство по мобильной разработке для iOS и Android.",
        link: "https://roadmap.sh/android",
        tags: ["mobile", "android", "ios", "разработка"],
        type: "program",
        category: "profession",
        subcategory: "mobile",
        dateAdded: new Date().toISOString()
    },
    {
        id: 209,
        title: "Game Development Career",
        description: "Путь в геймдев: от основ до продвинутых техник разработки игр.",
        link: "https://github.com/miloyip/game-programmer",
        tags: ["gamedev", "игры", "карьера", "разработка"],
        type: "program",
        category: "profession",
        subcategory: "game-dev",
        dateAdded: new Date().toISOString()
    },
    {
        id: 210,
        title: "Cybersecurity Career Path",
        description: "Полный путь становления специалиста по кибербезопасности.",
        link: "https://roadmap.sh/cyber-security",
        tags: ["security", "кибербезопасность", "карьера", "pentest"],
        type: "program",
        category: "profession",
        subcategory: "security",
        dateAdded: new Date().toISOString()
    },
    {
        id: 211,
        title: "Cloud Engineer Roadmap",
        description: "Путь изучения облачных технологий и становления cloud-инженера.",
        link: "https://roadmap.sh/cloud",
        tags: ["cloud", "aws", "azure", "gcp"],
        type: "program",
        category: "profession",
        subcategory: "cloud",
        dateAdded: new Date().toISOString()
    },
    {
        id: 212,
        title: "System Administrator Guide",
        description: "Полное руководство по системному администрированию.",
        link: "https://sysadmin.libhunt.com/",
        tags: ["sysadmin", "администрирование", "серверы", "linux"],
        type: "reference",
        category: "profession",
        subcategory: "sysadmin",
        dateAdded: new Date().toISOString()
    },
    {
        id: 213,
        title: "Database Administrator",
        description: "Путь становления администратора баз данных.",
        link: "https://www.red-gate.com/simple-talk/databases/",
        tags: ["dba", "базы данных", "sql", "администрирование"],
        type: "program",
        category: "profession",
        subcategory: "dba",
        dateAdded: new Date().toISOString()
    },
    {
        id: 214,
        title: "Project Manager in IT",
        description: "Руководство по проектному менеджменту в IT-индустрии.",
        link: "https://www.pmi.org/",
        tags: ["project management", "менеджмент", "agile", "scrum"],
        type: "course",
        category: "profession",
        subcategory: "project-manager",
        dateAdded: new Date().toISOString()
    },
    {
        id: 215,
        title: "Product Manager Career",
        description: "Путь продукт-менеджера в IT: от идеи до реализации.",
        link: "https://www.productplan.com/learn/",
        tags: ["product management", "продукт", "менеджмент", "стратегия"],
        type: "program",
        category: "profession",
        subcategory: "product-manager",
        dateAdded: new Date().toISOString()
    },
    {
        id: 216,
        title: "Tech Lead Handbook",
        description: "Руководство по техническому лидерству в IT-командах.",
        link: "https://leaddev.com/",
        tags: ["tech lead", "лидерство", "управление", "команда"],
        type: "reference",
        category: "profession",
        subcategory: "tech-lead",
        dateAdded: new Date().toISOString()
    },
    {
        id: 217,
        title: "CTO Career Path",
        description: "Путь становления технического директора в IT-компании.",
        link: "https://www.cto-school.com/",
        tags: ["cto", "руководство", "стратегия", "технологии"],
        type: "program",
        category: "profession",
        subcategory: "cto",
        dateAdded: new Date().toISOString()
    },
    {
        id: 218,
        title: "14 лучших книг по хакингу и информационной безопасности",
        description: "Подборка книг для новичков и профессионалов в области хакерства и кибербезопасности. Включает описание и характеристики каждой книги.",
        link: "https://translated.turbopages.org/proxy_u/en-ru.ru.c326722a-68c9265e-452a052d-74722d776562/https/hackr.io/blog/best-hacking-books",
        tags: ["книги", "хакинг", "кибербезопасность", "безопасность", "обучение", "шпаргалки"],
        type: "list",
        category: "security",
        dateAdded: new Date().toISOString()
    },
    {
        id: 219,
        title: "33 лучших бесплатных курса по хакингу и информационной безопасности",
        description: "Большая подборка курсов, книг и репозиториев для становления белым хакером. Перспективы в области ИБ.",
        link: "https://vc.ru/dev/1090613-33-luchshih-besplatnyh-kursa-po-hakingu-i-informacionnoi-bezopasnosti",
        tags: ["курсы", "хакинг", "кибербезопасность", "белый хакер", "обучение", "ресурсы"],
        type: "list",
        category: "security",
        dateAdded: new Date().toISOString()
    },
    {
        id: 220,
        title: "Easy InfoSec | Ресурсы и Курсы",
        description: "Телеграм-канал с ресурсами и курсами по информационной безопасности.",
        link: "https://t.me/+hjEZ0ZP8KZRmNDNi",
        tags: ["телеграм", "кибербезопасность", "курсы", "ресурсы", "канал"],
        type: "list",
        category: "security",
        dateAdded: new Date().toISOString()
    },
    {
        id: 221,
        title: "Pwn College",
        description: "Образовательная платформа для практического изучения кибербезопасности через задания на основе реальных сценариев.",
        link: "https://pwn.college/",
        tags: ["кибербезопасность", "обучение", "практика", "задания", "pwn"],
        type: "course",
        category: "security",
        dateAdded: new Date().toISOString()
    },

    // Шпаргалки и Справочники (дополнение к существующим)
    {
        id: 222,
        title: "OverAPI.com: Шпаргалки по программированию",
        description: "Коллекция шпаргалок по множеству языков программирования, фреймворков и технологий (Python, JavaScript, Git, MySQL и др.), отсортированных в алфавитном порядке.",
        link: "https://overapi.com/",
        tags: ["шпаргалки", "документация", "справочник", "программирование", "cheatsheet"],
        type: "reference",
        category: "cheatsheet",
        dateAdded: new Date().toISOString()
    },
    {
        id: 223,
        title: "HTML/CSS/JS Шпаргалка для новичков",
        description: "Дока — это лучший справочник для веб-разработчиков. Собраны материалы по HTML, CSS и JavaScript для начинающих.",
        link: "https://doka.guide/",
        tags: ["шпаргалки", "html", "css", "javascript", "справочник", "frontend", "для начинающих"],
        type: "reference",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 224,
        title: "Bash-скрипты: шпаргалка по синтаксису",
        description: "Полезные bash-скрипты и справочник по синтаксису для автоматизации рутинных задач в Linux.",
        link: "https://github.com/awesome-lists/awesome-bash",
        tags: ["bash", "скрипты", "шпаргалки", "linux", "автоматизация", "синтаксис"],
        type: "cheatsheet",
        category: "linux",
        subcategory: "bash",
        dateAdded: new Date().toISOString()
    },
    {
        id: 225,
        title: "Шпаргалка по Git",
        description: "Основные команды Git для ежедневного использования в разработке.",
        link: "https://training.github.com/downloads/ru/github-git-cheat-sheet/",
        tags: ["git", "шпаргалки", "команды", "версионный контроль", "cheatsheet"],
        type: "cheatsheet",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 226,
        title: "SQL Шпаргалка",
        description: "Шпаргалка по основным операторам и функциям SQL для работы с базами данных.",
        link: "https://www.sqltutorial.org/wp-content/uploads/2016/04/SQL-cheat-sheet.pdf",
        tags: ["sql", "базы данных", "шпаргалки", "запросы", "cheatsheet"],
        type: "cheatsheet",
        category: "programming",
        dateAdded: new Date().toISOString()
    },

    // Ресурсы из предоставленного Архива (примеры курсов)
    {
        id: 227,
        title: "Курс 'Специалист по кибербезопасности с нуля' (Архив)",
        description: "Полный курс: администрирование Windows/Linux, сети, Python, анализ защищенности, реагирование на инциденты. Объем: 124,82 ГБ.",
        link: "https://disk.yandex.ru/d/Xk6M8T5mR6wMLQ",
        tags: ["кибербезопасность", "курс", "администрирование", "python", "безопасность", "архив"],
        type: "course",
        category: "security",
        dateAdded: new Date().toISOString()
    },
    {
        id: 228,
        title: "Курс 'Python-разработчик' (Архив)",
        description: "Программа курса: основы Python, алгоритмы, ООП, веб, базы данных, тестирование, командная работа. Объем: 2,42 ГБ.",
        link: "https://disk.yandex.ru/d/cZtCfJa2QXDzQA",
        tags: ["python", "курс", "разработка", "алгоритмы", "базы данных", "архив"],
        type: "course",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 229,
        title: "Курс 'DevOps-инженер. Основы' (Архив)",
        description: "Изучение CI/CD, IaC, Docker, Ansible, мониторинга. Объем: 3,48 ГБ.",
        link: "https://disk.yandex.ru/d/KAxMRD4qg0moxA",
        tags: ["devops", "курс", "ci/cd", "docker", "ansible", "мониторинг", "архив"],
        type: "course",
        category: "devops",
        dateAdded: new Date().toISOString()
    },
    {
        id: 230,
        title: "Курс 'React Pizza v2' (YouTube)",
        description: "Создание фронтенда для интернет-магазина пиццы на ReactJS с использованием современных технологий.",
        link: "https://youtube.com/playlist?list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&si=R3_9E8iPN4hCVoVm",
        tags: ["react", "javascript", "frontend", "курс", "видео", "youtube"],
        type: "video",
        category: "programming",
        dateAdded: new Date().toISOString()
    },

    // Дизайн / UX/UI
    {
        id: 231,
        title: "Курсы по UX/UI Design от Артёма Горбунова",
        description: "Авторский курс по этапам разработки проекта: Research, Interaction Design, UI. Создание UX и UI десктоп и мобильной версии сайта.",
        link: "https://youtube.com/playlist?list=PL4D4ciWjcTFy59b1tXBAjhnNYP4fLoyVc",
        tags: ["ux", "ui", "design", "курс", "видео", "youtube", "для начинающих"],
        type: "video",
        category: "design",
        dateAdded: new Date().toISOString()
    },
    {
        id: 232,
        title: "Бесплатный подробный курс по Figma",
        description: "Новый, подробный бесплатный курс по Figma на реальных примерах веб-дизайнера с интересной подачей. Главный инструмент для веб- и UX/UI-дизайнеров.",
        link: "https://youtube.com/playlist?list=PLM2Q6lcZo4MexclJrYxA0Is42qWBBuHpB",
        tags: ["figma", "дизайн", "ui/ux", "курс", "видео", "youtube", "бесплатно", "для начинающих"],
        type: "video",
        category: "design",
        dateAdded: new Date().toISOString()
    },

    // Инструменты и Библиотеки
    {
        id: 233,
        title: "Universal Redirect",
        description: "Легкий сервер на Go для перенаправления входящих запросов на другие URL. Идеален для перенаправления в App Store или Play Store.",
        link: "https://github.com/ftp27/go-universal-redirect",
        tags: ["go", "golang", "сервер", "редирект", "инструменты", "github", "opensource"],
        type: "tool",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 234,
        title: "YouTube Addiction Rehab",
        description: "Расширение для Chrome, которое фильтрует рекомендации на YouTube, чтобы избавиться от бесполезных видео.",
        link: "https://github.com/JoeyWangTW/youtube-addiction-rehab-chrome-extension",
        tags: ["chrome", "расширение", "youtube", "продуктивность", "github", "opensource"],
        type: "tool",
        category: "productivity",
        dateAdded: new Date().toISOString()
    },
    {
        id: 235,
        title: "rewrite",
        description: "Инструмент для автоматизированного рефакторинга кода. Проверяет и исправляет код в сотнях репозиториев одновременно.",
        link: "https://github.com/openrewrite/rewrite",
        tags: ["рефакторинг", "инструменты", "автоматизация", "java", "github", "opensource"],
        type: "tool",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 236,
        title: "firecrawl",
        description: "API-сервис, который берет URL, сканирует его и преобразует в чистый markdown или структурированные данные.",
        link: "https://github.com/mendableai/firecrawl",
        tags: ["api", "scraping", "markdown", "инструменты", "github", "opensource"],
        type: "tool",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 237,
        title: "ezy",
        description: "Полнофункциональный gRPC/gRPC-Web клиент с открытым исходным кодом. Unary calls, streaming, TLS, Persisted collections.",
        link: "https://github.com/getezy/ezy",
        tags: ["grpc", "api", "клиент", "инструменты", "github", "opensource"],
        type: "tool",
        category: "programming",
        dateAdded: new Date().toISOString()
    },

    // Статьи
    {
        id: 238,
        title: "Шаблоны для эффективной работы с DOM на JavaScript",
        description: "Современные подходы к работе с DOM на чистом JavaScript: шаблоны, оптимизация производительности, улучшение кода.",
        link: "https://habr.com/ru/companies/timeweb/articles/843080/",
        tags: ["javascript", "dom", "оптимизация", "шаблоны", "статья", "habr"],
        type: "article",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 239,
        title: "10 возможностей современного Tarantool",
        description: "О десяти малоизвестных возможностях Tarantool: кластерные настройки, персистентность, синхронная репликация, SQL.",
        link: "https://habr.com/ru/companies/vk/articles/843068/",
        tags: ["tarantool", "базы данных", "nosql", "sql", "статья", "habr"],
        type: "article",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 240,
        title: "Почему я предпочитаю исключения, а не значения ошибок",
        description: "Обсуждение преимуществ исключений с точки зрения производительности, удобства работы и упрощения кода.",
        link: "https://habr.com/p/843728/",
        tags: ["исключения", "ошибки", "программирование", "паттерны", "статья", "habr"],
        type: "article",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
        {
        id: 241,
        title: "Awesome Arch Linux",
        description: "Коллекция потрясающих ресурсов, инструментов и приложений для Arch Linux и основанных на нём дистрибутивов.",
        link: "https://github.com/SofianeHamlaoui/Awesome-Arch",
        tags: ["arch linux", "awesome", "коллекция", "инструменты", "github", "opensource"],
        type: "list",
        category: "linux",
        subcategory: "arch",
        dateAdded: new Date().toISOString()
    },
    {
        id: 242,
        title: "Linux Commands Handbook",
        description: "Справочник по Linux командам с примерами и пояснениями. Полезен как новичкам, так и опытным администраторам.",
        link: "https://github.com/sergeevdm/Linux-Commands",
        tags: ["linux", "команды", "справочник", "шпаргалки", "администрирование", "github", "opensource"],
        type: "reference",
        category: "linux",
        dateAdded: new Date().toISOString()
    },
    {
        id: 243,
        title: "Arch Linux Wiki (Русский)",
        description: "Официальная вики Arch Linux на русском языке. Исчерпывающий источник информации по установке, настройке и использованию Arch Linux.",
        link: "https://wiki.archlinux.org/title/Main_page_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)",
        tags: ["arch linux", "wiki", "документация", "руководство", "русский", "установка", "настройка"],
        type: "reference",
        category: "linux",
        subcategory: "arch",
        dateAdded: new Date().toISOString()
    },
    {
        id: 244,
        title: "Debian Wiki (.deb packages)",
        description: "Раздел вики Debian, посвященный управлению пакетами .deb — основам системы управления пакетами в Debian и Ubuntu.",
        link: "https://wiki.debian.org/deb",
        tags: ["debian", "ubuntu", "пакеты", "deb", "администрирование", "wiki", "документация"],
        type: "reference",
        category: "linux",
        subcategory: "debian",
        dateAdded: new Date().toISOString()
    },
    {
        id: 245,
        title: "Ubuntu Wiki (.deb packages)",
        description: "Руководство по пакетам .deb в русскоязычной вики Ubuntu. Полезно для понимания системы пакетов в Ubuntu/Debian.",
        link: "https://help.ubuntu.ru/wiki/deb",
        tags: ["ubuntu", "debian", "пакеты", "deb", "администрирование", "wiki", "документация", "русский"],
        type: "reference",
        category: "linux",
        subcategory: "ubuntu",
        dateAdded: new Date().toISOString()
    },

    // Career & Writing
    {
        id: 246,
        title: "Community Writer Programs",
        description: "Список программ для технических писателей, где платят за статьи. Средний гонорар ~200$ за статью. Для разработчиков, желающих писать.",
        link: "https://github.com/malgamves/CommunityWriterPrograms",
        tags: ["писательство", "карьера", "фриланс", "гонорары", "техническое письмо", "github", "opensource"],
        type: "list",
        category: "career",
        dateAdded: new Date().toISOString()
    },
    {
        id: 247,
        title: "Tech Interview Handbook",
        description: "Исчерпывающее руководство по подготовке к техническим собеседованиям: от составления резюме до переговоров о предложении.",
        link: "https://github.com/yangshun/tech-interview-handbook",
        tags: ["собеседование", "карьера", "поиск работы", "резюме", "алгоритмы", "github", "opensource"],
        type: "reference",
        category: "career",
        dateAdded: new Date().toISOString()
    },
    {
        id: 248,
        title: "Coding Interview University",
        description: "Многомесячный учебный план для самостоятельной подготовки к собеседованию в крупные tech-компании (Google, Amazon, FB, Netflix).",
        link: "https://github.com/jwasham/coding-interview-university",
        tags: ["собеседование", "алгоритмы", "структуры данных", "карьера", "учебный план", "github", "opensource"],
        type: "program",
        category: "career",
        dateAdded: new Date().toISOString()
    },

    // Learning & Projects
    {
        id: 249,
        title: "Build your own X",
        description: "Рай для практиков: руководства по созданию собственных аналогов популярных проектов (БД, ОС, эмуляторы, игры, компиляторы и многое другое).",
        link: "https://github.com/danistefanovic/build-your-own-x",
        tags: ["проекты", "обучение", "практика", "программирование", "github", "opensource", "учебник"],
        type: "list",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 250,
        title: "OSSU Computer Science",
        description: "Полноценная программа обучения компьютерным наукам с использованием онлайн-материалов (курсы Гарварда, MIT, Принстона и др.). Эквивалент бакалавриата.",
        link: "https://github.com/ossu/computer-science",
        tags: ["компьютерные науки", "обучение", "курсы", "учебный план", "cs", "github", "opensource"],
        type: "program",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 251,
        title: "Become A Full-Stack Web Developer",
        description: "Подборка лучших ресурсов для становления фулл-стек веб-разработчиком: JavaScript, React, Node, Python и многое другое.",
        link: "https://github.com/bmorelli25/Become-A-Full-Stack-Web-Developer",
        tags: ["fullstack", "веб-разработка", "обучение", "ресурсы", "javascript", "github", "opensource"],
        type: "list",
        category: "profession",
        subcategory: "fullstack",
        dateAdded: new Date().toISOString()
    },

    // Code Snippets & APIs
    {
        id: 252,
        title: "Awesome Python",
        description: "Коллекция потрясающих фреймворков, библиотек, программного обеспечения и ресурсов на Python.",
        link: "https://github.com/vinta/awesome-python",
        tags: ["python", "awesome", "коллекция", "библиотеки", "фреймворки", "github", "opensource"],
        type: "list",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 253,
        title: "Public APIs",
        description: "Внушительный список бесплатных API для использования в разработке: искусство, музыка, новости, погода, социальные сети и многое другое.",
        link: "https://github.com/public-apis/public-apis",
        tags: ["api", "бесплатно", "разработка", "инструменты", "github", "opensource"],
        type: "list",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 254,
        title: "30 seconds of code",
        description: "Коллекция коротких JavaScript и Python сниппетов, которые решают распространенные задачи программирования.",
        link: "https://github.com/30-seconds/30-seconds-of-code",
        tags: ["javascript", "python", "сниппеты", "код", "шпаргалки", "github", "opensource"],
        type: "cheatsheet",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 255,
        title: "JavaScript Algorithms",
        description: "Примеры многих популярных алгоритмов и структур данных, реализованные на JavaScript с пояснениями.",
        link: "https://github.com/trekhleb/javascript-algorithms",
        tags: ["javascript", "алгоритмы", "структуры данных", "обучение", "github", "opensource"],
        type: "reference",
        category: "programming",
        dateAdded: new Date().toISOString()
    },

    // Frontend & Design
    {
        id: 256,
        title: "Developer Roadmap",
        description: "Дорожные карты для веб-разработчиков: что учить дальше? Карты для фронтенда, бэкенда и DevOps.",
        link: "https://github.com/kamranahmedse/developer-roadmap",
        tags: ["roadmap", "frontend", "backend", "devops", "карьера", "обучение", "github", "opensource"],
        type: "program",
        category: "career",
        dateAdded: new Date().toISOString()
    },
    {
        id: 257,
        title: "Design Resources for Developers",
        description: "Тщательно подобранный список бесплатных ресурсов дизайна: стоковые фото, иконки, UI-библиотеки, шаблоны, инструменты и многое другое.",
        link: "https://github.com/bradtraversy/design-resources-for-developers",
        tags: ["дизайн", "ui", "ux", "ресурсы", "бесплатно", "инструменты", "github", "opensource"],
        type: "list",
        category: "design",
        dateAdded: new Date().toISOString()
    },
    {
        id: 258,
        title: "Front-end Developer Interview Questions",
        description: "Список вопросов для самопроверки на знание фронтенд-разработки (HTML, CSS, JS и др.).",
        link: "https://github.com/h5bp/Front-end-Developer-Interview-Questions",
        tags: ["frontend", "собеседование", "вопросы", "html", "css", "javascript", "github", "opensource"],
        type: "reference",
        category: "career",
        dateAdded: new Date().toISOString()
    },
    {
        id: 259,
        title: "Front-End Performance Checklist",
        description: "Исчерпывающий чеклист для обеспечения высокой производительности вашего веб-приложения.",
        link: "https://github.com/thedaviddias/Front-End-Performance-Checklist",
        tags: ["frontend", "производительность", "оптимизация", "чеклист", "github", "opensource"],
        type: "reference",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
    {
        id: 260,
        title: "Awesome Design Tools",
        description: "Коллекция лучших инструментов для дизайнеров, а также сайтов с ресурсами (UI-киты, стоковые фото, видео).",
        link: "https://github.com/goabstract/Awesome-Design-Tools",
        tags: ["дизайн", "инструменты", "ui", "ux", "ресурсы", "awesome", "github", "opensource"],
        type: "list",
        category: "design",
        dateAdded: new Date().toISOString()
    },

    // Tools & Presentation
    {
        id: 261,
        title: "reveal.js",
        description: "Фреймворк для создания красивых и элегантных HTML-презентаций с помощью веб-технологий. Открытый исходный код.",
        link: "https://github.com/hakimel/reveal.js",
        tags: ["презентации", "html", "css", "javascript", "инструменты", "github", "opensource"],
        type: "tool",
        category: "productivity",
        dateAdded: new Date().toISOString()
    },
    {
        id: 262,
        title: "Free Programming Books",
        description: "Один из самых популярных репозиториев на GitHub. Бесплатные книги, курсы, подкасты и интерактивные ресурсы по программированию на многих языках.",
        link: "https://github.com/EbookFoundation/free-programming-books",
        tags: ["книги", "бесплатно", "курсы", "обучение", "ресурсы", "github", "opensource"],
        type: "list",
        category: "programming",
        dateAdded: new Date().toISOString()
    },
        {
        id: 263,
        title: "Дизайн привычных вещей - Дон Норман",
        description: "Классическая книга о UX-дизайне. Объясняет, почему одни продукты удобные, а другие — нет. Фундаментальные принципы дизайна.",
        link: "http://трубопровод.рф/static/books/2015/02/13/normandonalddizajnprivyichnyihveschej2006.pdf",
        tags: ["дизайн", "ux", "книга", "дон норман", "фундамент", "принципы", "pdf"],
        type: "book",
        category: "design",
        subcategory: "ux-design",
        dateAdded: new Date().toISOString()
    },
    {
        id: 264,
        title: "Не заставляйте меня думать - Стив Круг",
        description: "Классика о юзабилити веб-сайтов. Практическое руководство по созданию интуитивно понятных интерфейсов.",
        link: "https://raferalston.github.io/assets/krug.pdf",
        tags: ["юзабилити", "веб-дизайн", "книга", "стив круг", "интерфейсы", "pdf"],
        type: "book",
        category: "design",
        subcategory: "ux-design",
        dateAdded: new Date().toISOString()
    },
    {
        id: 265,
        title: "Интерфейс - Алан Купер",
        description: "Основы проектирования взаимодействия. О том, как проектировать поведение продуктов, основываясь на целях пользователей.",
        link: "https://vk.com/doc163931991_657263639?hash=3Ls5BI2mFuzWBYPJtmjtFcxzaLxkiUpBVpEaUNMyd9k&api=1&no_preview=1",
        tags: ["интерфейсы", "ux", "книга", "алан купер", "взаимодействие", "проектирование"],
        type: "book",
        category: "design",
        subcategory: "ux-design",
        dateAdded: new Date().toISOString()
    },
    {
        id: 266,
        title: "Эмоциональный веб-дизайн - Аарон Уолтер",
        description: "Как создавать интерфейсы, которые не только работают, но и нравятся пользователям. От функциональности к эмоциям.",
        link: "https://cloud.mail.ru/public/2Z6o/LUDPubukt",
        tags: ["эмоциональный дизайн", "ui", "книга", "аарон уолтер", "психология", "эмоции"],
        type: "book",
        category: "design",
        subcategory: "ui-design",
        dateAdded: new Date().toISOString()
    },
    {
        id: 267,
        title: "Искусство цвета - Иоханнес Иттен",
        description: "Фундаментальный труд по теории цвета. Незаменимая книга для понимания работы с цветом в дизайне.",
        link: "https://edu-2.tatar.ru/upload/storage/org5861/files/Иоганес%20Иттен_%20Искусство%20цвета(1).pdf",
        tags: ["цвет", "теория", "книга", "иттен", "визуальный дизайн", "основы", "pdf"],
        type: "book",
        category: "design",
        subcategory: "color-theory",
        dateAdded: new Date().toISOString()
    },
    {
        id: 268,
        title: "A Project Guide to UX Design - Расс Унгер, Кэролин Чендлер",
        description: "Практическое руководство по процессу UX-дизайна в проектах. От исследований до реализации.",
        link: "https://cdn.bookey.app/files/pdf/book/en/a-project-guide-to-ux-design.pdf",
        tags: ["ux design", "процесс", "книга", "руководство", "проекты", "методология", "pdf", "английский"],
        type: "book",
        category: "design",
        subcategory: "ux-design",
        dateAdded: new Date().toISOString()
    },
    {
    id: 269,
    title: "Google Material Design Guidelines",
    description: "Официальные гайдлайны по дизайну от Google. Фундаментальные принципы, паттерны и компоненты для создания интерфейсов.",
    link: "https://m3.material.io/",
    tags: ["google", "guidelines", "material design", "компоненты", "паттерны"],
    type: "reference",
    category: "design",
    subcategory: "design-system",
    dateAdded: new Date().toISOString()
},
{
    id: 270,
    title: "Human Interface Guidelines от Apple",
    description: "Руководство по проектированию приложений для экосистемы Apple (iOS, macOS, watchOS, tvOS).",
    link: "https://developer.apple.com/design/",
    tags: ["apple", "guidelines", "ios", "macos", "higs"],
    type: "reference",
    category: "design",
    subcategory: "design-system",
    dateAdded: new Date().toISOString()
},
{
    id: 271,
    title: "Refactoring UI",
    description: "Книга и видеоуроки от создателя Tailwind CSS Адама Восена о практическом дизайне для разработчиков.",
    link: "https://www.refactoringui.com/",
    tags: ["книга", "видео", "дизайн для разработчиков", "советы"],
    type: "book",
    category: "design",
    subcategory: "ui-design",
    dateAdded: new Date().toISOString()
},
{
    id: 272,
    title: "Laws of UX",
    description: "Коллекция ключевых принципов и законов, которые используют дизайнеры для принятия обоснованных решений.",
    link: "https://lawsofux.com/",
    tags: ["законы", "психология", "юзабилити", "принципы", "справочник"],
    type: "reference",
    category: "design",
    subcategory: "ux-design",
    dateAdded: new Date().toISOString()
},
{
    id: 273,
    title: "UX Design CC | Курс на YouTube",
    description: "Бесплатный полноценный курс по UX-дизайну на YouTube на русском языке. От основ до продвинутых тем.",
    link: "https://www.youtube.com/playlist?list=PLg5SS_4L6LYufspdWupVaXjanF_mQvjWS",
    tags: ["youtube", "бесплатно", "курс", "ux", "русский"],
    type: "course",
    category: "design",
    subcategory: "ux-design",
    dateAdded: new Date().toISOString()
},
{
    id: 274,
    title: "Figma Academy",
    description: "Бесплатные и платные курсы по Figma от официальных экспертов. Идеально для начала работы с инструментом.",
    link: "https://www.figma.com/resources/learn/",
    tags: ["figma", "курсы", "туториалы", "инструменты"],
    type: "course",
    category: "design",
    subcategory: "tools",
    dateAdded: new Date().toISOString()
},
{
    id: 275,
    title: "Nielsen Norman Group",
    description: "Статьи, отчеты и видео от мировых экспертов по юзабилити и UX-исследованиям. Настольная библия UX-исследователя.",
    link: "https://www.nngroup.com/",
    tags: ["исследования", "юзабилити", "статьи", "jacob nielsen", "эксперты"],
    type: "article",
    category: "design",
    subcategory: "ux-research",
    dateAdded: new Date().toISOString()
},
{
    id: 276,
    title: "A11Y Project",
    description: "Открытый ресурс с простыми и понятными рекомендациями по созданию доступных веб-интерфейсов.",
    link: "https://www.a11yproject.com/",
    tags: ["accessibility", "a11y", "доступность", "инклюзивный дизайн", "чеклист"],
    type: "reference",
    category: "design",
    subcategory: "accessibility",
    dateAdded: new Date().toISOString()
},
{
    id: 277,
    title: "UI Interactions",
    description: "Коллекция вдохновляющих примеров микро-анимаций и интерактивных элементов из реальных продуктов.",
    link: "https://uiinteractions.com/",
    tags: ["анимация", "вдохновение", "микро-анимации", "интерактив"],
    type: "reference",
    category: "design",
    subcategory: "ui-animation",
    dateAdded: new Date().toISOString()
},
{
    id: 278,
    title: "Practical UI Tips",
    description: "Шпаргалка с конкретными, применимыми прямо сегодня советами по улучшению UI.",
    link: "https://www.practicalui.com/",
    tags: ["советы", "шпаргалка", "ui", "практика"],
    type: "cheatsheet",
    category: "design",
    subcategory: "ui-design",
    dateAdded: new Date().toISOString()
}
];
