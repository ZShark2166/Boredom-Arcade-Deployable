const Proxyframe = document.getElementById("proxyIframe");
const iframeg = document.getElementById("game-iframe");
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        if (iframeg.requestFullscreen) {
            iframeg.requestFullscreen();
        } else if (iframeg.mozRequestFullScreen) {
            iframeg.mozRequestFullScreen();
        } else if (iframeg.webkitRequestFullscreen) {
            iframeg.webkitRequestFullscreen();
        } else if (iframeg.msRequestFullscreen) {
            iframeg.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { 
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}


function refreshIframePRX() {
    const proxyIframe = document.getElementById("proxyIframe");
    proxyIframe.src = proxyIframe.contentWindow.location.href;
}


function toggleFullscreenPRX() {
    if (!document.fullscreenElement) {

        if (Proxyframe.requestFullscreen) {
            Proxyframe.requestFullscreen();
        } else if (Proxyframe.mozRequestFullScreen) {
            Proxyframe.mozRequestFullScreen();
        } else if (Proxyframe.webkitRequestFullscreen) { 
            Proxyframe.webkitRequestFullscreen();
        } else if (Proxyframe.msRequestFullscreen) { 
            Proxyframe.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}


function refreshIframe() {
    iframeg.src = iframeg.contentWindow.location.href;
}
        function goBack() {
            Proxyframe.contentWindow.history.back()
        }

        function goForward() {
            Proxyframe.contentWindow.history.forward()
        }






    const suggestionsDiv = document.querySelector('.game-suggestions');
    const games = [
{ name: 'REPO', url: '/gameloaders/repo.html', imgurl: '/images/repo.webp' },
  { name: 'Grow A Garden', url: '/gameloaders/gag.html', imgurl: '/images/gag.webp' },
  { name: '1v1.LOL', url: '/gameloaders/1v1lol.html', imgurl: '/images/1v1lol.webp' },
  { name: 'A Small World Cup', url: '/gameloaders/smallworldcup.html', imgurl: '/images/smallworldcup.png' },
  { name: "Baldi's Basics", url: "/gameloaders/baldi's-basics.html", imgurl: '/images/baldis.png' },
  { name: 'Basket Random', url: '/gameloaders/basket-random.html', imgurl: '/images/basket-random.png' },
  { name: 'Basketball Stars', url: '/gameloaders/basketball-stars.html', imgurl: '/images/basketball-stars.jpg' },
  { name: 'Bitlife', url: '/gameloaders/bitlife.html', imgurl: '/images/bitlife.png' },
  { name: 'Bitplanes', url: '/gameloaders/bitplanes.html', imgurl: '/images/bitplanes.webp' },
  { name: 'Block Blast', url: '/gameloaders/BlockBlast.html', imgurl: '/images/block-blast.png' },
  { name: 'Bloxd IO', url: '/gameloaders/bloxdio.html', imgurl: '/images/bloxdio.png' },
  { name: 'Burrito Bison', url: '/gameloaders/Burrito-Bison.html', imgurl: '/images/burrito-bison.jpg' },
  { name: 'Cookie Clicker', url: '/gameloaders/cookieclicker.html', imgurl: '/images/cookie-clicker.webp' },
  { name: 'Crazy Cattle 3D', url: '/gameloaders/cattle3d.html', imgurl: '/images/crazy-cattle.jpg' },
  { name: 'Crossy Road', url: '/gameloaders/crossyroad.html', imgurl: '/images/crossy-road.avif' },
  { name: 'Death Run 3D', url: '/gameloaders/deathrun3d.html', imgurl: '/images/death-run.jpg' },
  { name: 'Drive Mad', url: '/gameloaders/drive-mad.html', imgurl: '/images/drive-mad.png' },
  { name: 'Duck Life 1', url: '/gameloaders/ducklife1.html', imgurl: '/images/duck-life-1.webp' },
  { name: 'Duck Life 2', url: '/gameloaders/ducklife2.html', imgurl: '/images/duck-life-2.jpg' },
  { name: 'Duck Life 3', url: '/gameloaders/ducklife3.html', imgurl: '/images/ducklife-3.jpg' },
  { name: 'Duck Life 4', url: '/gameloaders/ducklife4.html', imgurl: '/images/ducklife-4.jpg' },
  { name: 'Flappy Bird', url: '/gameloaders/flappybird.html', imgurl: '/images/flappybird.jpg' },
  { name: 'Getaway Shootout', url: '/gameloaders/getaway-shootout.html', imgurl: '/images/getaway-shootout.jpg' },
  { name: 'Gimme The Airpod', url: '/gameloaders/gimme-the-airpod.html', imgurl: '/images/airpod.png' },
  { name: 'Google Snake', url: '/gameloaders/google-snake.html', imgurl: '/images/snake.png' },
  { name: 'Minecraft 1.5.2', url: '/gameloaders/Minecraft_152.html', imgurl: '/images/minecraft15.jpg' },
  { name: 'Minecraft 1.8.8', url: '/gameloaders/Minecraft_188.html', imgurl: '/images/minecraft18.png' },
  { name: 'Minecraft 1.12.2', url: '/gameloaders/eag12.html', imgurl: '/images/eaglercraft.png' },
  { name: 'Monkey Mart', url: '/gameloaders/monkey-mart.html', imgurl: '/images/monkeymart.png' },
  { name: 'MotoX3M', url: '/gameloaders/motox3m.html', imgurl: '/images/moto-x3m.avif' },
  { name: 'MotoX3M Spooky', url: '/gameloaders/motox3m-spooky.html', imgurl: '/images/motox3mspooky.jpg' },
  { name: 'MotoX3M Winter', url: '/gameloaders/motox3m-winter.html', imgurl: '/images/motowinter.avif' },
  { name: 'OvO', url: '/gameloaders/ovo.html', imgurl: '/images/ovo.png' },
  { name: 'Poly Track', url: '/gameloaders/poly-track.html', imgurl: '/images/polytrack.webp' },
  { name: 'Portal Flash', url: '/gameloaders/portal.html', imgurl: '/images/portalflash.png' },
  { name: 'Resume Run', url: '/gameloaders/resumerun.html', imgurl: '/images/resumerun.png' },
  { name: 'Retro Bowl', url: '/gameloaders/retro-bowl.html', imgurl: '/images/retrobowl.jpg' },
  { name: 'Rooftop Snipers', url: '/gameloaders/rooftopsnipers.html', imgurl: '/images/rooftop.webp' },
  { name: 'Rolly Vortex', url: '/gameloaders/rolly-vortex.html', imgurl: '/images/rollyvortex.png' },
  { name: 'Shell Shockers', url: '/gameloaders/shell.html', imgurl: '/images/shellshockers.png' },
  { name: 'Slope', url: '/gameloaders/slope.html', imgurl: '/images/slope.webp' },
  { name: 'Snow Rider 3D', url: '/gameloaders/snow-rider.html', imgurl: '/images/snow-rider-3d.jpg' },
  { name: 'Smash Karts', url: '/gameloaders/smashkarts.html', imgurl: '/images/smash-karts.webp' },
  { name: 'Super Mario 64', url: '/gameloaders/SM64.html', imgurl: '/images/supermario.jpg' },
  { name: 'Stick Fight', url: '/gameloaders/stick-fight.html', imgurl: '/images/stickfight.jpg' },
  { name: 'Stickman Hook', url: '/gameloaders/stickmanhook.html', imgurl: '/images/hook.jpg' },
  { name: 'Subway Surfers', url: '/gameloaders/subwaysurfers.html', imgurl: '/images/subway.webp' },
  { name: 'Tag', url: '/gameloaders/tag.html', imgurl: '/images/tag.jpg' },
  { name: 'Tanuki Sunset', url: '/gameloaders/tanuki-sunset.html', imgurl: '/images/tanuki.jpg' },
  { name: 'Tube Jumpers', url: '/gameloaders/tube-jumpers.html', imgurl: '/images/tube.avif' }
    ];


document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('suggestions-container');
  if (!container) return;

  const shuffled = games.sort(() => 0.5 - Math.random());
  const randomGames = shuffled.slice(0, 6);

  randomGames.forEach(game => {
    const card = document.createElement('div');
    card.className = 'suggestion-card';
    card.innerHTML = `
      <img src="${game.imgurl}" alt="${game.name}">
      <p>${game.name}</p>
    `;
    card.onclick = () => window.location.href = game.url;
    container.appendChild(card);
    
  });
});

function toggleGameBar() {
    const gameBar = document.getElementById("game-bar");

    if (gameBar.style.display === 'none' || gameBar.style.display === '') {
        gameBar.style.display = 'flex';
        gameBar.style.opacity = 0;

        let opacity = 0;
        const fadeIn = setInterval(() => {
            opacity += 0.05;
            gameBar.style.opacity = opacity;
            if (opacity >= 1) clearInterval(fadeIn);
        }, 5);
    } else {
        let opacity = 1;
        const fadeOut = setInterval(() => {
            opacity -= 0.05;
            gameBar.style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(fadeOut);
                gameBar.style.display = 'none';
            }
        }, 5);
    }
}
