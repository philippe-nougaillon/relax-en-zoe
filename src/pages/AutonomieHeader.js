import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        params: state.paramsState,
    };
}

function Header ({ params }) {
    return (
        <div className="card-header">
            <h1>
                <small className="text-info">Autonomie</small>
                <br />
                { params.autonomie | 0 }
                <small> km</small>
            </h1>
        </div>
    ); 
}

export default connect(mapStateToProps)(Header);
