const nodeCache = require('node-cache');
var cache = null

exports.init = function() {
    if (cache == null) {
        cache = new nodeCache()
    }
}

exports.set = function(key, data, ttl) {
    return cache.set(key, data, ttl)
}

exports.get = function(key) {
    var data = cache.get(key)
    if (data == undefined) {
        data = null
    }
    return data
}

exports.statistics = function() {
    return cache.getStats();
}