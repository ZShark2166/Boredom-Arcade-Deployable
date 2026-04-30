"use strict";

const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const searchEngine = document.getElementById("uv-search-engine");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");

if (form && address && searchEngine) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const registration = await registerSW();
      await waitForRegistrationActivation(registration);
    } catch (err) {
      if (error) {
        error.textContent = "Failed to register service worker.";
      }

      if (errorCode) {
        errorCode.textContent = err.toString();
      }

      throw err;
    }

    const url = search(address.value, searchEngine.value);

    if (document.querySelector(".Browser")) {
      if (typeof window.openProxyTab === "function") {
        await window.openProxyTab(url);
        return;
      }

      if (typeof window.openUrlInActiveTab === "function") {
        window.openUrlInActiveTab(url);
        return;
      }
    }

    const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(url);
    window.location.href = `/reading/?url=${encodeURIComponent(encodedUrl)}&normurl=${encodeURIComponent(url)}`;
  });
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

function search(value, searchEngine) {
  let url = value.trim();

  if (!isUrl(url)) {
    url = searchEngine.replace('%s', encodeURIComponent(url));
  } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    url = "http://" + url;
  }

  return url;
}

function isUrl(val = "") {
  return /^http(s?):\/\//.test(val) || (val.includes(".") && val.slice(0, 1) !== " ");
}
