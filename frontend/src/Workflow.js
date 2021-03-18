import React, {useState} from "react";
import CreateFlow1 from './CreateFlow';
import CreateFlow2 from './CreateFlow2';
import CreateFlow3 from './CreateFlow3';

export default function Workflow() {

    const [state, setState] = useState("CreateFlow1");

    if (state==="CreateFlow1"){
        return <CreateFlow1 setState={setState}/>;
        }

    else if (state==="CreateFlow2"){
        return <CreateFlow2 setState={setState}/>;
    }

    else if (state==="CreateFlow3"){
    return <CreateFlow3/>;
    }

}