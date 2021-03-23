import React, { useState } from "react";
import CreateFlow1 from "./CreateFlow";
import CreateFlow2 from "./CreateFlow2";
import CreateFlow3 from "./CreateFlow3";
import {Redirect} from "react-router-dom";
const { AWSClientService } = require("art-aws-sdk");

export default function Workflow() {
    const [flowState, setFlowState] = useState("CreateFlow1");
    const [valueState, setValueState] = useState({});

    const service = AWSClientService();

    const onChange = (newState) => {
        setValueState({
            ...valueState,
            ...newState,
        });
        console.log("Current new state", {
            ...valueState,
            ...newState,
        });
    };

    if (flowState === "CreateFlow1") {
        return (
                <CreateFlow1 
                    setState={setFlowState} 
                    onChange={onChange} />
                    );
    } else if (flowState === "CreateFlow2") {
        return (
                <CreateFlow2 
                    valueState={valueState} 
                    setState={setFlowState} 
                    onChange={onChange} />
                    );
    } else if (flowState === "CreateFlow3") {
        return (
            <CreateFlow3
                setState={setFlowState}
                onChange={onChange}
                commands={Object.keys(service)}
            />
        );
    }else if (flowState === "CreateFlowInfo"){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: valueState }),
        };
    
        fetch("http://localhost:1337/api/create-flow", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
            });
    }

    return <Redirect to="/Home"/>;
}
