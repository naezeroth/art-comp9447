/**
 * SlackController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

/**
 * This should receive user's reponse from the slack bot server,
 * should trigger various actions based on user selection,
 * then respond back to slack bot server with "response_url"
 */

// const { SNSClient, ListTopicsCommand } = require("@aws-sdk/client-sns");
// const { AWSClientService } = require("art-aws-sdk");
const fetch = require('node-fetch');

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
        const payload = JSON.parse(this.req.body.payload)
        sails.log(payload.response_url);
        sails.log(payload.actions[0].value);
        const userAction = payload.message.blocks[1].fields[6].text;
        var requestOptions = {};
        if (payload.actions[0].value == 'Approve') {
            requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: "Thanks for your Approval, we'll process it and get back to you. \n*User action:* " + userAction }),
            };
        }
        else {
            requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: "Thanks for your response, we won't take further action" }),
            };
        }

        fetch(payload.response_url, requestOptions)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
            });

        return exits.success({
            message: "Thanks for your request, we'll process it and get back to you.",
        });
    },
};
