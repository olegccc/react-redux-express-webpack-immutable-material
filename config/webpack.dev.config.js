let path = require('path');

module.exports = grunt => {
    return {
        proxy: {
            '/api/*': {
                target: {
                    host: 'localhost',
                    port: grunt.config('apiPort'),
                    protocol: 'http:'
                }
            }
        },
        hot: true,
        contentBase: path.join('..', 'frontend-compiled'),
        stats: {
            modules: false,
            reasons: false,
            chunks: false,
            hash: false,
            timings: false,
            version: false,
            children: false,
            assets: false,
            colors: true
        },
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    };
};