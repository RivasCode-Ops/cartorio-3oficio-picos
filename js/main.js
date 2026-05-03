(function () {
  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!expanded);
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.matchMedia('(max-width: 1023px)').matches) {
          setOpen(false);
        }
      });
    });

    window.addEventListener('resize', function () {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setOpen(false);
      }
    });
  }

  function initForms() {
    document.querySelectorAll('form[data-placeholder-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var hint = form.querySelector('.form-hint--submit');
        if (hint) {
          hint.hidden = false;
          hint.textContent =
            'Esta é uma demonstração: o envio ainda não está ativo. Entre em contato pelo telefone ou WhatsApp.';
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initNav();
      initForms();
    });
  } else {
    initNav();
    initForms();
  }
})();
