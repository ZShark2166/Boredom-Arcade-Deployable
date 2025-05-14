self.__uv$config = {
    prefix: '/static/Bored/',
    bare:'https://ghoogle.org/fare/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/static/uv/uv.handler.js',
    bundle: '/static/uv/uv.bundle.js',
    config: '/static/uv/uv.config.js',
    sw: '/static/uv/uv.sw.js',
};
// credit to ab.yz (he let me use his bare)