import React from 'react';
import Login from './Login';
import Register from './Register';
import Overview from './Overview';
import CreateFlow1 from './CreateFlow';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/Register" exact component={Register} />
        <Route path="/Overview" exact component={Overview} />
        <Route path="/CreateFlow1" exact component={CreateFlow1} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
