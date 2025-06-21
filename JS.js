window.addEventListener('load', () => {
    // elements selection
    const logoTrigger = document.getElementById('logo-trigger');
    const nombreSvg = document.getElementById('nombre-svg');
    const portada = document.getElementById('portada');
    const body = document.body;
    
    // do elements exist?
    if (!logoTrigger || !portada || !body) {
        console.error("Error: No se encontraron los elementos necesarios. Revisa el HTML.");
        return;
    }
    if (!nombreSvg) {
        console.warn("Advertencia: No se encontró el elemento #nombre-svg");
    }
    
    // --- SECUENCIA DE PRESENTACIÓN ORDENADA ---
    
    // 1. Asegurar que la página esté completamente cargada y el fondo azul visible
    // (La portada ya es visible por CSS)
    
    // 2.nombre después de 800ms
    setTimeout(() => {
        if (nombreSvg) {
            nombreSvg.style.opacity = '1';
            nombreSvg.style.pointerEvents = 'auto';
        }
    }, 800);
    
    // 3.logo después de 1500ms (700ms después del nombre)
    setTimeout(() => {
        logoTrigger.style.opacity = '1';
        logoTrigger.style.pointerEvents = 'auto';
    }, 1500);
    
    // scroll bloqueado inicialmente
    body.style.overflow = 'hidden';
    
    // logo 'click' listener 
    logoTrigger.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Ocultar nombre inmediatamente
        if (nombreSvg) {
            nombreSvg.style.opacity = '0';
        }
        
        const rect = logoTrigger.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const finalRadius = Math.hypot(window.innerWidth, window.innerHeight);
        
        // Detener animación de radiancia una vez clickeado
        logoTrigger.classList.add('animation-stopped');
        
        // Reducir escala del logo instantáneamente
        logoTrigger.style.transform = 'translateX(-50%) scale(0)';
        logoTrigger.style.transition = 'transform 0.7s cubic-bezier(0.7, 0, 0.3, 1)';
        
        // Configurar máscara para la transición
        portada.style.setProperty('--x', `${centerX}px`);
        portada.style.setProperty('--y', `${centerY}px`);
        portada.style.setProperty('--mask-size', `${finalRadius}px`);
        
        // Escuchar el final de la transición de la máscara
        portada.addEventListener('transitionend', () => {
            // Ocultar elementos después de la animación
            portada.style.display = 'none';
            logoTrigger.style.display = 'none'; 
            if (nombreSvg) {
                nombreSvg.style.display = 'none';
            }
            
            // Permitir scroll y mostrar contenido del portfolio
            body.style.overflow = '';
            body.classList.add('portfolio-loaded');
            
            // Inicializar funcionalidad móvil después de cargar portfolio
            initMobileTouchHandlers();
            
        }, { once: true });
    });
});

function initMobileTouchHandlers() {
    // ¿es dispositivo móvil?
    function isMobileDevice() {
        return window.innerWidth <= 800;
    }
    
    // Solo aplicar en móvil
    if (isMobileDevice()) {
        const boxes = document.querySelectorAll('.box');
        let activeBox = null;
        
        boxes.forEach(box => {
            box.addEventListener('click', function(e) {
                // Si el click es en un enlace de youtube no interferir
                if (e.target.closest('.youtube-link, .youtube-link2, .video-link')) {
                    return; // Permitir que el enlace funcione normalmente
                }
                
                e.preventDefault();
                e.stopPropagation();
                
                // Si ya está activo, desactivarlo
                if (activeBox === this) {
                    this.classList.remove('mobile-active');
                    activeBox = null;
                    return;
                }
                
                // Desactivar cualquier box activo anterior
                if (activeBox) {
                    activeBox.classList.remove('mobile-active');
                }
                
                // Activar nuevo box
                this.classList.add('mobile-active');
                activeBox = this;
            });
        });
        
        // Cerrar cualquier box activo al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.box') && activeBox) {
                activeBox.classList.remove('mobile-active');
                activeBox = null;
            }
        });
        
        // Manejar cambios de tamaño/orientación
        window.addEventListener('resize', function() {
            if (window.innerWidth > 800 && activeBox) {
                activeBox.classList.remove('mobile-active');
                activeBox = null;
            }
        });
    }
}