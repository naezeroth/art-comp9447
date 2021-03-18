import React, {useState} from "react";
import CreateFlow1 from './CreateFlow';
import CreateFlow2 from './CreateFlow2';
import CreateFlow3 from './CreateFlow3';
const { AWSClientService } = require('art-aws-sdk');

export default function Workflow() {

    const [flowState, setFlowState] = useState("CreateFlow1");
    const [valueState, setValueState] = useState({});

    const onChange = (newState) => {
        console.log("Valuestate", valueState, typeof(valueState), Object.keys(valueState).length , newState, typeof(newState));
        // console.log("inside Workflow", valueState, valueState.push(newState));
        // if(Object.keys(valueState).length === 0){
        //     setValueState(newState);
        // }
        // else{
            setValueState({
                ...valueState,
                ...newState
            })
        // }
        // console.log("inside Workflow", valueState);
    }

    if (flowState==="CreateFlow1"){
        return <CreateFlow1 setState={setFlowState} onChange={onChange}/>;
    }

    else if (flowState==="CreateFlow2"){
        return <CreateFlow2 setState={setFlowState} onChange={onChange}/>;
    }

    else if (flowState==="CreateFlow3"){
        return <CreateFlow3 setState={setFlowState} onChange={onChange}/>;
    }
    console.log("FINAL state", valueState);
    return (
        <div>
            hello
        </div>
    )

}