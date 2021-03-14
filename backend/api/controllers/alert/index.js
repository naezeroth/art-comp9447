/**
 * AlertController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 module.exports = {
 
   friendlyName: 'Alert from SNS',
 
 
   description: 'An alert has been sent from SNS relating to a GuardDuty Finding',
 
 
   inputs: {
   },
 
 
   exits: {
 
     success: {
       description: 'The requesting user agent has been successfully logged in.',
     },
 
     badCombo: {
       description: `Something went wrong`,
       responseType: 'unauthorized',
     }
 
   },
 
 
   fn: async function (inputs, exits) {


    sails.log("this.req.body", this.req.body);

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
       message: 'SNS Received Sucessfully',
     });
   }
 
 };
 