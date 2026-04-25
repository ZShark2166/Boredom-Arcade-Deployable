document.addEventListener('DOMContentLoaded', () => {
    const scrollContent = document.querySelector('.page-scroll-content');
    const scrollFrame = document.querySelector('.page-scroll-frame');
    const scrollbar = document.querySelector('.page-scrollbar');
    const scrollbarThumb = document.querySelector('.page-scrollbar-thumb');

    if (!scrollContent || !scrollbar || !scrollbarThumb) {
        return;
    }

    let targetScrollTop = scrollContent.scrollTop;
    let animationFrame = null;

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

    const clampScrollTop = (scrollTop) => {
        const maxScroll = scrollContent.scrollHeight - scrollContent.clientHeight;
        return Math.max(0, Math.min(scrollTop, maxScroll));
    };

    const normalizeWheelDelta = (event) => {
        if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
            return event.deltaY * 40;
        }

        if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
            return event.deltaY * scrollContent.clientHeight;
        }

        return event.deltaY;
    };

    const animateScroll = () => {
        const distance = targetScrollTop - scrollContent.scrollTop;

        if (Math.abs(distance) < 0.5) {
            scrollContent.scrollTop = targetScrollTop;
            animationFrame = null;
            return;
        }

        scrollContent.scrollTop += distance * 0.22;
        animationFrame = requestAnimationFrame(animateScroll);
    };

    const scrollToTarget = () => {
        if (animationFrame) {
            return;
        }

        animationFrame = requestAnimationFrame(animateScroll);
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

        const previousTargetScrollTop = targetScrollTop;
        targetScrollTop = clampScrollTop(targetScrollTop + normalizeWheelDelta(event));

        if (targetScrollTop !== previousTargetScrollTop) {
            event.preventDefault();
            scrollToTarget();
        }
    };

    let dragState = null;

    scrollbarThumb.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }

        targetScrollTop = scrollContent.scrollTop;
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
        targetScrollTop = clampScrollTop(dragState.startScrollTop + (delta / maxThumbTravel) * maxScroll);
        scrollContent.scrollTop = targetScrollTop;
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
        targetScrollTop = clampScrollTop(clickRatio * (scrollContent.scrollHeight - scrollContent.clientHeight));
        scrollContent.scrollTop = targetScrollTop;
    });

    scrollContent.addEventListener('scroll', () => {
        if (!animationFrame && !dragState) {
            targetScrollTop = scrollContent.scrollTop;
        }

        syncScrollbar();
    }, { passive: true });
    document.addEventListener('wheel', forwardWheelToContent, { passive: false });
    window.addEventListener('resize', syncScrollbar);
    syncScrollbar();
});
