import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "../Overview.css";
import ButtonAppBar from "../buttonAppBar";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <ButtonAppBar />
                </div>
                <div style={styles.dropDown}>
                    <ul class="navBar">
                        <li>
                            <a style={{backgroundColor: "#F9B15D",}}href="./Home">Home</a>
                        </li>
                        <li>
                            <a href="./">Services</a>
                        </li>
                        <li>
                            <a href="./Overview">Overview</a>
                        </li>
                        <li>
                            <a href="./">History</a>
                        </li>
                    </ul>
                </div>
                <Container disableGutters="true" maxWidth="false">
                    <Typography
                        component="div"
                        style={{ backgroundColor: "#C4C4C4", height: "100vh", paddingTop: 80 }}
                    >
                        <Container maxWidth="xl">
                            <Typography
                                component="div"
                                style={{
                                    backgroundColor: "#C4C4C4",
                                    height: "100vh",
                                }}
                            >
                                <Grid container spacing={0}>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Grid item xs={6}>
                                            <Card
                                                style={styles.currentAlerts}
                                            >
                                            <CardHeader style={{color: "white", backgroundColor:"#12293B" ,borderRadius: 10, margin: 2}}
                                                title="Current Alerts"
                                            />                                                
                                            </Card>
                                        </Grid>

                                        <Grid item xs={5}>
                                            <Card style={styles.Flows}>
                                            <CardHeader style={{color: "white", backgroundColor:"#12293B" ,borderRadius: 10,margin: 2 }}
                                                title="Flows"
                                            />     
                                                <a href="./WorkFlow">
                                                    <AddCircleIcon
                                                        style={{
                                                            color: "#084B74",
                                                            fontSize: 85,
                                                            paddingRight: "20%",
                                                            marginTop: 25,
                                                            flexDirection: 'column',
                                                        }}
                                                    />
                                                </a>
                                                <a href="./EditFlow">
                                                    <EditIcon
                                                        style={{
                                                            color: "#084B74",
                                                            fontSize: 85,
                                                            marginTop: "7%",
                                                            flexDirection: 'column'
                                                        }}
                                                    />
                                                </a>
                                                <div style={styles.IconText}>
                                                    {/* <Typography
                                                        style={{
                                                            textAlign: "left",
                                                            "font-size": "20px",
                                                            marginTop: "5vh",
                                                            flexDirection: 'column',
                                                        }}
                                                    >
                                                        {" "}
                                                        Create Flow{" "}
                                                    </Typography> */}
                                                    {/* <Typography
                                                        style={{
                                                            "font-size": "20px",
                                                            marginLeft: "10vh",
                                                            marginTop: "5vh",
                                                        }}
                                                    >
                                                        {" "}
                                                        Edit Flow{" "}
                                                    </Typography> */}
                                                </div>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Typography
                                    style={{
                                        textAlign: "left",
                                        marginLeft: "5vh",
                                        "font-size": "25px",
                                        paddingTop: "5vh",
                                    }}
                                >
                                    {" "}
                                    {/* Resources{" "} */}
                                </Typography>
                                <Card style={styles.Resources}>
                                    <CardHeader style={{color: "white", backgroundColor:"#12293B" ,borderRadius: 10,margin: 2 }}
                                        title="Resources"
                                    />                                     
                                    <Button
                                        style={styles.ResourceButton}
                                        variant="contained"
                                        color="primary"
                                        onClick={event =>  window.location.href='../Overview'}
                                    >
                                        EC2
                                    </Button>
                                    <Button
                                        style={styles.ResourceButton}
                                        variant="contained"
                                        color="primary"
                                    >
                                        S3
                                    </Button>
                                    <Button
                                        style={styles.ResourceButton}
                                        variant="contained"
                                        color="primary"
                                    >
                                        IAM
                                    </Button>
                                </Card>
                            </Typography>
                        </Container>
                    </Typography>
                </Container>
            </div>
        );
    }
}

const styles = {
    currentAlerts: {
        marginLeft: "5vh",
        backgroundColor: "#FFFFFF",
        height: "35vh",
        width: "100vh",
        borderRadius: 10, 
        position: "relative"
    },

    Flows: {
        marginLeft: "15%",
        backgroundColor: "#FFFFFF",
        height: "35vh",
        width: "60vh",
        left: "80%",
        borderRadius: 10,
    },

    Resources: {
        marginLeft: "5vh",
        backgroundColor: "#FFFFFF",
        height: "40%",
        width: "100vh",
        borderRadius: 10,
    },

    ResourceButton: {
        height: "20vh",
        width: "20vh",
        marginTop: 50,
        marginRight: 60,
        backgroundColor: "#F9B15D",
        fontWeight: "bold",
    },

    IconText: {
        display: "inline-flex",
    },

    title: {
        backgroundColor: "#12293B",
        position: "static",
    },

    headerBar: {
        display: "flex",
        // justifyContent: "space-between",
        // flexFlow: "row wrap",
    },
};

export default Home;
