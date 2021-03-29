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
        //Initialise client service
        const service = AWSClientService();

        //Capture request body from alert
        const obj = this.req.body;

        const log = { alert: obj.detail };

        const findEvent = await Flow.find({
            findingType: obj.detail.type,
        });

        if (!findEvent) {
            //set remediation to false
            log["isRemediated"] = false;
            await Log.create(log);
            return exits.badCombo({
                message: "Event not found",
            });
        } else {
            const responseArray = [];
            //If there exists multiple flows for finding type use last created flow
            for (action of findEvent[findEvent.length - 1].actions) {
                if (action === "Send Message to Slack") {
                    const formattedString =
                        "ALERT!" +
                        "\n" +
                        obj.detail.updatedAt +
                        "\n" +
                        obj.detail.description +
                        "\n" +
                        "with severity " +
                        obj.detail.severity +
                        "\n" +
                        "Automatically remediating with these steps: " +
                        findEvent[findEvent.length - 1].actions;
                    sails.log("Sending", formattedString);
                    responseArray.push({
                        command: action,
                        response: await service[action](formattedString),
                        datetime: Date.now(),
                    });
                } else if (action === "Stop Instances") {
                    responseArray.push({
                        command: action,
                        response: await service[action]([
                            obj.detail.resource.instanceDetails.instanceId,
                        ]),
                        datetime: Date.now(),
                    });
                }
            }
            log["isRemediated"] = true;
            log["response"] = responseArray;
            console.log("Log is ", log);
            await Log.create(log);
        }

        return exits.success({
            message: "Alert Received Sucessfully",
        });
    },
};
