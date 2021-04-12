import React from "react";
import Button from '@material-ui/core/Button';
import bgImg from "../assets/bg.jpg";
import logo from "../assets/Logo.png";
import Form from "react-bootstrap/Form";
import TextField from '@material-ui/core/TextField';
import FittedImg from 'react-fitted-img';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

export default class Login extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(event.target[0].value);
    }

    render() {
        return (
            <div className="login" style={styles.background}>
                <FittedImg  src={bgImg} fit="auto" alt="Cloud computing Image" position="0 100%" />
                <div className="container" style={styles.container}>
                    <div className="loginContent" style={styles.loginContent}>
                        <img src={logo} style={styles.logoDim} alt="logo" />
                        <h1>A.R.T.</h1>
                        <h5> Automated Remediation Tool </h5>

                        <div
                            className="loginContent"
                            style={styles.FormSection}
                        >
                            <Card style={{backgroundColor: "#4D4D4D", padding: 20, borderRadius: 30}}>
                            <CardHeader style={{color: "#000000", backgroundColor:"white" ,borderRadius: 30, }}
                            title="Login"
                            />
                            <Form style={{paddingTop: 70}} onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label style={{color: "#FFFFFF"}}>AWS Account No : </Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Acc No."
                                    />
                                </Form.Group>
                                <div className="break" style={styles.break}/>
                                <Form.Group>
                                    <Form.Label style={{color: "#FFFFFF"}}>IAM Username : </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Your IAM Username"
                                    />
                                </Form.Group>
                                <div className="break" style={styles.break}/>
                                <Form.Group>
                                    <Form.Label style={{color: "#FFFFFF"}}>Password : </Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Your IAM Password"
                                    />
                                </Form.Group>
                                <div className="break" style={styles.break}/>
                                <Form.Group>
                                    <Form.Check 
                                        style={{color: "#FFFFFF", alignItems: "left"}}
                                        type="checkbox"
                                        label="Remember Me"
                                    />
                                </Form.Group>
                                <Button style={{marginTop: 20, backgroundColor: "white"}} onClick={event =>  window.location.href='../Home'} type="submit">
                                    Submit
                                </Button>
                            </Form>
                            <h5 style={{color: "#FFFFFF"}}>
                                {" "}
                                New User? <a style={{color: "#45b6fe"}} href="./Register"> Register </a>
                            </h5>
                            </Card>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    background: {
        margin: "0",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundColor: "white",

    },

    container: {
        display: "flex",
        flexFlow: "column",
        height: "auto",
        width: "auto",
        padding: "20px",
        float: "right",
        backgroundColor: "white",
        paddingLeft: 40,

    },
    break:{
        padding: 12,
    },

    loginContent: {
        marginRight: "45px",
        textAlign: "center",
        position: "relative",
        backgroundColor: "white",

    },

    FormSection: {
        margin: "0",
        textAlign: "center",
        position: "relative",
        Top: "50%",
        backgroundColor: "white",

    },

    logoDim: {
        width: "100px",
        textAlign: "center",
        marginRight: "5px",
        paddingBottom: "4px",
    },
};