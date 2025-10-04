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
