import React, { Component } from 'react';
import {Auth} from "aws-amplify"
import ErrorMsg from './ErrorMsg';
import {validateField,
  clearStateError} from '../utils/UtilFunc';



class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          email: "",
          password: "",
          confirm_password: "",
          errors: {
            cognito_msg: "",
            blank_field: [],
            password_notmatch: false
          }
        };
    }

    handleFormSubmit = async e => {
        e.preventDefault();
        let button_id = e.target.id;
        console.log(button_id);
        clearStateError(this.state);
        if (!validateField(this)) {
            console.log("----- error error")
        } else {
          try {
            if (button_id == 'btn_ok') {
              const {username, email, password} = this.state;
              // TO DO
              const signUpRes = await Auth.signUp ({
                username,
                password,
                attributes: {
                  email: email
                }
              });
              console.log(signUpRes);
              this.props.history.push('/message');
            } else {
              this.props.history.push('/');
            }
          } catch (error) {
            console.log(error);
            let error_msg = "";
            !error.message ? error_msg = error : error_msg = error.message;
            this.setState({
              errors: {
                ...this.state.errors,
                cognito_msg: error_msg
              }
            });
          }
      }
    };

    onInputChange = e => {
      this.setState({[e.target.id]: e.target.value});
    }
  
    render() {
      console.log("invoke UserRegister:render");
        return (
            <section className="App">
            <form onSubmit={this.handleFormSubmit}>
            <div className="container">
              <h1>Register</h1>
                <ErrorMsg errors={this.state.errors} />
                <div className="field">
                    <input 
                      className="input" 
                      type="text"
                      id="username"
                      aria-describedby="userNameHelp"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.onInputChange}
                    />
                </div>
                <div className="field">
                    <input 
                      className="input" 
                      type="email"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.onInputChange}
                    />
        
                </div>
                <div className="field">
                    <input 
                      className="input" 
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onInputChange}
                    />
        
                </div>
                <div className="field">
                    <input 
                      className="input" 
                      type="password"
                      id="confirmpassword"
                      placeholder="Confirm password"
                      value={this.state.confirm_password}
                      onChange={this.onInputChange}
                    />
    
                </div>

                <div className="field">
                <button id="btn_ok" className='button' type="submit" onClick={this.handleFormSubmit}>Ok</button>
                <button id="btn_cancel" className='button' type="submit" onClick={this.handleFormSubmit}>Cancel</button>
                </div>
            </div>
            </form>
          </section>
        );
    }
}

export default UserRegister;