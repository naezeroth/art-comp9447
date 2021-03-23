import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "../Overview.css";
import ButtonAppBar from "../buttonAppBar";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";

class Home extends Component {
    constructor() {
        super();

        this.state = {
            paginationValue: '86',
            flows: []
        }
        componentDidMount() {
            fetch(' http://localhost:1337/api/display-flows') //the api to hit request
                .then((response) => {
                    const course = response.data.map((flows) => ({
                        id: flows.id,
                        name: flow.name,
                        resourceName: flow.resourceName
                    }));
    
                    this.setState({
                        flows
                    });
                });
        }
    render() {
        return (
            <div>
                <div>
                    <ButtonAppBar />
                </div>
                <div style={styles.dropDown}>
                    <ul class="navBar">
                        <li>
                            <a href="./Home">Home</a>
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
                        style={{ backgroundColor: "#C4C4C4", height: "100vh" }}
                    >
                        <Container maxWidth="xl">
                            <Typography
                                component="div"
                                style={{
                                    backgroundColor: "#F1FAFF",
                                    height: "100vh",
                                }}
                            >
                                <Typography
                                    style={{
                                        "font-size": "40px",
                                        paddingBottom: 35,
                                    }}
                                >
                                    {" "}
                                    Home{" "}
                                </Typography>
                                <Grid container spacing={0}>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Grid item xs={6}>
                                            <Typography
                                                style={{
                                                    textAlign: "left",
                                                    marginLeft: "5vh",
                                                    "font-size": "25px",
                                                }}
                                            >
                                                {" "}
                                                Current Alerts{" "}
                                            </Typography>
                                            <Container
                                                style={styles.currentAlerts}
                                            >
                                                
                                            </Container>
                                        </Grid>

                                        <Grid item xs={5}>
                                            <Typography
                                                style={{
                                                    textAlign: "left",
                                                    "font-size": "25px",
                                                    marginLeft: "10vh",
                                                }}
                                            >
                                                {" "}
                                                Flows{" "}
                                            </Typography>
                                            <Container style={styles.Flows}>
                                             
                                                <a href="./WorkFlow">
                                                    <AddCircleIcon
                                                        style={{
                                                            color: "#0A4A74",
                                                            fontSize: 85,
                                                            marginRight: "12vh",
                                                            marginTop: 60,
                                                        }}
                                                    />
                                                </a>
                                                <ul>
                                                     {
                                                     this.state.course.map((eachFlow) => {
                                                     return <li key={eachFlow.id}>{eachFlow.name}</li>
                                                     })
                                                     }
                                                 </ul>

                                                <a href="./EditFlow">
                                                    <EditIcon
                                                        style={{
                                                            color: "#0A4A74",
                                                            fontSize: 85,
                                                            marginTop: 60,
                                                        }}
                                                    />
                                                </a>
                                                <div style={styles.IconText}>
                                                    <Typography
                                                        style={{
                                                            textAlign: "left",
                                                            "font-size": "20px",
                                                            marginTop: "5vh",
                                                        }}
                                                    >
                                                        {" "}
                                                        Create Flow{" "}
                                                    </Typography>
                                                    <Typography
                                                        style={{
                                                            "font-size": "20px",
                                                            marginLeft: "10vh",
                                                            marginTop: "5vh",
                                                        }}
                                                    >
                                                        {" "}
                                                        Edit Flow{" "}
                                                    </Typography>
                                                </div>
                                              
                                            </Container>
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
                                    Resources{" "}
                                </Typography>
                                <Container style={styles.Resources}>
                                    <Button
                                        style={styles.ResourceButton}
                                        variant="contained"
                                        color="primary"
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
                                </Container>
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
    },

    Flows: {
        marginRight: "5vh",
        backgroundColor: "#FFFFFF",
        height: "35vh",
        width: "60vh",
    },

    Resources: {
        marginLeft: "5vh",
        backgroundColor: "#FFFFFF",
        height: "35vh",
        width: "100vh",
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

    leftBlock: {
        paddingRight: 10,
        // flexGrow: 1,
    },

    rightBlock: {
        // flex : 2,
    },

    acName: {
        color: "inherit",
        float: "right",
    },

    mainBody: {
        backgroundColor: "#C4C4C4",
    },

    menuList: {
        float: "right",
    },
};

export default Home;
