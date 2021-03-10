import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Form,Button } from 'react-bootstrap';

class SignUp extends Component {
    render(){
        return(
            <>
            <Container className="align-items-center" style={{display: 'flex', justifyContent: 'center'}}>
            <Form>
                <Form.Group >
                    <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Your IAM Userame" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>AWS account number</Form.Label>
                    <Form.Control type="number" placeholder="Your AWS acc no." />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            </Container>
            </>
        );
    }
}
 
export default SignUp;