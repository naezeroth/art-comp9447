/**
 * PublicController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  friendlyName: 'Test Public response',


  description: '',


  inputs: {

  },


  exits: {

  },

  fn: async function () {

    return {
      'success':'true',
      'ping':'pong',
      'info': sails.config.info,
    };
  }
};
