import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "../Overview.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import ButtonAppBar from "../buttonAppBar";
import { NativeSelect } from "@material-ui/core";
import DragList from "./DraggableList";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';


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
        <div style={styles.containerS}>
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
            <Container style={styles.flowCard}>
            <Card variant="filled" style={{backgroundColor: "white",borderRadius: 10, paddingBottom: 25}}>
            <CardHeader style={{color: "white", backgroundColor:"#084B74" ,borderRadius: 10,margin: 2 }}
            title="Step 3 : Select an Action/(s)"
            />   
                <div style={{ alignItems: "center", marginTop: "15vh" }}>
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            htmlFor="findingtype-native-helper"
                            style={{ fontSize: "20px"}}
                        >
                            List of Actions
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
                            marginTop: "10vh",
                        }}
                    >
                        Selected Actions :
                        <div>
                            <DragList pActions={state} />
                        </div>
                    </Typography>
                </div>
                
                {/* <div>
                    <IconButton style={{ textAlign: "center" }}>
                        <BuildIcon>Configure</BuildIcon>
                    </IconButton>
                </div>{" "} */}
                <div>
                    <Button
                        onClick={handleSubmit}
                        style={{ marginTop: "10vh", backgroundColor: "#F9B15D", padding: 10, width: 150}}

                    >
                        Continue
                    </Button>
                </div>
                </Card>
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
    containerS: {
        backgroundColor: "#C4C4C4",
        height: "100%"
    },
    
    flowCard: {
        marginTop: "7%",
        paddingBottom: 100
        },
};
