document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    const submenus = document.querySelectorAll('.nav-item.has-submenu');
    const pageContent = document.getElementById('page-content');

    // Sidebar navigation
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            const page = this.getAttribute('data-page');
            if (page) {
                fetch(page)
                    .then(res => res.text())
                    .then(html => {
                        pageContent.innerHTML = html;
                        window.scrollTo(0, 0);
                    });
            }
        });
    });

    // Submenu toggle
    submenus.forEach(menu => {
        menu.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('open');
        });
    });

    // Load default page
    const defaultPage = document.querySelector('.nav-item.active').getAttribute('data-page');
    if (defaultPage) {
        fetch(defaultPage)
            .then(res => res.text())
            .then(html => {
                pageContent.innerHTML = html;
            });
    }
}); 