document.addEventListener('DOMContentLoaded', function () {
  // Get the theme mode from local storage
  let themeMode = localStorage.getItem('theme-mode');

  // Get preferred theme mode
  const themeModePref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  if (!themeMode) {
    localStorage.setItem('theme-mode', themeModePref);
  }

  themeMode = localStorage.getItem('theme-mode');
  const themeModeInput = document.querySelector('#theme-mode');

  if (themeMode === 'dark') {
    themeModeInput.checked = true;
  } else {
    themeModeInput.checked = false;
  }

  document.querySelector('html').setAttribute('data-bs-theme', themeMode);

  themeModeInput.addEventListener('change', function () {
    if (this.checked) {
      localStorage.setItem('theme-mode', 'dark');
      document.querySelector('html').setAttribute('data-bs-theme', 'dark');
    } else {
      localStorage.setItem('theme-mode', 'light');
      document.querySelector('html').setAttribute('data-bs-theme', 'light');
    }
  })
});
