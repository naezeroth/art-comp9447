import React from 'react';
import Login from './Login';
import Register from './Register';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/Register" exact component={Register} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
