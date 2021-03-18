import React from "react";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Overview from "./Overview/Overview";
import Home from "./Home/Home";
import Workflow from "./Flow/Workflow";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => (
    <BrowserRouter>
        <div className="App">
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/Register" exact component={Register} />
                <Route path="/Overview" exact component={Overview} />
                <Route path="/Home" exact component={Home} />
                <Route path="/Workflow" exact component={Workflow} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default App;
