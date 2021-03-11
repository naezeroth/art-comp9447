import React from 'react';
import { Button } from 'react-bootstrap';
import bgImg from './assets/bg.jpg';
import logo from './assets/Logo.png';
import Form from 'react-bootstrap/Form';

export default class Login extends React.Component {

  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
}

  handleSubmit(event){
      event.preventDefault();
      console.log(event.target[0].value);
}

  render() {
    return (
          <div className="login" style={styles.background}>
            <div className="container" style={styles.container}>

              <div className="loginContent" style={styles.loginContent}>
                  <img src={logo} style={styles.logoDim} alt="logo"/>
                  <h1>A.R.T.</h1>
                  <h5> Automated Remediation Tool </h5>

                <div className="loginContent" style={styles.FormSection}>
                  <h2> Login </h2>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group >
                          <Form.Label>AWS Account No : </Form.Label>
                          <Form.Control type="number" placeholder="Enter Acc No." />
                      </Form.Group>
                      &nbsp; 
                      <Form.Group>
                          <Form.Label>IAM Username : </Form.Label>
                          <Form.Control type="text" placeholder="Your IAM Username" />
                      </Form.Group>
                      &nbsp; 
                      <Form.Group>
                          <Form.Label>Password  : </Form.Label>
                              <Form.Control type="password" placeholder="Your IAM Password" />
                      </Form.Group>
                      &nbsp; 
                      <Form.Group>
                        <Form.Check type="checkbox" label="Remember Me" />
                      </Form.Group>
                      <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

const styles = {

  background: {
    margin: '0',
    height: '100vh',
    backgroundImage: `url(${bgImg})`,
    backgroundPosition: 'centre',
    backgroundRepeat: 'no-repeat',
  },

  container: {
    display: 'flex',
    flexFlow: 'column',
    height: '100vh',
    width: '500px',
    float: 'right',
    padding: '10px',
    backgroundColor: 'white',
  },

  loginContent: {
    margin: '0',
    textAlign: 'center',
    position: 'relative',
  },

  FormSection: {
    margin: '0',
    textAlign: 'center',
    position: 'relative',
    top: '15%',
  },

  logoDim: {
    width: '100px',
    textAlign: 'center',
    marginRight: '5px',
    paddingBottom: '4px'
  },
};