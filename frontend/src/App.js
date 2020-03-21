import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SearchUI from './components/SearchUI';
import './App.css';

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={SearchUI}/> {/*start default url with search UI*/}
                <Route path="/dashboard" exact component={Dashboard}/> {/*URL dashboard ui*/}
            </Switch>
        </BrowserRouter>
    );
}
