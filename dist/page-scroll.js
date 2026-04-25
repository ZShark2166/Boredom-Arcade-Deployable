document.addEventListener('DOMContentLoaded', () => {
    const scrollContent = document.querySelector('.page-scroll-content');
    const scrollFrame = document.querySelector('.page-scroll-frame');
    const scrollbar = document.querySelector('.page-scrollbar');
    const scrollbarThumb = document.querySelector('.page-scrollbar-thumb');

    if (!scrollContent || !scrollbar || !scrollbarThumb) {
        return;
    }

    const syncScrollbar = () => {
        const maxScroll = scrollContent.scrollHeight - scrollContent.clientHeight;
        const trackHeight = scrollbar.clientHeight;

        if (maxScroll <= 0 || trackHeight <= 0) {
            scrollbar.hidden = true;
            return;
        }

        scrollbar.hidden = false;

        const thumbHeight = Math.max(48, Math.round((scrollContent.clientHeight / scrollContent.scrollHeight) * trackHeight));
        const maxThumbTravel = trackHeight - thumbHeight;
        const thumbY = Math.round((scrollContent.scrollTop / maxScroll) * maxThumbTravel);

        scrollbarThumb.style.height = `${thumbHeight}px`;
        scrollbarThumb.style.transform = `translateY(${thumbY}px)`;
    };

    const forwardWheelToContent = (event) => {
        if (event.target.closest('.navbar, .footer, .page-scrollbar')) {
            return;
        }

        const navWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-width')) || 0;
        const insideMainArea = event.clientX > navWidth && event.clientY >= 0 && event.clientY <= window.innerHeight;
        const insideFrame = scrollFrame ? scrollFrame.contains(event.target) : false;

        if (!insideMainArea && !insideFrame) {
            return;
        }

        const previousScrollTop = scrollContent.scrollTop;
        scrollContent.scrollTop += event.deltaY;

        if (scrollContent.scrollTop !== previousScrollTop) {
            event.preventDefault();
        }
    };

    let dragState = null;

    scrollbarThumb.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        scrollbarThumb.setPointerCapture(event.pointerId);
        dragState = {
            startY: event.clientY,
            startScrollTop: scrollContent.scrollTop,
        };
        scrollbarThumb.style.cursor = 'grabbing';
    });

    scrollbarThumb.addEventListener('pointermove', (event) => {
        if (!dragState) {
            return;
        }

        const maxScroll = scrollContent.scrollHeight - scrollContent.clientHeight;
        const maxThumbTravel = scrollbar.clientHeight - scrollbarThumb.offsetHeight;

        if (maxScroll <= 0 || maxThumbTravel <= 0) {
            return;
        }

        const delta = event.clientY - dragState.startY;
        scrollContent.scrollTop = dragState.startScrollTop + (delta / maxThumbTravel) * maxScroll;
    });

    const endDrag = () => {
        dragState = null;
        scrollbarThumb.style.cursor = 'grab';
    };

    scrollbarThumb.addEventListener('pointerup', endDrag);
    scrollbarThumb.addEventListener('pointercancel', endDrag);

    scrollbar.addEventListener('pointerdown', (event) => {
        if (event.target === scrollbarThumb) {
            return;
        }

        const trackRect = scrollbar.getBoundingClientRect();
        const thumbCenter = scrollbarThumb.offsetHeight / 2;
        const clickRatio = (event.clientY - trackRect.top - thumbCenter) / (scrollbar.clientHeight - scrollbarThumb.offsetHeight);
        scrollContent.scrollTop = clickRatio * (scrollContent.scrollHeight - scrollContent.clientHeight);
    });

    scrollContent.addEventListener('scroll', syncScrollbar, { passive: true });
    document.addEventListener('wheel', forwardWheelToContent, { passive: false });
    window.addEventListener('resize', syncScrollbar);
    syncScrollbar();
});
