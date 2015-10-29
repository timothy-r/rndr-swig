var app = require('express')(),
    logger = require('./lib/logger');


app.put('/', function(req, res) {

});

var PORT = process.env.PORT || 80;
app.listen(PORT);

logger.log('info', 'Service running on port ' + PORT);