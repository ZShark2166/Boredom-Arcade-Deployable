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
        "f8d14dd00389ac06a38041e78a7bd44c",
        160,
        600,
        () => {

            loadAdsterraScript(
                "right-ad",
                "f8d14dd00389ac06a38041e78a7bd44c",
                160,
                600,
                () => {

                    loadAdsterraScript(
                        "bottom-ad",
                        "ee87176bd8ca13f3904d1ca630862ad4",
                        728,
                        90,
                        () => {

                            loadAdsterraScript(
                                "below-suggestions-ad",
                                "ee87176bd8ca13f3904d1ca630862ad4",
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
        <div id="container-2745de1848ef260a9cc9dacb9fecf667"></div>
    `;

    container.insertBefore(adWrapper, games[randomIndex]);

    const script = document.createElement("script");

    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
        "https://consciousdunkvastly.com/2745de1848ef260a9cc9dacb9fecf667/invoke.js";

    adWrapper.appendChild(script);
}
function loadAdsterraScript(containerId, key, width, height, callback) {

    const container = document.getElementById(containerId);
    if (!container) {
        if (callback) callback();
        return;
    }

    window.atOptions = {
        'key': key,
        'format': 'iframe',
        'height': height,
        'width': width,
        'params': {}
    };

    const script = document.createElement("script");

    script.src =
        "https://consciousdunkvastly.com/" +
        key +
        "/invoke.js";

    script.onload = () => {
        if (callback) callback();
    };

    container.appendChild(script);
}
