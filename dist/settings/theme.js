const themes = {
    default: {
        '--main-bg-color': '#1a0033',
        '--main-bg-color-rgb': '26, 0, 51',
        '--secondary-bg-color': '#2d004d',
        '--secondary-bg-color-rgb': '45, 0, 77',
        '--accent-color': '#ffccff',
        '--accent-color-rgb': '255, 204, 255',
        '--text-color': '#e6e6ff',
        '--star-color': '#ffffff'
    },
    dark: {
        '--main-bg-color': '#000000',
        '--main-bg-color-rgb': '0, 0, 0',
        '--secondary-bg-color': '#333333',
        '--secondary-bg-color-rgb': '51, 51, 51',
        '--accent-color': '#777777',
        '--accent-color-rgb': '119, 119, 119',
        '--text-color': '#ffffff',
        '--star-color': '#cccccc'
    },
    light: {
        '--main-bg-color': '#ffffff',
        '--main-bg-color-rgb': '255, 255, 255',
        '--secondary-bg-color': '#f0f0f0',
        '--secondary-bg-color-rgb': '240, 240, 240',
        '--accent-color': '#ff66cc',
        '--accent-color-rgb': '255, 102, 204',
        '--text-color': '#000000',
        '--star-color': '#ffcc00'
    },
    zeeless: {
        '--main-bg-color': '#0e1b30',
        '--main-bg-color-rgb': '14, 27, 48',
        '--secondary-bg-color': '#182f54',
        '--secondary-bg-color-rgb': '24, 47, 84',
        '--accent-color': '#8fafe3',
        '--accent-color-rgb': '143, 175, 227',
        '--text-color': '#ffffff',
        '--star-color': '#00e1ff'
    },
    hacker: {
        '--main-bg-color': '#000000',
        '--main-bg-color-rgb': '0, 0, 0',
        '--secondary-bg-color': '#252b27',
        '--secondary-bg-color-rgb': '37, 43, 39',
        '--accent-color': '#00ff00',
        '--accent-color-rgb': '0, 255, 0',
        '--text-color': '#ffffff',
        '--star-color': '#087525'
    },
    ben: {
        '--main-bg-color': '#464655',
        '--main-bg-color-rgb': '70, 70, 85',
        '--secondary-bg-color': '#4c5959',
        '--secondary-bg-color-rgb': '76, 89, 89',
        '--accent-color': '#e526cb',
        '--accent-color-rgb': '229, 38, 203',
        '--text-color': '#E526CB',
        '--star-color': '#00e676',
        '--star-color-rgb': '0, 230, 118'
    },
    hush: {
        '--main-bg-color': '#084b54',
        '--main-bg-color-rgb': '8, 75, 84',
        '--secondary-bg-color': '#221390',
        '--secondary-bg-color-rgb': '34, 19, 144',
        '--accent-color': '#008BEF',
        '--accent-color-rgb': '0, 139, 239',
        '--text-color': '#FFFFFF',
        '--star-color': '#EF0072',
        '--star-color-rgb': '239, 0, 114'
    },
    spooky: {
    '--main-bg-color': '#1a0f00',
    '--main-bg-color-rgb': '26, 15, 0',
    '--secondary-bg-color': '#331a00',
    '--secondary-bg-color-rgb': '51, 26, 0',
    '--accent-color': '#ff9900',
    '--accent-color-rgb': '255, 153, 0',
    '--text-color': '#fff5e6',
    '--star-color': '#ffcc00'
    }
};


function applyTheme(themeName) {
    const selectedTheme = themes[themeName];
    if (selectedTheme) {
        Object.keys(selectedTheme).forEach(variable => {
            document.documentElement.style.setProperty(variable, selectedTheme[variable]);
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'spooky';
    applyTheme(savedTheme);

    const themeSelector = document.getElementById('theme');
    if (themeSelector) {
        themeSelector.value = savedTheme;
        themeSelector.addEventListener('change', (event) => {
            const selectedTheme = event.target.value;
            localStorage.setItem('selectedTheme', selectedTheme);
            applyTheme(selectedTheme);
        });
    }
});


(function () {
    const savedTheme = localStorage.getItem('selectedTheme') || 'spooky';
    const selectedTheme = themes[savedTheme];
    if (selectedTheme) {
        Object.keys(selectedTheme).forEach(variable => {
            document.documentElement.style.setProperty(variable, selectedTheme[variable]);
        });
    }
})();

