// ES6+ example
const { EC2Client, DescribeInstancesCommand, StopInstancesCommand,
    ApplySecurityGroupsToClientVpnTargetNetworkCommand, CreateFleetCommand,
    CreateInstanceExportTaskCommand, DeleteSecurityGroupCommand,
    DescribeAccountAttributesCommand, DescribeIamInstanceProfileAssociationsCommand,
    DescribeInstanceAttributeCommand, DescribeInstanceStatusCommand,
    DescribeSecurityGroupsCommand, ModifyInstanceAttributeCommand,
    ModifyInstanceMetadataOptionsCommand, MonitorInstancesCommand,
    RebootInstancesCommand, RunInstancesCommand, StartInstancesCommand,
    TerminateInstancesCommand,
    UpdateSecurityGroupRuleDescriptionsEgressCommand } = require("@aws-sdk/client-ec2");

const { WebClient } = require("@slack/web-api");
require("dotenv").config();

const AWSClientService = () => {
    const ec2Client = new EC2Client({ region: "ap-southeast-2" });
    const stopInstance = async (instanceIds) => {
        try {
            sails.log("Stop command");
            const data = await ec2Client.send(new StopInstancesCommand({ InstanceIds: instanceIds }));
            sails.log("Success", JSON.stringify(data));
        } catch (err) {
            sails.log("Error", err);
        }
    };
    const sendMessage = async (msg) => {
        sails.log(process.env.SLACK_TOKEN === "'xoxb-1757606921425-1865428770357-Gi005lST1fXpffuY0jtvmqFc'")
        sails.log(process.env.SLACK_TOKEN)
        sails.log('xoxb-1757606921425-1865428770357-Gi005lST1fXpffuY0jtvmqFc')
        sails.log(typeof process.env.SLACK_TOKEN)
        const web = new WebClient(process.env.SLACK_TOKEN);
        try {
            await web.chat.postMessage({
                channel: "bot-log",
                text: msg,
            });
        } catch (err) {
            sails.log("Error", err);
        }
    };
    const testSlack = async () => {
        sails.log(process.env.SLACK_TOKEN)
        const web = new WebClient(process.env.SLACK_TOKEN);
        (async () => {
            const test = await web.auth.test();

            console.log('Done!' + JSON.stringify(test));
        })();
    };
    const applySecurityGroupToTarget = async (args) => {
        try {
            sails.log("Applying Security Groups");
            const data = await ec2Client.send(new ApplySecurityGroupsToClientVpnTargetNetworkCommand(args));
            sails.log("Success", JSON.stringify(data));
        } catch (err) {
            sails.log("Error", err);
        }
    };
    const createFleet = async (arguments) => {
        try {
            sails.log("Creating EC2 fleet instance(s)");
            const data = await ec2Client.send(new CreateFleetCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };
    const exportInstance = async (arguments) => {
        try {
            sails.log("Exporting EC2 instance");
            const data = await ec2Client.send(new CreateInstanceExportTaskCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };
    const deleteSecurityGroup = async (arguments) => {
        try {
            sails.log("Deleting Security Group");
            const data = await ec2Client.send(new DeleteSecurityGroupCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };
    const getAccAttributes = async (arguments) => {
        try {
            sails.log("Getting account attributes");
            const data = await ec2Client.send(new DescribeAccountAttributesCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };
    const getAccAssociations = async (arguments) => {
        try {
            sails.log("Getting Account Associations");
            const data = await ec2Client.send(new DescribeIamInstanceProfileAssociationsCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };
    const getInstAttribute = async (arguments) => {
        try {
            sails.log("Getting attribute of instance");
            const data = await ec2Client.send(new DescribeInstanceAttributeCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };
    const getInstInfo = async (arguments) => {
        try {
            sails.log("Getting information on instance(s)");
            const data = await ec2Client.send(new DescribeInstancesCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };
    const getInstStatus = async (arguments) => {
        try {
            sails.log("Getting status of instance");
            const data = await ec2Client.send(new DescribeInstanceStatusCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        } catch (err) {
            sails.log("Error", err);
        }
    };
    const getSecurityGroupInfo = async (arguments) => {
        try {
            sails.log("Getting security group information");
            const data = await ec2Client.send(new DescribeSecurityGroupsCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };
    const setInstAttribute = async (arguments) => {
        try {
            sails.log("Setting the attribute of an instance");
            const data = await ec2Client.send(new ModifyInstanceAttributeCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };
    const setInstMetadata = async (arguments) => {
        try {
            sails.log("Setting instance metadata");
            const data = await ec2Client.send(new ModifyInstanceMetadataOptionsCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };
    const setInstMonitorLevel = async (arguments) => {
        try {
            sails.log("Setting level of monitoring");
            const data = await ec2Client.send(new MonitorInstancesCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };
    const rebootInst = async (arguments) => {
        try {
            sails.log("Rebooting instance");
            const data = await ec2Client.send(new RebootInstancesCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };
    const runInst = async (arguments) => {
        try {
            sails.log("Running a specified instance");
            const data = await ec2Client.send(new RunInstancesCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };
    const startEBSInst = async (arguments) => {
        try {
            sails.log("Starting EBS EC2 Instance");
            const data = await ec2Client.send(new StartInstancesCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };
    const stopEBSInst = async (arguments) => {
        try {
            sails.log("Stopping EBS EC2 instance(s)");
            const data = await ec2Client.send(new StopInstancesCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };
    const terminateEBSInst = async (arguments) => {
        try {
            sails.log("Terminating EBS EC2 instance(s)");
            const data = await ec2Client.send(new TerminateInstancesCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };
    const setSecurityGroupDesc = async (arguments) => {
        try {
            sails.log("Setting Security Group descriptions");
            const data = await ec2Client.send(new UpdateSecurityGroupRuleDescriptionsEgressCommand(arguments));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    };


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
        "Debug": (var1, var2) => sails.log('hello', var1, var2),
        "Send Message to Slack": sendMessage,
        "Test Slack": testSlack,
    };

    return functionToDict;
};

exports.AWSClientService = AWSClientService;
