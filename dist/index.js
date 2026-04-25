const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
let lastScrollTop = 0;
let isDirty = false;
let allowNavigation = false;
const disableNavbarAutoHide = document.body.classList.contains('games-page');

window.addEventListener('scroll', () => {
    if (!navbar) {
        return;
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!disableNavbarAutoHide && scrollTop > lastScrollTop + 12 && scrollTop > 80) {
        navbar.classList.add('navbar-hidden');
    } else {
        navbar.classList.remove('navbar-hidden');
    }

    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});


function setActiveLink() {
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}


setActiveLink();

(function () {
    var STORAGE_KEY = 'closingPreventionEnabled';

    function isEnabled() {
        try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch(e) { return false; }
    }

    function setEnabled(val) {
        try { localStorage.setItem(STORAGE_KEY, val ? 'true' : 'false'); } catch(e) {}
        isDirty = val;
    }

    var enabled = isEnabled();
    isDirty = enabled;

    var toggle = document.getElementById('closing-toggle');
    var status = document.getElementById('closing-status');

    if (toggle) {
        toggle.checked = enabled;

        if (status) status.textContent = enabled ? 'On' : 'Off';

        toggle.addEventListener('change', function () {
            var on = toggle.checked;
            setEnabled(on);
            if (status) status.textContent = on ? 'On' : 'Off';
        });
    }
})();

document.addEventListener('mousedown', function (e) {
    const el = e.target.closest('a, button, img');

    if (!el) return;
    if (el.tagName === 'A' && el.href) {
        allowNavigation = true;
    }
    if (el.onclick || el.getAttribute('onclick')) {
        allowNavigation = true;
    }
});
window.addEventListener('beforeunload', (e) => {
  if (isDirty && !allowNavigation) {
    e.preventDefault();
    e.returnValue = '';
  }
});

window.addEventListener('pageshow', () => {
    allowNavigation = false;
});
