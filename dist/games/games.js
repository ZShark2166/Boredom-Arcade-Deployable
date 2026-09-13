document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.learning-container');
    if (!container || !window.Lumin) return;

    container.replaceChildren();
    container.classList.add('lumin-learning-container');
    container.innerHTML = `
        <div class="lumin-toolbar">
            <input class="lumin-search" type="search" placeholder="Search games..." aria-label="Search games">
            <button class="lumin-random" type="button">Random</button>
        </div>
        <div class="lumin-grid" aria-live="polite"></div>
        <div class="lumin-pagination"></div>
    `;

    const grid = container.querySelector('.lumin-grid');
    const pagination = container.querySelector('.lumin-pagination');
    const search = container.querySelector('.lumin-search');
    const pageSize = 24;
    let currentPage = 1;
    let currentQuery = '';
    let totalPages = 1;
    let debounce;

    const showError = () => {
        grid.innerHTML = '<p class="lumin-status">Games could not be loaded.</p>';
        pagination.replaceChildren();
    };

    async function loadPage(page) {
        grid.innerHTML = '<p class="lumin-status">Loading games...</p>';
        try {
            const result = await Lumin.getGames({
                page,
                limit: pageSize,
                q: currentQuery,
            });
            const imageUrls = await Promise.all(
                result.games.map((game) => Lumin.getImageUrl(game.image_token))
            );

            currentPage = page;
            totalPages = result.pages || 1;
            grid.replaceChildren();
            result.games.forEach((game, index) => {
                const card = document.createElement('button');
                card.className = 'game-card lumin-game-card';
                card.type = 'button';
                card.setAttribute('aria-label', `Play ${game.name}`);

                const image = document.createElement('img');
                image.className = 'game lumin-game-image';
                image.src = imageUrls[index];
                image.alt = game.name;
                image.loading = 'lazy';

                const title = document.createElement('span');
                title.className = 'game-title-overlay';
                title.textContent = game.name;

                card.append(image, title);
                card.addEventListener('click', () => {
                    window.allowPageNavigation?.();
                    window.location.href = `/gameloaders/education.html?id=${encodeURIComponent(game.id)}`;
                });
                grid.appendChild(card);
            });
            renderPagination();
        } catch (error) {
            console.error('Lumin games error:', error);
            showError();
        }
    }

    function renderPagination() {
        pagination.replaceChildren();
        if (totalPages <= 1) return;

        const addButton = (label, page, disabled = false) => {
            const button = document.createElement('button');
            button.className = `lumin-page-btn${page === currentPage ? ' active' : ''}`;
            button.type = 'button';
            button.textContent = label;
            button.disabled = disabled;
            button.addEventListener('click', () => loadPage(page));
            pagination.appendChild(button);
        };

        addButton('Prev', currentPage - 1, currentPage === 1);
        for (let page = 1; page <= totalPages; page += 1) {
            addButton(String(page), page);
        }
        addButton('Next', currentPage + 1, currentPage === totalPages);
    }

    search.addEventListener('input', (event) => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            currentQuery = event.target.value.trim();
            loadPage(1);
        }, 300);
    });

    container.querySelector('.lumin-random').addEventListener('click', async () => {
        try {
            const result = await Lumin.getGames({ page: 1, limit: 100, q: currentQuery });
            if (result.games.length) {
                const game = result.games[Math.floor(Math.random() * result.games.length)];
                window.allowPageNavigation?.();
                window.location.href = `/gameloaders/education.html?id=${encodeURIComponent(game.id)}`;
            }
        } catch (error) {
            console.error('Lumin random game error:', error);
        }
    });

    try {
        await Lumin.init({ headless: true });
        await loadPage(1);
    } catch (error) {
        console.error('Lumin initialization error:', error);
        showError();
    }
});