document.addEventListener('DOMContentLoaded', function () {
  // Get the current language
  const currentLang = document.querySelector('html').getAttribute('lang');
  const currentPath = currentLang == 'en' ? document.querySelector('html').getAttribute('data-slug-es') : document.querySelector('html').getAttribute('data-slug-en');

  // Get the language toggle button
  const languageToggle = document.querySelector('a.language-toggle');

  // Get current url.
  const currentUrl = window.location.pathname;

  const headerLinks = document.querySelector('#navbarSupportedContent');
  const footerLinks = document.querySelector('footer');

  const currentLink = document.querySelector('a[href="' + currentUrl + '"]');

  if (currentLink) {
    headerLinks.querySelectorAll('a').forEach(link => {
      link.classList.remove('active');
    });

    footerLinks.querySelectorAll('a').forEach(link => {
      link.classList.remove('active');
    })

    currentLink.classList.add('active');
  }

  languageToggle.setAttribute('href', currentPath);
});
