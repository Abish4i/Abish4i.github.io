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

    if (document.body.classList.contains('blog')) {
        const blogPostsContainer = document.getElementById('blog-posts');
        blogPostsContainer.innerHTML = '<p>Loading posts...</p>';

        fetch('https://public-api.wordpress.com/rest/v1.1/sites/inknowhere.wordpress.com/posts/?fields=URL,title,excerpt,featured_image')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                blogPostsContainer.innerHTML = ''; // Clear loading message
                const posts = data.posts;
                if (posts && posts.length > 0) {
                    const projectsList = document.createElement('div');
                    projectsList.className = 'projects-list';

                    posts.forEach(post => {
                        const postElement = document.createElement('a');
                        postElement.href = post.URL;
                        postElement.classList.add('project', 'card');
                        postElement.style.textDecoration = 'none';
                        postElement.style.color = 'inherit';
                        postElement.target = '_blank';
                        postElement.rel = 'noopener noreferrer';

                        let imageHTML = '';
                        if (post.featured_image) {
                            imageHTML = `<img src="${post.featured_image}" alt="" style="width: 100%; height: auto; display: block; margin-bottom: 1em; border-radius: 5px;">`;
                        }

                        postElement.innerHTML = `
                            ${imageHTML}
                            <div class="left">
                                <h3 style="margin-top:0;">${post.title}</h3>
                                <div class="muted">${post.excerpt}</div>
                            </div>
                            <div style="text-align:right; margin-top: 1em;">
                                <span class="chip">Read More</span>
                            </div>
                        `;
                        projectsList.appendChild(postElement);
                    });
                    blogPostsContainer.appendChild(projectsList);
                } else {
                    blogPostsContainer.innerHTML = '<p>No posts found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching blog posts:', error);
                blogPostsContainer.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
            });
    }
});
