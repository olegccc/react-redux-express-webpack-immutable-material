export const BEGIN_UPDATE = 'BEGIN_UPDATE';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_ERROR = 'UPDATE_ERROR';
export const LOADING_INITIATED = 'LOADING_INITIATED';
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const RECORD_EDITOR = 'RECORD_EDITOR';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export function loadingInitiated() {
    return {
        type: LOADING_INITIATED
    };
}

export function beginUpdate() {
    return {
        type: BEGIN_UPDATE
    };
}

export function updateSuccess() {
    return {
        type: UPDATE_SUCCESS
    };
}

export function updateError(error) {
    return {
        type: UPDATE_ERROR,
        error: error
    };
}

export function showRecordEditor(id) {
    return {
        type: RECORD_EDITOR,
        show: true,
        id
    };
}

export function createRecord() {
    return {
        type: RECORD_EDITOR,
        show: true
    };
}

export function hideRecordEditor() {
    return {
        type: RECORD_EDITOR,
        show: false
    };
}

export function toggleSidebar() {
    return {
        type: TOGGLE_SIDEBAR
    };
}

export function setAlert(type, text, actionId = null, actionParameters = null) {
    return {
        type: SET_ALERT,
        alert: {
            type: type,
            text: text,
            action: actionId ? { id: actionId, arguments: actionParameters } : null
        }
    };
}

export function removeAlert() {
    return {
        type: REMOVE_ALERT
    };
}
