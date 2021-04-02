/**
 * LogController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require("fs");

module.exports = {
    friendlyName: "Download log file",

    description: "",

    inputs: {
        logId: {
            description: "Log specific ID requested for download",
            type: "number",
            required: true,
        },
    },

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
        const log = await Log.findOne({ id: inputs.logId });

        if (!log) {
            return exits.badCombo({
                message: "No log exists with that ID",
            });
        }

        const fileData = JSON.stringify(log);
        const fileName = log.id + "-log.json";

        try {
            fs.writeFileSync(fileName, fileData);
            sails.log("Sending file now", fileName);
            this.res.attachment(fileName);
            var downloading = await sails.startDownload(fileName);
            sails.log("Deleting file");
            fs.unlinkSync(fileName);
            return exits.success(downloading);
        } catch (err) {
            sails.log("Something went wrong!", err);
            return exits.badCombo({
                message: "Something went wrong!",
                error: err,
            });
        }
    },
};
