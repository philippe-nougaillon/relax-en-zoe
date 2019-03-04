import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import App from './App'
import Charge from './Charge';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <a className="navbar-brand" href="/">ZOE 4.0</a>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink exact className="nav-link" activeClassName="active" to="/">Autonomie</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/charge">Charge</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/bornes">Bornes</NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <div className="content">
          <Route exact path="/" component={App} />
          <Route path="/charge" component={Charge} />
        </div>
      </div>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;