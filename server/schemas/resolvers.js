const { User, Product, Order, Category } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
require("dotenv").config();

// const stripe = require("stripe")(`${process.env.STRIPE_SECRET}`);

const resolvers = {
  Query: {
    // GET CURRENT USER DATA
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
      throw AuthenticationError;
    },

    // GET ALL PRODUCTS OR PRODUCTS BY CATEGORY
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

    // GET ONE PRODUCT BY ID
    getProduct: async (parent, { _id }) => {
      return await Product.findById(_id)
        .populate("category")
        .populate("userId")
        .select("-__v -password");
    },

    // GET ALL CATEGORIES
    getCategories: async () => {
      return await Category.find();
    },

    // GET ONE "CURRENT" USER ORDER BY ID (MUST BE LOGGED IN).
    getOrder: async (parent, { _id }, context) => {
      if (context.user) {
        const order = await Order.findOne({ _id: _id })
          .populate("userId")
          .select("-__v -password")
          .populate("products")
          .populate({ path: "products", populate: "category" });

        // Check if the order exists and if it belongs to the logged-in user
        if (!order) {
          throw new Error("Order not found");
        }

        if (order.userId._id.toString() !== context.user._id) {
          throw new AuthenticationError(
            "You do not have permission to access this order"
          );
        }

        return order;
      }
      throw AuthenticationError;
    },

    // checkout: async (parent, args, context) => {
    // TODO: Create Checkout Resolver. See stripe documentation for more information.
    // },
  },

  Mutation: {
    // LOGIN USER
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

    // CREATE A NEW USER
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error("Failed to create User!");
      }
    },

    // UPDATE CURRENT USER
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }
      throw AuthenticationError;
    },

    // DELETE CURRENT USER
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
      throw AuthenticationError;
    },

    // ADD A NEW PRODUCT FOR THE CURRENT USER (MUST BE LOGGED IN)
    addProduct: async (parent, args, context) => {
      if (context.user) {
        try {
          const product = await Product.create({
            ...args,
            userId: context.user._id,
          });

          await User.findByIdAndUpdate(
            context.user._id,
            { $push: { products: product._id } },
            { new: true }
          );

          return product;
        } catch (err) {
          throw new Error("Failed to create product!");
        }
      }
      throw AuthenticationError;
    },

    // UPDATE A PRODUCT FOR THE CURRENT USER (MUST BE LOGGED IN)
    updateProduct: async (parent, args, context) => {
      if (context.user) {
        try {
          const product = await Product.findOneAndUpdate(
            { _id: args._id },
            { ...args },
            { new: true }
          );

          return product;
        } catch (err) {
          throw new Error("Failed to update product!");
        }
      }
      throw AuthenticationError;
    },

    // deleteProduct: async (parent, { _id }, context) => {},

    // addOrder: async (parent, args, context) => {},
  },
};

module.exports = resolvers;
