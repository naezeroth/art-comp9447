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
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DragList from './DraggableList';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';



const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 400,
        margin: "dense",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function CreateFlow3(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({ actions: [] });
    // console.log("inside createflow3", props);

    const handleChange = (event) => {
        console.log(event);
        const currentState = state.actions;
        // Prevents doubling up of actions
        if(!currentState.includes(event.target.value)){
            currentState.push(event.target.value);
        }
        setState({
            actions: currentState,
        });
    };

    const removeAction = (name) => {
        const currentState = state.actions;
        const index = currentState.indexOf(name);
        currentState.splice(index, 1);

        setState({
            actions: currentState,
        });
    };

    const moveUp = (name) => {
        const currentState = state.actions;
        const index = currentState.indexOf(name);
        if(index > 0 && currentState.length > 1){
            const temp = currentState[index-1];
            currentState[index-1] = name;
            currentState[index] = temp;
        }

        setState({
            actions: currentState,
        });
    }

    const moveDown = (name) => {
        const currentState = state.actions;
        const index = currentState.indexOf(name);
        if(index >= 0 && currentState.length > 1 && index < (currentState.length)-1){
            const temp = currentState[index+1];
            currentState[index+1] = name;
            currentState[index] = temp;
        }

        setState({
            actions: currentState,
        });
    }


    // used to pass state to parent component
    React.useEffect(() => {
        // console.log("state.actions", state.actions);
        if (props.onChange) {
            props.onChange(state);
        }
    }, [state.actions]);

    const handleSubmit = () => {
        props.setState("Done");
        props.onSubmit();
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
            {/* <Typography
                style={{
                    textAlign: "left",
                    fontFamily: "sans-serif",
                    fontSize: "25px",
                    marginLeft: "18vh",
                    marginTop: "4vh",
                }}
            >
                Add a new Flow:
            </Typography> */}
            <Container style={styles.flowCard}>
            <Card variant="filled" style={{backgroundColor: "#C4C4C4",borderRadius: 10, paddingBottom: 25}}>
            <CardHeader style={{color: "white", backgroundColor:"#4D4D4D" ,borderRadius: 10, }}
            title="Select an Action/(s)"
            />   
                {/* <Typography
                    style={{
                        textAlign: "center",
                        fontFamily: "sans-serif",
                        fontSize: "35px",
                    }}
                >
                    List of Actions
                </Typography> */}
                <div style={{ alignItems: "center", marginTop: "15vh" }}>
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            htmlFor="findingtype-native-helper"
                            style={{ fontSize: "20px"}}
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
                            marginTop: "10vh",
                        }}
                    >
                        Selected Actions :
                        <div>
                            <DragList pActions={state}/>
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
                        style={{
                            marginTop: "10vh",
                            backgroundColor: "#F9B15D",
                            borderRadius: 10,
                             padding: 20,
                        }}
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

    selectedRem:{
        textAlign: "center",
    },
    containerS: {
        backgroundColor: "#C4C4C4",
        Bottom: 0,
        height: "100%"
    },
    
    flowCard: {
        marginTop: "7%",
        },
};
