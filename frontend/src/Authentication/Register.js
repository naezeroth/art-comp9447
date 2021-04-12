import React from "react";
import Button from '@material-ui/core/Button';
import bgImg from "../assets/bg.jpg";
import logo from "../assets/Logo.png";
import Form from "react-bootstrap/Form";
import FittedImg from 'react-fitted-img';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

export default class Register extends React.Component {
    render() {
        return (
            <div className="register" style={styles.background}>
                <FittedImg  src={bgImg} fit="auto" alt="Cloud computing Image" position="0 100%" />                
                <div className="container" style={styles.container}>
                    <div
                        className="registerContent"
                        style={styles.registerContent}
                    >
                        <img src={logo} style={styles.logoDim} alt="logo" />
                        <h1>A.R.T.</h1>
                        <h5> Automated Remediation Tool </h5>

                        <div
                            className="registerContent"
                            style={styles.FormSection}
                        >
                            <Card style={{backgroundColor: "#4D4D4D", padding: 20, borderRadius: 30}}>
                            <CardHeader style={{color: "#000000", backgroundColor:"white" ,borderRadius: 30, }}
                            title="Register"
                            />
                            <Form style={{paddingTop: 70}} onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label style={{color: "#FFFFFF"}}>Email Address : </Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                    />
                                </Form.Group>
                                <div className="break" style={styles.break}/>
                                <Form.Group>
                                    <Form.Label style={{color: "#FFFFFF"}}>Password : </Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Your Password"
                                    />
                                </Form.Group>
                                <div className="break" style={styles.break}/>
                                <Form.Group>
                                    <Form.Label style={{color: "#FFFFFF"}}>
                                        {" "}
                                        Confirm Password :{" "}
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Re-enter Your Password"
                                    />
                                </Form.Group>
                                <div className="break" style={styles.break}/>
                                <Form.Group>
                                    <Form.Label style={{color: "#FFFFFF"}}>Create Username : </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter a Username"
                                    />
                                </Form.Group>
                                <div className="break" style={styles.break}/>
                                <Button style={{marginTop: 20, backgroundColor: "white"}} onClick={event =>  window.location.href='../Home'} type="submit">
                                    Submit
                                </Button>
                            </Form>
                            <h5 style={{color: "#FFFFFF"}}>
                                {" "}
                                Already a User? <a style={{color: "#45b6fe"}} href="./"> Login </a>
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
        backgroundPosition: "left",
    },

    container: {
        display: "flex",
        flexFlow: "column",
        height: "auto",
        width: "auto",
        float: "right",
        padding: "20px",
        backgroundColor: "white",
        paddingLeft: 30
    },

    registerContent: {
        marginRight: "45px",
        textAlign: "center",
        position: "relative",
    },

    FormSection: {
        margin: "0",
        textAlign: "center",
        position: "relative",
        Top: "50%",
    },

    logoDim: {
        width: "100px",
        textAlign: "center",
        marginRight: "5px",
        paddingBottom: "4px",
    },
    break:{
        padding: 12,
    },
};
