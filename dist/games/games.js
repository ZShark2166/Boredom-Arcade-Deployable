let games = document.getElementsByClassName('game');

document.addEventListener('DOMContentLoaded', () => {
    const games = document.querySelectorAll('.games-container > img.game');
    const gamesFrame = document.querySelector('.games-frame');
    const gamesContainer = document.querySelector('.games-container');
    const scrollbar = document.querySelector('.games-scrollbar');
    const scrollbarThumb = document.querySelector('.games-scrollbar-thumb');

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

    if (!gamesContainer || !scrollbar || !scrollbarThumb) {
        return;
    }

    const forwardWheelToGames = (event) => {
        if (!document.body.classList.contains('games-page')) {
            return;
        }

        if (event.target.closest('.navbar, .footer, .games-scrollbar')) {
            return;
        }

        const navWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-width')) || 0;
        const insideMainArea = event.clientX > navWidth && event.clientY >= 0 && event.clientY <= window.innerHeight;
        const insideFrame = gamesFrame ? gamesFrame.contains(event.target) : false;

        if (!insideMainArea && !insideFrame) {
            return;
        }

        const previousScrollTop = gamesContainer.scrollTop;
        gamesContainer.scrollTop += event.deltaY;

        if (gamesContainer.scrollTop !== previousScrollTop) {
            event.preventDefault();
        }
    };

    const syncScrollbar = () => {
        const maxScroll = gamesContainer.scrollHeight - gamesContainer.clientHeight;
        const trackHeight = scrollbar.clientHeight;

        if (maxScroll <= 0 || trackHeight <= 0) {
            scrollbar.hidden = true;
            return;
        }

        scrollbar.hidden = false;

        const thumbHeight = Math.max(48, Math.round((gamesContainer.clientHeight / gamesContainer.scrollHeight) * trackHeight));
        const maxThumbTravel = trackHeight - thumbHeight;
        const thumbY = Math.round((gamesContainer.scrollTop / maxScroll) * maxThumbTravel);

        scrollbarThumb.style.height = `${thumbHeight}px`;
        scrollbarThumb.style.transform = `translateY(${thumbY}px)`;
    };

    let dragState = null;

    scrollbarThumb.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        scrollbarThumb.setPointerCapture(event.pointerId);
        dragState = {
            startY: event.clientY,
            startScrollTop: gamesContainer.scrollTop,
        };
        scrollbarThumb.style.cursor = 'grabbing';
    });

    scrollbarThumb.addEventListener('pointermove', (event) => {
        if (!dragState) {
            return;
        }

        const maxScroll = gamesContainer.scrollHeight - gamesContainer.clientHeight;
        const maxThumbTravel = scrollbar.clientHeight - scrollbarThumb.offsetHeight;

        if (maxScroll <= 0 || maxThumbTravel <= 0) {
            return;
        }

        const delta = event.clientY - dragState.startY;
        gamesContainer.scrollTop = dragState.startScrollTop + (delta / maxThumbTravel) * maxScroll;
    });

    const endDrag = () => {
        dragState = null;
        scrollbarThumb.style.cursor = 'grab';
    };

    scrollbarThumb.addEventListener('pointerup', endDrag);
    scrollbarThumb.addEventListener('pointercancel', endDrag);

    scrollbar.addEventListener('pointerdown', (event) => {
        if (event.target === scrollbarThumb) {
            return;
        }

        const trackRect = scrollbar.getBoundingClientRect();
        const thumbCenter = scrollbarThumb.offsetHeight / 2;
        const clickRatio = (event.clientY - trackRect.top - thumbCenter) / (scrollbar.clientHeight - scrollbarThumb.offsetHeight);
        gamesContainer.scrollTop = clickRatio * (gamesContainer.scrollHeight - gamesContainer.clientHeight);
    });

    gamesContainer.addEventListener('scroll', syncScrollbar, { passive: true });
    document.addEventListener('wheel', forwardWheelToGames, { passive: false });
    window.addEventListener('resize', syncScrollbar);
    syncScrollbar();
});
