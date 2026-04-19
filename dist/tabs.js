const mainContent = document.getElementById("main-content");
const prContainer = document.getElementById("pr-container");
const initialIframe = document.getElementById("prIframe");
const browserForm = document.getElementById("browser-form");
const browserInput = document.getElementById("browser-input");
const searchEngineInput = document.getElementById("uv-search-engine");
const tabsContainer = document.querySelector(".Browser-tabs");

const HOME_TITLE = "Boredom V3";
const HOME_FAVICON = "/images/boredomlogo.png";

function buildTab(id, overrides = {}) {
    return {
        id,
        title: HOME_TITLE,
        favicon: HOME_FAVICON,
        url: "",
        iframeSrc: "",
        isHome: true,
        iframeEl: null,
        ...overrides,
    };
}

const tabs = [buildTab(1)];

let activeTabId = tabs[0].id;
let nextTabId = 2;

if (initialIframe) {
    initialIframe.remove();
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function getActiveTab() {
    return tabs.find((tab) => tab.id === activeTabId) || tabs[0];
}

function getTabById(tabId) {
    return tabs.find((tab) => tab.id === tabId) || null;
}

function getActiveIframe() {
    const activeTab = getActiveTab();
    return activeTab ? activeTab.iframeEl : null;
}

function getDisplayTitle(tab) {
    if (tab.title && tab.title.trim()) {
        return tab.title;
    }

    if (tab.url) {
        try {
            return new URL(tab.url).hostname;
        } catch (error) {
            return tab.url;
        }
    }

    return "New Tab";
}

function renderTabs() {
    const tabMarkup = tabs
        .map((tab) => {
            const isActive = tab.id === activeTabId;
            return `
                <div class="Browser-tab${isActive ? " active" : ""}" data-tab-id="${tab.id}">
                    <img src="${escapeHtml(tab.favicon || HOME_FAVICON)}" class="tab-favicon">
                    <span class="tab-title">${escapeHtml(getDisplayTitle(tab))}</span>
                    <span class="tab-close" role="button" aria-label="Close tab">&times;</span>
                </div>
            `;
        })
        .join("");

    tabsContainer.innerHTML = `${tabMarkup}<button class="tab-new" type="button">+</button>`;
}

function hideAllIframes() {
    tabs.forEach((tab) => {
        if (tab.iframeEl) {
            tab.iframeEl.style.display = "none";
        }
    });
}

function showHomeView() {
    hideAllIframes();
    prContainer.style.display = "none";
    prContainer.style.opacity = "0";
    mainContent.style.display = "block";
    mainContent.style.opacity = "1";
}

function showActiveTabView() {
    const activeTab = getActiveTab();

    if (!activeTab || activeTab.isHome || !activeTab.iframeEl) {
        showHomeView();
        return;
    }

    hideAllIframes();
    mainContent.style.opacity = "0";
    mainContent.style.display = "none";
    prContainer.style.display = "block";
    prContainer.style.opacity = "1";
    activeTab.iframeEl.style.display = "block";
}

function syncViewToActiveTab() {
    const activeTab = getActiveTab();
    browserInput.value = activeTab.url || "";

    if (activeTab.isHome) {
        showHomeView();
        return;
    }

    showActiveTabView();
}

function attachIframeHandlers(tab) {
    if (!tab.iframeEl) {
        return;
    }

    tab.iframeEl.addEventListener("load", () => {
        updateTabFromIframe(tab.id);
    });
}

function ensureIframeForTab(tab) {
    if (tab.iframeEl) return tab.iframeEl;

    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "100vh";
    iframe.style.border = "none";
    iframe.style.display = "none";
    iframe.style.opacity = "1";
    iframe.style.transition = "opacity 0.2s ease";
    iframe.dataset.tabId = String(tab.id);

    prContainer.appendChild(iframe);
    tab.iframeEl = iframe;
    attachIframeHandlers(tab);
    return iframe;
}
function decodeSourceUrl(proxiedUrl) {
    if (!proxiedUrl) {
        return "";
    }

    try {
        const originPrefix = `${window.location.origin}${__uv$config.prefix}`;
        if (proxiedUrl.startsWith(originPrefix)) {
            const encodedUrl = proxiedUrl.slice(originPrefix.length);
            return __uv$config.decodeUrl(encodedUrl);
        }
    } catch (error) {
        return "";
    }

    return "";
}

function updateTabFromIframe(tabId) {
    const tab = getTabById(tabId);

    if (!tab || tab.isHome || !tab.iframeEl) {
        return;
    }

    try {
        const proxiedUrl = tab.iframeEl.contentWindow.location.href;
        const decodedUrl = decodeSourceUrl(proxiedUrl);
        if (decodedUrl) {
            tab.url = decodedUrl;
        }
    } catch (error) {
    }

    try {
        const currentTitle = tab.iframeEl.contentDocument.title;
        if (currentTitle) {
            tab.title = currentTitle;
        }
    } catch (error) {
    }

    if (tab.id === activeTabId) {
        browserInput.value = tab.url || "";
    }

    renderTabs();
}

function fadeTransition(callback) {
    const activeTab = getActiveTab();
    const outgoing = activeTab?.iframeEl;

    if (outgoing) {
        outgoing.style.opacity = "0";
    } else {
        mainContent.style.opacity = "0";
    }

    setTimeout(() => {
        callback();
        const incomingTab = getActiveTab();
        if (incomingTab?.iframeEl && !incomingTab.isHome) {
            incomingTab.iframeEl.style.opacity = "0";
            requestAnimationFrame(() => {
                incomingTab.iframeEl.style.transition = "opacity 0.2s ease";
                incomingTab.iframeEl.style.opacity = "1";
            });
        } else {
            mainContent.style.opacity = "0";
            requestAnimationFrame(() => {
                mainContent.style.opacity = "1";
            });
        }
    }, 200);
}

function activateTab(tabId) {
    if (!tabs.some((tab) => tab.id === tabId)) return;

    fadeTransition(() => {
        activeTabId = tabId;
        renderTabs();
        syncViewToActiveTab();
    });
}

function createNewTab() {
    const tab = buildTab(nextTabId++, {
        title: "New Tab",
    });

    tabs.push(tab);
    activateTab(tab.id);
}

function removeTabIframe(tab) {
    if (tab.iframeEl && tab.iframeEl.parentNode) {
        tab.iframeEl.parentNode.removeChild(tab.iframeEl);
    }

    tab.iframeEl = null;
}

function resetToHomeTab(tab) {
    removeTabIframe(tab);
    tab.title = HOME_TITLE;
    tab.favicon = HOME_FAVICON;
    tab.url = "";
    tab.iframeSrc = "";
    tab.isHome = true;
}

function closeTab(tabId) {
    const index = tabs.findIndex((tab) => tab.id === tabId);

    if (index === -1) {
        return;
    }

    if (tabs.length === 1) {
        resetToHomeTab(tabs[0]);
        activeTabId = tabs[0].id;
        renderTabs();
        syncViewToActiveTab();
        return;
    }

    const [closedTab] = tabs.splice(index, 1);
    removeTabIframe(closedTab);

    if (activeTabId === tabId) {
        const fallbackTab = tabs[Math.max(0, index - 1)] || tabs[0];
        activeTabId = fallbackTab.id;
    }

    renderTabs();
    syncViewToActiveTab();
}

function normalizeInputToUrl(value) {
    let url = value.trim();

    if (!url) {
        return "";
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        if (url.includes(".")) {
            url = "https://" + url;
        } else {
            url = searchEngineInput.value.replace("%s", encodeURIComponent(url));
        }
    }

    return url;
}

function waitForRegistrationActivation(registration) {
    if (!registration || registration.active) {
        return Promise.resolve();
    }

    const worker = registration.installing || registration.waiting;

    if (!worker) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        const timeoutId = window.setTimeout(() => {
            reject(new Error("Service worker activation timed out."));
        }, 10000);

        worker.addEventListener("statechange", () => {
            if (worker.state === "activated") {
                window.clearTimeout(timeoutId);
                resolve();
            }
        });
    });
}

