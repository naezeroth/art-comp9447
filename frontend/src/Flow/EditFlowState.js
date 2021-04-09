import React, { useState } from "react";
import EditFlow from "./EditFlow"
import EditFlow2 from "./EditFlow2";
import { Redirect } from "react-router-dom";
const { AWSClientService } = require("art-aws-sdk");

export default function EditFlowState() {
    const [flowState, setFlowState] = useState("EditFlow");
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

    const onSubmit = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: valueState }),
        };

        fetch("http://localhost:1337/api/edit-flow", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
            });
    };

    if (flowState === "EditFlow") {
        return <EditFlow setState={setFlowState} onChange={onChange} />;
    } 
    else if (flowState === "EditFlow2") {
        return (
            <EditFlow2
                setState={setFlowState}
                onChange={onChange}
                commands={Object.keys(service)}
                onSubmit={onSubmit}
            />
        );
        }
    return <Redirect to="/Home" />;
}
