/**
 * AlertController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { SNSClient, ListTopicsCommand } = require("@aws-sdk/client-sns");
const { AWSClientService } = require("art-aws-sdk");
// const GuardDutyEvent = require("../../models/GuardDutyEvent");

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

        const obj = this.req.body;
        
        
        

        var findEvent = await Flow.find({
            findingType: obj.detail.type,
        });

        if (!findEvent) {
            return exits.badCombo({
                message: "Event not found",
                //set remediation to false
            });
        } else {

            if(obj.detail.type.includes("EC2/")){
                var reportEvent = await GuardDutyEvent.create({
                    resourceType:"EC2",
                    resourceID:obj.detail.resource.instanceDetails.instanceId,
                    findingType:obj.detail.type,
                    time:obj.time,
                    severity:obj.detail.severity,
                    logs:obj,
                    remediation:true,
                });
            }
            sails.log(findEvent);
            //Last flow with same findingType
            for (action of findEvent[findEvent.length - 1].actions) {
                sails.log(action, typeof action);
                if (action === "Send Message to Slack") {
                    //Ideally we'd want to store where the parameters for these fn calls in the Flow DB object
                    //As part of the create-flow FE/BE

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
                    service[action](formattedString);
                } else if (action === "Stop Instances") {
                    service[action]([
                        obj.detail.resource.instanceDetails.instanceId,
                    ]);
                }
            }
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
            message: "Alert Received Sucessfully",
        });
    },
};