async function ensureProxyReady() {
    if (typeof registerSW !== "function") {
        return true;
    }

    try {
        const registration = await registerSW();
        await waitForRegistrationActivation(registration);
        return true;
    } catch (error) {
        console.error("Proxy bootstrap failed:", error);
        return false;
    }
}

function loadActiveTab(url) {
    const activeTab = getActiveTab();
    const iframe = ensureIframeForTab(activeTab);

    activeTab.url = url;
    activeTab.iframeSrc = __uv$config.prefix + __uv$config.encodeUrl(url);
    activeTab.isHome = false;

    try {
        activeTab.title = new URL(url).hostname;
    } catch (error) {
        activeTab.title = url;
    }

    browserInput.value = url;
    renderTabs();
    showActiveTabView();

    if (iframe.src !== activeTab.iframeSrc) {
        iframe.src = activeTab.iframeSrc;
    }
}

browserForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const url = normalizeInputToUrl(browserInput.value);

    if (!url) {
        return;
    }

    const proxyReady = await ensureProxyReady();

    if (!proxyReady) {
        return;
    }

    loadActiveTab(url);
});

tabsContainer.addEventListener("click", (event) => {
    const newTabTarget = event.target.closest(".tab-new");
    if (newTabTarget) {
        createNewTab();
        return;
    }

    const tabElement = event.target.closest(".Browser-tab");
    if (!tabElement) {
        return;
    }

    const tabId = Number(tabElement.dataset.tabId);

    if (event.target.closest(".tab-close")) {
        closeTab(tabId);
        return;
    }

    activateTab(tabId);
});

function goHome() {
    const activeTab = getActiveTab();
    resetToHomeTab(activeTab);
    renderTabs();
    syncViewToActiveTab();
}

window.openProxyTab = async (url) => {
    if (!url) {
        return;
    }

    const proxyReady = await ensureProxyReady();

    if (!proxyReady) {
        return;
    }

    loadActiveTab(url);
};

function refreshIframe() {
    const iframe = getActiveIframe();
    if (!iframe || !iframe.src) {
        return;
    }

    iframe.src = iframe.src;
}

function goBack() {
    const iframe = getActiveIframe();
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.history.back();
    }
}

function goForward() {
    const iframe = getActiveIframe();
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.history.forward();
    }
}

function fullscreen() {
    const iframe = getActiveIframe();
    if (iframe) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            iframe.requestFullscreen();
        }
    }
}

renderTabs();
