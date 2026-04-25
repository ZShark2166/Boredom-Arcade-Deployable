const gamesData = [
    { title: "R.E.P.O.", image: "/images/repo.webp", href: "/gameloaders/repo.html", category: "Horror", players: "Solo", featured: true },
    { title: "Grow A Garden", image: "/images/gag.webp", href: "/gameloaders/gag.html", category: "Chill", players: "Solo", featured: true },
    { title: "10 Minutes Till Dawn", image: "/images/10m.png", href: "/gameloaders/10m.html", category: "Action", players: "Solo", featured: true },
    { title: "1v1.LOL", image: "/images/1v1lol.webp", href: "/gameloaders/1v1lol.html", category: "Action", players: "Multiplayer" },
    { title: "ADGAC", image: "/images/adgac.png", href: "/gameloaders/adgac.html", category: "Platformer", players: "Solo" },
    { title: "Among Us", image: "/images/amongus.png", href: "/gameloaders/amongus.html", category: "Multiplayer", players: "Multiplayer" },
    { title: "A Small World Cup", image: "/images/smallworldcup.png", href: "/gameloaders/smallworldcup.html", category: "Sports", players: "Solo" },
    { title: "Bad Parenting", image: "/images/badparenting.png", href: "/gameloaders/badparenting.html", category: "Horror", players: "Solo" },
    { title: "Baldi's Basics", image: "/images/baldis.png", href: "/gameloaders/baldi's-basics.html", category: "Horror", players: "Solo" },
    { title: "Basket Random", image: "/images/basket-random.png", href: "/gameloaders/basket-random.html", category: "Sports", players: "2 Players", featured: true },
    { title: "Basketball Stars", image: "/images/basketball-stars.jpg", href: "/gameloaders/basketball-stars.html", category: "Sports", players: "2 Players" },
    { title: "Bitlife", image: "/images/bitlife.png", href: "/gameloaders/bitlife.html", category: "Simulation", players: "Solo" },
    { title: "Bitplanes", image: "/images/bitplanes.webp", href: "/gameloaders/bitplanes.html", category: "Action", players: "Solo" },
    { title: "Block Blast", image: "/images/block-blast.png", href: "/gameloaders/BlockBlast.html", category: "Puzzle", players: "Solo" },
    { title: "Bloxd IO", image: "/images/bloxdio.png", href: "/gameloaders/bloxdio.html", category: "Sandbox", players: "Multiplayer" },
    { title: "Buckshot Roulette", image: "/images/buckshot.jpg", href: "/gameloaders/buckshot.html", category: "Horror", players: "Solo", featured: true },
    { title: "Burrito Bison", image: "/images/burrito-bison.jpg", href: "/gameloaders/Burrito-Bison.html", category: "Action", players: "Solo" },
    { title: "Cookie Clicker", image: "/images/cookie-clicker.webp", href: "/gameloaders/cookieclicker.html", category: "Idle", players: "Solo" },
    { title: "Crazy Cattle 3D", image: "/images/crazy-cattle.jpg", href: "/gameloaders/cattle3d.html", category: "Action", players: "Solo" },
    { title: "Crossy Road", image: "/images/crossy-road.avif", href: "/gameloaders/crossyroad.html", category: "Arcade", players: "Solo" },
    { title: "Death Run 3D", image: "/images/death-run.jpg", href: "/gameloaders/deathrun3d.html", category: "Racing", players: "Solo" },
    { title: "Drive Mad", image: "/images/drive-mad.png", href: "/gameloaders/drive-mad.html", category: "Racing", players: "Solo", featured: true },
    { title: "Duck Life 1", image: "/images/duck-life-1.webp", href: "/gameloaders/ducklife1.html", category: "Simulation", players: "Solo" },
    { title: "Duck Life 2", image: "/images/duck-life-2.jpg", href: "/gameloaders/ducklife2.html", category: "Simulation", players: "Solo" },
    { title: "Duck Life 3", image: "/images/ducklife-3.jpg", href: "/gameloaders/ducklife3.html", category: "Simulation", players: "Solo" },
    { title: "Duck Life 4", image: "/images/ducklife-4.jpg", href: "/gameloaders/ducklife4.html", category: "Simulation", players: "Solo" },
    { title: "Escape Road", image: "/images/er.png", href: "/gameloaders/er.html", category: "Racing", players: "Solo" },
    { title: "Flappy Bird", image: "/images/flappybird.jpg", href: "/gameloaders/flappybird.html", category: "Arcade", players: "Solo" },
    { title: "Geometry Dash", image: "/images/gd.png", href: "/gameloaders/gd.html", category: "Platformer", players: "Solo", featured: true },
    { title: "Getaway Shootout", image: "/images/getaway-shootout.jpg", href: "/gameloaders/getaway-shootout.html", category: "Multiplayer", players: "2 Players" },
    { title: "Gimme The Airpod", image: "/images/airpod.png", href: "/gameloaders/gimme-the-airpod.html", category: "Arcade", players: "Solo" },
    { title: "Google Snake", image: "/images/snake.png", href: "/gameloaders/google-snake.html", category: "Arcade", players: "Solo" },
    { title: "Minecraft 1.5.2", image: "/images/minecraft15.jpg", href: "/gameloaders/Minecraft_152.html", category: "Sandbox", players: "Solo" },
    { title: "Minecraft 1.8.8", image: "/images/minecraft18.png", href: "/gameloaders/Minecraft_188.html", category: "Sandbox", players: "Multiplayer" },
    { title: "Minecraft 1.12.2", image: "/images/eaglercraft.png", href: "/gameloaders/eag12.html", category: "Sandbox", players: "Multiplayer", featured: true },
    { title: "Monkey Mart", image: "/images/monkeymart.png", href: "/gameloaders/monkey-mart.html", category: "Simulation", players: "Solo", featured: true },
    { title: "Moto X3M", image: "/images/moto-x3m.avif", href: "/gameloaders/motox3m.html", category: "Racing", players: "Solo" },
    { title: "Moto X3M Spooky", image: "/images/motox3mspooky.jpg", href: "/gameloaders/motox3m-spooky.html", category: "Racing", players: "Solo" },
    { title: "Moto X3M Winter", image: "/images/motowinter.avif", href: "/gameloaders/motox3m-winter.html", category: "Racing", players: "Solo" },
    { title: "OvO", image: "/images/ovo.png", href: "/gameloaders/ovo.html", category: "Platformer", players: "Solo" },
    { title: "Poly Track", image: "/images/polytrack.webp", href: "/gameloaders/poly-track.html", category: "Racing", players: "Solo" },
    { title: "Portal Flash", image: "/images/portalflash.png", href: "/gameloaders/portal.html", category: "Puzzle", players: "Solo" },
    { title: "Resume Run", image: "/images/resumerun.png", href: "/gameloaders/resumerun.html", category: "Arcade", players: "Solo" },
    { title: "Retro Bowl", image: "/images/retrobowl.jpg", href: "/gameloaders/retro-bowl.html", category: "Sports", players: "Solo", featured: true },
    { title: "Rooftop Snipers", image: "/images/rooftop.webp", href: "/gameloaders/rooftopsnipers.html", category: "Multiplayer", players: "2 Players" },
    { title: "Rolly Vortex", image: "/images/rollyvortex.png", href: "/gameloaders/rolly-vortex.html", category: "Arcade", players: "Solo" },
    { title: "Shell Shockers", image: "/images/shellshockers.png", href: "/gameloaders/shell.html", category: "Action", players: "Multiplayer" },
    { title: "Slope", image: "/images/slope.webp", href: "/gameloaders/slope.html", category: "Arcade", players: "Solo" },
    { title: "Snow Rider 3D", image: "/images/snow-rider-3d.jpg", href: "/gameloaders/snow-rider.html", category: "Arcade", players: "Solo" },
    { title: "Smash Karts", image: "/images/smash-karts.webp", href: "/gameloaders/smashkarts.html", category: "Multiplayer", players: "Multiplayer" },
    { title: "Super Mario 64", image: "/images/supermario.jpg", href: "/gameloaders/SM64.html", category: "Platformer", players: "Solo" },
    { title: "Stick Fight", image: "/images/stickfight.jpg", href: "/gameloaders/stick-fight.html", category: "Multiplayer", players: "2 Players" },
    { title: "Stickman Hook", image: "/images/hook.jpg", href: "/gameloaders/stickmanhook.html", category: "Platformer", players: "Solo" },
    { title: "Subway Surfers", image: "/images/subway.webp", href: "/gameloaders/subwaysurfers.html", category: "Arcade", players: "Solo" },
    { title: "Tag", image: "/images/tag.jpg", href: "/gameloaders/tag.html", category: "Arcade", players: "2 Players" },
    { title: "Tanuki Sunset", image: "/images/tanuki.jpg", href: "/gameloaders/tanuki-sunset.html", category: "Racing", players: "Solo", featured: true },
    { title: "Tube Jumpers", image: "/images/tube.avif", href: "/gameloaders/tube-jumpers.html", category: "Multiplayer", players: "2 Players" }
];

