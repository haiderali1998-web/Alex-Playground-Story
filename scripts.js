/* Handle page transitions with fade-out effect */
function fadeToPage(url) {
  document.body.classList.add('fading-out');
  setTimeout(() => {
    window.location.href = url;
  }, 1000);
}

/* Handle page load with fade-in effect */
window.addEventListener('load', () => {
  document.body.classList.remove('fading-out');
  document.body.style.opacity = '1';
  document.body.style.animation = 'fadeIn 1s ease-in';
  applySettings(); // Apply saved settings on page load
});

/* Apply settings (brightness and dark mode) from localStorage */
function applySettings() {
  // Brightness
  const brightness = localStorage.getItem('brightness') || 100;
  document.body.style.filter = `brightness(${brightness}%)`;
  const brightnessSlider = document.getElementById('brightness');
  if (brightnessSlider) {
    brightnessSlider.value = brightness;
  }

  // Dark Mode
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.body.classList.add('dark-mode');
  }
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.checked = darkMode;
  }}

/* Initialize settings controls on settings page */
document.addEventListener('DOMContentLoaded', () => {
  const brightnessSlider = document.getElementById('brightness');
  const darkModeToggle = document.getElementById('darkModeToggle');

  if (brightnessSlider) {
    brightnessSlider.addEventListener('input', () => {
      const value = brightnessSlider.value;
      document.body.style.filter = `brightness(${value}%)`;
      localStorage.setItem('brightness', value);
    });
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
      const isDarkMode = darkModeToggle.checked;
      document.body.classList.toggle('dark-mode', isDarkMode);
      localStorage.setItem('darkMode', isDarkMode);
    });
  }
});