/**
 * AlertController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    friendlyName: "Create flow",

    description: "Creating a flow and storing it in the DB",

    inputs: {
        data: {
            description: "Information sent from FE for Flow Creation",
            type: "json",
            required: true,
            custom: function (value) {
                return (
                    _.isObject(value) &&
                    _.isString(value.findingType) &&
                    _.isString(value.resourceName) &&
                    _.isString(value.name) &&
                    _.isString(value.context) &&
                    Array.isArray(value.actions)
                );
            },
        },
    },

    exits: {
        success: {
            description: "The flow has been created",
        },

        badCombo: {
            description: `Something went wrong`,
            responseType: "unauthorized",
        },
    },

    fn: async function (inputs, exits) {
        sails.log(inputs.data);

        var newFlow = await Flow.create(inputs.data)
            .intercept({ name: "UsageError" }, "invalid")
            .fetch();

        sails.log("Flow created", newFlow);

        var queriedFlow = await Flow.find({
            name: inputs.data.name,
        });

        sails.log("Flow queried", queriedFlow);

        return exits.success({
            message: "Created Flow Sucessfully",
        });
    },
};
