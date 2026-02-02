// Style Toggle - Academic ↔ Natural
const styleToggle = document.getElementById('styleToggle');
const styleLabel = document.getElementById('styleLabel');
const styleLink = document.getElementById('theme-style');

const STYLES = {
    academic: {
        file: 'style-academic.css',
        name: 'Academic',
        next: 'Natural',
        fonts: 'family=Source+Sans+3:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500'
    },
    natural: {
        file: 'style-natural.css',
        name: 'Natural',
        next: 'Academic',
        fonts: 'family=Fraunces:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700&family=Fira+Code:wght@400;500'
    }
};

// Load saved style or default to Academic
const savedStyle = localStorage.getItem('selectedStyle') || 'style-academic.css';
if (styleLink) {
    styleLink.href = savedStyle;
}

// Font loading
const googleFontsLink = document.getElementById('google-fonts');

function loadFontsForStyle(styleFile) {
    const style = styleFile.includes('academic') ? STYLES.academic : STYLES.natural;
    if (googleFontsLink) {
        googleFontsLink.href = `https://fonts.googleapis.com/css2?${style.fonts}&display=swap`;
    }
}

loadFontsForStyle(savedStyle);

function updateStyleLabel() {
    const isAcademic = styleLink.href.includes('academic');
    if (styleLabel) {
        styleLabel.textContent = isAcademic ? 'Natural' : 'Academic';
    }
}

updateStyleLabel();

if (styleToggle) {
    styleToggle.addEventListener('click', () => {
        const isAcademic = styleLink.href.includes('academic');
        const newStyle = isAcademic ? STYLES.natural.file : STYLES.academic.file;
        styleLink.href = newStyle;
        localStorage.setItem('selectedStyle', newStyle);
        updateStyleLabel();
        loadFontsForStyle(newStyle);
    });
}

// Theme Toggle (Light/Dark)
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});