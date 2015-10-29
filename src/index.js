var app = require('express')(),
    logger = require('./lib/logger'),
    config = require('./lib/config'),
    bodyParser = require('body-parser'),
    swig = require('swig');

/**
* Use body parser to reject any media types that don't match "application/vnd.rndr.swig"
*/
app.use(bodyParser.text({type:"*/*"}));

/**
*  Set a template at path
*/
app.put('*', function(req, res) {

    logger.info('Adding a template at ' + req.path + ' ' + JSON.stringify(req.body));

    // use req.path as the identifier of the template
    config.getStore().set(req.path, req.body, req.get('Content-Type'), function(err, msg) {

        if (!err) {
            res.status(200).send();
        } else {
            logger.error(err);
            res.status(500).json({error:err});
        }
    });

});

/**
*  Render the template at path
*/
app.post('*', function(req, res) {

    // use req.path as the identifier of the template
    logger.info('Rendering the template at ' + req.path + ' vars = ' + req.body);

    config.getStore().get(req.path, function(err, data) {

        if (!err) {
            if (data && data.content ){

                // respond with rendered template
                return res.send(
                    swig.render(data.content, {locals: JSON.parse(req.body)})
                );
            } else {
                return res.status(404).send();
            }
        }

        logger.error(err + ' : ' + data);
        res.status(500).json({error:err, data: data});
    });

});

/**
*  Get the raw template contents at path
*/
app.get('*', function(req, res) {

    logger.info('Getting the template at ' + req.path);

    // use req.path as the identifier of the template
    config.getStore().get(req.path, function(err, data) {

        if (!err) {
            if (data && data.content ){
                return res.send(data.content);
            } else {
                return res.status(404).send();
            }
        }

        logger.error(err + ' : ' + data);
        res.status(500).json({error:err, data: data});
    });

});

/**
*  Remove the template at path
*/
app.delete('*', function(req, res) {

    logger.info('Removing the template at ' + req.path);

    // use req.path as the identifier of the template
    config.getStore().delete(req.path, function(err, data) {

        if (!err) {
            return res.send();
        }

        logger.error(err);
        res.status(500).json({error:err});
    });

});

var PORT = process.env.PORT || 80;
app.listen(PORT);
logger.info('Service running on port ' + PORT);