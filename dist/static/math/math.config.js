if (!self.math) {
    throw new Error('Math bundle is not loaded.');
}

self.__math$config = {
    prefix: '/static/Bored/',
    bare:'/bare/',
    encodeUrl: math.codec.xor.encode,
    decodeUrl: math.codec.xor.decode,
    handler: '/static/math/math.handler.js',
    bundle: '/static/math/math.bundle.js',
    config: '/static/math/math.config.js',
    sw: '/static/math/math.handler.js',
};
