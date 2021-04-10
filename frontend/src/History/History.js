import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "../Overview.css";
import ButtonAppBar from "../buttonAppBar";
import Paper from "@material-ui/core/Paper";
import HisTable from "./HistoryTable";

class History extends Component {
    // constructor(props){
    //     super(props);
    //     this.requestLog();
    //     this.state = {logData : undefined};
    // }



    render() {
        return (
            <div>
                <div>
                    <ButtonAppBar />
                </div>
                <div>
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
                            <a href="./History">History</a>
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
                                    style={{ "font-size": "40px" , "color": "#12293B"}}
                                    gutterBottom
                                >
                                    History
                                </Typography>
                                <Paper style={styles.paper}>
                                    <HisTable data={this.state}/>


                                </Paper>
                            </Typography>
                        </Container>
                    </Typography>
                </Container>
            </div>
        );
    }
}

const styles = {
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

    paper:{
        padding: 5,
        textAlign: "center",
        whiteSpace: "nowrap",
        marginBottom: 5,
        marginLeft: 60,
        marginRight: 60,
    },
};

export default History;
