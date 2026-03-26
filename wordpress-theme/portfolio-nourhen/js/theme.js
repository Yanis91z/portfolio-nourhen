document.addEventListener('DOMContentLoaded', function () {

  /* ========================================
     SCROLL ANIMATIONS (IntersectionObserver)
     ======================================== */

  var animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-slide-left');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animatedElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ========================================
     SKILL BARS
     ======================================== */

  var skillRows = document.querySelectorAll('.skill-row');

  if (skillRows.length && 'IntersectionObserver' in window) {
    var skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var level = entry.target.getAttribute('data-skill-level');
          var fill = entry.target.querySelector('.skill-row__fill');
          if (fill && level) {
            setTimeout(function () {
              fill.style.width = level + '%';
            }, 300);
          }
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    skillRows.forEach(function (el) {
      skillObserver.observe(el);
    });
  }

  /* ========================================
     MOBILE MENU BURGER
     ======================================== */

  var burgerToggle = document.getElementById('burger-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  var burgerIcon = document.getElementById('burger-icon');
  var closeIcon = document.getElementById('close-icon');

  if (burgerToggle && mobileMenu) {
    burgerToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('is-open');
      burgerIcon.style.display = isOpen ? 'none' : 'block';
      closeIcon.style.display = isOpen ? 'block' : 'none';
    });

    var mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        burgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      });
    });
  }

  /* ========================================
     MOUSE-FOLLOW BLOB (FRONT PAGE)
     ======================================== */

  var mouseBlob = document.getElementById('mouse-blob');

  if (mouseBlob) {
    var blobX = 0, blobY = 0;
    var targetX = 0, targetY = 0;

    document.addEventListener('mousemove', function (e) {
      targetX = e.clientX - 200;
      targetY = e.clientY - 200;
    });

    function animateBlob() {
      blobX += (targetX - blobX) * 0.05;
      blobY += (targetY - blobY) * 0.05;
      mouseBlob.style.transform = 'translate(' + blobX + 'px, ' + blobY + 'px)';
      requestAnimationFrame(animateBlob);
    }
    animateBlob();
  }

  /* ========================================
     VIDEO CONTROLS
     ======================================== */

  document.querySelectorAll('.video-play-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-target');
      var video = document.getElementById(targetId);
      if (!video) return;

      var iconPlay = btn.querySelector('.icon-play');
      var iconPause = btn.querySelector('.icon-pause');

      if (video.paused) {
        video.play();
        if (iconPlay) iconPlay.style.display = 'none';
        if (iconPause) iconPause.style.display = 'block';
      } else {
        video.pause();
        if (iconPlay) iconPlay.style.display = 'block';
        if (iconPause) iconPause.style.display = 'none';
      }
    });
  });

  document.querySelectorAll('.video-card video').forEach(function (video) {
    video.addEventListener('click', function () {
      var card = video.closest('.video-card');
      var btn = card ? card.querySelector('.video-play-btn') : null;
      if (btn) btn.click();
    });
  });

  document.querySelectorAll('.video-mute-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-target');
      var video = document.getElementById(targetId);
      if (!video) return;

      var iconMuted = btn.querySelector('.icon-muted');
      var iconUnmuted = btn.querySelector('.icon-unmuted');

      video.muted = !video.muted;
      if (video.muted) {
        if (iconMuted) iconMuted.style.display = 'block';
        if (iconUnmuted) iconUnmuted.style.display = 'none';
      } else {
        if (iconMuted) iconMuted.style.display = 'none';
        if (iconUnmuted) iconUnmuted.style.display = 'block';
      }
    });
  });

  /* ========================================
     ACTIVE NAV LINK ON SCROLL (ONE-PAGE)
     ======================================== */

  var sections = document.querySelectorAll('.section-anchor');
  var navAnchors = document.querySelectorAll('.nav-anchor');

  if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navAnchors.forEach(function (a) {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + id) {
              a.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  /* ========================================
     CONTACT FORM (AJAX)
     ======================================== */

  var contactForm = document.getElementById('contact-form');

  if (contactForm && typeof portfolioAjax !== 'undefined') {
    var submitBtn = document.getElementById('contact-submit');
    var alertBox = document.getElementById('contact-alert');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      document.querySelectorAll('.form-error').forEach(function (el) { el.textContent = ''; });

      var name = contactForm.querySelector('[name="name"]').value.trim();
      var email = contactForm.querySelector('[name="email"]').value.trim();
      var message = contactForm.querySelector('[name="message"]').value.trim();

      var hasError = false;
      if (!name) { document.querySelector('[data-error="name"]').textContent = 'Nom requis'; hasError = true; }
      if (!email) { document.querySelector('[data-error="email"]').textContent = 'Email requis'; hasError = true; }
      else if (!/^\S+@\S+$/.test(email)) { document.querySelector('[data-error="email"]').textContent = 'Email invalide'; hasError = true; }
      if (!message) { document.querySelector('[data-error="message"]').textContent = 'Message requis'; hasError = true; }
      if (hasError) return;

      var originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<div style="width:1.25rem;height:1.25rem;border:2px solid white;border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite"></div>';

      var formData = new FormData();
      formData.append('action', 'portfolio_contact');
      formData.append('nonce', portfolioAjax.nonce);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);

      fetch(portfolioAjax.ajaxurl, {
        method: 'POST',
        body: formData,
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        alertBox.style.display = 'flex';
        if (data.success) {
          alertBox.className = 'alert alert--success';
          alertBox.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Message envoyé avec succès !';
          contactForm.reset();
        } else {
          alertBox.className = 'alert alert--error';
          alertBox.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Erreur lors de l\'envoi. Veuillez réessayer.';
        }
        setTimeout(function () { alertBox.style.display = 'none'; }, 5000);
      })
      .catch(function () {
        alertBox.style.display = 'flex';
        alertBox.className = 'alert alert--error';
        alertBox.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Erreur réseau.';
        setTimeout(function () { alertBox.style.display = 'none'; }, 5000);
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
      });
    });
  }

});
