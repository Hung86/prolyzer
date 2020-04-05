import React, { Component } from 'react';
import {Auth} from "aws-amplify";
import logo from "../banner_logo.png";

class NavBar extends Component {
  logIn = e => {
    //e.preventDefault();
    console.log(" Invoked Navbar::LogIn");
  }
  register = e => {
    //e.preventDefault();
    console.log(" Invoked Navbar::Register");
  }

  logOut = e => {
    //e.preventDefault();
    console.log(" Invoked Navbar::LogOut");
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
                <img src={logo} style={{height: 48}} alt="Prolyzer" />
              </a>
            </div>
            <div id="buttons_id" className="navbar-menu">
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                      <div>
                      { !this.props.appAuth.getUser() ? (
                          <div>
                            <a href="/register" onClick={this.register} className="button is-primary">
                              <strong>Register</strong>
                            </a>
                            <a href="/login" onClick={this.logIn} className="button is-light">
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