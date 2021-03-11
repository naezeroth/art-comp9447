import React,{Component} from 'react';
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


class App extends Component {

  render(){
    return (
    <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} exact/>
      <Route path="/login" component={Login} exact/>
      <Route path="/signup" component={SignUp} exact/>
      <Route path="/overview" component={Overview} exact/>
      <Route path="/" component={Error404} />
    </Switch>
    </BrowserRouter>
  );
}
}

export default App;
