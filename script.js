document.addEventListener('DOMContentLoaded', function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            // Set the active class on the correct link
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(link => {
                const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
                if (linkPage === currentPage) {
                    link.classList.add('active');
                    link.style.display = 'none';
                } else {
                    link.classList.remove('active');
                }
            });

            const menuIcon = document.querySelector('.menu-icon');
            const navLinksContainer = document.querySelector('.nav-links');

            menuIcon.addEventListener('click', () => {
                navLinksContainer.classList.toggle('active');
            });

            document.body.style.opacity = 1;

            const audio = new Audio('audio.mp3');
            audio.volume = 0.5;

            const headerElements = document.querySelectorAll('header a, header button');
            headerElements.forEach(el => {
                el.addEventListener('click', () => {
                    audio.currentTime = 0;
                    audio.play();
                    setTimeout(() => {
                        audio.pause();
                    }, 200);
                });
            });

            const links = document.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        return;
                    }
                    e.preventDefault();
                    document.body.style.transition = 'opacity 0.5s';
                    document.body.style.opacity = 0;
                    setTimeout(() => {
                        window.location.href = href;
                    }, 500);
                });
            });
        })
        .catch(error => console.error('Error fetching header:', error));
});
