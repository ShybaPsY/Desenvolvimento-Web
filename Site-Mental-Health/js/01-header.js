document.addEventListener('DOMContentLoaded', function() {// JavaScript para controlar o dropdown do menu mobile

    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const menuMobile = document.getElementById('menu-mobile');
    const overlay = document.getElementById('overlay');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuMobile.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            menuMobile.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', function() {
            menuMobile.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Controle do dropdown no menu mobile
    const dropdownToggle = document.getElementById('dropdown-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const dropdownParent = dropdownToggle ? dropdownToggle.closest('.dropdown') : null;
    
    if (dropdownToggle && dropdownMenu && dropdownParent) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            dropdownMenu.classList.toggle('show');
            
            dropdownParent.classList.toggle('open');
            
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            
            if (dropdownMenu.classList.contains('show')) {
                setTimeout(() => {
                    dropdownToggle.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    }
    document.addEventListener('click', function(e) {
        if (dropdownMenu && dropdownMenu.classList.contains('show') && 
            !dropdownParent.contains(e.target)) {
            dropdownMenu.classList.remove('show');
            dropdownParent.classList.remove('open');
            dropdownToggle.setAttribute('aria-expanded', 'false');
        }
    });
});