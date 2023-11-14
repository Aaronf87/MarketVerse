const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
require("dotenv").config();

const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('User not authenticated.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  authMiddleware: function ({ req }) {
    // Allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { authenticatedUser } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = authenticatedUser;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ authenticatedUser: payload }, secret, { expiresIn: expiration });
  },
};
