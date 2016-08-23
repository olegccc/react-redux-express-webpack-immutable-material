import React from 'react';
import {connect} from 'react-redux';

import Header from './header';
import Footer from './footer';
import Alert from './alert';
import RecordProperties from './recordProperties';

const Layout = ({ main, sidebar, showSidebar }) =>
    (
        <div className="root">
            <Alert/>
            <RecordProperties/>
            <Header/>
            <div className="middle">
                { showSidebar ?
                    <div className="sidebar">
                        {sidebar}
                    </div>
                    : null
                }
                <div className="content">
                    {main}
                </div>
            </div>
            <Footer/>
        </div>
    );

const mapStateToProps = (state) => {
    return {
        showSidebar: state.updates.get('sidebar')
    };
};

export default connect(mapStateToProps)(Layout);
