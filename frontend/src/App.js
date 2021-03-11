import React from 'react';
import Login from './Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Error404 from './components/Error404';
import Overview from './components/Overview'
// import Button from 'react-bootstrap/Button';
// import { Col, Container, Row } from 'react-bootstrap';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/" exact component={Login} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
