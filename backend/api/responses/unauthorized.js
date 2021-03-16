/**
 * unauthorized.js
 *
 * A custom response that content-negotiates the current request to either:
 *  • log out the current user and redirect them to the login page
 *  • or send back 400 wrapper (Unauthorized) with no response body.
 *
 * Example usage:
 * ```
 *     return res.unauthorized();
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       badCombo: {
 *         description: 'That email address and password combination is not recognized.',
 *         responseType: 'unauthorized'
 *       }
 *     }
 * ```
 */
module.exports = function unauthorized(optionalData) {

  var res = this.res;

  sails.log.verbose('Ran custom response: res.unauthorized()');

  // Define the status code to send in the response.
  var statusCodeToSet = 400;

  if (optionalData === undefined) {
    sails.log.info('Ran custom response: res.unauthorized()');
    return res.sendStatus(statusCodeToSet);
  }

  // Set status code and send response data.
  else {
    return res.status(statusCodeToSet).send(optionalData);
  }

};