document.addEventListener("DOMContentLoaded", () => {
    const featuredGrid = document.getElementById("featured-grid");
    const gamesGrid = document.getElementById("games-grid");
    const categoryFilters = document.getElementById("category-filters");
    const resultsSummary = document.getElementById("results-summary");
    const emptyState = document.getElementById("empty-state");
    const searchInput = document.getElementById("game-search");
    const clearSearchButton = document.getElementById("clear-search");
    const resetFiltersButton = document.getElementById("reset-filters");
    const randomGameButton = document.getElementById("random-game-button");



    const state = {
        query: "",
        category: "All"
    };

    const categories = ["All", ...new Set(gamesData.map((game) => game.category))];
    const featuredGames = gamesData.filter((game) => game.featured).slice(0, 8);

    buildFeaturedGames();
    buildCategoryFilters();
    renderGames();

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            state.query = searchInput.value.trim().toLowerCase();
            renderGames();
        });
    }

    if (clearSearchButton) {
        clearSearchButton.addEventListener("click", () => {
            if (searchInput) {
                searchInput.value = "";
                searchInput.focus();
            }

            state.query = "";
            renderGames();
        });
    }

    if (resetFiltersButton) {
        resetFiltersButton.addEventListener("click", () => {
            state.query = "";
            state.category = "All";

            if (searchInput) {
                searchInput.value = "";
            }

            updateActiveChip();
            renderGames();
        });
    }

    if (randomGameButton) {
        randomGameButton.addEventListener("click", () => {
            const visibleGames = getVisibleGames();
            const pool = visibleGames.length ? visibleGames : gamesData;
            const randomGame = pool[Math.floor(Math.random() * pool.length)];
            window.location.href = randomGame.href;
        });
    }



    function buildFeaturedGames() {
        featuredGrid.innerHTML = featuredGames
            .map((game) => {
                return `
                    <a class="featured-card" href="${game.href}" data-title="${escapeHtml(game.title)}">
                        <img src="${game.image}" alt="${escapeHtml(game.title)}">
                        <div class="featured-content">
                            <div class="game-meta">
                                <span class="game-badge">${game.category}</span>
                                <span class="game-badge">${game.players}</span>
                            </div>
                            <h3>${game.title}</h3>
                        </div>
                    </a>
                `;
            })
            .join("");

        featuredGrid.querySelectorAll(".featured-card").forEach((card) => {
            const game = gamesData.find((item) => item.title === card.dataset.title);
            if (!game) {
                return;
            }

        });
    }

    function buildCategoryFilters() {
        categoryFilters.innerHTML = categories
            .map((category) => {
                const count = category === "All" ? gamesData.length : gamesData.filter((game) => game.category === category).length;
                return `<button class="filter-chip${category === state.category ? " active" : ""}" type="button" data-category="${category}">${category} (${count})</button>`;
            })
            .join("");

        categoryFilters.querySelectorAll(".filter-chip").forEach((chip) => {
            chip.addEventListener("click", () => {
                state.category = chip.dataset.category;
                updateActiveChip();
                renderGames();
            });
        });
    }

    function updateActiveChip() {
        categoryFilters.querySelectorAll(".filter-chip").forEach((chip) => {
            chip.classList.toggle("active", chip.dataset.category === state.category);
        });
    }

    function getVisibleGames() {
        return gamesData.filter((game) => {
            const matchesCategory = state.category === "All" || game.category === state.category;
            const haystack = `${game.title} ${game.category} ${game.players}`.toLowerCase();
            const matchesQuery = !state.query || haystack.includes(state.query);
            return matchesCategory && matchesQuery;
        });
    }

    function renderGames() {
        const visibleGames = getVisibleGames();

        gamesGrid.innerHTML = visibleGames
            .map((game) => {
                return `
                    <a class="game-card" href="${game.href}" data-title="${escapeHtml(game.title)}">
                        <img src="${game.image}" alt="${escapeHtml(game.title)}">
                        <div class="game-content">
                            <div class="game-meta">
                                <span class="game-badge">${game.category}</span>
                                <span class="game-badge">${game.players}</span>
                            </div>
                            <h3>${game.title}</h3>
                            <div class="game-footer">
                                <span class="game-cta">Play now</span>
                            </div>
                        </div>
                    </a>
                `;
            })
            .join("");

        if (resultsSummary) {
            resultsSummary.textContent = `${visibleGames.length} game${visibleGames.length === 1 ? "" : "s"} ${state.category === "All" ? "available" : `in ${state.category}`}`;
        }

        if (emptyState) {
            emptyState.hidden = visibleGames.length !== 0;
        }


        gamesGrid.querySelectorAll(".game-card").forEach((card) => {
            const game = gamesData.find((item) => item.title === card.dataset.title);
            if (!game) {
                return;
            }


        });
    }

});

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}
