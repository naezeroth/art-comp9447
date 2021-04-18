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
    GetUserCommand,
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
    RemoveUserFromGroupCommand,
    DeleteUserCommand,
    ListGroupsForUserCommand,
    AddUserToGroupCommand,
    GetContextKeysForPrincipalPolicyRequest,
} = require("@aws-sdk/client-iam");

const { S3Client,PutPublicAccessBlockCommand } = require("@aws-sdk/client-s3")

const { WebClient } = require("@slack/web-api");

const AWSClientService = () => {
    const ec2Client = new EC2Client({ region: "ap-southeast-2" });
    const iamClient = new IAMClient({ region: "ap-southeast-2" });
    const s3Client = new S3Client({region: "ap-southeast-2"});

    const disablePublicAccessS3 = async (bucketName) =>{
        try {
            console.log("Disable Public Access command");
            const data = await s3Client.send(
                new PutPublicAccessBlockCommand({ Bucket: bucketName })
            );
            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    }
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
                            "text": "*" + msg["title"] + "*"
                        }
                    },
                    {
                        "type": "section",
                        "fields": [
                            {
                                "type": "mrkdwn",
                                "text": "*Created At:*\n" + msg["createdAt"]
                            },
                            {
                                "type": "mrkdwn",
                                "text": "*Updated At:*\n" + msg["updatedAt"]
                            },
                            {
                                "type": "mrkdwn",
                                "text": "*Instance ID:*\n"
                            },
                            {
                                "type": "mrkdwn",
                                "text": msg["instanceId"]
                            },
                            {
                                "type": "mrkdwn",
                                "text": "*Type:*\n" + msg["type"]
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
                                "value": "Approve"
                            },
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "emoji": true,
                                    "text": "Deny"
                                },
                                "style": "danger",
                                "value": "Deny"
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
        console.log("1");
        const params = {
            UserName: arguments[0],
        }

        try {
            console.log("Deleting user: ", arguments);
            const params = {
                UserName: arguments[0],
            }
            const user1233 = await iamClient.send(
                new GetUserCommand(params),
            );
            console.log("user is ", user1233);
            // 1. Delete password
            const data = await iamClient.send(
                new DeleteLoginProfileCommand(params)
            );
            console.log("2");

            // 2. list keys and delete them all
            var keys = await iamClient.send(
                new ListAccessKeysCommand(params)
            );
            for(let i=0; i < keys.length; i++){
                
                data = await iamClient.send(
                    
                    new DeleteAccessKeyCommand({AccessKeyId:keys[i],UserName:arguments[0]})
                );
            }
            // 3. Delete signing certificate
            keys = await iamClient.send(
                new ListSigningCertificatesCommand(params)
            );
            for(let i=0; i < keys.length; i++){
                data = await iamClient.send(
                    new DeleteSigningCertificateCommand({AccessKeyId:keys[i],UserName:arguments[0]})
                );
            }
            // 4. Delete ssh keys
            keys = await iamClient.send(
                new ListSSHPublicKeysCommand(arguments)
            );
            for(let i=0; i < keys.length; i++){
                data = await iamClient.send(
                    new DeleteSSHPublicKeyCommand({AccessKeyId:keys[i],UserName:arguments[0]})
                );
            }
            // 5. Delete git credentials
            keys = await iamClient.send(
                new ListServiceSpecificCredentialsCommand(params)
            );
            for(let i=0; i < keys.length; i++){
                data = await iamClient.send(
                    new DeleteServiceSpecificCredentialCommand({AccessKeyId:keys[i],UserName:arguments[0]})
                );
            }
            // 6. deactivate MFA devices
            keys = await iamClient.send(
                new ListMFADevicesCommand(params)
            );
            for(let i=0; i < keys.length; i++){
                data = await iamClient.send(
                    new DeactivateMFADeviceCommand({AccessKeyId:keys[i],UserName:arguments[0]})
                );
                data = await iamClient.send(
                    new DeleteVirtualMFADeviceCommand({AccessKeyId:keys[i]})
                );
            }
            // 7. Delete inline policies
            keys = await iamClient.send(
                new ListUserPoliciesCommand(params)
            );
            for(let i=0; i < keys.length; i++){
                data = await iamClient.send(
                    new DeleteUserPolicyCommand({AccessKeyId:keys[i],UserName:arguments[0]})
                );
            }
            // 8. Detach policies
            keys = await iamClient.send(
                new ListAttachedUserPoliciesCommand(params)
            );
            for(let i=0; i < keys.length; i++){
                data = await iamClient.send(
                    new DetachUserPolicyCommand({AccessKeyId:keys[i],UserName:arguments[0]})
                );
            }
            // 9. remove user from groups
            keys = await iamClient.send(
                new ListGroupsForUserCommand(params)
            );
            for(let i=0; i < keys.length; i++){
                data = await iamClient.send(
                    new RemoveUserFromGroupCommand({AccessKeyId:keys[i],UserName:arguments[0]})
                );
            }
            // 10. delete user
            data = await iamClient.send(
                new DeleteUserCommand(params)
            );

            console.log("Success", JSON.stringify(data));
            return data;
        } catch (err) {
            console.log("Error", err);
            return err["Code"];
        }
    }

    const quarantineUser = async(arguments) => {
        try {
            console.log("Deleting a user from all their groups and putting them into a quarantine group");
            console.log(arguments[0]);
            const params = {
                UserName: arguments[0],
            }
            const user = await iamClient.send(
                new GetUserCommand(params),
            );
            const keys = await iamClient.send(
                new ListGroupsForUserCommand(params)
            );
            for(let i=0; i < keys.length; i++){
                data = await iamClient.send(
                    new RemoveUserFromGroupCommand(keys[i], arguments[0])
                );
            }
            const data = await iamClient.send(
                new AddUserToGroupCommand({GroupName:'Quarantine',UserName:arguments[0]})
            );
            console.log("Success", JSON.stringify(data));
            return data;
            }
        catch (err) {
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
        "Disable Public Access to S3": disablePublicAccessS3,
        "Quarantine a User": quarantineUser,
    };

    return functionToDict;
};

exports.AWSClientService = AWSClientService;
