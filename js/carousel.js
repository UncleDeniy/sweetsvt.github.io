// Данные проектов
const projectsData = [
    {
      id: 'project1',
      title: 'Интернет-магазин',
      description: 'Полнофункциональный интернет-магазин с корзиной и системой оплаты, разработанный на React и Node.js',
      image: 'project1.jpg',
      demoUrl: '#',
      codeUrl: '#',
      tags: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 'project2',
      title: 'Погодное приложение',
      description: 'Приложение для просмотра погоды с использованием API OpenWeatherMap',
      image: 'project2.jpg',
      demoUrl: '#',
      codeUrl: '#',
      tags: ['JavaScript', 'API', 'CSS3']
    },
    {
      id: 'project3',
      title: 'Игра на JavaScript',
      description: 'Классическая аркада с использованием Canvas API',
      image: 'https://github.com/UncleDeniy/sweetsvt.github.io/blob/main/images/projects/galaxy_defender.png',
      demoUrl: '#',
      codeUrl: '#',
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
        <div class="project-image" style="background-image: url('assets/projects/${project.image}')"></div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description.substring(0, 100)}...</p>
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
        card.style.boxShadow = `0 20px 30px rgba(0,0,0,0.4)`;
      });
    });
    
    carousel.addEventListener('mouseleave', () => {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
      });
    });
  }
