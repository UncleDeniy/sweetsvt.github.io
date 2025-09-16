document.addEventListener('DOMContentLoaded', function() {
    const resourcesList = document.getElementById('resourcesList');
    const searchInput = document.getElementById('searchInput');
    const typeFilter = document.getElementById('typeFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const clearFilters = document.getElementById('clearFilters');
    const totalResources = document.getElementById('totalResources');
    const uniqueCategories = document.getElementById('uniqueCategories');

    let resources = JSON.parse(localStorage.getItem('it-huishniki-resources')) || [];

    // Инициализация с демо-данными
    if (resources.length === 0) {
        resources = [
            {
                id: 1,
                title: "FreeCodeCamp",
                description: "Бесплатные курсы по программированию с сертификатами. Идеально для начинающих.",
                link: "https://www.freecodecamp.org/",
                tags: ["программирование", "бесплатно", "курсы", "сертификаты"],
                type: "course",
                category: "programming",
                dateAdded: new Date().toISOString()
            },
            {
                id: 2,
                title: "Roadmap.sh",
                description: "Пошаговые руководства для различных IT-специальностей с дорожными картами.",
                link: "https://roadmap.sh/",
                tags: ["обучение", "карьера", "roadmap", "guidelines"],
                type: "program",
                category: "career",
                dateAdded: new Date().toISOString()
            },
            {
                id: 3,
                title: "CSS-Tricks",
                description: "Лучшие практики и руководства по CSS и веб-разработке.",
                link: "https://css-tricks.com/",
                tags: ["css", "веб-разработка", "дизайн", "frontend"],
                type: "article",
                category: "design",
                dateAdded: new Date().toISOString()
            },
            {
                id: 4,
                title: "Visual Studio Code",
                description: "Бесплатный редактор кода с огромным количеством расширений.",
                link: "https://code.visualstudio.com/",
                tags: ["инструменты", "редактор", "программирование", "ide"],
                type: "tool",
                category: "programming",
                dateAdded: new Date().toISOString()
            },
            {
                id: 5,
                title: "The Odin Project",
                description: "Бесплатный учебный план для веб-разработчиков с реальными проектами.",
                link: "https://www.theodinproject.com/",
                tags: ["веб-разработка", "курсы", "проекты", "fullstack"],
                type: "course",
                category: "programming",
                dateAdded: new Date().toISOString()
            },
            {
                id: 6,
                title: "Kubernetes Docs",
                description: "Официальная документация по Kubernetes для DevOps инженеров.",
                link: "https://kubernetes.io/docs/",
                tags: ["devops", "kubernetes", "документация", "контейнеры"],
                type: "article",
                category: "devops",
                dateAdded: new Date().toISOString()
            },
            {
                id: 7,
                title: "Frontend Roadmap 2025: Что и зачем учить?",
                description: "Актуальная карта изучения Frontend с полного нуля. Рассмотрены только самые необходимые технологии для успешного старта карьеры.",
                link: "https://www.youtube.com/watch?v=c5zUbDDIKcE",
                tags: ["frontend", "roadmap", "карьера", "обучение", "видео"],
                type: "video",
                category: "career",
                dateAdded: new Date().toISOString()
            },
            {
                id: 8,
                title: "Yotako.io",
                description: "Инструмент для конвертации дизайна из Sketch и Adobe XD в код на различных языках и фреймворках с помощью ИИ. Обеспечивает синхронизацию между дизайном и кодом. Бесплатный с платными тарифами.",
                link: "https://yotako.io/",
                tags: ["инструменты", "дизайн", "ии", "конвертер", "frontend"],
                type: "tool",
                category: "design",
                dateAdded: new Date().toISOString()
            },
            {
                id: 9,
                title: "Полный курс по CSS Flexbox за 1 час",
                description: "Изучите технологию Flexbox с нуля и научитесь использовать её в своих проектах для удобного размещения элементов.",
                link: "https://www.youtube.com/watch?v=XXlw7TUxRVY",
                tags: ["css", "flexbox", "верстка", "обучение", "видео"],
                type: "video",
                category: "programming",
                dateAdded: new Date().toISOString()
            },
            {
                id: 10,
                title: "TypeScript в деталях: настраиваем tsconfig.json правильно",
                description: "Полное руководство по tsconfig.json: разбор каждого параметра и его влияния на разработку, сборку и поддержку TypeScript-проектов.",
                link: "https://proglib.io/p/typescript-v-detalyah-nastraivaem-tsconfig-json-pravilno-2024-11-21",
                tags: ["typescript", "настройка", "руководство", "статья"],
                type: "article",
                category: "programming",
                dateAdded: new Date().toISOString()
            },
            {
                id: 11,
                title: "Фреймворк Tailwind CSS: полный курс с нуля",
                description: "Научитесь работать с Tailwind CSS — фреймворком, который предоставляет готовые классы для быстрого создания пользовательских интерфейсов. В конце создадите веб-страницу новостного сайта.",
                link: "https://www.youtube.com/watch?v=rW38WPa4ekA",
                tags: ["tailwind", "css", "фреймворк", "курс", "видео", "frontend"],
                type: "video",
                category: "design",
                dateAdded: new Date().toISOString()
            },
            {
                id: 12,
                title: "Как добавить программируемый поиск от Google на свой сайт?",
                description: "Пошаговое руководство: создание, настройка поисковой системы от Google и встраивание кода на сайт.",
                link: "https://itchief.ru/javascript/programmable-gse",
                tags: ["поиск", "google", "веб-разработка", "интеграция", "статья"],
                type: "article",
                category: "programming",
                dateAdded: new Date().toISOString()
            },
            {
                id: 13,
                title: "Million Lint",
                description: "Расширение для VSCode для React, которое автоматически исправляет «медленный» код.",
                link: "https://marketplace.visualstudio.com/items?itemName=million.million-lint",
                tags: ["инструменты", "vscode", "react", "плагин", "оптимизация"],
                type: "tool",
                category: "programming",
                dateAdded: new Date().toISOString()
            },
            {
                id: 14,
                title: "Angular за 5 часов",
                description: "Обучение по созданию социальной сети на Angular: компоненты, API, роутинг, авторизация, RxJS и интерсепторы.",
                link: "https://www.youtube.com/watch?v=BVIffUyYlUk",
                tags: ["angular", "фреймворк", "курс", "видео", "frontend"],
                type: "video",
                category: "programming",
                dateAdded: new Date().toISOString()
            },
            {
                id: 15,
                title: "Siteliner",
                description: "Инструмент для SEO-анализа сайта. Поиск дублирующегося контента, неработающих ссылок и многое другое.",
                link: "https://www.siteliner.com/",
                tags: ["инструменты", "seo", "анализ", "оптимизация"],
                type: "tool",
                category: "other",
                dateAdded: new Date().toISOString()
            },
            {
                id: 16,
                title: "10 лучших CSS-библиотек и фреймворков для быстрой разработки фронтенда",
                description: "Подборка 10 инструментов, которые экономят время на фронтенде: от Bootstrap до Milligram.",
                link: "https://proglib.io/p/10-luchshih-css-bibliotek-i-freymvorkov-dlya-bystroy-razrabotki-frontenda-2024-10-30",
                tags: ["css", "фреймворки", "библиотеки", "frontend", "статья"],
                type: "article",
                category: "design",
                dateAdded: new Date().toISOString()
            },
            {
                id: 17,
                title: "CSS-генератор теней в стиле Neumorphism",
                description: "Онлайн-инструмент для создания красивой тени для элементов с гибкими настройками и возможностью копирования CSS-кода.",
                link: "https://neumorphism.io/",
                tags: ["инструменты", "css", "дизайн", "генератор", "neumorphism"],
                type: "tool",
                category: "design",
                dateAdded: new Date().toISOString()
            },
            {
                id: 18,
                title: "Топовые Linux инструменты",
                description: "Обзор инструментов для Linux, которые делают рабочий процесс удобнее и продуктивнее.",
                link: "https://youtu.be/AIht4qAgL6o?si=zqIHWT-p1IRilQzf",
                tags: ["linux", "инструменты", "обзор", "видео", "продуктивность"],
                type: "video",
                category: "other",
                dateAdded: new Date().toISOString()
            },
            {
                id: 19,
                title: "Logoit",
                description: "Бесплатный конструктор логотипов с готовыми шаблонами. Можно менять цвет, линии, угол наклона или использовать рандомную генерацию.",
                link: "https://logoit.ghostkode.com/",
                tags: ["инструменты", "дизайн", "логотипы", "конструктор", "бесплатно"],
                type: "tool",
                category: "design",
                dateAdded: new Date().toISOString()
            },
            {
                id: 20,
                title: "Amino Live CSS Editor",
                description: "Аддон, позволяющий отслеживать внешний вид сайта в реальном времени при написании CSS.",
                link: "https://aminoeditor.com/",
                tags: ["инструменты", "css", "плагин", "разработка", "real-time"],
                type: "tool",
                category: "programming",
                dateAdded: new Date().toISOString()
            },
            {
                id: 21,
                title: "AI Icon Generator",
                description: "Генератор логотипов, иконок и артов в PNG высокого качества по описанию без фона и вотермарок.",
                link: "https://ai-icon.top/",
                tags: ["инструменты", "ии", "дизайн", "иконки", "логотипы", "генератор"],
                type: "tool",
                category: "design",
                dateAdded: new Date().toISOString()
            },
            {
                id: 22,
                title: "ReactBits",
                description: "Огромная библиотека стильных анимаций для сайтов на React: анимации текста, кнопок, фона, кастомные курсоры, меню.",
                link: "https://www.reactbits.dev/",
                tags: ["react", "анимации", "библиотека", "ui", "frontend", "бесплатно"],
                type: "library",
                category: "design",
                dateAdded: new Date().toISOString()
            },
            {
                id: 23,
                title: "Awesome Russian IT",
                description: "Коллекция лучших IT-ресурсов на русском языке: библиотеки, фреймворки, статьи, книги, курсы, сообщества.",
                link: "https://github.com/unchase/awesome-russian-it",
                tags: ["коллекция", "ресурсы", "обучение", "github", "каталог"],
                type: "list",
                category: "other",
                dateAdded: new Date().toISOString()
            },
            {
                id: 24,
                title: "Advanced Bash-Scripting Guide",
                description: "Подробное руководство по написанию bash-скриптов на русском языке.",
                link: "https://www.opennet.ru/docs/RUS/bash_scripting_guide/",
                tags: ["bash", "скрипты", "linux", "руководство", "документация"],
                type: "article",
                category: "programming",
                dateAdded: new Date().toISOString()
            },
                {
                    id: 25,
                    title: "Dangerzone",
                    description: "Инструмент для превращения подозрительных PDF, документов и изображений в безопасные версии. Доступен для Windows, MacOS и Linux.",
                    link: "https://dangerzone.rocks/",
                    tags: ["безопасность", "инструменты", "конвертер", "windows", "macos", "linux"],
                    type: "tool",
                    category: "security",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 26,
                    title: "OverAPI.com",
                    description: "Коллекция шпаргалок по множеству языков программирования, фреймворков и технологий (Python, JavaScript, Git, MySQL и др.), отсортированных в алфавитном порядке.",
                    link: "https://overapi.com/",
                    tags: ["шпаргалки", "документация", "справочник", "программирование"],
                    type: "reference",
                    category: "programming",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 27,
                    title: "roadmap.sh Backend Project Ideas",
                    description: "Подборка идей для практики backend-разработки с проектами разного уровня сложности: от CLI-приложений до масштабируемых e-commerce платформ.",
                    link: "https://roadmap.sh/backend/projects",
                    tags: ["backend", "проекты", "идеи", "обучение", "практика"],
                    type: "program",
                    category: "programming",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 28,
                    title: "System Design Course by Karan Pratap Singh",
                    description: "Курс по системному дизайну от основ (IP-адреса) до сложных тем (кеширование, балансировка нагрузки). Включает реальные примеры для WhatsApp, Uber, Netflix.",
                    link: "https://github.com/karanpratapsingh/system-design",
                    tags: ["system design", "архитектура", "курс", "масштабирование", "github"],
                    type: "course",
                    category: "programming",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 29,
                    title: "MyIP",
                    description: "Усовершенствованный инструмент для работы с IP-адресами: проверка DNS-утечек, WebRTC-соединений, скорости интернета. Поддерживает темную тему и минималистичный режим.",
                    link: "https://github.com/jason5ng32/MyIP",
                    tags: ["инструменты", "сеть", "ip", "безопасность", "opensource"],
                    type: "tool",
                    category: "security",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 30,
                    title: "Подборка нейросетей для контента",
                    description: "Коллекция полезных ИИ-инструментов: генерация видео (ZebraCat AI), создание резюме (KickResume), продающие изображения (Pebblely), команды для ChatGPT (PromptStacks) и другие.",
                    link: "https://t.me/skladprogrammista",
                    tags: ["ии", "нейросети", "контент", "инструменты", "генерация"],
                    type: "list",
                    category: "ai",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 31,
                    title: "VisuAlgo",
                    description: "Визуализированное изучение алгоритмов и структур данных с анимациями, возможностью ввода своих данных и прохождения викторин.",
                    link: "https://visualgo.net/en",
                    tags: ["алгоритмы", "структуры данных", "обучение", "визуализация"],
                    type: "interactive",
                    category: "programming",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 32,
                    title: "Что такое XSS-уязвимость?",
                    description: "Статья о том, как работает XSS, почему браузеры доверяют вредоносному коду и как защитить сайт от таких атак.",
                    link: "https://thecode.media/chto-takoe-xss-uyazvimost/",
                    tags: ["безопасность", "xss", "веб-разработка", "статья"],
                    type: "article",
                    category: "security",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 33,
                    title: "Clone Wars",
                    description: "Коллекция опенсорсных клонов популярных сервисов (Airbnb, YouTube и др.) с исходным кодом, демками и описанием стека технологий.",
                    link: "https://github.com/gorvgoyl/clone-wars",
                    tags: ["проекты", "клоны", "опенсорс", "обучение", "github"],
                    type: "list",
                    category: "programming",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 34,
                    title: "Vue JS: полный курс c нуля",
                    description: "Видеокурс по Vue 3: основы, работа с данными, компоненты, взаимодействие с сервером, оптимизация, развертывание.",
                    link: "https://www.youtube.com/watch?v=1rRD9uMF92o",
                    tags: ["vue", "javascript", "фреймворк", "курс", "видео", "frontend"],
                    type: "video",
                    category: "programming",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 35,
                    title: "Streamlit",
                    description: "Фреймворк для создания интерактивных веб-приложений на Python (дашборды, отчеты, чаты). Развертывание на Community Cloud.",
                    link: "https://streamlit.io/",
                    tags: ["python", "фреймворк", "веб-приложения", "дашборды"],
                    type: "library",
                    category: "programming",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 36,
                    title: "InstaCharts",
                    description: "Онлайн-сервис для быстрого создания визуализаций данных (графики, диаграммы) в браузере с использованием готовых шаблонов.",
                    link: "https://instacharts.io/",
                    tags: ["инструменты", "визуализация", "данные", "графики"],
                    type: "tool",
                    category: "data",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 37,
                    title: "Screenshot-to-Code",
                    description: "Инструмент для преобразования скриншотов, макетов и дизайнов Figma в чистый код с использованием ИИ (Claude Sonnet 3.5, GPT-4o).",
                    link: "https://github.com/abi/screenshot-to-code",
                    tags: ["ии", "инструменты", "конвертер", "figma", "frontend", "opensource"],
                    type: "tool",
                    category: "ai",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 38,
                    title: "Веб-приложение для прогноза погоды на Vue JS",
                    description: "Статья о создании проекта на Vue JS для получения данных о погоде с помощью API OpenWeatherMap. Прилагается исходный код.",
                    link: "https://tproger.ru/articles/prilozhenie-dlya-prognoza-pogody-na-vue-js",
                    tags: ["vue", "javascript", "api", "проект", "статья", "frontend"],
                    type: "article",
                    category: "programming",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 39,
                    title: "QuillBot",
                    description: "Нейросеть для написания и обработки текстов: перефразирование, проверка грамматики, антиплагиат, саммаризация, перевод.",
                    link: "https://quillbot.com/",
                    tags: ["ии", "текст", "письмо", "образование", "инструменты"],
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
    }
        ];
        saveResources();
    }

    init();
    
    function init() {
        displayResources(resources);
        updateStats();
        
        searchInput.addEventListener('input', filterResources);
        typeFilter.addEventListener('change', filterResources);
        categoryFilter.addEventListener('change', filterResources);
        
        clearFilters.addEventListener('click', function() {
            searchInput.value = '';
            typeFilter.value = '';
            categoryFilter.value = '';
            filterResources();
        });
    }
    
    function filterResources() {
        const searchTerm = searchInput.value.toLowerCase();
        const typeValue = typeFilter.value;
        const categoryValue = categoryFilter.value;
        
        const filtered = resources.filter(resource => {
            const matchesSearch = resource.title.toLowerCase().includes(searchTerm) ||
                                resource.description.toLowerCase().includes(searchTerm) ||
                                resource.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            
            const matchesType = typeValue ? resource.type === typeValue : true;
            const matchesCategory = categoryValue ? resource.category === categoryValue : true;
            
            return matchesSearch && matchesType && matchesCategory;
        });
        
        displayResources(filtered);
    }
    
    function displayResources(resourcesToDisplay) {
        resourcesList.innerHTML = '';
        
        if (resourcesToDisplay.length === 0) {
            resourcesList.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>Ничего не найдено</h3>
                    <p>Попробуйте изменить параметры поиска или фильтры</p>
                </div>
            `;
            return;
        }
        
        resourcesToDisplay.forEach(resource => {
            const resourceCard = document.createElement('div');
            resourceCard.className = 'resource-card';
            
            // Форматируем теги - обрезаем слишком длинные и добавляем классы
            const formattedTags = resource.tags.map(tag => {
                const isLongTag = tag.length > 15;
                return `<span class="tag ${isLongTag ? 'long-tag' : ''}" title="${tag}">#${tag}</span>`;
            }).join('');
            
            resourceCard.innerHTML = `
                <h3>${resource.title}</h3>
                <p class="description">${resource.description}</p>
                <a href="${resource.link}" target="_blank" class="link">
                    <i class="fas fa-external-link-alt"></i> Перейти к материалу
                </a>
                <div class="meta">
                    <span class="type">${getTypeLabel(resource.type)}</span>
                    ${resource.category ? `<span class="category">${getCategoryLabel(resource.category)}</span>` : ''}
                </div>
                <div class="tags">
                    ${formattedTags}
                </div>
            `;
            
            resourcesList.appendChild(resourceCard);
        });
    }
    
    
    function updateStats() {
        totalResources.textContent = resources.length;
        
        const categories = new Set(resources.map(r => r.category).filter(Boolean));
        uniqueCategories.textContent = categories.size;
    }
    
    function getTypeLabel(type) {
        const types = {
            'course': '📚 Курс',
            'program': '🎯 Программа',
            'book': '📖 Книга',
            'article': '📄 Статья',
            'video': '🎥 Видео',
            'tool': '🛠️ Инструмент',
            'library': '📦 Библиотека',
            'list': '📋 Список'
        };
        return types[type] || type;
    }
    
    function getCategoryLabel(category) {
        const categories = {
            'programming': '💻 Программирование',
            'design': '🎨 Дизайн',
            'devops': '⚙️ DevOps',
            'data-science': '📊 Data Science',
            'cybersecurity': '🔐 Кибербезопасность',
            'career': '🚀 Карьера',
            'other': '🔍 Другое'
        };
        return categories[category] || category;
    }
    
    function saveResources() {
        localStorage.setItem('it-huishniki-resources', JSON.stringify(resources));
        updateStats();
    }
});