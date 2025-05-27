document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    const submenus = document.querySelectorAll('.nav-item.has-submenu');
    const pageContent = document.getElementById('page-content');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');

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
                        setTimeout(() => pageContent.classList.add('loaded'), 10);
                    });
            }
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 900) {
                sidebar.classList.remove('open');
                sidebarBackdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Submenu toggle
    submenus.forEach(menu => {
        menu.addEventListener('click', function(e) {
            e.stopPropagation();
            // Close all other submenus
            submenus.forEach(m => {
                if (m !== this) m.classList.remove('open');
            });
            // Toggle this submenu
            this.classList.toggle('open');
        });
    });

    // Sidebar toggle for mobile
    if (sidebarToggle && sidebar && sidebarBackdrop) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            sidebarBackdrop.classList.toggle('active');
            if (sidebar.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        sidebarBackdrop.addEventListener('click', function() {
            sidebar.classList.remove('open');
            sidebarBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Load default page
    const defaultPage = document.querySelector('.nav-item.active').getAttribute('data-page');
    if (defaultPage) {
        fetch(defaultPage)
            .then(res => res.text())
            .then(html => {
                pageContent.innerHTML = html;
                setTimeout(() => pageContent.classList.add('loaded'), 10);
            });
    }

    // Fade in page content on navigation
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            pageContent.classList.remove('loaded');
            const page = this.getAttribute('data-page');
            if (page) {
                fetch(page)
                    .then(res => res.text())
                    .then(html => {
                        pageContent.innerHTML = html;
                        setTimeout(() => pageContent.classList.add('loaded'), 10);
                    });
            }
        });
    });
}); 