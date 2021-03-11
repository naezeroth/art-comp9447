import React from 'react';
import { Button } from 'react-bootstrap';
import bgImg from './assets/bg.jpg';
import logo from './assets/Logo.png';
import Form from 'react-bootstrap/Form';

export default class Register extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('http://localhost:1337/api/auth/register', {
      method: 'POST',
      body: data,
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        window.location.reload();
        console.log("Success");
      } else {
        console.log(response);
      }
    }).catch(err => err);
    console.log(data);
  }

  render() {
    return (
      <div className="register" style={styles.background}>
        <div className="container" style={styles.container}>

          <div className="registerContent" style={styles.registerContent}>
            <img src={logo} style={styles.logoDim} alt="logo" />
            <h1>A.R.T.</h1>
            <h5> Automated Remediation Tool </h5>

            <div className="registerContent" style={styles.FormSection}>
              <h2> Register </h2>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">Enter username</label>
                <input id="username" name="username" type="text" />

                <label htmlFor="email">Enter your email</label>
                <input id="email" name="email" type="email" />

                <label htmlFor="password">Enter your password</label>
                <input id="password" name="password" type="password" />

                <button>Register!</button>
              </form>
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

  registerContent: {
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