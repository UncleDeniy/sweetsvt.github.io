# CSS Grid и Flexbox: Современные методы верстки

**Автор:** Syntax_Syndicate  
**Категория:** Дизайн → Фронтенд  
**Дата публикации:** 25.09.2025  

---

## Эволюция CSS-верстки

От таблиц и флоатов к современным системам компоновки! CSS Grid и Flexbox revolutionized подход к созданию макетов, предлагая мощные и интуитивно понятные инструменты для построения сложных layouts.

### 📊 Когда что использовать?
- **Flexbox** — для одномерных布局ов (строка ИЛИ колонка)
- **CSS Grid** — для двумерных компоновок (и строка, И колонка)

---

## 1. Flexbox: Гибкие контейнеры

### Основная концепция
Flexbox работает по принципу **контейнер → элементы**. Вы определяете контейнер как flex, а затем управляете расположением дочерних элементов.

### Создание flex-контейнера:
```css
.container {
    display: flex;
    /* или */
    display: inline-flex;
}
```

### Основные свойства контейнера:
```css
.container {
    display: flex;
    flex-direction: row; /* row | row-reverse | column | column-reverse */
    justify-content: center; /* выравнивание по главной оси */
    align-items: stretch; /* выравнивание по поперечной оси */
    flex-wrap: wrap; /* перенос элементов */
    gap: 20px; /* расстояние между элементами */
}
```

### Свойства flex-элементов:
```css
.item {
    flex: 1; /* коэффициент роста/сжатия */
    align-self: center; /* индивидуальное выравнивание */
    order: 2; /* порядок отображения */
}
```

### Практический пример:
```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #333;
}

.logo {
    font-size: 1.5rem;
    color: white;
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}
```

---

## 2. CSS Grid: Двумерные сетки

### Основная концепция
CSS Grid позволяет создавать сложные двумерные макеты с точным контролем над строками и колонками.

### Создание grid-контейнера:
```css
.container {
    display: grid;
    /* или */
    display: inline-grid;
}
```

### Определение сетки:
```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr 1fr; /* три колонки */
    grid-template-rows: 100px auto 200px; /* три строки */
    gap: 20px; /* расстояние между ячейками */
    grid-template-areas: 
        "header header header"
        "sidebar content content"
        "footer footer footer";
}
```

### Размещение элементов:
```css
.header {
    grid-area: header; /* по имени области */
}

.sidebar {
    grid-column: 1 / 2; /* от линии 1 до 2 */
    grid-row: 2 / 3; /* от линии 2 до 3 */
}

.content {
    grid-column: 2 / 4; /* занимает две колонки */
    grid-row: 2 / 3;
}
```

### Функции для гибких сеток:
```css
.container {
    grid-template-columns: repeat(3, 1fr); /* три равных колонки */
    grid-template-columns: minmax(200px, 1fr) 2fr; /* адаптивные колонки */
    grid-auto-rows: minmax(100px, auto); /* автоматические строки */
}
```

---

## 3. Практические примеры компоновки

### 🎯 Пример 1: Карточки товаров (Flexbox)
```css
.products-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.product-card {
    flex: 1;
    min-width: 250px;
    max-width: 300px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}
```

### 🎯 Пример 2: Блог-макет (CSS Grid)
```css
.blog-layout {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: 
        "header header header"
        "sidebar main ads"
        "footer footer footer";
    min-height: 100vh;
    gap: 30px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.ads { grid-area: ads; }
.footer { grid-area: footer; }
```

### 🎯 Пример 3: Адаптивная навигация (Комбинированный)
```css
@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        gap: 10px;
    }
    
    .nav-links {
        flex-direction: column;
        text-align: center;
    }
}
```

---

## 4. Совместное использование Grid и Flexbox

### 💡 Лучшие практики:
- Используйте **Grid** для общего макета страницы
- Используйте **Flexbox** для компонентов внутри grid-ячеек
- Комбинируйте для сложных адаптивных интерфейсов

### Пример комбинирования:
```css
.page-layout {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 30px;
}

.sidebar {
    /* Grid item, но внутри используем Flexbox */
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.widget {
    /* Flexbox для внутренней организации */
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px;
    background: #f8f9fa;
}
```

---

## 5. Адаптивность и современные техники

### Адаптивные сетки:
```css
.responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}
```

### Медиа-запросы для разных устройств:
```css
/* Мобильные */
@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
        grid-template-areas: 
            "header"
            "main"
            "sidebar"
            "footer";
    }
}

/* Планшеты */
@media (min-width: 769px) and (max-width: 1024px) {
    .container {
        grid-template-columns: 1fr 2fr;
        grid-template-areas: 
            "header header"
            "sidebar main"
            "footer footer";
    }
}
```

---

## 6. Инструменты и ресурсы для отладки

### Браузерные DevTools:
- **Firefox** — лучшие инструменты для Grid/Flexbox
- **Chrome** — отличная визуализация grid-линий
- **Edge** — современные возможности отладки

### Полезные онлайн-инструменты:
- **CSS Grid Generator** — визуальное создание grid-сеток
- **Flexbox Froggy** — игровое обучение Flexbox
- **Grid Garden** — интерактивное изучение CSS Grid

---

## 7. Производительность и лучшие практики

### ⚡ Оптимизация:
```css
/* Хорошо */
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* Избегайте чрезмерной вложенности */
.nested-grid {
    display: grid;
    /* Вместо множества вложенных grid-контейнеров */
}
```

### 🎨 Семантические имена:
```css
/* Используйте осмысленные имена для grid-areas */
grid-template-areas: 
    "site-header site-header"
    "main-content sidebar"
    "site-footer site-footer";
```

---

## Заключение

CSS Grid и Flexbox — это не конкурирующие технологии, а **дополняющие друг друга инструменты**. Освоив оба подхода, вы получите полный контроль над версткой современных веб-интерфейсов.

**Ключевые принципы:**
- Используйте Grid для макета страницы
- Используйте Flexbox для компонентов
- Комбинируйте для максимальной гибкости
- Тестируйте на разных устройствах

---

*Лекция подготовлена Syntax_Syndicate. Сетки — это искусство, а Flexbox — его гибкая кисть. Создавайте с умом!*