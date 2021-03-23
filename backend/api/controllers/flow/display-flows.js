/**
 * AlertController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 
 module.exports = {
  
    friendlyName: 'To display all flows',
  
  
    description: 'Display all flows present in the db',
  
    exits: {
  
      success: {
        description: 'Return flows',
      },
  
      badCombo: {
        description: `Something went wrong`,
        responseType: 'unauthorized',
      }
  
    },
  
  
    fn: async function () {


      var FlowDisplay = await Flow.find()

      sails.log("List of flows", FlowDisplay);

    
      return exits.success({
        message: 'list of flows',
      });
    }
  
  };
