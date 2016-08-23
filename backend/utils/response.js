module.exports = {

    withError: function(res, error) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 500;
        res.end(JSON.stringify({
            error: error.toString(),
            context: error
        }));
    },

    withErrorMessage: function(res, message, context) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 500;
        res.end(JSON.stringify({
            error: message,
            context
        }));
    },

    withData: function(res, data) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }
};
