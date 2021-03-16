import React from 'react';
import Login from './Login';
import Register from './Register';
import Overview from './Overview';
import Home from './Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/Register" exact component={Register} />
        <Route path="/Overview" exact component={Overview} />
        <Route path="/Home" exact component={Home} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
