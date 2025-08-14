// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    // Анимация появления секций при скролле
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(section => observer.observe(section));
    
    // Инициализация карусели проектов
    initCarousel();
    
    // Инициализация переключателя языка
    initLanguageSwitcher();
    
    // Модальное окно проекта
    setupProjectModal();
  });
  
  function setupProjectModal() {
    const modal = document.querySelector('.project-modal');
    const closeBtn = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');
    
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const projectId = card.dataset.projectId;
        loadProjectDetails(projectId);
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });
    
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
      
    function checkImagesLoaded() {
  const images = document.querySelectorAll('img');
  let loadedCount = 0;
  
  images.forEach(img => {
    if (img.complete) {
      loadedCount++;
    } else {
      img.addEventListener('load', () => {
        loadedCount++;
        if (loadedCount === images.length) {
          document.querySelector('.loading-screen').style.display = 'none';
        }
      });
      img.addEventListener('error', () => {
        console.error('Error loading image:', img.src);
        loadedCount++;
      });
    }
  });
  
  if (loadedCount === images.length) {
    document.querySelector('.loading-screen').style.display = 'none';
  }
} 
    function loadProjectDetails(id) {
      // Здесь будет загрузка данных проекта
      const project = projectsData.find(p => p.id === id);
      if (project) {
        modalBody.innerHTML = `
          <div class="modal-project">
            <div class="modal-image" style="background-image: url('${project.image}')"></div>
            <div class="modal-text">
              <h3>${project.title}</h3>
              <p>${project.description}</p>
              <div class="modal-links">
                <a href="${project.demoUrl}" class="btn" target="_blank">Демо</a>
                <a href="${project.codeUrl}" class="btn" target="_blank">Код</a>
              </div>
            </div>
          </div>
        `;
      }
    }
  }
