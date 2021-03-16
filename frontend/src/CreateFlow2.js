import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "./Overview.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ButtonAppBar from "./buttonAppBar";

import { alignPropType } from "react-bootstrap/esm/DropdownMenu";
import { NativeSelect } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
    margin: 'dense',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CreateFlow2() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    findingtype: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
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
      <Typography style={{textAlign:'left',fontFamily:'sans-serif',fontSize:'25px',marginLeft:'18vh',marginTop:'4vh'}}>Add a new Flow:</Typography>
      <Container style={styles.container}>
          <Typography style={{textAlign:'center',fontFamily:'sans-serif',fontSize:'35px'}}>Finding Type</Typography>
          <div style={{ alignItems: "center", marginTop: "15vh" }}>
          <FormControl className={classes.formControl} >
            <InputLabel htmlFor="findingtype-native-helper" style={{fontSize: '20px'}}>
              Finding Type
            </InputLabel>
            <NativeSelect
              value={state.findingtype}
              onChange={handleChange}
              inputProps={{
                name: "findingtype",
              }}
            >
              <option aria-label="None" value="" />
              <option value={10}>Option1</option>
              <option value={20}>Option2</option>
              <option value={30}>Option3</option>
            </NativeSelect>
          </FormControl>
          </div>
          <div style={{ alignItems: "center", marginTop: "10vh" }}>
          <FormControl className={classes.formControl} >
            <InputLabel htmlFor="findingtype-native-helper" style={{fontSize: '20px'}}>
              Only after 'X' confidence?
            </InputLabel>
            <NativeSelect
              value={state.findingtype}
              onChange={handleChange}
              inputProps={{
                name: "findingtype",
              }}
            >
              <option aria-label="None" value="" />
              <option value={10}>Option1</option>
              <option value={20}>Option2</option>
              <option value={30}>Option3</option>
            </NativeSelect>
          </FormControl>

        </div>
        <Button style={{marginTop:'20vh', backgroundColor:"#FF9900"}}>Continue </Button>
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