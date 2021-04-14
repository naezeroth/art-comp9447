// ES6+ example
require("dotenv").config({ path: "../.env" });
const {
    EC2Client,
    DescribeInstancesCommand,
    StopInstancesCommand,
    ApplySecurityGroupsToClientVpnTargetNetworkCommand,
    CreateFleetCommand,
    CreateInstanceExportTaskCommand,
    DeleteSecurityGroupCommand,
    DescribeAccountAttributesCommand,
    DescribeIamInstanceProfileAssociationsCommand,
    DescribeInstanceAttributeCommand,
    DescribeInstanceStatusCommand,
    DescribeSecurityGroupsCommand,
    ModifyInstanceAttributeCommand,
    ModifyInstanceMetadataOptionsCommand,
    MonitorInstancesCommand,
    RebootInstancesCommand,
    RunInstancesCommand,
    StartInstancesCommand,
    TerminateInstancesCommand,
    UpdateSecurityGroupRuleDescriptionsEgressCommand,
} = require("@aws-sdk/client-ec2");

const {
    IAMClient, 
    DeleteLoginProfileCommand,
    ListAccessKeysCommand,
    DeleteAccessKeyCommand,
    ListSigningCertificatesCommand,
    DeleteSigningCertificateCommand,
    ListSSHPublicKeysCommand,
    DeleteSSHPublicKeyCommand,
    ListServiceSpecificCredentialsCommand,
    DeleteServiceSpecificCredentialCommand,
    ListMFADevicesCommand,
    DeactivateMFADeviceCommand,
    DeleteVirtualMFADeviceCommand,
    ListUserPoliciesCommand,
    DeleteUserPolicyCommand,
    ListAttachedUserPoliciesCommand,
    DetachUserPolicyCommand,
    ListGroupsForUserCommand,
    RemoveUserFromGroupCommand,
    DeleteUserCommand,
} = require("@aws=sdk/client-iam");


const { WebClient } = require("@slack/web-api");

