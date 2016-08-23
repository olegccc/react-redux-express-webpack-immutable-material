const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const WebpackDevServer = require('webpack-dev-server');
const webpackDevConfig = require('../config/webpack.dev.config');

module.exports = grunt => {
    grunt.registerTask('serve', function() {
        const compiler = webpack(webpackConfig(grunt, false));
        const server = new WebpackDevServer(compiler, webpackDevConfig(grunt));
        server.listen(grunt.config('serverPort'));
        this.async();
    });
};
