if (!self.__math) {
    __mathHook(self, self.__math$config, self.__math$config.bare);
};

async function __mathHook(window, config = {}, bare = '/bare/') {
    if ('__math' in window && window.__math instanceof math) return false;

    if (window.document && !!window.window) {
        window.document.querySelectorAll("script[__math-script]").forEach(node => node.remove())
    };

    const worker = !window.window;
    const master = '__math';
    const methodPrefix = '__math$';
    const __math = new math({
        ...config,
        window,
    });

    if (typeof config.construct === 'function') {
        config.construct(__math, worker ? 'worker' : 'window');
    };

    const { client } = __math;
    const {
        HTMLMediaElement,
        HTMLScriptElement,
        HTMLAudioElement,
        HTMLVideoElement,
        HTMLInputElement,
        HTMLEmbedElement,
        HTMLTrackElement,
        HTMLAnchorElement,
        HTMLIFrameElement,
        HTMLAreaElement,
        HTMLLinkElement,
        HTMLBaseElement,
        HTMLFormElement,
        HTMLImageElement,
        HTMLSourceElement,
    } = window;

    client.nativeMethods.defineProperty(window, '__math', {
        value: __math,
        enumerable: false,
    });


    __math.meta.origin = location.origin;
    __math.location = client.location.emulate(
        (href) => {
            if (href === 'about:srcdoc') return new URL(href);
            if (href.startsWith('blob:')) href = href.slice('blob:'.length);
            return new URL(__math.sourceUrl(href));
        },
        (href) => {
            return __math.rewriteUrl(href);
        },
    );

    __math.cookieStr = window.__math$cookies || '';
    __math.meta.url = __math.location;
    __math.domain = __math.meta.url.host;
    __math.blobUrls = new window.Map();
    __math.referrer = '';
    __math.cookies = [];
    __math.localStorageObj = {};
    __math.sessionStorageObj = {};

    try {
        __math.bare = new URL(bare, window.location.href);
    } catch(e) {
        __math.bare = window.parent.__math.bare;
    };

    if (__math.location.href === 'about:srcdoc') {
        __math.meta = window.parent.__math.meta;
    };

    if (window.EventTarget) {
        __math.addEventListener = window.EventTarget.prototype.addEventListener;
        __math.removeListener = window.EventTarget.prototype.removeListener;
        __math.dispatchEvent = window.EventTarget.prototype.dispatchEvent;
    };

    // Storage wrappers
    client.nativeMethods.defineProperty(client.storage.storeProto, '__math$storageObj', {
        get() {
            if (this === client.storage.sessionStorage) return __math.sessionStorageObj;
            if (this === client.storage.localStorage) return __math.localStorageObj;
        },
        enumerable: false,
    });

    if (window.localStorage) {
        for (const key in window.localStorage) {
            if (key.startsWith(methodPrefix + __math.location.origin + '@')) {
                __math.localStorageObj[key.slice((methodPrefix + __math.location.origin + '@').length)] = window.localStorage.getItem(key);
            };
        };

        __math.lsWrap = client.storage.emulate(client.storage.localStorage, __math.localStorageObj);
    };

    if (window.sessionStorage) {
        for (const key in window.sessionStorage) {
            if (key.startsWith(methodPrefix + __math.location.origin + '@')) {
                __math.sessionStorageObj[key.slice((methodPrefix + __math.location.origin + '@').length)] = window.sessionStorage.getItem(key);
            };
        };

        __math.ssWrap = client.storage.emulate(client.storage.sessionStorage, __math.sessionStorageObj);
    };



    let rawBase = window.document ? client.node.baseURI.get.call(window.document) : window.location.href;
    let base = __math.sourceUrl(rawBase);

    client.nativeMethods.defineProperty(__math.meta, 'base', {
        get() {
            if (!window.document) return __math.meta.url.href;

            if (client.node.baseURI.get.call(window.document) !== rawBase) {
                rawBase = client.node.baseURI.get.call(window.document);
                base = __math.sourceUrl(rawBase);
            };

            return base;
        },
    });


    __math.methods = {
        setSource: methodPrefix + 'setSource',
        source: methodPrefix + 'source',
        location: methodPrefix + 'location',
        function: methodPrefix + 'function',
        string: methodPrefix + 'string',
        eval: methodPrefix + 'eval',
        parent: methodPrefix + 'parent',
        top: methodPrefix + 'top',
    };

    __math.filterKeys = [
        master,
        __math.methods.setSource,
        __math.methods.source,
        __math.methods.location,
        __math.methods.function,
        __math.methods.string,
        __math.methods.eval,
        __math.methods.parent,
        __math.methods.top,
        methodPrefix + 'protocol',
        methodPrefix + 'storageObj',
        methodPrefix + 'url',
        methodPrefix + 'modifiedStyle',
        methodPrefix + 'config',
        methodPrefix + 'dispatched',
        'math',
        '__mathHook',
    ];


    client.on('wrap', (target, wrapped) => {
        client.nativeMethods.defineProperty(wrapped, 'name', client.nativeMethods.getOwnPropertyDescriptor(target, 'name'));
        client.nativeMethods.defineProperty(wrapped, 'length', client.nativeMethods.getOwnPropertyDescriptor(target, 'length'));

        client.nativeMethods.defineProperty(wrapped, __math.methods.string, {
            enumerable: false,
            value: client.nativeMethods.fnToString.call(target),
        });

        client.nativeMethods.defineProperty(wrapped, __math.methods.function, {
            enumerable: false,
            value: target,
        });
    });

    client.fetch.on('request', event => {
        event.data.input = __math.rewriteUrl(event.data.input);
    });

    client.fetch.on('requestUrl', event => {
        event.data.value = __math.sourceUrl(event.data.value);
    });

    client.fetch.on('responseUrl', event => {
        event.data.value = __math.sourceUrl(event.data.value);
    });

    // XMLHttpRequest
    client.xhr.on('open', event => {
        event.data.input = __math.rewriteUrl(event.data.input);
    });

    client.xhr.on('responseUrl', event => {
        event.data.value = __math.sourceUrl(event.data.value);
    });


    // Workers
    client.workers.on('worker', event => {
        event.data.url = __math.rewriteUrl(event.data.url);
    });

    client.workers.on('addModule', event => {
        event.data.url = __math.rewriteUrl(event.data.url);
    });

    client.workers.on('importScripts', event => {
        for (const i in event.data.scripts) {
            event.data.scripts[i] = __math.rewriteUrl(event.data.scripts[i]);
        };
    });

    client.workers.on('postMessage', event => {
        let to = event.data.origin;

        event.data.origin = '*';
        event.data.message = {
            __data: event.data.message,
            __origin: __math.meta.url.origin,
            __to: to,
        };
    });

    // Navigator
    client.navigator.on('sendBeacon', event => {
        event.data.url = __math.rewriteUrl(event.data.url);
    });

    // Cookies
    client.document.on('getCookie', event => {
        event.data.value = __math.cookieStr;
    });

    client.document.on('setCookie', event => {
        Promise.resolve(__math.cookie.setCookies(event.data.value, __math.db, __math.meta)).then(() => {
            __math.cookie.db().then(db => {
                __math.cookie.getCookies(db).then(cookies => {
                    __math.cookieStr = __math.cookie.serialize(cookies, __math.meta, true);
                });
            });
        });
        const cookie = __math.cookie.setCookie(event.data.value)[0];

        if (!cookie.path) cookie.path = '/';
        if (!cookie.domain) cookie.domain = __math.meta.url.hostname;

        if (__math.cookie.validateCookie(cookie, __math.meta, true)) {
            if (__math.cookieStr.length) __math.cookieStr += '; ';
            __math.cookieStr += `${cookie.name}=${cookie.value}`;
        };

        event.respondWith(event.data.value);
    });

    // HTML
    client.element.on('setInnerHTML', event => {
        switch (event.that.tagName) {
            case 'SCRIPT':
                event.data.value = __math.js.rewrite(event.data.value);
                break;
            case 'STYLE':
                event.data.value = __math.rewriteCSS(event.data.value);
                break;
            default:
                event.data.value = __math.rewriteHtml(event.data.value);
        };
    });

    client.element.on('getInnerHTML', event => {
        switch (event.that.tagName) {
            case 'SCRIPT':
                event.data.value = __math.js.source(event.data.value);
                break;
            default:
                event.data.value = __math.sourceHtml(event.data.value);
        };
    });

    client.element.on('setOuterHTML', event => {
        event.data.value = __math.rewriteHtml(event.data.value, { document: event.that.tagName === 'HTML' });
    });

    client.element.on('getOuterHTML', event => {
        switch (event.that.tagName) {
            case 'HEAD':
                event.data.value = __math.sourceHtml(
                    event.data.value.replace(/<head(.*)>(.*)<\/head>/s, '<op-head$1>$2</op-head>')
                ).replace(/<op-head(.*)>(.*)<\/op-head>/s, '<head$1>$2</head>');
                break;
            case 'BODY':
                event.data.value = __math.sourceHtml(
                    event.data.value.replace(/<body(.*)>(.*)<\/body>/s, '<op-body$1>$2</op-body>')
                ).replace(/<op-body(.*)>(.*)<\/op-body>/s, '<body$1>$2</body>');
                break;
            default:
                event.data.value = __math.sourceHtml(event.data.value, { document: event.that.tagName === 'HTML' });
                break;
        };

        //event.data.value = __math.sourceHtml(event.data.value, { document: event.that.tagName === 'HTML' });
    });

    client.document.on('write', event => {
        if (!event.data.html.length) return false;
        event.data.html = [__math.rewriteHtml(event.data.html.join(''))];
    });

    client.document.on('writeln', event => {
        if (!event.data.html.length) return false;
        event.data.html = [__math.rewriteHtml(event.data.html.join(''))];
    });

    client.element.on('insertAdjacentHTML', event => {
        event.data.html = __math.rewriteHtml(event.data.html);
    });

    // EventSource

    client.eventSource.on('construct', event => {
        event.data.url = __math.rewriteUrl(event.data.url);
    });


    client.eventSource.on('url', event => {
        event.data.url = __math.rewriteUrl(event.data.url);
    });

    // History
    client.history.on('replaceState', event => {
        if (event.data.url) event.data.url = __math.rewriteUrl(event.data.url, '__math' in event.that ? event.that.__math.meta : __math.meta);
    });
    client.history.on('pushState', event => {
        if (event.data.url) event.data.url = __math.rewriteUrl(event.data.url, '__math' in event.that ? event.that.__math.meta : __math.meta);
    });

    // Element get set attribute methods
    client.element.on('getAttribute', event => {
        if (client.element.hasAttribute.call(event.that, __math.attributePrefix + '-attr-' + event.data.name)) {
            event.respondWith(
                event.target.call(event.that, __math.attributePrefix + '-attr-' + event.data.name)
            );
        };
    });

    // Message
    client.message.on('postMessage', event => {
        let to = event.data.origin;
        let call = __math.call;


        if (event.that) {
            call = event.that.__math$source.call;
        };

        event.data.origin = '*';
        event.data.message = {
            __data: event.data.message,
            __origin: (event.that || event.target).__math$source.location.origin,
            __to: to,
        };

        event.respondWith(
            worker ?
            call(event.target, [event.data.message, event.data.transfer], event.that) :
            call(event.target, [event.data.message, event.data.origin, event.data.transfer], event.that)
        );

    });

    client.message.on('data', event => {
        const { value: data } = event.data;
        if (typeof data === 'object' && '__data' in data && '__origin' in data) {
            event.respondWith(data.__data);
        };
    });

    client.message.on('origin', event => {
        const data = client.message.messageData.get.call(event.that);
        if (typeof data === 'object' && data.__data && data.__origin) {
            event.respondWith(data.__origin);
        };
    });

    client.overrideDescriptor(window, 'origin', {
        get: (target, that) => {
            return __math.location.origin;
        },
    });

    client.node.on('baseURI', event => {
        if (event.data.value.startsWith(window.location.origin)) event.data.value = __math.sourceUrl(event.data.value);
    });

    client.element.on('setAttribute', event => {
        if (event.that instanceof HTMLMediaElement && event.data.name === 'src' && event.data.value.startsWith('blob:')) {
            event.target.call(event.that, __math.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __math.blobUrls.get(event.data.value);
            return;
        };

        if (__math.attrs.isUrl(event.data.name)) {
            event.target.call(event.that, __math.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __math.rewriteUrl(event.data.value);
        };

        if (__math.attrs.isStyle(event.data.name)) {
            event.target.call(event.that, __math.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __math.rewriteCSS(event.data.value, { context: 'declarationList' });
        };

        if (__math.attrs.isHtml(event.data.name)) {
            event.target.call(event.that, __math.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __math.rewriteHtml(event.data.value, {...__math.meta, document: true, injectHead:__math.createHtmlInject(__math.handlerScript, __math.bundleScript, __math.configScript, __math.cookieStr, window.location.href) });
        };

        if (__math.attrs.isSrcset(event.data.name)) {
            event.target.call(event.that, __math.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __math.html.wrapSrcset(event.data.value);
        };

        if (__math.attrs.isForbidden(event.data.name)) {
            event.data.name = __math.attributePrefix + '-attr-' + event.data.name;
        };
    });

    client.element.on('audio', event => {
        event.data.url = __math.rewriteUrl(event.data.url);
    });

    // Element Property Attributes
    client.element.hookProperty([HTMLAnchorElement, HTMLAreaElement, HTMLLinkElement, HTMLBaseElement], 'href', {
        get: (target, that) => {
            return __math.sourceUrl(
                target.call(that)
            );
        },
        set: (target, that, [val]) => {
            client.element.setAttribute.call(that, __math.attributePrefix + '-attr-href', val)
            target.call(that, __math.rewriteUrl(val));
        },
    }); 

    client.element.hookProperty([HTMLScriptElement, HTMLAudioElement, HTMLVideoElement,  HTMLMediaElement, HTMLImageElement, HTMLInputElement, HTMLEmbedElement, HTMLIFrameElement, HTMLTrackElement, HTMLSourceElement], 'src', {
        get: (target, that) => {
            return __math.sourceUrl(
                target.call(that)
            );
        },
        set: (target, that, [val]) => {
            if (new String(val).toString().trim().startsWith('blob:') && that instanceof HTMLMediaElement) {
                client.element.setAttribute.call(that, __math.attributePrefix + '-attr-src', val)
                return target.call(that, __math.blobUrls.get(val) || val);
            };

            client.element.setAttribute.call(that, __math.attributePrefix + '-attr-src', val)
            target.call(that, __math.rewriteUrl(val));
        },
    });

    client.element.hookProperty([HTMLFormElement], 'action', {
        get: (target, that) => {
            return __math.sourceUrl(
                target.call(that)
            );
        },
        set: (target, that, [val]) => {
            client.element.setAttribute.call(that, __math.attributePrefix + '-attr-action', val)
            target.call(that, __math.rewriteUrl(val));
        },
    });

    client.element.hookProperty([HTMLImageElement], 'srcset', {
        get: (target, that) => {
            return client.element.getAttribute.call(that, __math.attributePrefix + '-attr-srcset') || target.call(that);
        },
        set: (target, that, [val]) => {
            client.element.setAttribute.call(that, __math.attributePrefix + '-attr-srcset', val)
            target.call(that, __math.html.wrapSrcset(val));
        },
    });

    client.element.hookProperty(HTMLScriptElement, 'integrity', {
        get: (target, that) => {
            return client.element.getAttribute.call(that, __math.attributePrefix + '-attr-integrity');
        },
        set: (target, that, [val]) => {
            client.element.setAttribute.call(that, __math.attributePrefix + '-attr-integrity', val);
        },
    });

    client.element.hookProperty(HTMLIFrameElement, 'sandbox', {
        get: (target, that) => {
            return client.element.getAttribute.call(that, __math.attributePrefix + '-attr-sandbox') || target.call(that);
        },
        set: (target, that, [val]) => {
            client.element.setAttribute.call(that, __math.attributePrefix + '-attr-sandbox', val);
        },
    });

    client.element.hookProperty(HTMLIFrameElement, 'contentWindow', {
        get: (target, that) => {
            const win = target.call(that);
            try {
                if (!win.__math) __mathHook(win, config, bare);
                return win;
            } catch (e) {
                return win;
            };
        },
    });

    client.element.hookProperty(HTMLIFrameElement, 'contentDocument', {
        get: (target, that) => {
            const doc = target.call(that);
            try {
                const win = doc.defaultView
                if (!win.__math) __mathHook(win, config, bare);
                return doc;
            } catch (e) {
                return win;
            };
        },
    });

    client.element.hookProperty(HTMLIFrameElement, 'srcdoc', {
        get: (target, that) => {
            return client.element.getAttribute.call(that, __math.attributePrefix + '-attr-srcdoc') || target.call(that);
        },
        set: (target, that, [val]) => {
            target.call(that, __math.rewriteHtml(val, {
                document: true,
                injectHead: __math.createHtmlInject(__math.handlerScript, __math.bundleScript, __math.configScript, __math.cookieStr, window.location.href)
            }))
        },
    });

    client.node.on('getTextContent', event => {
        if (event.that.tagName === 'SCRIPT') {
            event.data.value = __math.js.source(event.data.value);
        };
    });

    client.node.on('setTextContent', event => {
        if (event.that.tagName === 'SCRIPT') {
            event.data.value = __math.js.rewrite(event.data.value);
        };
    });

    // Until proper rewriting is implemented for service workers.
    // Not sure atm how to implement it with the already built in service worker
    if ('serviceWorker' in window.navigator) {
        delete window.Navigator.prototype.serviceWorker;
    };

    // Document
    client.document.on('getDomain', event => {
        event.data.value = __math.domain;
    });
    client.document.on('setDomain', event => {
        if (!event.data.value.toString().endsWith(__math.meta.url.hostname.split('.').slice(-2).join('.'))) return event.respondWith('');
        event.respondWith(__math.domain = event.data.value);
    })

    client.document.on('url', event => {
        event.data.value = __math.location.href;
    });

    client.document.on('documentURI', event => {
        event.data.value = __math.location.href;
    });

    client.document.on('referrer', event => {
        event.data.value = __math.referrer || __math.sourceUrl(event.data.value);
    });

    client.document.on('parseFromString', event => {
        if (event.data.type !== 'text/html') return false;
        event.data.string = __math.rewriteHtml(event.data.string, {...__math.meta, document: true, });
    });

    // Attribute (node.attributes)
    client.attribute.on('getValue', event => {
        if (client.element.hasAttribute.call(event.that.ownerElement, __math.attributePrefix + '-attr-' + event.data.name)) {
            event.data.value = client.element.getAttribute.call(event.that.ownerElement, __math.attributePrefix + '-attr-' + event.data.name);
        };
    });

    client.attribute.on('setValue', event => {
        if (__math.attrs.isUrl(event.data.name)) {
            client.element.setAttribute.call(event.that.ownerElement, __math.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __math.rewriteUrl(event.data.value);
        };

        if (__math.attrs.isStyle(event.data.name)) {
            client.element.setAttribute.call(event.that.ownerElement, __math.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __math.rewriteCSS(event.data.value, { context: 'declarationList' });
        };

        if (__math.attrs.isHtml(event.data.name)) {
            client.element.setAttribute.call(event.that.ownerElement, __math.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __math.rewriteHtml(event.data.value, {...__math.meta, document: true, injectHead:__math.createHtmlInject(__math.handlerScript, __math.bundleScript, __math.configScript, __math.cookieStr, window.location.href) });
        };

        if (__math.attrs.isSrcset(event.data.name)) {
            client.element.setAttribute.call(event.that.ownerElement, __math.attributePrefix + '-attr-' + event.data.name, event.data.value);
            event.data.value = __math.html.wrapSrcset(event.data.value);
        };

    });

    // URL
    client.url.on('createObjectURL', event => {
        let url = event.target.call(event.that, event.data.object);
        if (url.startsWith('blob:' + location.origin)) {
            let newUrl = 'blob:' + (__math.meta.url.href !== 'about:blank' ?  __math.meta.url.origin : window.parent.__math.meta.url.origin) + url.slice('blob:'.length + location.origin.length);
            __math.blobUrls.set(newUrl, url);
            event.respondWith(newUrl);
        } else {
            event.respondWith(url);
        };
    });

    client.url.on('revokeObjectURL', event => {
        if (__math.blobUrls.has(event.data.url)) {
            const old = event.data.url;
            event.data.url = __math.blobUrls.get(event.data.url);
            __math.blobUrls.delete(old);
        };
    });

    client.storage.on('get', event => {
        event.data.name = methodPrefix + __math.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('set', event => {
        if (event.that.__math$storageObj) {
            event.that.__math$storageObj[event.data.name] = event.data.value;
        };
        event.data.name = methodPrefix + __math.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('delete', event => {
        if (event.that.__math$storageObj) {
            delete event.that.__math$storageObj[event.data.name];
        };
        event.data.name = methodPrefix + __math.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('getItem', event => {
        event.data.name = methodPrefix + __math.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('setItem', event => {
        if (event.that.__math$storageObj) {
            event.that.__math$storageObj[event.data.name] = event.data.value;
        };
        event.data.name = methodPrefix + __math.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('removeItem', event => {
        if (event.that.__math$storageObj) {
            delete event.that.__math$storageObj[event.data.name];
        };
        event.data.name = methodPrefix + __math.meta.url.origin + '@' + event.data.name;
    });

    client.storage.on('clear', event => {
        if (event.that.__math$storageObj) {
            for (const key of client.nativeMethods.keys.call(null, event.that.__math$storageObj)) {
                delete event.that.__math$storageObj[key];
                client.storage.removeItem.call(event.that, methodPrefix + __math.meta.url.origin + '@' + key);
                event.respondWith();
            };
        };
    });

    client.storage.on('length', event => {
        if (event.that.__math$storageObj) {
            event.respondWith(client.nativeMethods.keys.call(null, event.that.__math$storageObj).length);
        };
    });

    client.storage.on('key', event => {
        if (event.that.__math$storageObj) {
            event.respondWith(
                (client.nativeMethods.keys.call(null, event.that.__math$storageObj)[event.data.index] || null)
            );
        };
    });

    client.websocket.on('websocket', async event => {
        let url;
        try {
            url = new URL(event.data.url);
        } catch(e) {
            return;
        };

        const headers = {
            Host: url.host,
            Origin: __math.meta.url.origin,
            Pragma: 'no-cache',
            'Cache-Control': 'no-cache',
            Upgrade: 'websocket',
            'User-Agent': window.navigator.userAgent,
            'Connection': 'Upgrade',
        };

        const cookies = __math.cookie.serialize(__math.cookies, { url }, false);

        if (cookies) headers.Cookie = cookies;
        const protocols = [...event.data.protocols];

        const remote = {
            protocol: url.protocol,
            host: url.hostname,
            port: url.port || (url.protocol === 'wss:' ? '443' : '80'),
            path: url.pathname + url.search,
        };

        if (protocols.length) headers['Sec-WebSocket-Protocol'] = protocols.join(', ');

        event.data.url =  (__math.bare.protocol === 'https:' ? 'wss://' : 'ws://') + __math.bare.host + __math.bare.pathname + 'v1/';
        event.data.protocols = [
            'bare',
            __math.encodeProtocol(JSON.stringify({
                remote,
                headers,
                forward_headers: [
                    'accept',
                    'accept-encoding',
                    'accept-language',
                    'sec-websocket-extensions',
                    'sec-websocket-key',
                    'sec-websocket-version',
                ],
            })),
        ];

        const ws = new event.target(event.data.url, event.data.protocols);

        client.nativeMethods.defineProperty(ws, methodPrefix + 'url', {
            enumerable: false,
            value: url.href,
        });

        event.respondWith(
            ws
        );
    });

    client.websocket.on('url', event => {
        if ('__math$url' in event.that) {
            event.data.value = event.that.__math$url;
        };
    });

    client.websocket.on('protocol', event => {
        if ('__math$protocol' in event.that) {
            event.data.value = event.that.__math$protocol;
        };
    });

    client.function.on('function', event => {
        event.data.script = __math.rewriteJS(event.data.script);
    });

    client.function.on('toString', event => {
        if (__math.methods.string in event.that) event.respondWith(event.that[__math.methods.string]);
    });

    client.object.on('getOwnPropertyNames', event => {
        event.data.names = event.data.names.filter(element => !(__math.filterKeys.includes(element)));
    });

    client.object.on('getOwnPropertyDescriptors', event => {
        for (const forbidden of __math.filterKeys) {
            delete event.data.descriptors[forbidden];
        };

    });

    client.style.on('setProperty', event => {
        if (client.style.dashedUrlProps.includes(event.data.property)) {
            event.data.value = __math.rewriteCSS(event.data.value, {
                context: 'value',
                ...__math.meta
            })
        };
    });

    client.style.on('getPropertyValue', event => {
        if (client.style.dashedUrlProps.includes(event.data.property)) {
            event.respondWith(
                __math.sourceCSS(
                    event.target.call(event.that, event.data.property),
                    {
                        context: 'value',
                        ...__math.meta
                    }
                )
            );
        };
    });

    if ('CSS2Properties' in window) {
        for (const key of client.style.urlProps) {
            client.overrideDescriptor(window.CSS2Properties.prototype, key, {
                get: (target, that) => {
                    return __math.sourceCSS(
                        target.call(that),
                        {
                            context: 'value',
                            ...__math.meta
                        }
                    )
                },
                set: (target, that, val) => {
                    target.call(
                        that,
                        __math.rewriteCSS(val, {
                            context: 'value',
                            ...__math.meta
                        })
                    );
                }
            });
        };
    } else if ('HTMLElement' in window) {

        client.overrideDescriptor(
            window.HTMLElement.prototype,
            'style',
            {
                get: (target, that) => {
                    const value = target.call(that);
                    if (!value[methodPrefix + 'modifiedStyle']) {

                        for (const key of client.style.urlProps) {
                            client.nativeMethods.defineProperty(value, key, {
                                enumerable: true,
                                configurable: true,
                                get() {
                                    const value = client.style.getPropertyValue.call(this, key) || '';
                                    return __math.sourceCSS(
                                        value,
                                        {
                                            context: 'value',
                                            ...__math.meta
                                        }
                                    )
                                },
                                set(val) {
                                    client.style.setProperty.call(this, 
                                        (client.style.propToDashed[key] || key),
                                        __math.rewriteCSS(val, {
                                            context: 'value',
                                            ...__math.meta
                                        })    
                                    )
                                }
                            });
                            client.nativeMethods.defineProperty(value, methodPrefix + 'modifiedStyle', {
                                enumerable: false,
                                value: true
                            });
                        };
                    };
                    return value;
                }
            }
        );
    };

    client.style.on('setCssText', event => {
        event.data.value = __math.rewriteCSS(event.data.value, {
            context: 'declarationList',
            ...__math.meta
        });
    });

    client.style.on('getCssText', event => {
        event.data.value = __math.sourceCSS(event.data.value, {
            context: 'declarationList',
            ...__math.meta
        });
    });

    // Proper hash emulation.
    if (!!window.window) {
        __math.addEventListener.call(window, 'hashchange', event => {
            if (event.__math$dispatched) return false;
            event.stopImmediatePropagation();
            const hash = window.location.hash;
            client.history.replaceState.call(window.history, '', '', event.oldURL);
            __math.location.hash = hash;
        });
    };

    client.location.on('hashchange', (oldUrl, newUrl, ctx) => {
        if (ctx.HashChangeEvent && client.history.replaceState) {
            client.history.replaceState.call(window.history, '', '', __math.rewriteUrl(newUrl));

            const event = new ctx.HashChangeEvent('hashchange', { newURL: newUrl, oldURL: oldUrl });

            client.nativeMethods.defineProperty(event, methodPrefix + 'dispatched', {
                value: true,
                enumerable: false,
            }); 

            __math.dispatchEvent.call(window, event);
        };
    });

    // Hooking functions & descriptors
    client.fetch.overrideRequest();
    client.fetch.overrideUrl();
    client.xhr.overrideOpen();
    client.xhr.overrideResponseUrl();
    client.element.overrideHtml();
    client.element.overrideAttribute();
    client.element.overrideInsertAdjacentHTML();
    client.element.overrideAudio();
    // client.element.overrideQuerySelector();
    client.node.overrideBaseURI();
    client.node.overrideTextContent();
    client.attribute.overrideNameValue();
    client.document.overrideDomain();
    client.document.overrideURL();
    client.document.overrideDocumentURI();
    client.document.overrideWrite();
    client.document.overrideReferrer();
    client.document.overrideParseFromString();
    client.storage.overrideMethods();
    client.storage.overrideLength();
    //client.document.overrideQuerySelector();
    client.object.overrideGetPropertyNames();
    client.object.overrideGetOwnPropertyDescriptors();
    client.history.overridePushState();
    client.history.overrideReplaceState();
    client.eventSource.overrideConstruct();
    client.eventSource.overrideUrl();
    client.websocket.overrideWebSocket();
    client.websocket.overrideProtocol();
    client.websocket.overrideUrl();
    client.url.overrideObjectURL();
    client.document.overrideCookie();
    client.message.overridePostMessage();
    client.message.overrideMessageOrigin();
    client.message.overrideMessageData();
    client.workers.overrideWorker();
    client.workers.overrideAddModule();
    client.workers.overrideImportScripts();
    client.workers.overridePostMessage();
    client.style.overrideSetGetProperty();
    client.style.overrideCssText();
    client.navigator.overrideSendBeacon();
    client.function.overrideFunction();
    client.function.overrideToString();
    client.location.overrideWorkerLocation(
        (href) => {
            return new URL(__math.sourceUrl(href));
        }
    );

    client.overrideDescriptor(window, 'localStorage', {
        get: (target, that) => {
            return (that || window).__math.lsWrap;
        },
    });
    client.overrideDescriptor(window, 'sessionStorage', {
        get: (target, that) => {
            return (that || window).__math.ssWrap;
        },
    });


    client.override(window, 'open', (target, that, args) => {
        if (!args.length) return target.apply(that, args);
        let [url] = args;

        url = __math.rewriteUrl(url);

        return target.call(that, url);
    });

    __math.$wrap = function(name) {
        if (name === 'location') return __math.methods.location;
        if (name === 'eval') return __math.methods.eval;
        return name;
    };


    __math.$get = function(that) {
        if (that === window.location) return __math.location;
        if (that === window.eval) return __math.eval;
        if (that === window.parent) {
            return window.__math$parent;
        };
        if (that === window.top) {
            return window.__math$top;
        };
        return that;
    };

    __math.eval = client.wrap(window, 'eval', (target, that, args) => {
        if (!args.length || typeof args[0] !== 'string') return target.apply(that, args);
        let [script] = args;

        script = __math.rewriteJS(script);
        return target.call(that, script);
    });

    __math.call = function(target, args, that) {
        return that ? target.apply(that, args) : target(...args);
    };

    __math.call$ = function(obj, prop, args = []) {
        return obj[prop].apply(obj, args);
    };

    client.nativeMethods.defineProperty(window.Object.prototype, master, {
        get: () => {
            return __math;
        },
        enumerable: false
    });

    client.nativeMethods.defineProperty(window.Object.prototype, __math.methods.setSource, {
        value: function(source) {
            if (!client.nativeMethods.isExtensible(this)) return this;

            client.nativeMethods.defineProperty(this, __math.methods.source, {
                value: source,
                writable: true,
                enumerable: false
            });

            return this;
        },
        enumerable: false,
    });

    client.nativeMethods.defineProperty(window.Object.prototype, __math.methods.source, {
        value: __math,
        writable: true,
        enumerable: false
    });

    client.nativeMethods.defineProperty(window.Object.prototype, __math.methods.location, {
        configurable: true,
        get() {
            return (this === window.document || this === window) ? __math.location : this.location;
        },
        set(val) {
            if (this === window.document || this === window) {
                __math.location.href = val;
            } else {
                this.location = val;
            };
        },
    });

    client.nativeMethods.defineProperty(window.Object.prototype, __math.methods.parent, {
        configurable: true,
        get() {
            const val = this.parent;

            if (this === window) {
                try {
                    return '__math' in val ? val : this;
                } catch (e) {
                    return this;
                };
            };
            return val;
        },
        set(val) {
            this.parent = val;
        },
    });

    client.nativeMethods.defineProperty(window.Object.prototype, __math.methods.top, {
        configurable: true,
        get() {
            const val = this.top;

            if (this === window) {
                if (val === this.parent) return this[__math.methods.parent];
                try {
                    if (!('__math' in val)) {
                        let current = this;

                        while (current.parent !== val) {
                            current = current.parent
                        };

                        return '__math' in current ? current : this;

                    } else {
                        return val;
                    };
                } catch (e) {
                    return this;
                };
            };
            return val;
        },
        set(val) {
            this.top = val;
        },
    });


    client.nativeMethods.defineProperty(window.Object.prototype, __math.methods.eval, {
        configurable: true,
        get() {
            return this === window ? __math.eval : this.eval;
        },
        set(val) {
            this.eval = val;
        },
    });
};