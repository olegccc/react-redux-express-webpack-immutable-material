const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const Promise = require('bluebird');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

module.exports = grunt => {
    grunt.registerTask('release', async(function() {
        const done = this.async();
        try {
            const compiler = webpack(webpackConfig(grunt, true));
            const stats = await(Promise.promisify(compiler.run).apply(compiler));

            if (stats.hasErrors()) {
                grunt.log.error('Compile errors', stats.toJson('errors-only'));
                done(false);
                return;
            }

            grunt.log.ok('compiled successfully');
            done();
        } catch(err) {
            grunt.log.debug(err);
            done(false);
        }
    }));
};
