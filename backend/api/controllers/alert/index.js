/**
 * AlertController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { AWSClientService } = require("art-aws-sdk");

module.exports = {
    friendlyName: "Alert from SNS",

    description:
        "An alert has been sent from SNS relating to a GuardDuty Finding",

    inputs: {},

    exits: {
        success: {},

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

        const checkContextWithTag = () => {
            for (tag of obj.detail.resource.instanceDetails.tags) {
                if (
                    tag.key === findEvent.context ||
                    tag.value === findEvent.context
                ) {
                    return true;
                }
            }
            return false;
        };

        if (!findEvent || !checkContextWithTag()) {
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
                    //Ideally we'd want to store where the parameters for these fn calls in the Flow DB object
                    //As part of the create-flow FE/BE
                    const interactiveButtons = {
                        "updatedAt": obj.detail.updatedAt,
                        "description": obj.detail.description,
                        "severity": obj.detail.severity,
                        "remediation": findEvent[findEvent.length - 1].actions,
                    }
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
                    // service[action](interactiveButton is way to go)
                    //service[action](interactiveButtons);
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
