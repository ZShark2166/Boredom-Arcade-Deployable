let games = document.getElementsByClassName('game');

document.addEventListener('DOMContentLoaded', () => {
    const games = document.querySelectorAll('.games-container > img.game');

    games.forEach((game) => {
        const card = document.createElement('div');
        const title = document.createElement('span');

        card.className = 'game-card';
        card.tabIndex = 0;
        card.setAttribute('role', 'link');
        card.setAttribute('aria-label', game.alt);

        title.className = 'game-title-overlay';
        title.textContent = game.alt;

        const parent = game.parentNode;
        parent.insertBefore(card, game);
        card.appendChild(game);
        card.appendChild(title);

        const openGame = () => {
            game.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        };

        card.addEventListener('click', (event) => {
            if (event.target === game) {
                return;
            }
            openGame();
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openGame();
            }
        });
    });
});