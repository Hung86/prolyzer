import React, { Component } from 'react';


class MessageUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleFormSubmit = e => {
        e.preventDefault();
        let button_id = e.target.id;
        this.props.history.push('/');
    };

    render() {
        return (
            <section className="App">
            <form onSubmit={this.handleFormSubmit}>
            <div className="container">
              <h1>Register is successful ! Please check your email to activate user</h1>    
                <div className="field">
                <button id="btn_ok" className='button' onClick={this.handleFormSubmit}>Ok</button>
                </div>
            </div>
            </form>
          </section>
        );
    }
}

export default MessageUI;