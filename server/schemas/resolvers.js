const { User, Product, Order, Category } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const { uploadImage, cloudConfig } = require("../utils/imageUploader");

// Import dotenv and cloudinary for image uploads
require("dotenv").config();
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

// TODO: const stripe = require("stripe")(`${process.env.STRIPE_SECRET}`);

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
          .populate({
            path: "orders",
            populate: { path: "products.product", model: "Product" },
          });

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
        .select("-__v -password")
        .sort({ createdAt: -1 });
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
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

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
              data: `User "${context.user.username}" deleted successfully`,
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
          await cloudinary.config(cloudConfig);

          const result = await uploadImage(args.image);

          const imageParams = {
            cloudinaryId: result.asset_id,
            url: result.secure_url,
          };

          const product = await Product.create({
            userId: context.user._id,
            name: args.name,
            description: args.description,
            price: args.price,
            quantity: args.quantity,
            category: args.category,
            image: imageParams,
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
          // VERIFY USER PERMISSION TO UPDATE PRODUCT
          const verifyProduct = await Product.findById(args._id);

          if (verifyProduct.userId.toString() !== context.user._id) {
            throw new AuthenticationError(
              "You do not have permission to update this product"
            );
          }

          // FIND PRODUCT BY ID AND UPDATE IT
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

    // DELETE A PRODUCT FOR THE CURRENT USER (MUST BE LOGGED IN)
    deleteProduct: async (parent, { _id, confirm }, context) => {
      if (context.user) {
        if (confirm) {
          try {
            // VERIFY USER PERMISSIONS TO DELETE PRODUCT
            const verifyProduct = await Product.findById(_id);

            if (verifyProduct.userId.toString() !== context.user._id) {
              throw new AuthenticationError(
                "You do not have permission to delete this product"
              );
            }

            // FIND PRODUCT BY ID AND DELETE IT
            const deletedProduct = await Product.findByIdAndDelete(_id);

            if (!deletedProduct) {
              throw new Error("Product not found.");
            }

            // REMOVE PRODUCT FROM USER'S PRODUCTS ARRAY
            await User.findByIdAndUpdate(
              context.user._id,
              { $pull: { products: deletedProduct._id } },
              { new: true }
            );

            // RETURN A MESSAGE INDICATING SUCCESSFUL DELETION
            return {
              data: `Product "${deletedProduct.name}" deleted successfully`,
              errors: [],
            };
          } catch (err) {
            throw new Error("Failed to delete product!");
          }
        } else {
          throw new Error("You must confirm deletion!");
        }
      }
      throw AuthenticationError;
    },

    // ADD A NEW ORDER FOR THE CURRENT USER (MUST BE LOGGED IN)
    addOrder: async (parent, { input }, context) => {
      if (context.user) {
        try {
          const newOrder = await Order.create({
            userId: context.user._id,
            products: input,
          });

          const newOrderData = await Order.findById(newOrder._id).populate({
            path: "products.product",
            model: "Product",
          });

          return newOrderData;
        } catch (err) {
          throw new Error("Failed to create order!");
        }
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
