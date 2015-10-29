
var Store = require('./store');

var redis_port = process.env.REDIS_PORT_6379_TCP_PORT || 6379,
    redis_host =  process.env.REDIS_PORT_6379_TCP_ADDR;

/**
 * @returns {single.store|*|store|Store|exports.Literal.store|exports.Memory.store}
 */
module.exports.getStore = function() {

    'use strict';

    if (!module.exports.store) {
        module.exports.store = new Store(
            redis_port,
            redis_host
        );
    }

    return module.exports.store;
};