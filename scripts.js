// --- Armaan's Improvements (April 2025) ---
// Music toggle, music volume control, button creak sound
// Completed by Armaan during group project finalisation for Alex's Playground Story
// ---------------------------------------------------------

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
    applySettings(); // Apply all saved settings on page load
});

/* Apply settings (brightness, dark mode, music toggle, volume) */
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
    }

    /* === Background Music Settings (Armaan's Feature) === */
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const savedVolume = localStorage.getItem('musicVolume');
    const musicEnabled = localStorage.getItem('musicEnabled') === 'true';

    if (bgMusic) {
        bgMusic.volume = savedVolume !== null ? parseFloat(savedVolume) : 0.4;
        if (musicEnabled) {
            bgMusic.muted = false;
            bgMusic.play().catch((error) => {
                document.body.addEventListener('click', () => {
                    bgMusic.play().catch((e) => console.log('Still blocked:', e));
                }, { once: true });
            });
        } else {
            bgMusic.pause();
        }
    }

    if (musicToggle) {
        musicToggle.checked = musicEnabled;
    }

    // Set Volume Slider on page load
    const volumeSlider = document.getElementById('volume');
    if (volumeSlider && savedVolume !== null) {
        volumeSlider.value = savedVolume * 100;
    }
}

/* Initialize settings controls */
document.addEventListener('DOMContentLoaded', () => {
    const brightnessSlider = document.getElementById('brightness');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const musicToggle = document.getElementById('musicToggle');
    const volumeSlider = document.getElementById('volume');
    const bgMusic = document.getElementById('bgMusic');
    const creakSound = document.getElementById('creakSound');

    // Brightness control
    if (brightnessSlider) {
        brightnessSlider.addEventListener('input', () => {
            const value = brightnessSlider.value;
            document.body.style.filter = `brightness(${value}%)`;
            localStorage.setItem('brightness', value);
        });
    }

    // Dark Mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            const isDarkMode = darkModeToggle.checked;
            document.body.classList.toggle('dark-mode', isDarkMode);
            localStorage.setItem('darkMode', isDarkMode);
        });
    }

    /* === Music Toggle and Volume Control === */
    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('change', () => {
            const enabled = musicToggle.checked;
            localStorage.setItem('musicEnabled', enabled);
            if (enabled) {
                bgMusic.currentTime = 0;
                bgMusic.play().catch((e) => {
                    console.log("Music play blocked:", e);
                });
            } else {
                bgMusic.pause();
            }
        });
    }

    if (volumeSlider && bgMusic) {
        volumeSlider.addEventListener('input', () => {
            const volume = volumeSlider.value / 100;
            bgMusic.volume = volume;
            localStorage.setItem('musicVolume', volume);
        });
    }

    // Button click creak sound
    if (creakSound) {
        const buttons = document.querySelectorAll('button');
        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                creakSound.currentTime = 0;
                creakSound.play().catch((e) => {
                    console.log("Creak sound blocked:", e);
                });
            });
        });
    }
});

