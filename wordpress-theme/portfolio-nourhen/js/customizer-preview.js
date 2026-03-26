(function ($) {
  wp.customize('color_primary', function (value) {
    value.bind(function (to) {
      document.documentElement.style.setProperty('--color-primary', to);
    });
  });

  wp.customize('color_secondary', function (value) {
    value.bind(function (to) {
      document.documentElement.style.setProperty('--color-secondary', to);
    });
  });

  wp.customize('theme_mode', function (value) {
    value.bind(function (to) {
      if (to === 'light') {
        document.body.classList.add('light');
      } else {
        document.body.classList.remove('light');
      }
    });
  });
})(jQuery);
