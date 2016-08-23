import { combineReducers } from 'redux';
import updates from './updates';
import records from './records';

export default combineReducers({
    updates,
    records
});
