import React from 'react';
import { Button } from 'react-bootstrap';
import bgImg from '../assets/bg.jpg';
import logo from '../assets/Logo.png';
import Form from 'react-bootstrap/Form';

export default class Register extends React.Component {

  render() {
    return (
          <div className="register" style={styles.background}>
            <div className="container" style={styles.container}>

              <div className="registerContent" style={styles.registerContent}>
                  <img src={logo} style={styles.logoDim} alt="logo"/>
                  <h1>A.R.T.</h1>
                  <h5> Automated Remediation Tool </h5>

                <div className="registerContent" style={styles.FormSection}>
                  <h2> Register </h2>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                          <Form.Label>Email Address  : </Form.Label>
                              <Form.Control type="email" placeholder="Enter your email" />
                      </Form.Group>
                      &nbsp; 
                      <Form.Group>
                          <Form.Label>Password  : </Form.Label>
                              <Form.Control type="password" placeholder="Your Password" />
                      </Form.Group>
                      &nbsp; 
                      <Form.Group>
                          <Form.Label> Confirm Password  : </Form.Label>
                              <Form.Control type="password" placeholder="Re-enter Your Password" />
                      </Form.Group>
                      &nbsp; 
                      <Form.Group>
                          <Form.Label>Create Username : </Form.Label>
                          <Form.Control type="text" placeholder="Enter a Username" />
                      </Form.Group>
                      
                      <Button>
                        Submit
                      </Button>
                    </Form>
                    <h5> Already a User? <a href="./"> Login </a></h5>
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
    width: 'auto', // "100%"
    backgroundImage: `url(${bgImg})`,
    backgroundPosition: 'left',
    backgroundRepeat: 'no-repeat',
  },

  container: {
    display: 'flex',
    flexFlow: 'column',
    height: 'auto',
    width: 'auto',
    float: 'right',
    padding: '10px',
    backgroundColor: 'white',
  },

  registerContent: {
    marginRight: '45px',
    textAlign: 'center',
    position: 'relative',
  },

  FormSection: {
    margin: '0',
    textAlign: 'center',
    position: 'relative',
    top: '5%',
  },

  logoDim: {
    width: '100px',
    textAlign: 'center',
    marginRight: '5px',
    paddingBottom: '4px'
  },
};