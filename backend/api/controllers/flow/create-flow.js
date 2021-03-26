/**
 * AlertController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const FlowIAM = require("../../models/FlowIAM");
const FlowS3 = require("../../models/FlowS3");
const FlowEC2 = require("../../models/FlowEC2");

 
  module.exports = {
  
    friendlyName: 'Create flow',
  
  
    description: 'Creating a flow and storing it in the DB',
  
  
    inputs: {
        data: {
            description: 'Information sent from FE for Flow Creation',
            type: 'json',
            required: true,
            custom: function(value) {
              return _.isObject(value) &&
              _.isString(value.confidence) && 
              _.isString(value.findingType) && 
              _.isString(value.resourceName) && 
              _.isString(value.name) && 
              _.isString(value.findingType) && 
              Array.isArray(value.actions)
            }
        }
    },
  
  
    exits: {
  
      success: {
        description: 'The flow has been created',
      },
  
      badCombo: {
        description: `Something went wrong`,
        responseType: 'unauthorized',
      }
  
    },
  
  
    fn: async function (inputs, exits) {
      sails.log(inputs.data);
      sails.log(inputs.data.resourceName);
      if(inputs.data.resourceName=="EC2"){
        var newEC2Flow = await FlowEC2.create(inputs.data)
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();
      }else if(inputs.data.resourceName=="IAM"){
        var newIAMFlow = await FlowIAM.create(inputs.data)
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();
      }else if(inputs.data.resourceName=="S3"){
        var newS3Flow = await FlowS3.create(inputs.data)
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();
      }
      

      // sails.log("Flow created", newFlow);

      // var queriedFlow = await Flow.find({
      //   name: inputs.data.name
      // })
      
      // sails.log("Flow queried", queriedFlow);

      return exits.success({
        message: 'Created Flow Sucessfully',
      });
    }
  
  };
