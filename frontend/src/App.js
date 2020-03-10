import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            randomNumber: 0
        };
    }

    someMethod = () => {
        this.setState({randomNumber: Math.random()});
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        {this.state.randomNumber}
                    </p>
                    <input
                        placeholder="i am some text"

                    />
                    <button onClick={this.someMethod}>
                        I am a button
                    </button>
                </header>
            </div>
        );
    }
}

export default App;