const AWSClientService = () => {
    const ec2Client = new EC2Client({ region: "ap-southeast-2" });
    const iamClient = new IAMClient({ region: "ap-southeast-2" });

    const stopInstance = async (instanceIds) => {
        try {
            console.log("Stop command");
            const data = await ec2Client.send(
                new StopInstancesCommand({ InstanceIds: instanceIds })
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const sendMessage = async (msg) => {
        console.log(process.env.SLACK_TOKEN);
        const web = new WebClient(process.env.SLACK_TOKEN);
        try {
            await web.chat.postMessage({
                channel: "bot-log",
                blocks: [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "You have a new ALERT!:\n*<fakeLink.toEmployeeProfile.com|" + msg["description"] + ">*"
                        }
                    },
                    {
                        "type": "section",
                        "fields": [
                            {
                                "type": "mrkdwn",
                                "text": "*Type:*\nTEXT HOLDER FOR TYPE"
                            },
                            {
                                "type": "mrkdwn",
                                "text": "*Updated At:*\n" + msg["updatedAt"]
                            },
                            {
                                "type": "mrkdwn",
                                "text": "*severity:*\n" + msg["severity"]
                            },
                            {
                                "type": "mrkdwn",
                                "text": "*Reason:*\n" + msg["description"]
                            },
                            {
                                "type": "mrkdwn",
                                "text": "*Remediation:*\n" + msg["remediation"]
                            }
                        ]
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "emoji": true,
                                    "text": "Approve"
                                },
                                "style": "primary",
                                "value": "click_me_123"
                            },
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "emoji": true,
                                    "text": "Deny"
                                },
                                "style": "danger",
                                "value": "click_me_123"
                            }
                        ]
                    }
                ]
            });
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const testSlack = async () => {
        console.log(process.env.SLACK_TOKEN);
        const web = new WebClient(process.env.SLACK_TOKEN);
        (async () => {
            const test = await web.auth.test();

            console.log("Done!" + JSON.stringify(test));
        })();
    };
    const applySecurityGroupToTarget = async (args) => {
        try {
            console.log("Applying Security Groups");
            const data = await ec2Client.send(
                new ApplySecurityGroupsToClientVpnTargetNetworkCommand(args)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const createFleet = async (arguments) => {
        try {
            console.log("Creating EC2 fleet instance(s)");
            const data = await ec2Client.send(
                new CreateFleetCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const exportInstance = async (arguments) => {
        try {
            console.log("Exporting EC2 instance");
            const data = await ec2Client.send(
                new CreateInstanceExportTaskCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const deleteSecurityGroup = async (arguments) => {
        try {
            console.log("Deleting Security Group");
            const data = await ec2Client.send(
                new DeleteSecurityGroupCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const getAccAttributes = async (arguments) => {
        try {
            console.log("Getting account attributes");
            const data = await ec2Client.send(
                new DescribeAccountAttributesCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const getAccAssociations = async (arguments) => {
        try {
            console.log("Getting Account Associations");
            const data = await ec2Client.send(
                new DescribeIamInstanceProfileAssociationsCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const getInstAttribute = async (arguments) => {
        try {
            console.log("Getting attribute of instance");
            const data = await ec2Client.send(
                new DescribeInstanceAttributeCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const getInstInfo = async (arguments) => {
        try {
            console.log("Getting information on instance(s)");
            const data = await ec2Client.send(
                new DescribeInstancesCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const getInstStatus = async (arguments) => {
        try {
            console.log("Getting status of instance");
            const data = await ec2Client.send(
                new DescribeInstanceStatusCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const getSecurityGroupInfo = async (arguments) => {
        try {
            console.log("Getting security group information");
            const data = await ec2Client.send(
                new DescribeSecurityGroupsCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const setInstAttribute = async (arguments) => {
        try {
            console.log("Setting the attribute of an instance");
            const data = await ec2Client.send(
                new ModifyInstanceAttributeCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const setInstMetadata = async (arguments) => {
        try {
            console.log("Setting instance metadata");
            const data = await ec2Client.send(
                new ModifyInstanceMetadataOptionsCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const setInstMonitorLevel = async (arguments) => {
        try {
            console.log("Setting level of monitoring");
            const data = await ec2Client.send(
                new MonitorInstancesCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const rebootInst = async (arguments) => {
        try {
            console.log("Rebooting instance");
            const data = await ec2Client.send(
                new RebootInstancesCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const runInst = async (arguments) => {
        try {
            console.log("Running a specified instance");
            const data = await ec2Client.send(
                new RunInstancesCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const startEBSInst = async (arguments) => {
        try {
            console.log("Starting EBS EC2 Instance");
            const data = await ec2Client.send(
                new StartInstancesCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const stopEBSInst = async (arguments) => {
        try {
            console.log("Stopping EBS EC2 instance(s)");
            const data = await ec2Client.send(
                new StopInstancesCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const terminateEBSInst = async (arguments) => {
        try {
            console.log("Terminating EBS EC2 instance(s)");
            const data = await ec2Client.send(
                new TerminateInstancesCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };
    const setSecurityGroupDesc = async (arguments) => {
        try {
            console.log("Setting Security Group descriptions");
            const data = await ec2Client.send(
                new UpdateSecurityGroupRuleDescriptionsEgressCommand(arguments)
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    };

    const hardRemoveUser = async (arguments) => {
        // arguments:
            // username: username

        try {
            console.log("Deleting user");

            // 1. Delete password
            const data = await iamClient.send(
                new DeleteLoginProfileCommand(arguments.username)
            );
            // 2. list keys and delete them all
            const keys = await iamClient.send(
                new ListAccessKeysCommand(arguments.username)
            );
            for(let i=0; i < keys.length; i++){
                data = await iamClient.send(
                    new DeleteAccessKeyCommand(keys[i], arguments.username)
                );
            }
            // 3. Delete signing certificate
            keys = await iamClient.send(
                new ListSigningCertificatesCommand(arguments.username)
            );
            for(let i=0; i < keys.length; i++){
                data = await iamClient.send(
                    new DeleteSigningCertificateCommand(keys[i], arguments.username)
                );
            }
            // 4. Delete ssh keys
            keys = await iamClient.send(
                new ListSSHPublicKeysCommand(arguments.username)
            );
            for(let i=0; i < keys.length; i++){
                data = await iamClient.send(
                    new DeleteSSHPublicKeyCommand(keys[i], arguments.username)
                );
            }
            // 5. Delete git credentials
            keys = await iamClient.send(
                new ListServiceSpecificCredentialsCommand(arguments.username)
            );
            for(let i=0; i < keys.length; i++){
                data = await iamClient.send(
                    new DeleteServiceSpecificCredentialCommand(keys[i], arguments.username)
                );
            }
            // 6. deactivate MFA devices
            keys = await iamClient.send(
                new ListMFADevicesCommand(arguments.username)
            );
            for(let i=0; i < keys.length; i++){
                data = await iamClient.send(
                    new DeactivateMFADeviceCommand(keys[i], arguments.username)
                );
                data = await iamClient.send(
                    new DeleteVirtualMFADeviceCommand(keys[i])
                );
            }
            // 7. Delete inline policies
            keys = await iamClient.send(
                new ListUserPoliciesCommand(arguments.username)
            );
            for(let i=0; i < keys.length; i++){
                data = await iamClient.send(
                    new DeleteUserPolicyCommand(keys[i], arguments.username)
                );
            }
            // 8. Detach policies
            keys = await iamClient.send(
                new ListAttachedUserPoliciesCommand(arguments.username)
            );
            for(let i=0; i < keys.length; i++){
                data = await iamClient.send(
                    new DetachUserPolicyCommand(keys[i], arguments.username)
                );
            }
            // 9. remove user from groups
            keys = await iamClient.send(
                new ListGroupsForUserCommand(arguments.username)
            );
            for(let i=0; i < keys.length; i++){
                data = await iamClient.send(
                    new RemoveUserFromGroupCommand(keys[i], arguments.username)
                );
            }
            // 10. delete user
            data = await iamClient.send(
                new DeleteUserCommand(arguments.username)
            );

            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    }



    //Dictionary or list
    const functionToDict = {
        "Stop Instances": stopInstance,
        "Apply Security Groups To Client Vpn Target Network": applySecurityGroupToTarget,
        "Create a fleet of EC2 instance(s)": createFleet,
        "Export EC2 instance to S3 Bucket": exportInstance,
        "Delete a security group asociated with an instance": deleteSecurityGroup,
        "Get the attributes of the AWS account": getAccAttributes,
        "Get the profile associations of the IAM instance": getAccAssociations,
        "Get the specific attribute of an instance": getInstAttribute,
        "Get information on the specified instance(s)": getInstInfo,
        "Get status of a specified instance": getInstStatus,
        "Get security group info given a instance": getSecurityGroupInfo,
        "Set the attribute of a given instance": setInstAttribute,
        "Set the metadata of a given instance": setInstMetadata,
        "Set the level of monitoring for an instance": setInstMonitorLevel,
        "Reboot a given instance": rebootInst,
        "Run a given instance": runInst,
        "Start a given EBS instance": startEBSInst,
        "Stop a given EBS instance": stopEBSInst,
        "Terminate given EBS instance(s)": terminateEBSInst,
        "Set the security group descriptions": setSecurityGroupDesc,
        Debug: (var1, var2) => console.log("hello", var1, var2),
        "Send Message to Slack": sendMessage,
        "Test Slack": testSlack,
        "Delete user": hardRemoveUser,
    };

    return functionToDict;
};

exports.AWSClientService = AWSClientService;
