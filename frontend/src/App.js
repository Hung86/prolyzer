import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SearchUI from './components/SearchUI';
import NotFoundPage from "./components/NotFoundPage";

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={SearchUI}/> {/*start default url with search UI*/}
                <Route path="/dashboard" exact component={Dashboard}/> {/*URL dashboard ui*/}
                <Route path="*" component={NotFoundPage}/> {/*start default url with search UI*/}
            </Switch>
        </BrowserRouter>
    );
}
