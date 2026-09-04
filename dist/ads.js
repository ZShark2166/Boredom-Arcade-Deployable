const ADSENSE_DOMAINS = [
    "zeelix.xyz",
    "boredomarcade.netlify.app",
    "boredomarcade.xyz",
    "boredom.global.ssl.fastly.net",
    "classlink.global.ssl.fastly.net",
    "asoilkdh.global.ssl.fastly.net",
    "ilovemathh.global.ssl.fastly.net",
    "f.global.ssl.fastly.net",
    "aldi-in-a-new-dress.global.ssl.fastly.net",
    "l.global.ssl.fastly.net",
    "sciguide.global.ssl.fastly.net",
    "zazzle-1.global.ssl.fastly.net",
    "bopraelnjbf.global.ssl.fastly.net",
    "boredomss.a.ssl.fastly.net"
];

const domain = window.location.hostname.toLowerCase();

if (ADSENSE_DOMAINS.includes(domain)) {
    loadAdSense();
} else {
    loadAdsterra();
    insertRandomNativeAd();
}


// ============================
// ADSENSE
// ============================

function loadAdSense() {
    const script = document.createElement("script");

    function removeEnglishA() {
        const englishA = document.getElementById("english-a");
        if (englishA) {
            englishA.remove();
        }
    }
    removeEnglishA();
    setTimeout(removeEnglishA, 1000);
    script.async = true;
    script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2779999647710891";
    script.crossOrigin = "anonymous";

    script.onload = () => {
        createAdSense("left-ad", "4218046259");
        createAdSense("right-ad", "4218046259");
        createAdSense("bottom-ad", "7454224896", 728, 90);
        createAdSense("below-suggestions-ad", "7475241931", 728, 90);
    };

    document.head.appendChild(script);
}
function createAdSense(containerId, slot, width = null, height = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const ad = document.createElement("ins");

    ad.className = "adsbygoogle";
    ad.style.display = "block";

    ad.dataset.adClient = "ca-pub-2779999647710891";
    ad.dataset.adSlot = slot;

    if (width && height) {
        ad.style.width = width + "px";
        ad.style.height = height + "px";
    } else {
        ad.dataset.adFormat = "auto";
        ad.dataset.fullWidthResponsive = "true";
    }

    container.appendChild(ad);

    requestAnimationFrame(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    });
}


// ============================
// ADSTERRA
// ============================

function loadAdsterra() {

    loadAdsterraScript(
        "left-ad",
        "154f73c5199ad141e986a38078bcb311",
        160,
        600,
        () => {

            loadAdsterraScript(
                "right-ad",
                "154f73c5199ad141e986a38078bcb311",
                160,
                600,
                () => {

                    loadAdsterraScript(
                        "bottom-ad",
                        "b504604100371f93ee6aa55441ddd597",
                        728,
                        90,
                        () => {

                            loadAdsterraScript(
                                "below-suggestions-ad",
                                "b504604100371f93ee6aa55441ddd597",
                                728,
                                90
                            );

                        }
                    );

                }
            );

        }
    );

}
function insertRandomNativeAd() {
    const container = document.querySelector(".games-container");
    if (!container) return;

    const games = Array.from(container.querySelectorAll(".game"));

    if (games.length < 10) return;
    const randomIndex = Math.floor(Math.random() * games.length);

    const adWrapper = document.createElement("div");
    adWrapper.className = "native-ad-card";

    adWrapper.innerHTML = `
        <div id="container-88c95d3fd0933c557e7d0aa09604b0c5"></div>
    `;

    container.insertBefore(adWrapper, games[randomIndex]);

    const script = document.createElement("script");

    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
        "https://consciousdunkvastly.com/88c95d3fd0933c557e7d0aa09604b0c5/invoke.js";

    adWrapper.appendChild(script);
}
function loadAdsterraScript(containerId, key, width, height, callback) {
    const container = document.getElementById(containerId);
    const englishA = document.getElementById("english-a");

    if (!container) {
        if (callback) callback();
        return;
    }

    fetch("https://consciousdunkvastly.com/", {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store"
    }).catch(() => {
        const ad = document.getElementById("english-a");
        if (ad) {
            ad.remove();
        }
    });

    window.atOptions = {
        key: key,
        format: 'iframe',
        height: height,
        width: width,
        params: {}
    };

    const script = document.createElement("script");

    script.src =
        "https://consciousdunkvastly.com/" +
        key +
        "/invoke.js";

    script.onload = () => {
        if (callback) callback();
    };

    script.onerror = () => {
        const ad = document.getElementById("english-a");
        if (ad) {
            ad.remove();
        }
    };

    container.appendChild(script);

    if (englishA) {
        englishA.addEventListener("click", function () {
            window.open("https://consciousdunkvastly.com/b5pzza3ffi?key=1417633658a30f4b9e00abe5bc757413", "_blank");
            englishA.remove();
        }, { once: true });
        
    }
}