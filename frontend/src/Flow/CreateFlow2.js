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

const guardDutyFindings = [
    "Backdoor:EC2/C&CActivity.B",
    "Backdoor:EC2/C&CActivity.B!DNS",
    "Backdoor:EC2/DenialOfService.Dns",
    "Backdoor:EC2/DenialOfService.Tcp",
    "Backdoor:EC2/DenialOfService.Udp",
    "Backdoor:EC2/DenialOfService.UdpOnTcpPorts",
    "Backdoor:EC2/DenialOfService.UnusualProtocol",
    "Backdoor:EC2/Spambot",
    "Behavior:EC2/NetworkPortUnusual",
    "Behavior:EC2/TrafficVolumeUnusual",
    "CredentialAccess:IAMUser/AnomalousBehavior",
    "CryptoCurrency:EC2/BitcoinTool.B",
    "CryptoCurrency:EC2/BitcoinTool.B!DNS",
    "DefenseEvasion:IAMUser/AnomalousBehavior",
    "Discovery:IAMUser/AnomalousBehavior",
    "Discovery:S3/MaliciousIPCaller",
    "Discovery:S3/MaliciousIPCaller.Custom",
    "Discovery:S3/TorIPCaller",
    "Exfiltration:IAMUser/AnomalousBehavior",
    "Exfiltration:S3/MaliciousIPCaller",
    "Exfiltration:S3/ObjectRead.Unusual",
    "Impact:EC2/AbusedDomainRequest.Reputation",
    "Impact:EC2/BitcoinDomainRequest.Reputation",
    "Impact:EC2/MaliciousDomainRequest.Reputation",
    "Impact:EC2/PortSweep",
    "Impact:EC2/SuspiciousDomainRequest.Reputation",
    "Impact:EC2/WinRMBruteForce",
    "Impact:IAMUser/AnomalousBehavior",
    "Impact:S3/MaliciousIPCaller",
    "InitialAccess:IAMUser/AnomalousBehavior",
    "PenTest:IAMUser/KaliLinux",
    "PenTest:IAMUser/ParrotLinux",
    "PenTest:IAMUser/PentooLinux",
    "PenTest:S3/KaliLinux",
    "PenTest:S3/ParrotLinux",
    "PenTest:S3/PentooLinux",
    "Persistence:IAMUser/AnomalousBehavior",
    "Policy:IAMUser/RootCredentialUsage",
    "Policy:S3/AccountBlockPublicAccessDisabled",
    "Policy:S3/BucketAnonymousAccessGranted",
    "Policy:S3/BucketBlockPublicAccessDisabled",
    "Policy:S3/BucketPublicAccessGranted",
    "PrivilegeEscalation:IAMUser/AnomalousBehavior",
    "Recon:EC2/PortProbeEMRUnprotectedPort",
    "Recon:EC2/PortProbeUnprotectedPort",
    "Recon:EC2/Portscan",
    "Recon:IAMUser/MaliciousIPCaller",
    "Recon:IAMUser/MaliciousIPCaller.Custom",
    "Recon:IAMUser/TorIPCaller",
    "Stealth:IAMUser/CloudTrailLoggingDisabled",
    "Stealth:IAMUser/PasswordPolicyChange",
    "Stealth:S3/ServerAccessLoggingDisabled",
    "Trojan:EC2/BlackholeTraffic",
    "Trojan:EC2/BlackholeTraffic!DNS",
    "Trojan:EC2/DGADomainRequest.B",
    "Trojan:EC2/DGADomainRequest.C!DNS",
    "Trojan:EC2/DNSDataExfiltration",
    "Trojan:EC2/DriveBySourceTraffic!DNS",
    "Trojan:EC2/DropPoint",
    "Trojan:EC2/DropPoint!DNS",
    "Trojan:EC2/PhishingDomainRequest!DNS",
    "UnauthorizedAccess:EC2/MaliciousIPCaller.Custom",
    "UnauthorizedAccess:EC2/MetadataDNSRebind",
    "UnauthorizedAccess:EC2/RDPBruteForce",
    "UnauthorizedAccess:EC2/SSHBruteForce",
    "UnauthorizedAccess:EC2/TorClient",
    "UnauthorizedAccess:EC2/TorRelay",
    "UnauthorizedAccess:IAMUser/ConsoleLoginSuccess.B",
    "UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration",
    "UnauthorizedAccess:IAMUser/MaliciousIPCaller",
    "UnauthorizedAccess:IAMUser/MaliciousIPCaller.Custom",
    "UnauthorizedAccess:IAMUser/TorIPCaller",
    "UnauthorizedAccess:S3/MaliciousIPCaller.Custom",
    "UnauthorizedAccess:S3/TorIPCaller",
];

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 400,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function CreateFlow2(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        findingType: props.defaultVals.findingType,
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
        if (state.findingType === "") {
            alert("Please fill out findingType");
            return;
        }
        props.setState("CreateFlow3");
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
                    Finding Type
                </Typography>
                <div style={{ alignItems: "center", marginTop: "15vh" }}>
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            htmlFor="findingType-native-helper"
                            style={{ fontSize: "20px" }}
                        >
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
                            {guardDutyFindings
                                .filter((finding) => {
                                    return finding.includes(
                                        props.valueState.resourceName
                                    );
                                })
                                .map((finding) => {
                                    return (
                                        <option value={finding}>
                                            {finding}
                                        </option>
                                    );
                                })}
                        </NativeSelect>
                    </FormControl>
                </div>
                <Button
                    onClick={onSubmit}
                    style={{ marginTop: "20vh", backgroundColor: "#F9B15D" }}
                >
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
