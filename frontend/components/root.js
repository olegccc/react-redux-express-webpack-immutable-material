import React from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import initializeState from '../redux/initializeState';
import Router from './router';

class Root extends React.Component {

    componentDidMount() {
        initializeState(this.props.dispatch, this.props.updates);
    }

    render() {
        return (
            <MuiThemeProvider>
                {Router}
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {updates: state.updates};
};

export default connect(mapStateToProps)(Root);
