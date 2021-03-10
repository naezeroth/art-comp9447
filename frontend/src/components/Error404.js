import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

class Error404 extends Component {
    render(){
        return(
            <>
            <div>INVALID LINK</div>
            <Link to="/"><Button type="secondary" >Back to Home</Button></Link>
            </>
        );
    }
}
 
export default Error404;