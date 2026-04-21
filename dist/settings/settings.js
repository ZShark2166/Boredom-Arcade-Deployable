
(function () {
    try {
        if (localStorage.getItem('aboutBlankCloakerEnabled') !== 'true') return;
    } catch(e) { return; }

    var inFrame;
    try { inFrame = window !== top; } catch(e) { inFrame = true; }
    if (inFrame || navigator.userAgent.includes('Firefox')) return;

    var popup = open('about:blank', '_blank');
    if (!popup || popup.closed) {
        alert('Allow popups and redirects to enable about blank.');
        return;
    }

    var doc = popup.document;
    var iframe = doc.createElement('iframe');
    var style = iframe.style;
    var link = doc.createElement('link');

    doc.title = 'Home | Classroom';
    link.rel = 'icon';
    link.href = '/images/googleclassroom.webp';
    doc.head.appendChild(link);

    iframe.src = location.href;
    style.position = 'fixed';
    style.top = style.bottom = style.left = style.right = 0;
    style.border = style.outline = 'none';
    style.width = style.height = '100%';

    doc.body.appendChild(iframe);
    location.replace('https://classroom.google.com');
})();
document.addEventListener('DOMContentLoaded', () => {
    const starDensityInput = document.getElementById('star-density');
    const starDensityValue = document.getElementById('star-density-value');

    if (!starDensityInput) {
        return;
    }

    const formatDensity = (value) => {
        const density = parseFloat(value);
        if (Number.isNaN(density)) {
            return '0';
        }

        return density % 1 === 0 ? String(density) : density.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
    };

    const updateSliderUI = (value) => {
        const min = parseFloat(starDensityInput.min || '0');
        const max = parseFloat(starDensityInput.max || '100');
        const numericValue = parseFloat(value);
        const progress = max === min ? 0 : ((numericValue - min) / (max - min)) * 100;

        starDensityInput.style.setProperty('--slider-progress', `${progress}%`);

        if (starDensityValue) {
            starDensityValue.textContent = formatDensity(value);
        }
    };

    try {
        const savedDensity = localStorage.getItem('starDensity');
        if (savedDensity !== null && savedDensity !== '') {
            starDensityInput.value = savedDensity;
        }
    } catch (e) {}

    updateSliderUI(starDensityInput.value);

    starDensityInput.addEventListener('input', function() {
        const density = parseFloat(this.value);
        updateSliderUI(this.value);
        console.log('Star density changed to:', density);
        localStorage.setItem('starDensity', density);
        document.dispatchEvent(new CustomEvent('updateStarDensity', {
        detail: {
            starDensity: density
        }
    }));
    });

    
});
