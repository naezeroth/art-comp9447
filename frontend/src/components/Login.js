import React,{Component} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';


class Login extends Component {

    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(event.target[0].value);
    }

    render(){
        return(
            <Container className="align-items-center" style={{display: 'flex', justifyContent: 'center'}}>
            <Form onSubmit={this.handleSubmit} >
                
            <Form.Group>
                    <Form.Label>AWS Account Number</Form.Label>
                    <Form.Control type="number" placeholder="Enter Acc No." />
                </Form.Group>

                <Form.Group>
                    <Form.Label>IAM UserName</Form.Label>
                    <Form.Control type="text" placeholder="Your IAM Username" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Your IAM Password" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            </Container>
        );
    }
}

export default Login;