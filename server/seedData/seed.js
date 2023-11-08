const connection = require("../config/connection.js");

const chalk = require('chalk');

const { User, Category, Order, Product } = require("../models");
const {
  categorySet,
  productSet,
  getRandomItem,
  getRandomPrice,
  getRandomUsername,
  getRandomEmail,
  getRandomName,
  createRandomOrder,
} = require("./data.js");

// IMPORT THE HELPER FUNCTIONS
const dropCollectionIfExists = require("./dropCollectionIfExists.js");
const serializeData = require("./serializeData.js");

// SEED THE DATABASE WITH RANDOM DATA
const seedDatabase = async () => {
  try {
    // Wait for the database connection to establish before seeding data.
    await new Promise((resolve) => {
      connection.once("open", resolve);
    });

    console.log(chalk.yellow.bold`\n===========================================================`);
    console.log(chalk.green.bold`DATABASE CONNECTION OPEN\n STATUS: ${connection.readyState}`);
    console.log(chalk.yellow.bold`===========================================================`);

    // DROP EXISTING COLLECTIONS FROM THE DATABASE (IF ANY EXIST).
    await dropCollectionIfExists("users");
    await dropCollectionIfExists("categories");
    await dropCollectionIfExists("products");
    await dropCollectionIfExists("orders");

    // SEED THE USER COLLECTION WITH RANDOM USERS AND EMAILS.
    const users = [];

    for (let i = 0; i < 30; i++) {
      const fullName = getRandomName();

      const firstName = fullName.split(" ")[0];
      const lastName = fullName.split(" ")[1];
      const username = getRandomUsername();
      const email = getRandomEmail(username);
      // Hashed password for "password1234"
      const password = "$2b$10$rAz79Rm4kCYNmiQlmUWv9..7zaE2Zug/3W3F7MsvSz4mAbfkIZOzO"

      const user = {
        firstName,
        lastName,
        username,
        email,
        password,
      };

      users.push(user);
    }

    // CREATE THE USER COLLECTION WITH RANDOM USERS AND EMAILS.
    await User.collection.insertMany(users);
    const seededUsers = await serializeData(User);

    console.log(chalk.bold.green`\n===========================================================`);
    console.log(chalk.bold.green`CREATED ${chalk.bold.magenta`USER`} COLLECTION: SEEDED "${chalk.bold.magenta(users.length)}" USERS!`);
    console.log(chalk.bold.green`===========================================================`);

    // SEED THE CATEGORY COLLECTION WITH CATEGORIES.
    const categories = [];

    for (let i = 0; i < categorySet.length; i++) {

      const category = {
        name: categorySet[i],
      };

      categories.push(category);
    }

    // CREATE THE CATEGORY COLLECTION WITH CATEGORIES.
    await Category.collection.insertMany(categories);
    const seededCategories = await serializeData(Category);

    console.log(chalk.bold.green`\n===========================================================`);
    console.log(chalk.bold.green`CREATED ${chalk.bold.magenta`CATEGORY`} COLLECTION: SEEDED "${chalk.bold.magenta(seededCategories.length)}" CATEGORIES!`);
    console.log(chalk.bold.green`===========================================================`);

    // SEED THE PRODUCT COLLECTION WITH PRODUCTS.
    const products = [];

    for (let i = 0; i < productSet.length; i++) {
      const selectedUser = getRandomItem(seededUsers);
      const selectedCategory = getRandomItem(seededCategories);

      const userId = selectedUser._id;
      const name = productSet[i];
      const description = `This is a ${name}.`;
      const price = getRandomPrice(); // Between 0 and 500
      const quantity = Math.floor(Math.random() * 10); // Between 0 and 10
      const category = selectedCategory._id;
      const image = `https://source.unsplash.com/1600x900/?${name}`;

      const item = {
        userId,
        name,
        description,
        price,
        quantity,
        category,
        image,
      }

      products.push(item);
    }

    // CREATE THE PRODUCT COLLECTION WITH PRODUCTS.
    await Product.collection.insertMany(products);
    const seededProducts = await serializeData(Product);

    for (const product of seededProducts) {
      const userId = product.userId;
      const _id = product._id;

      // UPDATE THE USER'S IN USER COLLECTION WITH PRODUCT ID'S BASED ON USER ID
      await User.findByIdAndUpdate(
        userId,
        {
          $push: { products: _id },
        },
        { new: true }
      );
    }

    const updatedSeededUsers = await serializeData(User);

    console.log(chalk.bold.green`\n===========================================================`);
    console.log(chalk.bold.green`CREATED ${chalk.bold.magenta`PRODUCT`} COLLECTION: SEEDED "${chalk.bold.magenta(seededProducts.length)}" PRODUCTS AND UPDATED USERS!`);
    console.log(chalk.bold.green`===========================================================`);

    // SEED THE ORDER COLLECTION WITH ORDERS.
    const orders = [];

    for (let i = 0; i < 40; i++) {
      const order = createRandomOrder(updatedSeededUsers, seededProducts);
      orders.push(order);
      console.log(order)
    }

    // CREATE THE ORDER COLLECTION WITH ORDERS.
    await Order.collection.insertMany(orders);
    const seededOrders = await serializeData(Order);

    for (const order of seededOrders) {
      const userId = order.userId;
      const _id = order._id;

      // UPDATE THE USER'S IN USER COLLECTION WITH ORDER ID'S BASED ON USER ID
      await User.findByIdAndUpdate(
        userId,
        {
          $push: { orders: _id },
        },
        { new: true }
      );
    }

    console.log(chalk.bold.green`\n===========================================================`);
    console.log(chalk.bold.green`CREATED ${chalk.bold.magenta`ORDER`} COLLECTION: SEEDED "${chalk.bold.magenta(orders.length)}" ORDERS AND UPDATED USERS!`);
    console.log(chalk.bold.green`===========================================================`);

    console.log(chalk.bold.green`\n===========================================================`);
    console.log(chalk.bold.green`SEEDING COMPLETE!`);
    console.log(chalk.bold.green`===========================================================`);

  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    // Close the database connection
    connection.close();

    // Log that the connection is closed.
    console.log(chalk.yellow.bold`===========================================================`);
    console.log(chalk.red.bold`DATABASE CONNECTION CLOSED\n STATUS: ${connection.readyState}`);
    console.log(chalk.yellow.bold`===========================================================`);
  }
};

seedDatabase();
