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
        createAdSense("bottom-ad", "7454224896");
        createAdSense("below-suggestions-ad", "7475241931");
    };

    document.head.appendChild(script);
}
function createAdSense(containerId, slot) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const ad = document.createElement("ins");

    ad.className = "adsbygoogle";
    ad.style.display = "block";
    ad.dataset.adClient = "ca-pub-2779999647710891";
    ad.dataset.adSlot = slot;
    ad.dataset.adFormat = "auto";
    ad.dataset.fullWidthResponsive = "true";

    container.appendChild(ad);

    (window.adsbygoogle = window.adsbygoogle || []).push({});
}


// ============================
// ADSTERRA
// ============================

function loadAdsterra() {

    // Load LEFT vertical
    loadAdsterraScript(
        "left-ad",
        "f8d14dd00389ac06a38041e78a7bd44c",
        160,
        600,
        () => {

            // Load RIGHT vertical
            loadAdsterraScript(
                "right-ad",
                "f8d14dd00389ac06a38041e78a7bd44c",
                160,
                600,
                () => {

                    // Load BOTTOM horizontal
                    loadAdsterraScript(
                        "bottom-ad",
                        "ee87176bd8ca13f3904d1ca630862ad4",
                        728,
                        90,
                        () => {

                            // Load BELOW-SUGGESTIONS horizontal
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

function loadAdsterraScript(containerId, key, width, height, callback) {

    const container = document.getElementById(containerId);
    if (!container) {
        if (callback) callback();
        return;
    }

    // Exact same configuration Adsterra gives you
    window.atOptions = {
        'key': key,
        'format': 'iframe',
        'height': height,
        'width': width,
        'params': {}
    };

    const script = document.createElement("script");

    script.src =
        "https://www.highrevenueformat.com/" +
        key +
        "/invoke.js";

    script.onload = () => {
        if (callback) callback();
    };

    container.appendChild(script);
}