// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

                // URL de la API de New York Times Times Wire
                const apiUrl = 'https://api.nytimes.com/svc/news/v3/content/all/all.json';
        
                // Tu clave de API (reemplázala con tu propia clave)
                const apiKey = 'vWWMG7E1EvU4xkyYcGu2lxtOnv5MPBno';
            
                // Construye la URL de la solicitud
                const apiUrlWithKey = `${apiUrl}?api-key=${apiKey}`;
            
                // Realiza una solicitud a la API de New York Times
                fetch(apiUrlWithKey)
                    .then(response => response.json())
                    .then(data => {
                        const newsContainer = document.getElementById('news-container');
                        
                        data.results.forEach(news => {
                            const newsElement = document.createElement('div');
                            newsElement.classList.add('row', 'mb-4'); // Agregar una fila
                            newsElement.innerHTML = `
                                <div class="col-md-6">
                                    <div class="featured-text">
                                        <h4>${news.title}</h4>
                                        <small class="text-black-50">${news.published_date}</small>
                                        <p class="text-black-50 mb-0">${news.abstract}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <img class="img-fluid" src="${news.multimedia[0].url}" style="max-width: 100%; height: 100%;">
                                </div>
                            `;
                            newsContainer.appendChild(newsElement);
                        });
                    })
                    .catch(error => {
                        console.error('Error al obtener noticias:', error);
                    });    
});