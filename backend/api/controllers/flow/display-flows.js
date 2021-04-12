/**
 * AlertController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 
 module.exports = {
  
    friendlyName: 'To display all flows',
  
  
    description: 'Display all flows present in the db',
    

    inputs : {},
    exits: {
  
      success: {
        description: 'Return flows',
      },
  
      badCombo: {
        description: `Something went wrong`,
        responseType: 'unauthorized',
      }
  
    },
  
  
    fn: async function (inputs,exits) {


      var listOfFlows = await Flow.find()

      sails.log("List of flows", listOfFlows);

    
      return exits.success({
        message: 'list of flows',
        flows: listOfFlows
      });
    }
  
  };
