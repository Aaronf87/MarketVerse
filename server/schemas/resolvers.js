const { async } = require("rxjs");
const { User, Product, Order, Category, Product } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
require("dotenv").config();

// const stripe = require("stripe")(`${process.env.STRIPE_SECRET}`);

const resolvers = {
  Query: {
    categories: async() => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }
      if (name) {
        params.name = {
          $regex: name
        };
      }
      return await Product.find(params).populate('category');
    },
    product: async (parent,{_id}) => {
      return await Product.findById(_id).populate('category');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
        //   .populate("order");

        return userData;
      }

      throw new AuthenticationError();
    },
    user: async (parent, args, context) => { 
      if (context.user) { 
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });
        return user;
      }
      throw AuthenticationError;
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'order.products',
          populate: 'category'
        });
        return user.order.id(_id);
      }
      throw AuthenticationError;
    },
    // checkout query TODO.
  },

  Mutation: {
    addUser: async (parent, args) => {

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

    addOrder: async (parent, { products }, context) => {
      if (context.user) { 
        const order = new Order({ products });
        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
        return order;
      }
      throw AuthenticationError;
    },

    //addProduct
  },
};

module.exports = resolvers;
