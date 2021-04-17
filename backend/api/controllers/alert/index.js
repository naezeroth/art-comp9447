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

        var obj = {};
        //Capture request body from alert
        if (typeof this.req.body["Message"] === "string") {
            obj = JSON.parse(this.req.body["Message"]);
        } else {
            obj = this.req.body["Message"];
        }

        const log = { alert: obj.detail };
        // sails.log(log);

        const findEvent = await Flow.find({
            findingType: obj.detail.type,
        });

        const checkContextWithTag = () => {
            for (tag of obj.detail.resource.instanceDetails.tags) {
                if (
                    tag.key === findEvent[findEvent.length - 1].context ||
                    tag.value === findEvent[findEvent.length - 1].context
                ) {
                    return true;
                }
            }
            return false;
        };
        // sails.log("this is find event", findEvent);
        if (
            findEvent.length === 0 ||
            (findEvent[findEvent.length - 1].context !== "" &&
                !checkContextWithTag())
        ) {
            //set remediation to false
            log["isRemediated"] = false;
            await Log.create(log);
            // sails.log(findEvent);
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
                    const findingDetails = {
                        title: obj.detail.title,
                        updatedAt: obj.detail.updatedAt,
                        createdAt: obj.detail.createdAt,
                        type: obj.detail.type,
                        instanceId: obj.detail.resource.instanceDetails.instanceId,
                        instanceType: obj.detail.resource.instanceDetails.instanceType,
                        instanceState: obj.detail.resource.instanceDetails.instanceState,
                        description: obj.detail.description,
                        severity: obj.detail.severity,
                        remediation: findEvent[findEvent.length - 1].actions,
                    };
                    // const formattedString =
                    //     "ALERT!" +
                    //     "\n" +
                    //     obj.detail.updatedAt +
                    //     "\n" +
                    //     obj.detail.description +
                    //     "\n" +
                    //     "with severity " +
                    //     obj.detail.severity +
                    //     "\n" +
                    //     "Automatically remediating with these steps: " +
                    //     findEvent[findEvent.length - 1].actions;
                    // sails.log("Sending", formattedString);
                    // service[action](interactiveButton is way to go)
                    //service[action](interactiveButtons);
                    responseArray.push({
                        command: action,
                        response: await service[action](findingDetails),
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
                else if (action === "Disable Public Access to S3") {
                    responseArray.push({
                        command: action,
                        response: await service[action]([
                            obj[0].resource.s3BucketDetails[0].name,
                        ]),
                        datetime: Date.now(),
                    });
                }
                // else if (action === "Get information on the specified instance(s)") {
                //     sails.log("inside get user: ", obj);
                //     responseArray.push({
                //         command: action,
                //         response: await service[action]([
                //         ]),
                //         datetime: Date.now(),
                //     });
                // }
                else if (action === "Delete user") {
                    sails.log("inside del user: ", obj.detail.resource.accessKeyDetails.userName);
                    responseArray.push({
                        command: action,
                        response: await service[action]([
                            obj.detail.resource.accessKeyDetails.userName,
                        ]),
                        datetime: Date.now(),
                    });
                }

            }
            log["isRemediated"] = true;
            log["response"] = responseArray;
            // Enable this to show logs on console
            // console.log("Log is ", log);
            await Log.create(log);
        }

        return exits.success({
            message: "Alert Received Sucessfully",
        });
    },
};
