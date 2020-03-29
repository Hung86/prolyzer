import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SearchUI from './components/SearchUI';
import NotFoundPage from "./components/NotFoundPage";
import UserRegister from './components/auth/UserRegister';
import UserMessage from './components/auth/UserMessage.js';
import UserLogin from './components/auth/UserLogin';


export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={SearchUI}/> {/*start default url with search UI*/}
                <Route path="/register" exact component={UserRegister}/> {/*start default url with Register UI*/}
                <Route path="/login" exact component={UserLogin}/> {/*start default url with Login UI*/}
                <Route path="/message" exact component={UserMessage}/> {/*start default url with Message UI*/}
                <Route path="/dashboard" exact component={Dashboard}/> {/*URL dashboard ui*/}
                <Route path="*" component={NotFoundPage}/> {/*start default url with search UI*/}
            </Switch>
        </BrowserRouter>
    );
}
