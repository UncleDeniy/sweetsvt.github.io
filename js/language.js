function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');
    const html = document.documentElement;
    
    // Переводы
    const translations = {
      ru: {
        "subtitle": "Frontend разработчик",
        "about": "Обо мне",
        "about-text1": "Привет! Меня зовут Денис, мне 20 лет. Я занимаюсь веб-разработкой уже 2 года.",
        "about-text2": "Специализируюсь на создании современных, интерактивных пользовательских интерфейсов.",
        "skills": "Навыки",
        "projects": "Мои проекты",
        "contact": "Контакты",
        "name-placeholder": "Имя",
        "email-placeholder": "Email",
        "message-placeholder": "Сообщение",
        "send-button": "Отправить"
      },
      en: {
        "subtitle": "Frontend Developer",
        "about": "About me",
        "about-text1": "Hi! My name is Denis, I'm 20 years old. I've been doing web development for 2 years.",
        "about-text2": "I specialize in creating modern, interactive user interfaces.",
        "skills": "Skills",
        "projects": "My projects",
        "contact": "Contact",
        "name-placeholder": "Name",
        "email-placeholder": "Email",
        "message-placeholder": "Message",
        "send-button": "Send"
      }
    };
    
    // Переключение языка
    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        html.setAttribute('data-lang', lang);
        
        // Обновляем активную кнопку
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Применяем перевод
        translatePage(lang);
      });
    });
    
    function translatePage(lang) {
      const elements = document.querySelectorAll('[data-key]');
      elements.forEach(el => {
        const key = el.dataset.key;
        if (translations[lang] && translations[lang][key]) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = translations[lang][key];
          } else {
            el.textContent = translations[lang][key];
          }
        }
      });
    }
  }