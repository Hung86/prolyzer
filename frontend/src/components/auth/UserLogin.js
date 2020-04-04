import React, { Component } from 'react';

class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleFormSubmit = e => {
        e.preventDefault();
        let button_id = e.target.id;
        console.log(button_id);
        if (button_id === 'btn_ok') {
            // TO DO
            this.props.history.push('/');
        } else {
            this.props.history.push('/');
        }


    };

    render() {
        return (
            <section className="App">
            <form onSubmit={this.handleFormSubmit}>
            <div className="container">
              <h1>Login</h1>    
                <div className="field">
                    <input 
                      className="input" 
                      type="text"
                      id="username"
                      placeholder="Username"
                      value={this.state.username}
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