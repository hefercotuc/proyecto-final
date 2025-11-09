// Espera a que todo el contenido (DOM) esté cargado
document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. LÓGICA DEL TOGGLE DE TEMA (MODO CLARO/OSCURO) ---
  const themeToggle = document.getElementById('toggle');
  const body = document.body;

  // Función para aplicar el tema
  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light');
    } else {
      body.classList.remove('light');
    }
  }

  // Cargar el tema guardado en localStorage (si existe)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  // Evento al hacer clic en el botón
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    // Guardar la preferencia en localStorage
    if (body.classList.contains('light')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  });


  // --- 2. LÓGICA DE VENTANAS MODALES ---

  // Selecciona todas las tarjetas que tienen el atributo [data-modal]
  const modalTriggers = document.querySelectorAll('[data-modal]');
  
  // Selecciona TODOS los botones de cierre (las 'X') dentro de los modales
  const closeButtons = document.querySelectorAll('.modal .close');

  // A. Añadir evento para ABRIR el modal
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
      
      // Previene que el enlace <a href="#"> dentro de la card recargue la página
      if (event.target.closest('a')) {
        event.preventDefault();
      }

      // Obtiene el ID del modal desde el atributo (ej: "modal1")
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);

      // Si el modal existe, lo muestra
      if (modal) {
        modal.style.display = 'block';
      }
    });
  });

  // B. Añadir evento para CERRAR el modal con la 'X'
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Busca el modal "padre" más cercano y lo oculta
      const modal = button.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });

  // C. Añadir evento para CERRAR el modal haciendo clic en el fondo oscuro
  window.addEventListener('click', (event) => {
    // Si el elemento clickeado es directamente el fondo (la clase .modal)
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  });

  // --- 3. NAVEGACIÓN ENTRE MODALES (MODAL3 Y RECOMENDACIONES) ---

  // Abrir modal de recomendaciones desde modal principal
  const openRecommendationsBtn = document.getElementById('open-recommendations');
  if (openRecommendationsBtn) {
    openRecommendationsBtn.addEventListener('click', function() {
      // Cerrar modal principal
      const modal3 = document.getElementById('modal3');
      if (modal3) {
        modal3.style.display = 'none';
      }
      
      // Abrir modal de recomendaciones
      const recommendationsModal = document.getElementById('modal3-recommendations');
      if (recommendationsModal) {
        recommendationsModal.style.display = 'block';
      }
    });
  }

  // Volver al modal principal desde el botón superior de recomendaciones
  const backToMainBtn = document.getElementById('back-to-main');
  if (backToMainBtn) {
    backToMainBtn.addEventListener('click', function() {
      // Cerrar modal de recomendaciones
      const recommendationsModal = document.getElementById('modal3-recommendations');
      if (recommendationsModal) {
        recommendationsModal.style.display = 'none';
      }
      
      // Abrir modal principal
      const modal3 = document.getElementById('modal3');
      if (modal3) {
        modal3.style.display = 'block';
      }
    });
  }

  // Volver al modal principal desde el botón inferior de recomendaciones
  const backToMainBottomBtn = document.getElementById('back-to-main-bottom');
  if (backToMainBottomBtn) {
    backToMainBottomBtn.addEventListener('click', function() {
      // Cerrar modal de recomendaciones
      const recommendationsModal = document.getElementById('modal3-recommendations');
      if (recommendationsModal) {
        recommendationsModal.style.display = 'none';
      }
      
      // Abrir modal principal
      const modal3 = document.getElementById('modal3');
      if (modal3) {
        modal3.style.display = 'block';
      }
    });
  }

  // Cerrar modal de recomendaciones con la X específica
  const closeRecommendations = document.querySelector('.close-recommendations');
  if (closeRecommendations) {
    closeRecommendations.addEventListener('click', function() {
      const recommendationsModal = document.getElementById('modal3-recommendations');
      if (recommendationsModal) {
        recommendationsModal.style.display = 'none';
      }
    });
  }

});

// --- 4. FUNCIONALIDAD SOBRE NOSOTROS ---

// Abrir modal Sobre Nosotros
const sobreNosotrosLink = document.getElementById('sobre-nosotros-link');
if (sobreNosotrosLink) {
    sobreNosotrosLink.addEventListener('click', function(event) {
        event.preventDefault();
        const sobreNosotrosModal = document.getElementById('modal-sobre-nosotros');
        if (sobreNosotrosModal) {
            sobreNosotrosModal.style.display = 'block';
        }
    });
}

// Cerrar modal Sobre Nosotros con la X
const closeSobreNosotros = document.querySelector('#modal-sobre-nosotros .close');
if (closeSobreNosotros) {
    closeSobreNosotros.addEventListener('click', function() {
        const sobreNosotrosModal = document.getElementById('modal-sobre-nosotros');
        if (sobreNosotrosModal) {
            sobreNosotrosModal.style.display = 'none';
        }
    });
}

// --- 5. FUNCIONALIDAD DE BÚSQUEDA EN GLOSARIO ---
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-glosario');
    const glosarioContent = document.getElementById('glosario-content');
    
    if (searchInput && glosarioContent) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const termCards = glosarioContent.querySelectorAll('.termino-card');
            
            termCards.forEach(card => {
                const term = card.getAttribute('data-term').toLowerCase();
                const termText = card.textContent.toLowerCase();
                
                if (term.includes(searchTerm) || termText.includes(searchTerm)) {
                    card.classList.remove('hidden');
                    card.classList.add('highlight');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('highlight');
                }
            });
        });
    }
});