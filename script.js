document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  let topAnchor = document.querySelector('#top-anchor');
  if (!topAnchor) {
    topAnchor = document.createElement('div');
    topAnchor.setAttribute('id', 'top-anchor');
    topAnchor.style.position = 'absolute';
    topAnchor.style.top = '0';
    topAnchor.style.height = '1px';
    topAnchor.style.width = '100%';
    document.body.prepend(topAnchor);
  }
  
  const navbarObserver = new IntersectionObserver(
    ([entry]) => {
      navbar.classList.toggle('scrolled', !entry.isIntersecting);
    },
    { threshold: 0.1 }
  );
  
  navbarObserver.observe(topAnchor);
  if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 60, 
            behavior: 'smooth'
          });
        }
      });
    });
  }
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          if (navLink) navLink.classList.add('active');
        }
      });
    },
    { threshold: 0.6 }
  );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const toggleBtn = document.querySelector('.theme-toggle');
  toggleBtn.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'black' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
});
