document.addEventListener('DOMContentLoaded', function() {

    const searchInput = document.getElementById('faqSearchInput');
    const expandAllBtn = document.getElementById('expandAllBtn');
    const collapseAllBtn = document.getElementById('collapseAllBtn');
    const categoryBtns = document.querySelectorAll('.faq-category-btn');
    const accordionItems = document.querySelectorAll('.block_inside-item');
    
    const firstButton = document.querySelector('.block_inside-button');
    if (firstButton) {
        firstButton.classList.add('collapsed');
        firstButton.setAttribute('aria-expanded', 'false');
        
        const firstCollapse = document.getElementById('faq1');
        if (firstCollapse) {
            firstCollapse.classList.remove('show');
        }
    }
    
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                
                categoryBtns.forEach(b => b.classList.remove('active'));
                
                
                this.classList.add('active');
                
                const category = this.dataset.category;
                
                accordionItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Funcionalidade de expandir todos
    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', function() {
            const collapseElements = document.querySelectorAll('.block_inside-collapse');
            const buttons = document.querySelectorAll('.block_inside-button');
            
            collapseElements.forEach(el => {
                el.classList.add('show');
            });
            
            buttons.forEach(btn => {
                btn.classList.remove('collapsed');
                btn.setAttribute('aria-expanded', 'true');
            });
        });
    }
    
    // Funcionalidade de recolher todos
    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', function() {
            const collapseElements = document.querySelectorAll('.block_inside-collapse');
            const buttons = document.querySelectorAll('.block_inside-button');
            
            collapseElements.forEach(el => {
                el.classList.remove('show');
            });
            
            buttons.forEach(btn => {
                btn.classList.add('collapsed');
                btn.setAttribute('aria-expanded', 'false');
            });
        });
    }
});