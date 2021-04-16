import React, { useState } from "react";
import CreateFlow1 from "./CreateFlow";
import CreateFlow2 from "./CreateFlow2";
import CreateFlow3 from "./CreateFlow3";
import { Redirect } from "react-router-dom";
const { AWSClientService } = require("art-aws-sdk");

export default function Workflow() {
    const [flowState, setFlowState] = useState("CreateFlow1");
    const [valueState, setValueState] = useState({
        name: "",
        resourceName: "",
        context: "",
        findingType: "",
        actions: [],
    });

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

    const onSubmit = (newState) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: {
                    ...valueState,
                    ...newState,
                },
            }),
        };

        fetch("http://localhost:1337/api/create-flow", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
            });
        setFlowState("Done");
    };

    if (flowState === "CreateFlow1") {
        return (
            <CreateFlow1
                defaultVals={valueState}
                setState={setFlowState}
                onChange={onChange}
            />
        );
    } else if (flowState === "CreateFlow2") {
        return (
            <CreateFlow2
                defaultVals={valueState}
                valueState={valueState}
                setState={setFlowState}
                onChange={onChange}
            />
        );
    } else if (flowState === "CreateFlow3") {
        return (
            <CreateFlow3
                defaultVals={valueState}
                setState={setFlowState}
                onChange={onChange}
                commands={Object.keys(service)}
                onSubmit={onSubmit}
            />
        );
    }

    return <Redirect to="/Home" />;
}
