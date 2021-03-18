/**
 * AlertController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { SNSClient, ListTopicsCommand } = require("@aws-sdk/client-sns");
const { AWSClientService } = require("art-aws-sdk");

module.exports = {
    friendlyName: "Alert from SNS",

    description:
        "An alert has been sent from SNS relating to a GuardDuty Finding",

    inputs: {},

    exits: {
        success: {
            description:
                "The requesting user agent has been successfully logged in.",
        },

        badCombo: {
            description: `Something went wrong`,
            responseType: "unauthorized",
        },
    },

    fn: async function (inputs, exits) {
        sails.log(AWSClientService, typeof AWSClientService);
        const service = AWSClientService();
        sails.log(Object.keys(service));
        const getInstInfo =
            service["Get information on the specified instance(s)"];
        const stopInstance = service["Stop Instances"];
        const sendMsg = service["Send Message to Slack"];
        const testSlack = service["Test Slack"];
        // const func3 = service[2]
        await getInstInfo([]);
        await stopInstance(["i-008bac734782a55de"]);
        await getInstInfo([]);
        await sendMsg("this.req.body: \n" + JSON.stringify(this.req.body));
        await testSlack();
        // func3("test", "test2");

        const obj = this.req.body;

        var findEvent = await Flow.find({
            findingType: obj.detail.type,
        });

        //findEvent[0].actions; // actions: [ 'Stop Instances' ],

        sails.log("Findevent??", findEvent, !findEvent);

        if (!findEvent) {
            return exits.badCombo({
                message: "Event not found",
                //set remediation to false
            });
        } else {
            await stopInstance([
                obj.detail.resource.instanceDetails.instanceId,
            ]);

            //for x in findEvent[0].actions
            //service[x]();
        }

        //Parse this.req.body JSON
        //Do logic based on event type
        // Check if event type exists in DB
        // If it doesn't
        //Log that this occured, and set remediation as FALSE
        // If it does
        //Execute FLOW using aws-sdk
        //Keep a log file of the output of each command
        //Write the log to the DB so we can show in dashboard/history

        return exits.success({
            message: "SNS Received Sucessfully",
        });
    },
};
