import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import ButtonAppBar from "../buttonAppBar";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import { Hidden, NativeSelect } from "@material-ui/core";
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
        <div style={styles.containerS}>
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
            <Container>
            <Container style={styles.flowCard}>
            <Card variant="filled" style={{backgroundColor: "white",borderRadius: 10, paddingBottom: 25,}}>
            <CardHeader style={{color: "white",fontWeight: 'bold', backgroundColor:"#084B74" ,borderRadius: 10,margin: 4 }}
            title="Step 1 : Create a Flow"
            />                                                   
                <TextField
                    asterisk
                    value={state.name}
                    onChange={handleChange}
                    inputProps={{
                        name: "name",
                    }}
                    style={{
                        minWidth: 400,
                        margin: "dense",
                        marginTop: "10vh",
                        fontSize: "20px",
                    }}
                    id="standard-helperText"
                    label="Name"
                    variant="filled"
                    helperText="Enter a name for your flow"
                    // color="secondary
                />
                <div style={{ marginTop: "10vh" }}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel
                            variant="filled"
                            htmlFor="resourceName-native-helper">
                            Resource
                        </InputLabel>
                        <NativeSelect
                            variant="filled"
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
                <div style={{ marginTop: "10vh" }}>
                <TextField
                    variant="filled"
                    value={state.context}
                    onChange={handleChange}
                    inputProps={{
                        name: "context",
                    }}
                    style={{
                        minWidth: 400,
                        margin: "dense",
                    }}
                    id="standard-new-helperText"
                    label="Context"
                    helperText="Enter any tags you would like this flow to be associated with"
                />
                </div>
                <Button
                    onClick={onSubmit}
                    style={{ marginTop: "10vh", backgroundColor: "#F9B15D", padding: 10, width: 150}}
                >
                    {" "}
                    Continue{" "}
                </Button>
                </Card> 
            </Container>
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

    acName: {
        color: "inherit",
        float: "right",
    },

    menuList: {
        float: "right",
    },

    containerS: {
        backgroundColor: "#C4C4C4",
        height: "100%"
    },
    
    flowCard: {
        marginTop: "10%",
        paddingBottom: 100, 
        },
};