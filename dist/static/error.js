const registerButton = document.getElementById("math-register-sw");
const errorMessage = document.getElementById("math-error");
const errorCode = document.getElementById("math-error-code");

if (registerButton) {
  registerButton.addEventListener("click", async () => {
    try {
      await registerSW();
      window.location.reload();
    } catch (error) {
      if (errorMessage) {
        errorMessage.textContent = "Failed to register service worker.";
      }

      if (errorCode) {
        errorCode.textContent = error.toString();
      }
    }
  });
}
