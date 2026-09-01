const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
let lastScrollTop = 0;
let isDirty = false;
let allowNavigation = false;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    

    if (scrollTop > lastScrollTop && scrollTop > 80) {
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

    function syncState(enabled) {
        isDirty = !!enabled;

        var toggle = document.getElementById('closing-toggle');
        var status = document.getElementById('closing-status');

        if (toggle) {
            toggle.checked = isDirty;
        }

        if (status) {
            status.textContent = isDirty ? 'On' : 'Off';
        }
    }

    function setEnabled(val) {
        var enabled = !!val;
        try { localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false'); } catch(e) {}
        syncState(enabled);
    }

    syncState(isEnabled());

    var toggle = document.getElementById('closing-toggle');
    if (toggle) {
        toggle.addEventListener('change', function () {
            var on = toggle.checked;
            setEnabled(on);
        });
    }

    window.addEventListener('storage', function (event) {
        if (!event.key || event.key !== STORAGE_KEY) return;
        syncState(event.newValue === 'true');
    });
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