const Promise = require('bluebird');
const Db = require('tingodb')().Db;
const fs = Promise.promisifyAll(require('fs'));
fs.existsAsync = Promise.promisify
(function exists2(path, exists2callback) {
    fs.exists(path, function callbackWrapper(exists) { exists2callback(null, exists); });
});
const async = require('asyncawait/async');
const await = require('asyncawait/await');

class Database {

    initialize(path) {

        return async((path) => {
            let exists = await(fs.existsAsync(path));
            if (!exists) {
                await(fs.mkdirAsync(path));
            }
            this._database = new Db(path, {});
        })(path);
    }

    table(name) {
        return Promise.promisifyAll(this._database.collection(name));
    };
}

module.exports = new Database();
