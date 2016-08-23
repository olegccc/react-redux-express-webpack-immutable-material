import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import * as StateActionCreators from '../actions/state';
import Actions from '../actions/index';

class Alert extends React.Component {

    static BUTTONS_OK = 'OK';
    static BUTTONS_YESNO = 'YESNO';

    _handleCancel = () => {
        this.props.dispatch(StateActionCreators.removeAlert());
    };

    _handleConfirm = () => {
        this.props.dispatch(StateActionCreators.removeAlert());
        if (this.props.alert.action) {
            var ids = this.props.alert.action.id.split('.');
            if (ids.length === 2) {
                var actionFunction = Actions[ids[0]][ids[1]];
                if (!actionFunction) {
                    throw new Error('Cannot find action');
                }
                this.props.dispatch(actionFunction.apply(null, this.props.alert.action.arguments));
            }
        }
    };

    render() {

        if (!this.props.alert) {
            return null;
        }

        let buttons = [];

        switch (this.props.alert.type) {
            case Alert.BUTTONS_OK:
                buttons.push(<FlatButton label="OK" primary={true} onTouchTap={this._handleConfirm}/>);
                break;
            case Alert.BUTTONS_YESNO:
                buttons.push(<FlatButton label="Yes" primary={true} onTouchTap={this._handleConfirm}/>);
                buttons.push(<FlatButton label="No" primary={true} onTouchTap={this._handleCancel}/>);
                break;
        }

        return (<Dialog
            open={true}
            onRequestClose={this._handleCancel}
            actions={buttons}
        >
            {this.props.alert.text}
        </Dialog>);
    }
}

const mapStateToProps = (state) => {
    return {
        alert: state.updates.get('alert')
    };
};

export default connect(mapStateToProps)(Alert);
