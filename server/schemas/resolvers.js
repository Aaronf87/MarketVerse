const { async } = require("rxjs");
const { User, Product, Order, Category } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
require("dotenv").config();

// const stripe = require("stripe")(`${process.env.STRIPE_SECRET}`);

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("products")
          .populate("orders")
          .populate({ path: "products", populate: "category" })
          .populate({ path: "orders", populate: "products" });

        return userData;
      }

      throw new AuthenticationError();
    },

    getProducts: async (parent, { category }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      return await Product.find(params)
        .populate("category")
        .populate("userId")
        .select("-__v -password");
    },

    getProduct: async (parent, { _id }) => {
      return await Product.findById(_id)
        .populate("category")
        .populate("userId")
        .select("-__v -password");
    },

    categories: async () => {
      return await Category.find();
    },

    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "order.products",
          populate: "category",
        });
        return user.order.id(_id);
      }
      throw AuthenticationError;
    },
    // checkout query TODO.
  },

  Mutation: {
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

    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error("Failed to create User!");
      }
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }
      throw AuthenticationError;
    },

    deleteUser: async (parent, { confirm }, context) => {
      if (context.user) {
        if (confirm) {
          try {
            // Delete the user by their ID
            const deletedUser = await User.findByIdAndDelete(context.user._id);

            if (!deletedUser) {
              throw new Error("User not found.");
            }

            // Clean up associated user data (products and orders)
            await Product.deleteMany({ userId: context.user._id });
            await Order.deleteMany({ userId: context.user._id });

            // Return a message indicating successful deletion
            return {
              data: `User ${context.user.username} deleted successfully`,
              errors: [],
            };
          } catch (error) {
            throw new Error("Failed to delete user: " + error.message);
          }
        } else {
          throw new Error("You must confirm deletion!");
        }
      }
      throw new AuthenticationError("User not authenticated");
    },

    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });
        return order;
      }
      throw AuthenticationError;
    },

    //addProduct
  },
};

module.exports = resolvers;
