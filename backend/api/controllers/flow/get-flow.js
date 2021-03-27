// const Flow = require("../../models/Flow");

module.exports = {


  friendlyName: 'Get flow',


  description: '',


  inputs: {
  },


  exits: {
    success: {
    
    },

    badCombo: {
      description: `Something went wrong`,
      responseType: 'unauthorized',
    }
  },


  fn: async function (inputs,exits) {
    sails.log(inputs)
    var flows = await Flow.find();
    sails.log("Returning Flows:",flows)
    return exits.success(flows);

  }


};
