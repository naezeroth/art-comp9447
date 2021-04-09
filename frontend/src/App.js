import React from "react";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Overview from "./Overview/Overview";
import Home from "./Home/Home";
import Workflow from "./Flow/Workflow";
import EditFlow from "./Flow/EditFlow";
import EditFlowState from "./Flow/EditFlowState";
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
                <Route path="/EditFlow/:editFlowId"  component = {EditFlow} />
                <Route path="/EditFlowState" exact component={EditFlowState} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default App;
