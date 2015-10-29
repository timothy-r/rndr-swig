var app = require('express')(),
    logger = require('./lib/logger'),
    config = require('./lib/config');

/**
*  Set a template at path
*/
app.put('*', function(req, res) {

    logger.info('Adding a template at ' + req.path);

    // use req.path as the identifier of the template
    var store = config.getStore();

    store.set(req.path, req.body, '', function(err, msg) {

        if (!err) {
            logger.info(msg);
            res.status(200).json({status:'ok'});
        } else {
            logger.error(err);
            res.status(500);
        }
    });

});

var PORT = process.env.PORT || 80;
app.listen(PORT);
logger.info('Service running on port ' + PORT);