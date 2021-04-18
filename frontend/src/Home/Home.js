import React, { Component, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "../Overview.css";
import ButtonAppBar from "../buttonAppBar";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

function EditFlow1(props) {
    const [state, setState] = useState({ id: "", resourceName: "" });

    const handleChange = (event) => {
        const id = event.target.id;
        setState({
            ...state,
            [id]: event.target.value,
        });
    };
    React.useEffect(() => {
        if (props.onChange) {
            console.log("inside useEffect createFlow1", state);
            props.onChange(state);
        }
    }, [state.id, state.resourceName]);
}
class Home extends Component {
    constructor() {
        super();

        this.state = {
            flow: [],
        };
    }
    componentDidMount() {
        fetch(`${window.location.protocol}//${window.location.hostname}:1337/api/display-flows`) //the api to hit request
            .then((response) => {
                console.log("we've fetched", response);
                return response.json();
            })
            .then((response) => {
                console.log(response);
                const flow = response.flows.map((flows) => ({
                    id: flows.id,
                    name: flows.name,
                    resourceName: flows.resourceName,
                    findingType: flows.findingType,
                    createdAt: flows.createdAt,
                }));
                // console.log(response);
                this.setState({
                    flow: flow,
                });
            });
    }

    render() {
        console.log("this is current state", this.state);
        return (
            <div>
                <div>
                    <ButtonAppBar />
                </div>
                <div style={styles.dropDown}>
                    <ul className="navBar">
                        <li>
                            <a
                                style={{ backgroundColor: "#F9B15D" }}
                                href="./Home"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="./Overview">Overview</a>
                        </li>
                        <li>
                            <a href="./History">History</a>
                        </li>
                    </ul>
                </div>
                <Container disableGutters={true} maxWidth={false}>
                    <Typography
                        component="div"
                        style={{
                            backgroundColor: "#C4C4C4",
                            height: "100vh",
                            paddingTop: 100,
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
                                    <Card style={styles.currentAlerts}>
                                        <CardHeader
                                            style={{
                                                color: "white",
                                                backgroundColor: "#12293B",
                                                borderRadius: 10,
                                                margin: 2,
                                            }}
                                            title="Current Alerts"
                                        />
                                    </Card>
                                </Grid>
                                <Grid item xl={5}>
                                    <Card style={styles.Flows}>
                                        <CardHeader
                                            style={{
                                                color: "white",
                                                backgroundColor: "#12293B",
                                                borderRadius: 10,
                                                margin: 2,
                                            }}
                                            title="Flows"
                                        />
                                        {/* <Container style={styles.Flows}> */}
                                        <Typography
                                            style={{
                                                textAlign: "left",
                                                paddingLeft: 10,
                                                fontSize: 20,
                                                fontWeight: "bold",
                                                marginTop: 30,
                                            }}
                                        >
                                            {" "}
                                            Add a Flow :{" "}
                                        </Typography>
                                        <a href="./WorkFlow">
                                            <AddCircleIcon
                                                style={{
                                                    color: "#0A4A74",
                                                    fontSize: 75,
                                                    marginLeft: "85%",
                                                    marginTop: -50,
                                                    marginBottom: 10,
                                                }}
                                            />
                                        </a>
                                        <Typography
                                            style={{
                                                textAlign: "left",
                                                paddingLeft: 10,
                                                fontSize: 20,
                                                fontWeight: "bold",
                                                marginTop: 25,
                                            }}
                                        >
                                            {" "}
                                            Current Flows :{" "}
                                        </Typography>
                                        <ul>
                                            {this.state.flow.map((eachFlow) => {
                                                console.log(eachFlow);
                                                let url =
                                                    "./EditFlow/" + eachFlow.id;
                                                return (
                                                    <ul key={eachFlow.id}>
                                                        {eachFlow.name}&nbsp;
                                                        {eachFlow.resourceName}
                                                        &nbsp;
                                                        {eachFlow.findingType}
                                                        &nbsp;
                                                        <a href={url}>
                                                            <EditIcon
                                                                style={{
                                                                    color:
                                                                        "#0A4A74",
                                                                    fontSize: 20,
                                                                    marginTop: 25,
                                                                }}
                                                            />
                                                        </a>
                                                    </ul>
                                                );
                                            })}
                                        </ul>
                                        {/* </Container> */}
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Card style={styles.Resources}>
                            <CardHeader
                                style={{
                                    color: "white",
                                    backgroundColor: "#12293B",
                                    borderRadius: 10,
                                    margin: 2,
                                }}
                                title="Resources"
                            />
                            <Button
                                style={styles.ResourceButton}
                                variant="contained"
                                color="primary"
                                onClick={(event) =>
                                    (window.location.href = "../Overview")
                                }
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
            </div>
        );
    }
}

const styles = {
    currentAlerts: {
        marginLeft: "10vh",
        backgroundColor: "#FFFFFF",
        height: "35vh",
        width: "100vh",
        borderRadius: 10,
        position: "relative",
    },

    Flows: {
        marginLeft: "5%",
        backgroundColor: "#FFFFFF",
        height: "35vh",
        width: "60vh",
        borderRadius: 10,
        overflowY: "scroll",
        "white-space": "nowrap",
    },

    Resources: {
        marginLeft: "10vh",
        backgroundColor: "#FFFFFF",
        height: "40%",
        width: "100vh",
        borderRadius: 10,
        marginTop: "10vh",
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
