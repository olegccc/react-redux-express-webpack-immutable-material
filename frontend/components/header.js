import React from 'react';
import AppBar from 'material-ui/AppBar';
import * as StateActionCreators from '../actions/state';
import {connect} from 'react-redux';

const Header = ({dispatch}) => {
    return (
        <div className="header">
            <AppBar
                title="React application boilerplate"
                onLeftIconButtonTouchTap={() => dispatch(StateActionCreators.toggleSidebar())}
            />
        </div>
    );
};

export default connect()(Header);
