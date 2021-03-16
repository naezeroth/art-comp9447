var jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Verify JWT',
  description: 'Verify a JWT token.',
  inputs: {
    req: {
      type: 'ref',
      friendlyName: 'Request',
      description: 'A reference to the request object (req).',
      required: true
    }
  },
  exits: {
    invalid: {
      description: 'Invalid token or no authentication present.',
    },
  },
  fn: async function(inputs, exits) {
    var req = inputs.req;

    // first check for a cookie (web client)
    if (req.signedCookies.sailsjwt) {
      // if there is something, attempt to parse it as a JWT token
      return jwt.verify(req.signedCookies.sailsjwt, process.env.JWT_SECRET, async (err, payload) => {
        // if there's an error verifying the token (e.g. it's invalid or expired), no go
        if (err || !payload.user) {return exits.invalid();}
        req.user = await User.findOne({id: payload.user.id});
        return exits.success(req.user);
      });
    }
    // no? then check for a JWT token in the header
    // console.log('in verify-token', req.headers);
    // console.log('in verify-token authorization', req.headers.authorization);
    if (req.headers['authorization']) {
      // if one exists, attempt to get the header data
      var token = req.headers['authorization'].split('Bearer ')[1];
      // if there's nothing after "Bearer", no go
      if (!token) {return exits.invalid();}
      // if there is something, attempt to parse it as a JWT token
      return jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err || !payload.user) {return exits.invalid();}
        req.user = await User.findOne({id: payload.user.id});
        return exits.success(req.user);
      });
    }
    // if neither a cookie nor auth header are present, then there was no attempt to authenticate
    return exits.invalid();
  }
};
