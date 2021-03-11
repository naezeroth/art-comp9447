import React from 'react';
import Login from './Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

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
