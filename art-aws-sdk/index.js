// ES6+ example
const { EC2Client, DescribeInstancesCommand, StopInstancesCommand, ApplySecurityGroupsToClientVpnTargetNetworkCommand } = require("@aws-sdk/client-ec2");
const { WebClient } = require('@slack/web-api');
require('dotenv').config();

const AWSClientService = () => {
    const ec2Client = new EC2Client({ region: "ap-southeast-2" });
    const run = async () => {
        try {
            sails.log("First command");
            const data = await ec2Client.send(new DescribeInstancesCommand({}));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    }
    const sendMessage = async (msg) => {
        sails.log(process.env.SLACK_TOKEN)
        const web = new WebClient(process.env.SLACK_TOKEN);
        try {
            await web.chat.postMessage({
                channel: '#bot-log',
                text: msg,
            });
        }
        catch (err) {
            sails.log("Error", err);
        }
    }

    const stopInstance = async (instanceIds) => {
        try {
            sails.log("Stop command");
            const data = await ec2Client.send(new StopInstancesCommand({ InstanceIds: instanceIds }));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    }
    const ApplySecurityGroupsToClientVpnTargetNetworkCommand = async (instanceIds) => {
        try {
            sails.log("Stop command");
            const data = await ec2Client.send(new ApplySecurityGroupsToClientVpnTargetNetworkCommand({ InstanceIds: instanceIds }));
            sails.log("Success", JSON.stringify(data));
        }
        catch (err) {
            sails.log("Error", err);
        }
    }
    //Dictionary or list
    const functionToDict = {
        "Describe Instances": run,
        "Stop Instances": stopInstance,
        "Apply Security Groups To Client Vpn Target Network": ApplySecurityGroupsToClientVpnTargetNetworkCommand,
        2: (var1, var2) => sails.log('hello', var1, var2),
        "Send Message to Slack": sendMessage,
    }

    return functionToDict;
};

exports.AWSClientService = AWSClientService;