import React from 'react';
import { Redirect } from 'react-router-dom'


class SearchUI extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        redirect: false,
        relevant_product: ""
      };
      this.handleFormSubmit = this.handleFormSubmit.bind(this);

    }
  
    myChangeHandler = (event) => {
      this.setState({relevant_product: event.target.value});

    }

    handleFormSubmit(e) {
      e.preventDefault();
      console.log("FORM SUBMIT!");
      //this.props.history.push('/dashboard/');
      this.setState({ redirect: true });
      // const { redirect } = this.state;
  
    }
  
    render() {
      const { redirect } = this.state;
      if (redirect) {
        console.log("---------------- redirect to Dashboard: " + redirect)
        return <Redirect to='/dashboard'/>;
      }
      return (
        <div className='App'>
            <form>
                <h1>Welme come to Prolyzer</h1>
                <div>
                <p>Enter your product: {this.state.relevant_product}</p>
                <input
                  type='text'
                  class='Text_Left'
                  onChange={this.myChangeHandler}
                  placeholder="Relevant product..."
                />
          
                <button class='button' type="submit" onClick={this.handleFormSubmit}>Search</button>
                </div>
            </form>
        </div>
      );
    }
  }
  
  
  export default SearchUI;