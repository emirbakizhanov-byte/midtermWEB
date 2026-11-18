const THEME_KEY = 'theme';

function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);

    const button = document.getElementById('themeToggle');
    if (button) {
        button.textContent = theme === 'dark' ? '☀️' : '🌙';
        button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
}

applyTheme(getSavedTheme());

document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getSavedTheme());

    const button = document.getElementById('themeToggle');
    if (!button) return;

    button.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-bs-theme');
        const next = current === 'dark' ? 'light' : 'dark';

        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
    });
});
