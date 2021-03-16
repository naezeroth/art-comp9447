import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Demo from "./ec2Table"
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  titleText:{
    color: "#12293B",
    variant: "subtitle1",
  },
  root: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  theTab:{
    color:"white",
    backgroundColor:"#12293B",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function CSSGrid() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Typography className={classes.titleText}  style={{"font-size":"40px"}} gutterBottom>
        Home
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper className={classes.paperL}>
            <div className={classes.root}>
              <AppBar position="static" className={classes.theTab}>
              </AppBar>
              <TabPanel value={value} index={0}>
                Current Alerts!<Demo/> Resources <Demo/>
              </TabPanel>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paperR}>Flows</Paper>
        </Grid>
      </Grid>
    </div>
  );
}