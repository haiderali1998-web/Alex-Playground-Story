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

/* Apply settings (brightness, dark mode, background music) */
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

    // Background Music
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicEnabled = localStorage.getItem('musicEnabled') === 'true';

    if (bgMusic) {
        if (musicEnabled) {
            bgMusic.volume = 0.4;
            bgMusic.muted = false;

            // Try to play music even if browser blocks it at first
            bgMusic.play().catch((error) => {
                console.log("Autoplay prevented by browser. Waiting for user click...");
                document.body.addEventListener('click', () => {
                    bgMusic.play().catch((e) => console.log('Still blocked:', e));
                }, { once: true });
            });
        } else {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        }
    }

    if (musicToggle) {
        musicToggle.checked = musicEnabled;
    }
}

/* Initialize settings controls */
document.addEventListener('DOMContentLoaded', () => {
    const brightnessSlider = document.getElementById('brightness');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const creakSound = document.getElementById('creakSound');

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

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('change', () => {
            const enabled = musicToggle.checked;
            localStorage.setItem('musicEnabled', enabled);
            if (enabled) {
                bgMusic.currentTime = 0;
                bgMusic.volume = 0.4;
                bgMusic.play().catch((e) => {
                    console.log("Play blocked:", e);
                });
            } else {
                bgMusic.pause();
            }
        });
    }

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
