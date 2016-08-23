import React from 'react';
import {connect} from 'react-redux';

class Record extends React.Component {
    render() {
        return (<div>{this.props.record.title || 'No title'}</div>);
    }
}

const mapStateToProps = (state, ownProps) => {

    var record = state.records.find(record => record.id == ownProps.params.id) || {};

    return {
        record
    };
};

export default connect(mapStateToProps)(Record);
