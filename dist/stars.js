const starsContainer = document.querySelector('.stars');
const numberOfStars = 100;

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

    starsContainer.appendChild(star);
}

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

    setInterval(createShootingStar, 1000);
});
