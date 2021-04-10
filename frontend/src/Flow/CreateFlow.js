import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "../Overview.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import ButtonAppBar from "../buttonAppBar";

import { NativeSelect } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 400,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function CreateFlow1(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        name: props.defaultVals.name,
        resourceName: props.defaultVals.resourceName,
        context: props.defaultVals.context,
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const onSubmit = () => {
        // Test if all fields populated correctly
        if (state.name === "" || state.resourceName === "") {
            alert("Please fill out name and resource");
            return;
        }
        props.setState("CreateFlow2");
        props.onChange(state);
    };

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
            <Typography
                style={{
                    textAlign: "left",
                    fontFamily: "sans-serif",
                    fontSize: "25px",
                    marginLeft: "18vh",
                    marginTop: "4vh",
                }}
            >
                Create a Flow:
            </Typography>
            <Container style={styles.container}>
                <Typography
                    style={{
                        textAlign: "center",
                        fontFamily: "sans-serif",
                        fontSize: "35px",
                    }}
                >
                    Select resource
                </Typography>

                <TextField
                    value={state.name}
                    onChange={handleChange}
                    inputProps={{
                        name: "name",
                    }}
                    style={{
                        minWidth: 400,
                        margin: "dense",
                        marginTop: "10vh",
                    }}
                    id="standard-helperText"
                    label="Name"
                    helperText="Enter a name for your flow"
                />
                <div style={{ alignItems: "center", marginTop: "10vh" }}>
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            htmlFor="resourceName-native-helper"
                            style={{ fontSize: "20px" }}
                        >
                            Resource
                        </InputLabel>
                        <NativeSelect
                            value={state.resourceName}
                            onChange={handleChange}
                            inputProps={{
                                name: "resourceName",
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={"EC2"}>EC2</option>
                            <option value={"IAM"}>IAM</option>
                            <option value={"S3"}>S3</option>
                        </NativeSelect>

                        <FormHelperText>
                            Select the resource name
                        </FormHelperText>
                    </FormControl>
                </div>
                <TextField
                    value={state.context}
                    onChange={handleChange}
                    inputProps={{
                        name: "context",
                    }}
                    style={{
                        minWidth: 400,
                        margin: "dense",
                        marginTop: "10vh",
                    }}
                    id="standard-new-helperText"
                    label="Context"
                    helperText="Enter any tags you would like this flow to be associated with"
                />
                <Button
                    onClick={onSubmit}
                    style={{ marginTop: "20vh", backgroundColor: "#F9B15D" }}
                >
                    {" "}
                    Continue{" "}
                </Button>
            </Container>
        </div>
    );
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

    container: {
        backgroundColor: "#C4C4C4",
        height: "70vh",
        width: "200vh",
    },
};
