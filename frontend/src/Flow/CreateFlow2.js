import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText"
import ButtonAppBar from "../buttonAppBar";
import { NativeSelect } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

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
            <Card variant="filled" style={{backgroundColor: "white",borderRadius: 10, paddingBottom: 25}}>
            <CardHeader style={{color: "white",fontWeight: 'bold', backgroundColor:"#084B74" ,borderRadius: 10,margin: 2 }}
            title="Step 2 : Select Finding Type"
            />                         
                <div style={{marginTop: "15vh" }}>
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            margin='dense'
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
                        <FormHelperText>
                            Select the finding type
                        </FormHelperText>
                    </FormControl>
                </div>
                <Button
                    onClick={onSubmit}
                    style={{ marginTop: "10vh", backgroundColor: "#F9B15D", padding: 10, width: 150}}
                >
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
        height: "100%",
    },

    flowCard: {
        marginTop: "12%",
        
        },
};
