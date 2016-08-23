import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import * as StateActionCreators from '../actions/state';
import Alert from './alert';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

class Navigation extends React.Component {

    _addRecord = () => {
        this.props.dispatch(StateActionCreators.createRecord());
    };

    _editRecord = id => {
        this.props.dispatch(StateActionCreators.showRecordEditor(id));
    };

    _deleteRecord = id => {
        this.props.dispatch(StateActionCreators.setAlert(
            Alert.BUTTONS_YESNO,
            'Do you want to delete record?',
            'records.recordDelete',
            [id]));
    };

    render() {

        const { records, recordId } = this.props;

        const iconButtonElement = (
            <IconButton
                touch={true}
                tooltipPosition="bottom-left"
            >
                <MoreVertIcon color={grey400} />
            </IconButton>
        );

        var recordsListItems = records.map(record =>
            <ListItem
                key={record.id}
                className={ 'list-item' + (record.id == recordId ? ' selected' : '') }
                rightIconButton={(
                    <IconMenu iconButtonElement={iconButtonElement}>
                        <MenuItem onTouchTap={() => this._editRecord(record.id)}>Edit</MenuItem>
                        <MenuItem onTouchTap={() => this._deleteRecord(record.id)}>Delete</MenuItem>
                    </IconMenu>
                )}
            >
                <Link to={ '/record/' + record.id }> {record.title || 'No title'} </Link>
            </ListItem>
        ).toArray();

        return (
            <div>
                <Toolbar>
                    <ToolbarGroup>
                        <RaisedButton label="Add record" onTouchTap={this._addRecord} primary={true} />
                    </ToolbarGroup>
                </Toolbar>
                <List className="list">
                    {recordsListItems}
                </List>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        records: state.records,
        recordId: ownProps.params.id
    };
};

export default connect(mapStateToProps)(Navigation);
