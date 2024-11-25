"use strict";

const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const searchEngine = document.getElementById("uv-search-engine");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  const url = search(address.value, searchEngine.value);
  const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(url);
  window.location.href = `/reading/?url=${encodeURIComponent(encodedUrl)}`;
});

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
