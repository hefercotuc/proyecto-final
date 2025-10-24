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

});