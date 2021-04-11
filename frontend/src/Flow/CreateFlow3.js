import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import "../Overview.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import ButtonAppBar from "../buttonAppBar";
import BuildIcon from "@material-ui/icons/Build";
import { NativeSelect } from "@material-ui/core";
import DragList from "./DraggableList";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 400,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function CreateFlow3(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({ actions: props.defaultVals.actions });

    const handleChange = (event) => {
        console.log(event);
        const currentState = state.actions;
        // Prevents doubling up of actions
        if (!currentState.includes(event.target.value)) {
            currentState.push(event.target.value);
        }
        setState({
            actions: currentState,
        });
    };

    const handleSubmit = () => {
        // Test if all fields populated correctly
        if (state.actions === []) {
            alert("Please fill out actions");
            return;
        }
        console.log("HERERERERE")
        props.onSubmit(state);
        // props.setState("Done");
        
    };

    return (
        <div>
            <div>
                <ButtonAppBar />
            </div>
            <div style={styles.dropDown}>
                <ul class="navBar">
                    <li>
                        <a href="./">Home</a>
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
                Add a new Flow:
            </Typography>
            <Container style={styles.container}>
                <Typography
                    style={{
                        textAlign: "center",
                        fontFamily: "sans-serif",
                        fontSize: "35px",
                    }}
                >
                    List of Actions
                </Typography>
                <div style={{ alignItems: "center", marginTop: "15vh" }}>
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            htmlFor="findingtype-native-helper"
                            style={{ fontSize: "20px" }}
                        >
                            Selected Action
                        </InputLabel>
                        <NativeSelect
                            value={state.actions}
                            multiple={true}
                            onChange={handleChange}
                            inputProps={{
                                name: "actions",
                            }}
                        >
                            <option aria-label="None" value="" />
                            {props.commands.map((command) => (
                                <option key={command} value={command}>
                                    {command}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                    <Typography
                        style={{
                            textAlign: "center",
                            fontFamily: "sans-serif",
                            fontSize: "20px",
                            marginLeft: "18vh",
                            marginTop: "4vh",
                        }}
                    >
                        Selected Actions :
                        <div>
                            <DragList pActions={state} />
                        </div>
                    </Typography>
                </div>
                <div>
                    <IconButton style={{ textAlign: "center" }}>
                        <BuildIcon>Configure</BuildIcon>
                    </IconButton>
                </div>{" "}
                <div>
                    <Button
                        onClick={handleSubmit}
                        style={{
                            marginTop: "10vh",
                            backgroundColor: "#F9B15D",
                        }}
                    >
                        Continue
                    </Button>
                </div>
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

    selectedRem: {
        textAlign: "center",
    },
};
