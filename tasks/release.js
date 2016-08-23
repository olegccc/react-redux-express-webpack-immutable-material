const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const Promise = require('bluebird');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

module.exports = grunt => {
    grunt.registerTask('release', async(function() {
        try {
            const done = this.async();
            const compiler = Promise.promisifyAll(webpack(webpackConfig(grunt, true)));
            const stats = await(compiler.run());
            console.log('compiled successfully', stats);
            done();
        } catch(err) {
            grunt.log.debug(err);
            done(false);
        }
    }));
};
