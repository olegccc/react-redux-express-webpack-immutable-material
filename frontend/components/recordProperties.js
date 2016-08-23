import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import * as RecordsActionCreators from '../actions/records';
import * as StateActionCreators from '../actions/state';
import Form from './form';

class RecordProperties extends Form {

    constructor(props) {
        super(props);
        this.state = {
            showDialog: false
        };
        this.setValidations({
            title: { required: true }
        });
    }

    onSubmit = async () => {

        let record = {
            title: this.state.title
        };

        let create = true;

        if (this.props.record) {
            record.id = this.props.record.id;
            create = false;
        }

        let actionCreator = create ? RecordsActionCreators.recordAdd : RecordsActionCreators.recordUpdate;

        await this.props.dispatch(actionCreator(record));
        this.reset();
        this.setState({
            showDialog: false
        });
        this.props.dispatch(StateActionCreators.hideRecordEditor());
    };

    _onHideDialog = () => {
        this.reset();
        this.setState({
            showDialog: false
        });
        this.props.dispatch(StateActionCreators.hideRecordEditor());
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.showDialog && !this.state.showDialog) {
            let state = {
                showDialog: true
            };
            if (nextProps.record) {
                state.title = nextProps.record.title;
            } else {
                state.title = '';
            }
            this.setState(state);
            this.validate(state);
        }
    }

    render() {

        if (!this.props.showDialog) {
            return null;
        }

        return (
            <Dialog
                title={ this.props.record ? 'Edit record' : 'Create record'}
                open={true}
                bodyClassName="dialog"
                onRequestClose={this._onHideDialog}
                actions={[
                    <FlatButton
                        onTouchTap={this.onSubmit}
                        disabled={!this.state.isValid}
                    >{this.props.record ? 'Save':'Add'}</FlatButton>,
                    <FlatButton onTouchTap={this._onHideDialog}>Cancel</FlatButton>
                ]}
            >
                <TextField {... this.field('title')} floatingLabelText="Record Title" />
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {

    let recordProperties = state.updates.get('recordProperties');

    if (!recordProperties) {
        return {
            showDialog: false
        };
    }

    let ret = {
        showDialog: true,
    };

    if (recordProperties.id) {
        ret.record = state.records.find(record => record.id === recordProperties.id);
    }

    return ret;
};

export default connect(mapStateToProps)(RecordProperties);
