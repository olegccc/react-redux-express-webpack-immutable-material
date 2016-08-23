import * as RecordActions from '../actions/records';
import * as StateActions from '../actions/state';

const initializeState = async(dispatch, updates) => {

    if (!updates.get('loading')) {
        return;
    }

    await dispatch(StateActions.loadingInitiated());

    dispatch(RecordActions.recordList());
};

export default initializeState;
