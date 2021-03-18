import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Demo from "./ec2Table";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridGap: theme.spacing(3),
    },
    paperL: {
        padding: theme.spacing(5),
        textAlign: "center",
        color: theme.palette.text.secondary,
        whiteSpace: "nowrap",
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(0),
    },
    paperR: {
        padding: theme.spacing(5),
        textAlign: "center",
        color: theme.palette.text.secondary,
        whiteSpace: "nowrap",
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(4),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    titleText: {
        color: "#12293B",
        variant: "subtitle1",
    },
    root: {
        flexGrow: 1,
        backgroundColor: "white",
    },
    theTab: {
        color: "white",
        backgroundColor: "#12293B",
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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
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
            <Typography
                className={classes.titleText}
                style={{ "font-size": "40px" }}
                gutterBottom
            >
                Overview
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper className={classes.paperL}>
                        <div className={classes.root}>
                            <AppBar
                                position="static"
                                className={classes.theTab}
                            >
                                <Tabs value={value} onChange={handleChange}>
                                    <Tab
                                        label="EC2 Instances"
                                        {...a11yProps(0)}
                                    />
                                    <Tab label="S3 Buckets" {...a11yProps(1)} />
                                    <Tab
                                        label="IAM Roles"
                                        disabled
                                        {...a11yProps(2)}
                                    />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0}>
                                Priority
                                <Demo />
                                All Instances
                                <Demo />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                S3 instance data
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paperR}>Remediations</Paper>
                </Grid>
            </Grid>
        </div>
    );
}
