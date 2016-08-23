import * as StateActionCreators from '../actions/state';
import { Map } from 'immutable';

const defaultState = new Map({
    isUpdating: false,
    updateError: false,
    loading: true,
    sidebar: true
});

function updates(state = defaultState, action) {

    switch (action.type) {
        case StateActionCreators.BEGIN_UPDATE:
            return state.withMutations(m => m
                .set('isUpdating', true)
                .set('updateError', false)
            );
        case StateActionCreators.UPDATE_SUCCESS:
            return state.withMutations(m => m
                .set('isUpdating', false)
                .set('updateError', false));
        case StateActionCreators.UPDATE_ERROR:
            return state.withMutations(m => m
                .set('isUpdating', false)
                .set('updateError', true));
        case StateActionCreators.LOADING_INITIATED:
            return state.set('loading', false);
        case StateActionCreators.SET_ALERT:
            return state.set('alert', action.alert);
        case StateActionCreators.REMOVE_ALERT:
            return state.set('alert', null);
        case StateActionCreators.RECORD_EDITOR:
            return state.set('recordProperties', action.show ? { id: action.id } : null);
        case StateActionCreators.TOGGLE_SIDEBAR:
            return state.set('sidebar', !state.get('sidebar'));
        default:
            return state;
    }
}

export default updates;
