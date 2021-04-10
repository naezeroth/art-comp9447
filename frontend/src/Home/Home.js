import React, { Component , useState, useEffect }from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "../Overview.css";
import ButtonAppBar from "../buttonAppBar";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function EditFlow1 (props) {
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
            flow: []
        }
    }
        componentDidMount() {
            fetch(' http://localhost:1337/api/display-flows') //the api to hit request
            .then((response) => { console.log("we've fetched", response); return response.json()})
            .then((response) => {
                console.log(response);
                const flow = response.flows.map((flows) => ({
                    id: flows.id,
                    name: flows.name,
                    resourceName: flows.resourceName,
                    findingType: flows.findingType,
                    createdAt: flows.createdAt

                }));
                // console.log(response);
                this.setState({
                    flow: flow
                });
            })
                
        
    }
    
    render() 
    {
        console.log("this is current state",this.state)
        return (
            <div>
                <div>
                    <ButtonAppBar />
                </div>
                <div style={styles.dropDown}>
                    <ul className="navBar">
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
                <Container disableGutters = {true} maxWidth={false}>
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
                                        fontSize : "40px",
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

                                        <Grid item xl={5}>
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
                                                            fontSize: 45,
                                                            marginLeft: "28vw",
                                                            marginTop: 10,
                                                        }}
                                                    />
                                            </a>
                                                <ul>
                                                     {
                                                     this.state.flow.map((eachFlow) => {
                                                         console.log(eachFlow)
                                                         let url = "./EditFlow/"+eachFlow.id
                                                     return <ul key={eachFlow.id}>{eachFlow.name}&nbsp;{eachFlow.resourceName}&nbsp;{eachFlow.findingType}&nbsp;<a href={url}>
                                                     <EditIcon
                                                         style={{
                                                             color: "#0A4A74",
                                                             fontSize: 45,
                                                             marginTop: 60,
                                                         }}
                                                     />
                                                 </a></ul>
                                                     })
                                                     }
                                                 </ul>
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
