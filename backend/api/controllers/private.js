/**
 * PrivateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  friendlyName: 'Test Private response',


  description: '',


  inputs: {

  },


  exits: {

  },

  fn: async function () {
    // All done
    return {
      'success':'true',
      'request': this.req.ip,
      'cookie' : this.req.headers.cookie,
      'date': this.req.headers.Date,
      'dateWithoutCapitalD': this.req.headers.date,
      'dateWithoutHeader': this.req.date,
      'dateWithoutHeaderandCapital': this.req.Date,
    };
  }
};
