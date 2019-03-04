import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as HashRouter, Route, NavLink } from 'react-router-dom';

import App from './App'
import Charge from './Charge';
import Bornes from './Bornes';

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <a className="navbar-brand" href="/">ZOE 4.0</a>

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
            </ul>
          </div>
        </nav>

        <div className="content">
          {/* <Route exact path="/" component={ App } /> */}
          <Route exact path={`/`} render={ (routerProps) => <App routerProps={routerProps} />} />
          <Route path="/charge" component={ Charge } />
          <Route path="/bornes" component={ Bornes } />
        </div>
      </div>
    </HashRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;