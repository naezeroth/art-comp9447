import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "../Overview.css";
import ButtonAppBar from "../buttonAppBar";
import CSSGrid from "../mainGrid";

class Overview extends Component {
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
                            <a style={{backgroundColor: "#F9B15D",}} href="./Overview">Overview</a>
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
                                <CSSGrid />
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
};

export default Overview;
