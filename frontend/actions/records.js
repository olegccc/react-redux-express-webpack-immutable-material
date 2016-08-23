import * as StateActionCreators from './state';
import FetchApi from '../utils/fetchApi';

export const RECORD_ADD = 'RECORD_ADD';
export const RECORD_UPDATE = 'RECORD_UPDATE';
export const RECORD_DELETE = 'RECORD_DELETE';
export const RECORD_LIST = 'RECORD_LIST';

export function recordAdd(record) {
    return async(dispatch) => {
        try {
            dispatch(StateActionCreators.beginUpdate());
            dispatch({
                type: RECORD_ADD,
                record: await FetchApi.create('records', record)
            });
            dispatch(StateActionCreators.updateSuccess());
        } catch (error) {
            dispatch(StateActionCreators.updateError(error));
        }
    };
}

export function recordUpdate(record) {
    return async(dispatch) => {
        try {
            dispatch(StateActionCreators.beginUpdate());
            await FetchApi.update('records', record);
            dispatch({
                type: RECORD_UPDATE,
                record
            });
            dispatch(StateActionCreators.updateSuccess());
        } catch (error) {
            dispatch(StateActionCreators.updateError(error));
        }
    };
}

export function recordList() {
    return async(dispatch) => {
        try {
            dispatch({
                type: RECORD_LIST,
                records: await FetchApi.read('records')
            });
        } catch (error) {
            dispatch(StateActionCreators.updateError(error));
        }
    };
}

export function recordDelete(id) {
    return async(dispatch) => {
        try {
            dispatch(StateActionCreators.beginUpdate());
            await FetchApi.remove('records', { id });
            dispatch({
                type: RECORD_DELETE,
                id
            });
            dispatch(StateActionCreators.updateSuccess());
        } catch (error) {
            dispatch(StateActionCreators.updateError(error));
        }
    };
}
