const database = require('../utils/database');
const response = require('../utils/response');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const Promise = require('bluebird');
const _ = require('lodash');

class RecordsController {

    constructor() {

        this._table = database.table('records');

        this.read = async((id, req, res) => {

            if (id !== null) {
                return response.withErrorMessage(res, 'Unknown argument');
            }

            try {
                let cursor = Promise.promisifyAll(this._table.find());
                let records = await(cursor.toArrayAsync());
                return response.withData(res, _.map(records, (record) => {
                    record.id = record._id;
                    record._id = undefined;
                    return record;
                }));
            } catch (error) {
                return response.withError(res, error);
            }
        });

        this.write = async((body, req, res) => {

            if (!body || !body.id) {
                return response.withErrorMessage(res, 'Id cannot be empty');
            }

            try {
                let id = body.id;
                body.id = undefined;
                let result = await(this._table.updateAsync(
                    { _id: id },
                    { $set: body }
                ));

                if (result !== 1) {
                    return response.withErrorMessage(res, 'Invalid count of records replaced');
                }

                return response.withData(res, {
                    success: true
                });
            } catch (error) {
                return response.withError(res, error);
            }
        });

        this.create = async((body, req, res) => {

            if (!body) {
                return response.withErrorMessage(res, 'Document cannot be empty');
            }

            try {
                let records = await(this._table.insertAsync(body));

                if (records.length !== 1) {
                    return response.withErrorMessage(res, 'Invalid count of records inserted');
                }

                body.id = records[0]._id;
                body._id = undefined;

                return response.withData(res, body);

            } catch (error) {
                return response.withError(res, error);
            }
        });

        this.delete = async((body, req, res) => {
            if (!body || !body.id) {
                return response.withErrorMessage(res, 'Record id should be specified');
            }

            try {
                let result = await(this._table.removeAsync({ _id: body.id }));

                if (result !== 1) {
                    return response.withErrorMessage(res, 'Invalid count of records deleted');
                }

                return response.withData(res, {
                    success: true
                });
            } catch (error) {
                return response.withError(res, error);
            }
        });
    }
}

module.exports = new RecordsController();
