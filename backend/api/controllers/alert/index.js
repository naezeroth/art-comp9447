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
        if (process.env.INSTALLATION === "true") {
            sails.log("Welcome to ART");
            sails.log(
                "Please copy and paste the token provided in the message to SNS"
            );
            sails.log(this.req.body["Message"]);
        }
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
                if (
                    action === "EC2: Send Message to Slack" ||
                    action === "S3: Send Message to Slack" ||
                    action === "IAM: Send Message to Slack"
                ) {
                    const findingDetails = {
                        title: obj.detail.title,
                        updatedAt: obj.detail.updatedAt,
                        createdAt: obj.detail.createdAt,
                        type: obj.detail.type,
                        instanceId:
                            obj.detail.resource.instanceDetails.instanceId,
                        instanceType:
                            obj.detail.resource.instanceDetails.instanceType,
                        instanceState:
                            obj.detail.resource.instanceDetails.instanceState,
                        description: obj.detail.description,
                        severity: obj.detail.severity,
                        remediation: findEvent[findEvent.length - 1].actions,
                    };
                    responseArray.push({
                        command: action,
                        response: await service[action](findingDetails),
                        datetime: Date.now(),
                    });
                } else if (action === "S3: Disable Public Access to S3") {
                    const responseData = await service[action](
                        obj.detail.resource.s3BucketDetails[0].name
                    );
                    responseArray.push({
                        command: action,
                        response: responseData["$metadata"],
                        datetime: Date.now(),
                    });
                } else if (action === "EC2: Reboot a given instance") {
                    const responseData = await service[action]({
                        InstanceIds: [
                            obj.detail.resource.instanceDetails.instanceId,
                        ],
                    });
                    responseArray.push({
                        command: action,
                        response: responseData["$metadata"],
                        datetime: Date.now(),
                    });
                } else if (action === "EC2: Stop a given instance") {
                    const responseData = await service[action]({
                        InstanceIds: [
                            obj.detail.resource.instanceDetails.instanceId,
                        ],
                    });
                    responseArray.push({
                        command: action,
                        response: responseData["$metadata"],
                        datetime: Date.now(),
                    });
                } else if (action === "EC2: Create snapshot of an instance") {
                    const responseData = await service[action]({
                        InstanceSpecification: {
                            InstanceId:
                                obj.detail.resource.instanceDetails.instanceId,
                        },
                    });
                    responseArray.push({
                        command: action,
                        response: responseData["$metadata"],
                        datetime: Date.now(),
                    });
                } else if (action === "EC2: Terminate a given instance") {
                    const responseData = await service[action]({
                        InstanceIds: [
                            obj.detail.resource.instanceDetails.instanceId,
                        ],
                    });
                    responseArray.push({
                        command: action,
                        response: responseData["$metadata"],
                        datetime: Date.now(),
                    });
                } else if (
                    action ===
                    "EC2: Remove all ingress and egress routes to given instance"
                ) {
                    const responseData = await service[action]({
                        groupId:
                            obj.detail.resource.instanceDetails
                                .networkInterfaces[0].securityGroups[0].groupId,
                    });
                    responseArray.push({
                        command: action,
                        response: responseData,
                        datetime: Date.now(),
                    });
                } else if (
                    action === "EC2: Get information on the specified instance"
                ) {
                    const responseData = await service[action]({
                        InstanceIds: [
                            obj.detail.resource.instanceDetails.instanceId,
                        ],
                    });
                    responseArray.push({
                        command: action,
                        response: responseData["$metadata"],
                        datetime: Date.now(),
                    });
                } else if (action === "IAM: Delete user") {
                    const responseData = await service[action]([
                        obj.detail.resource.accessKeyDetails.userName,
                    ]);
                    responseArray.push({
                        command: action,
                        response: responseData["$metadata"],
                        datetime: Date.now(),
                    });
                } else if (action === "IAM: Quarantine a User") {
                    const responseData = await service[action]([
                        obj.detail.resource.accessKeyDetails.userName,
                    ]);

                    sails.log(responseData);

                    responseArray.push({
                        command: action,
                        response: responseData["$metadata"],
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
