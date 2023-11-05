const { User, Book, Order } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
require("dotenv").config();

// const stripe = require("stripe")(`${process.env.STRIPE_SECRET}`);

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
        //   .populate("order");

        return userData;
      }

      throw new AuthenticationError();
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
        console.log(args)
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error("Failed to create user!");
      }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    //! checkout: async (parent, args, context) => {
  },
};

module.exports = resolvers;
