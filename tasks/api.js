const express = require('express');
const Promise = require('bluebird');
const restControllers = require('rest-controllers');
const fs = Promise.promisifyAll(require('fs'));
const https = require('https');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const database = require('../backend/utils/database');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = grunt => {

    grunt.registerTask('api', async(function (param) {

        const done = this.async();

        try {

            await(database.initialize('./db'));

            const app = express();
            const staticFiles = express.static('frontend-compiled');
            app.use(staticFiles);
            app.use(/\/record\/(.+)$/, staticFiles);

            await(restControllers(app, {
                debug: grunt.log.debug,
                controllers: 'backend/controllers',
                resources: 'backend/resources',
                route: /^\/api\/(.+)$/
            }));

            const port = grunt.config('apiPort');

            app.listen(port, function() {
                grunt.log.ok("Server is started");

                if (param !== 'wait') {
                    done();
                }
            });
        } catch (error) {
            grunt.log.error('API calls error', error);
            done(false);
        }
    }));
};
