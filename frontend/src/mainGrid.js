import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paperL: {
    padding: theme.spacing(20),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(0),
  },
  paperR: {
    padding: theme.spacing(20),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(4),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  titleText:{
      color: "#12293B",
      variant: "subtitle1",
  }
}));

export default function CSSGrid() {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.titleText}  gutterBottom>
        Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper className={classes.paperL}>Visual representations of protections</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paperR}>Remediations</Paper>
        </Grid>
      </Grid>
    </div>
  );
}