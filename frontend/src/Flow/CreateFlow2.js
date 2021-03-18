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

export default function CreateFlow2(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({findingType: '', confidence: ''});

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

// used to pass state to parent component
  React.useEffect(() => {
    if (props.onChange) {
      props.onChange(state)
    }
  }, [state.findingType, state.confidence])

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
      <Typography style={{textAlign:'left',fontFamily:'sans-serif',fontSize:'25px',marginLeft:'18vh',marginTop:'4vh'}}>Add a new Flow:</Typography>
      <Container style={styles.container}>
          <Typography style={{textAlign:'center',fontFamily:'sans-serif',fontSize:'35px'}}>Finding Type</Typography>
          <div style={{ alignItems: "center", marginTop: "15vh" }}>
          <FormControl className={classes.formControl} >
            <InputLabel htmlFor="findingType-native-helper" style={{fontSize: '20px'}}>
              Finding Type
            </InputLabel>
            <NativeSelect
              value={state.findingType}
              onChange={handleChange}
              inputProps={{
                name: "findingType",
              }}
            >
              <option aria-label="None" value="" />
              <option value={1}>Backdoor:EC2/C&CActivity.B</option>
              <option value={2}>Backdoor:EC2/DenialOfService.Udp</option>
              <option value={3}>Recon:EC2/PortProbeEMRUnprotectedPort</option>
              <option value={4}>Trojan:EC2/PhishingDomainRequest!DNS</option>
              <option value={5}>CryptoCurrency:EC2/BitcoinTool.B</option>

            </NativeSelect>
          </FormControl>
          </div>
          <div style={{ alignItems: "center", marginTop: "10vh" }}>
          <FormControl className={classes.formControl} >
            <InputLabel htmlFor="findingType-native-helper" style={{fontSize: '20px'}}>
              Only after 'X' confidence?
            </InputLabel>
            <NativeSelect
              value={state.confidence}
              onChange={handleChange}
              inputProps={{
                name: "confidence",
              }}
            >
              <option aria-label="None" value="" />
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </NativeSelect>
          </FormControl>

        </div>
        <Button onClick={event =>  props.setState("CreateFlow3")} style={{marginTop:'20vh', backgroundColor:"#F9B15D"}}>Continue </Button>
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