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
    
    // --- initial load secuence ---
    setTimeout(() => {
        if (nombreSvg) {
            nombreSvg.style.opacity = '1';
            nombreSvg.style.pointerEvents = 'auto';
        }
    }, 300);
    
    setTimeout(() => {
        logoTrigger.style.opacity = '1';
        logoTrigger.style.pointerEvents = 'auto';
    }, 1000);
    
    // initial scroll blockage
    body.style.overflow = 'hidden';
    
    // logo 'click' listener 
    logoTrigger.addEventListener('click', (event) => {
        event.preventDefault();
        if (nombreSvg) {
            nombreSvg.style.opacity = '0';
        }
        
        const rect = logoTrigger.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const finalRadius = Math.hypot(window.innerWidth, window.innerHeight);
        
        // radiance stoppage once clicked
        logoTrigger.classList.add('animation-stopped');
        
        // instantaneoues scale reduction start
        logoTrigger.style.transform = 'translateX(-50%) scale(0)';
        logoTrigger.style.transition = 'transform 0.7s cubic-bezier(0.7, 0, 0.3, 1)';
        
        portada.style.setProperty('--x', `${centerX}px`);
        portada.style.setProperty('--y', `${centerY}px`);
        portada.style.setProperty('--mask-size', `${finalRadius}px`);
        
        // listening for the transition animation to end
        portada.addEventListener('transitionend', () => {
            // Hide elements after animation stopped
            portada.style.display = 'none';
            logoTrigger.style.display = 'none'; 
            if (nombreSvg) {
                nombreSvg.style.display = 'none';
            }
            
            body.style.overflow = '';
            
            // Mobile functionality after portfolio load
            initMobileTouchHandlers();
            
        }, { once: true });
    });
});

function initMobileTouchHandlers() {
    // is it mobile?
    function isMobileDevice() {
        return window.innerWidth <= 800;
    }
    
    // just apply it on mobile
    if (isMobileDevice()) {
        const boxes = document.querySelectorAll('.box');
        let activeBox = null;
        
        boxes.forEach(box => {
            box.addEventListener('click', function(e) {
                // If click is on youtube link do not disturb
                if (e.target.closest('.youtube-link, .youtube-link2, .video-link')) {
                    return; // Permitir que el enlace funcione normalmente
                }
                
                e.preventDefault();
                e.stopPropagation();
                
                // if its active, de-activate it
                if (activeBox === this) {
                    this.classList.remove('mobile-active');
                    activeBox = null;
                    return;
                }
                
                // De-activate any previous active box 
                if (activeBox) {
                    activeBox.classList.remove('mobile-active');
                }
                
                // Activate new box
                this.classList.add('mobile-active');
                activeBox = this;
            });
        });
        
        // Close any active box once clicked away (out)
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.box') && activeBox) {
                activeBox.classList.remove('mobile-active');
                activeBox = null;
            }
        });
        
        // Handle resize/orientation changes
        window.addEventListener('resize', function() {
            if (window.innerWidth > 800 && activeBox) {
                activeBox.classList.remove('mobile-active');
                activeBox = null;
            }
        });
    }
}