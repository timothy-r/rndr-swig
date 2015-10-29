var redis = require('redis'),
    logger = require('./logger');

/**
 * provides storage of templates
 */
function Store(port, host) {
    this.port = port;
    this.host = host;
    this.client = null;
}

module.exports = Store;

/**
 * Sets the template contents at path
 *
 * @param path
 * @param content
 * @param type
 * @param cb
 */
Store.prototype.set = function(path, content, type, cb) {

    this.getClient().hmset(path, 'content', content, 'type', type, function(err, result){
        cb(err, result)
    });

};

/**
 *
 */
Store.prototype.getClient = function() {

    if (!this.client){
        this.client = redis.createClient(this.port, this.host);
    }

    return this.client;
};