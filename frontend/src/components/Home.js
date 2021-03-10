import React,{Component} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Login from './Login'
class Home extends Component {
    render(){
        return(
            <div className="">
                HOME PAGE
                <div style={{ padding:"20px", }}>
                <Link to="/login"><Button type="primary">Login</Button></Link>
                </div>
    
                <div style={{ padding:"20px", }}>
                <Link to="/signup">SignUp</Link>
                </div>
            </div>
        );
    }
}
 
export default Home;