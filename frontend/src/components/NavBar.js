import React, { Component } from 'react';
import {Auth} from "aws-amplify";

class NavBar extends Component {
  logOut = async e => {
    e.preventDefault();
    try {
      Auth.signOut();
      this.props.appAuth.setUser(null);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
        return (
          <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <img src="Prolyzer-logo.png" alt="Prolyzer logo" />
              </a>
            </div>
            <div id="buttons_id" className="navbar-menu">
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                      <div>
                      { !this.props.appAuth.getUser() ? (
                          <div>
                            <a href="/register" className="button is-primary">
                              <strong>Register</strong>
                            </a>
                            <a href="/login" className="button is-light">
                              Login
                            </a>
                          </div>
                        ):(
                          <div>
                            <a href="/register" className="button is-primary">
                              Hi <strong>{this.props.appAuth.getUser().username}</strong>
                            </a>
                            <a href="/" onClick={this.logOut} className="button is-light">
                              Logout
                            </a>
                          </div>
                        )}
                      </div>
                  </div>
                </div>
              </div>
            </div>
        </nav>
        )
    }
}

export default NavBar;