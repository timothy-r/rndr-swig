var app = require('express')(),
    logger = require('./lib/logger');

/**
*  Set a template at path
*/
app.put('*', function(req, res) {

    logger.log('info', 'Adding a template at ' + req.path);

    // use req.path as the identifier of the template

    // respond with success
    res.status(200);
});

var PORT = process.env.PORT || 80;
app.listen(PORT);

logger.log('info', 'Service running on port ' + PORT);