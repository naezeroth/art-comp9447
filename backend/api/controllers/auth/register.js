/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var jwt = require('jsonwebtoken');
var _ = require('lodash');

module.exports = {

  friendlyName: 'Signup',

  description: 'Sign up for a new user account.',

  extendedDescription:
  `This creates a new user record in the database, signs in the requesting user agent
  by modifying its [session](https://sailsjs.com/documentation/concepts/sessions), and
  (if emailing with Mailgun is enabled) sends an account verification email.

  If a verification email is sent, the new user's account is put in an "unconfirmed" state
  until they confirm they are using a legitimate email address (by clicking the link in
  the account verification message.)`,

  inputs: {

    username: {
      required: true,
      type: 'string',
      description: 'The email address for the new account, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.',
    },

    password: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'passwordlol',
      description: 'The unencrypted password to use for the new account.'
    },

  },

  exits: {

    success: {
      description: 'New user account was created successfully.',
    },

    invalid: {
      responseType: 'unauthorized',
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request '+
      'parameters should have been validated/coerced _before_ they were sent.'
    },

  },

  fn: async function (inputs, exits) {

    var newUserRecord = await User.create(_.extend({
      username: inputs.username,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
    }))
    .intercept({ code: 'E_UNIQUE' }, () => {return {'invalid': {message: 'Username is already in use'} };})
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    //Delete password before sending response
    delete newUserRecord.password;
    // after creating a user record, log them in at the same time by issuing their first jwt token and setting a cookie
    // The JWT stores the User object
    var token = jwt.sign({user: newUserRecord}, process.env.JWT_SECRET, {expiresIn: sails.config.custom.jwtExpires});

    this.res.cookie('sailsjwt', token, {
      signed: true,
      // domain: '.yourdomain.com', // always use this in production to whitelist your domain
      maxAge: sails.config.custom.jwtExpires
    });

    //Return relevant success message
    return exits.success({
      message: 'new User created',
      user: newUserRecord,
      token
    });
  }

};
