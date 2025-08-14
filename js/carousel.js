// Данные проектов
const projectsData = [
    {
      id: 'weather-app',
      title: 'WeatherVision Pro',
      description: 'Умное приложение для прогноза погоды с красивым интерфейсом',
      image: '../images/projects/WeatherVision.png',
      demoUrl: 'https://uncledeniy.github.io/weather-app.github.io/',
      codeUrl: 'https://github.com/UncleDeniy/weather-app.github.io',
      tags: ['JavaScript', 'API', 'CSS3']
    },
    {
      id: 'retro-game',
      title: 'Galaxy Defender',
      description: 'Ретро-аркада в стиле классических космических шутеров',
      image: '../images/projects/galaxy_defender.png',
      demoUrl: 'https://uncledeniy.github.io/retro-game.github.io/',
      codeUrl: 'https://github.com/UncleDeniy/retro-game.github.io',
      tags: ['JavaScript', 'Canvas', 'HTML5']
    }
  ];
  
  function initCarousel() {
    const carousel = document.querySelector('.carousel-container');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    // Заполняем карусель проектами
    projectsData.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.dataset.projectId = project.id;
      projectCard.innerHTML = `
        <div class="project-image" style="background-image: url('${project.image}')"></div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
      `;
      carousel.appendChild(projectCard);
    });
    
    // Навигация карусели
    let scrollAmount = 0;
    const scrollStep = 330;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    
    nextBtn.addEventListener('click', () => {
      scrollAmount += scrollStep;
      if (scrollAmount > maxScroll) scrollAmount = maxScroll;
      carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });
    
    prevBtn.addEventListener('click', () => {
      scrollAmount -= scrollStep;
      if (scrollAmount < 0) scrollAmount = 0;
      carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });
    
    // 3D эффект при наведении
    carousel.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleY = (x - centerX) / 20;
        const angleX = (centerY - y) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
      });
    });
    
    carousel.addEventListener('mouseleave', () => {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }