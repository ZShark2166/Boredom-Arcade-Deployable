
(function () {
    try {
        if (localStorage.getItem('aboutBlankCloakerEnabled') !== 'true') return;
    } catch(e) { return; }

    var inFrame;
    try { inFrame = window !== top; } catch(e) { inFrame = true; }
    if (inFrame || navigator.userAgent.includes('Firefox')) return;

    var popup = open('about:blank', '_blank');
    if (!popup || popup.closed) {
        alert('Allow popups and redirects to hide from teachers screens.');
        return;
    }

    var doc = popup.document;
    var iframe = doc.createElement('iframe');
    var style = iframe.style;
    var link = doc.createElement('link');

    doc.title = 'Home | Classroom';
    link.rel = 'icon';
    link.href = '/images/googleclassroom.webp';
    doc.head.appendChild(link);

    iframe.src = location.href;
    style.position = 'fixed';
    style.top = style.bottom = style.left = style.right = 0;
    style.border = style.outline = 'none';
    style.width = style.height = '100%';

    doc.body.appendChild(iframe);
    location.replace('https://classroom.google.com');
})();