import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import Autonomie from './Autonomie';
import Charge from './Charge';
import Bornes from './Bornes';
import About from './About';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <a className="navbar-brand" href="/">Relaxateur Renault ZOE 4.0</a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
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
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/about">A propos</NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <div className="content">
          <Route exact path="/" component={ Autonomie } />
          <Route path="/charge" component={ Charge } />
          <Route path="/bornes" component={ Bornes } />
          <Route path="/about" component={ About } />
        </div>
      </div>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;