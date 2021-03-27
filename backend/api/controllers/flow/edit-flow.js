module.exports = {
  
    friendlyName: 'Editing flow',
    description: 'Editing a flow from the DB',
  
  
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
      sails.log('Data to edit',inputs.data);


      var updatedFlow = await Flow.updateOne({name:inputs.data.name})
        .set(inputs.data);
      sails.log("Flow updated", updatedFlow);
      
      if (updatedFlow) {
        return exits.success({
            message: 'Edited Flow Sucessfully',
          });
      }
      else {
        return exits.badCombo({
            message: 'Invalid Flow',
          });
      }
    }
  
  };
