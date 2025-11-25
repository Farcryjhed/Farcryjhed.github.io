/**
* Template Name: Personal
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()


// Lightbox with Keyboard Navigation
document.addEventListener('DOMContentLoaded', function() {
  const lightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
    plyr: {
      css: 'https://cdn.plyr.io/3.7.8/plyr.css',
      js: 'https://cdn.plyr.io/3.7.8/plyr.js',
      config: {
        ratio: '16:9',
        fullscreen: { enabled: true },
        youtube: { noCookie: true },
      }
    }
  });

  // ESC key to close
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      lightbox.close();
    }
  });

  // Arrow keys for navigation
  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
      lightbox.nextSlide();
    } else if (event.key === 'ArrowLeft') {
      lightbox.prevSlide();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Store the last clicked portfolio link and scroll position
  const detailsLinks = document.querySelectorAll('.details-link');
  
  detailsLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Get the portfolio item element
      const portfolioItem = this.closest('.portfolio-item');
      
      if (portfolioItem) {
        // Store the portfolio item's position/ID for later focus
        const itemIndex = Array.from(document.querySelectorAll('.portfolio-item')).indexOf(portfolioItem);
        sessionStorage.setItem('lastPortfolioItemIndex', itemIndex);
        sessionStorage.setItem('lastPortfolioPage', 'index.html#portfolio');
      }
    });
  });

  // Back button functionality
  const backLink = document.querySelector('.back-link');
  if (backLink) {
    backLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.6s ease-out';
      
      setTimeout(() => {
        window.location.href = 'index.html#portfolio';
      }, 300);
    });
  }

  // On page load, scroll to the last clicked portfolio item
  window.addEventListener('load', function() {
    const lastItemIndex = sessionStorage.getItem('lastPortfolioItemIndex');
    if (lastItemIndex !== null) {
      const portfolioItems = document.querySelectorAll('.portfolio-item');
      const lastItem = portfolioItems[lastItemIndex];
      
      if (lastItem) {
        setTimeout(() => {
          lastItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
          lastItem.style.outline = '2px solid #0073ca';
          lastItem.style.outlineOffset = '5px';
          
          setTimeout(() => {
            lastItem.style.outline = 'none';
          }, 2000);
        }, 100);
      }
    }
  });
});