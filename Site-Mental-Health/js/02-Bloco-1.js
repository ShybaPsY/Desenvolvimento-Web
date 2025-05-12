document.addEventListener('DOMContentLoaded', function() {// js para scrolar até o topo da página
    const linkTopo = document.getElementById('link-topo');
    
    if (linkTopo) {
        linkTopo.addEventListener('click', function(e) {
            e.preventDefault();
    
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            history.pushState(null, null, ' ');
        });
    }
});
