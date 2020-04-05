import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SearchUI from './components/SearchUI';
import NotFoundPage from "./components/NotFoundPage";
import UserRegister from './components/auth/UserRegister';
import UserMessage from './components/auth/UserMessage.js';
import UserLogin from './components/auth/UserLogin';

import {Auth} from "aws-amplify"


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isAuthenticatedChecking: true,
        };
    }

    setUser = user_login => {
        this.setState({user: user_login});
    }

    getUser = () => {
        return this.state.user;
    }

    componentDidMount = async () => {
        console.log("invoke App:componentDidMount");
        try {
            const session = await Auth.currentSession();
            const user_login = await Auth.currentAuthenticatedUser();
            console.log(session);
            this.setUser(user_login);
          } catch(error) {
            console.log(error);
          }
          this.setState({isAuthenticatedChecking: false});
    }

    render() {
        const {isAuthenticatedChecking} = this.state
        const authProps = {
            getUser: this.getUser,
            setUser: this.setUser
        }

        return (
            !isAuthenticatedChecking &&
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact render={(props) => <SearchUI {...props} appAuth={authProps}/>} /> {/*start default url with search UI*/}
                    <Route path="/register" exact render={(props) => <UserRegister {...props} appAuth={authProps}/>}/> {/*start default url with Register UI*/}
                    <Route path="/login" exact render={(props) => <UserLogin {...props} appAuth={authProps}/>}/> {/*start default url with Login UI*/}
                    <Route path="/message" exact render={(props) => <UserMessage {...props} appAuth={authProps}/>}/> {/*start default url with Message UI*/}
                    <Route path="/dashboard" exact render={(props) => <Dashboard {...props} appAuth={authProps}/>}/> {/*start default url with dashboard UI*/}
                    <Route path="*" component={NotFoundPage}/> {/*start default url with search UI*/}
                </Switch>
            </BrowserRouter>
        );
    }

}
