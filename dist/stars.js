const starsContainer = document.querySelector('.stars');
let numberOfStars = 300;
const stars = [];
const starDensityInput = localStorage.getItem('starDensity') || 300;
if (starDensityInput) {
    numberOfStars = parseFloat(starDensityInput);
}
document.addEventListener('updateStarDensity', (e) => {
    numberOfStars = e.detail.starDensity;
    stars.forEach(star => star.element.remove());
    stars.length = 0;
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1;
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        const delay = Math.random() * 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${xPos}vw`;
        star.style.top = `${yPos}vh`;
        star.style.animationDelay = `${delay}s`;
        stars.push({
            element: star,
            x: xPos,
            y: yPos,
            size: size
        });
        starsContainer.appendChild(star);
    }});
    

for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const size = Math.random() * 3 + 1;
    const xPos = Math.random() * 100;
    const yPos = Math.random() * 100;
    const delay = Math.random() * 2;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${xPos}vw`;
    star.style.top = `${yPos}vh`;
    star.style.animationDelay = `${delay}s`;

    stars.push({
        element: star,
        x: xPos,
        y: yPos,
        size: size
    });

    starsContainer.appendChild(star);
}

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    stars.forEach(star => {
        const starX = (star.x / 100) * window.innerWidth;
        const starY = (star.y / 100) * window.innerHeight;
        
        const dx = mouseX - starX;
        const dy = mouseY - starY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const repelDistance = 150;
        
        if (distance < repelDistance) {
            const angle = Math.atan2(dy, dx);
            const force = (repelDistance - distance) / repelDistance;
            const pushX = -Math.cos(angle) * force * 30;
            const pushY = -Math.sin(angle) * force * 30;
            
            star.element.style.transform = `translate(${pushX}px, ${pushY}px)`;
            star.element.style.opacity = 0.5 + force * 0.5;
        } else {
            star.element.style.transform = 'translate(0, 0)';
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const shootingStarsContainer = document.querySelector('.shooting-stars');

    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';

        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = '0';

        const duration = (Math.random() * 1 + 0.5) + 's';
        star.style.animationDuration = duration;

        shootingStarsContainer.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, parseFloat(duration) * 1000);
    }

    setInterval(createShootingStar, 700);
});

