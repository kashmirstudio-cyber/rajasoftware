// Raja Software Solutions — site scripts
(function () {
  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('visible'); });
  }

  // Image fallback: if an App Store image can't load, show the crown logo instead
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function () {
      if (img.dataset.failed) return;
      img.dataset.failed = '1';
      img.src = img.getAttribute('data-fallback');
      img.style.objectFit = 'contain';
      img.style.padding = '18%';
    });
  });

  // Contact form -> opens WhatsApp chat with the message pre-filled
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = form.querySelector('[name=name]').value.trim();
      var subject = form.querySelector('[name=subject]').value.trim();
      var msg = form.querySelector('[name=message]').value.trim();
      var text = 'Hello Raja Software Solutions,%0A%0A' +
        'Name: ' + encodeURIComponent(name) + '%0A' +
        'Subject: ' + encodeURIComponent(subject) + '%0A%0A' +
        encodeURIComponent(msg);
      window.open('https://wa.me/923226752113?text=' + text, '_blank', 'noopener');
    });
  }

  // Footer year
  document.querySelectorAll('.year').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
