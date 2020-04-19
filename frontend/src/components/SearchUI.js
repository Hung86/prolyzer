import React from 'react';
import {stringify} from 'querystring';
import NavBar from './NavBar';

class SearchUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            search: "",
            error: ""
        };
    }

    myChangeHandler = (event) => {
        this.setState({search: event.target.value});
    };

    handleFormSubmit = e => {
        e.preventDefault();
        const {search} = this.state;
        if (search.trim().length === 0) {
            this.setState({error: "Please input a valid search term"});
            // TODO: More validation like special chars etc.
        } else {
            this.setState({redirect: true});
            const searchParams = stringify({search});
            this.props.history.push(`/dashboard?${searchParams}`);
        }
    };

    render() {
        return (
            <div>
                <NavBar appAuth={this.props.appAuth}/>
                <div className='App'>
                    <form onSubmit={this.handleFormSubmit}>
                        <h1>Welcome to Prolyzer</h1>
                        <p className="text-muted">Prolyzer tagline, instructions and description here</p>
                        <div>
                            <label>Enter a search query:</label>
                            <input
                                    type='text'
                                    id="in_search"
                                    onChange={this.myChangeHandler}
                                    placeholder="e.g. #pixel3a, #covid19, iPhone12"
                                />
                                <button id='btn_search' type="submit" onClick={this.handleFormSubmit}>Analyze</button>
                        </div>
                        <div>
                            <p className="text-danger">{this.state.error}</p>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}


export default SearchUI;