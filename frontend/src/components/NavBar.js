import React, { Component } from 'react';
import logo from "../banner_logo.png";

class NavBar extends Component {
    render() {
        return (
          <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <img src={logo} style={{height: 48}} alt="Prolyzer" />
              </a>
            </div>
            <div id="buttons_id" className="navbar-menu">
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                      <div>
                      <a href="/register" className="button is-primary">
                        <strong>Register</strong>
                      </a>
                      <a href="/login" className="button is-light">
                        Log in
                      </a>
                      </div>
                  </div>
                </div>
              </div>
            </div>
        </nav>
        );
    }
}

export default NavBar;