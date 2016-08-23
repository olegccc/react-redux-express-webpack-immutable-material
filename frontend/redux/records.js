import * as RecordActions from '../actions/records';
import { List } from 'immutable';

const defaultState = List([]);

function recordsReducer(state = defaultState, action) {

    let index;

    switch (action.type) {
        case RecordActions.RECORD_LIST:
            return List(action.records);
        case RecordActions.RECORD_ADD:
            return state.push(action.record);
        case RecordActions.RECORD_UPDATE:
            index = state.findIndex(record => record.id === action.record.id);
            return index >= 0 ? state.set(index, action.record) : state;
        case RecordActions.RECORD_DELETE:
            index = state.findIndex(record => record.id === action.id);
            return index >= 0 ? state.remove(index) : state;
    }

    return state;
}

export default recordsReducer;
