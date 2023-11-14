const connection = require("../config/connection.js");

const chalk = require("chalk");

const { Category } = require("../models/index.js");

// IMPORT THE HELPER FUNCTIONS
const dropCollectionIfExists = require("./dropCollectionIfExists.js");
const serializeData = require("./serializeData.js");

const categories = [
  { name: "Kitchen"},
  { name: "Electronics" },
  { name: "Home" },
  { name: "Outdoors" },
  { name: "Tools" },
  { name: "Office" },
];

// SEED THE DATABASE WITH RANDOM DATA
const seedDatabase = async () => {
  try {
    // Wait for the database connection to establish before seeding data.
    await new Promise((resolve) => {
      connection.once("open", resolve);
    });

    console.log(
      chalk.yellow
        .bold`\n===========================================================`
    );
    console.log(
      chalk.green
        .bold`DATABASE CONNECTION OPEN\n STATUS: ${connection.readyState}`
    );
    console.log(
      chalk.yellow
        .bold`===========================================================`
    );

    // DROP EXISTING COLLECTIONS FROM THE DATABASE (IF ANY EXIST).
    // await dropCollectionIfExists("users");
    await dropCollectionIfExists("categories");
    // await dropCollectionIfExists("products");
    // await dropCollectionIfExists("orders");

    // CREATE THE CATEGORY COLLECTION WITH CATEGORIES.
    await Category.collection.insertMany(categories);
    const seededCategories = await serializeData(Category);

    console.log(
      chalk.bold
        .green`\n===========================================================`
    );
    console.log(
      chalk.bold.green`CREATED ${chalk.bold
        .magenta`CATEGORY`} COLLECTION: SEEDED "${chalk.bold.magenta(
        seededCategories.length
      )}" CATEGORIES!`
    );
    console.log(
      chalk.bold
        .green`===========================================================`
    );

    console.log(
      chalk.bold
        .green`\n===========================================================`
    );
    console.log(chalk.bold.green`SEEDING COMPLETE!`);
    console.log(
      chalk.bold
        .green`===========================================================`
    );
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    // Close the database connection
    connection.close();

    // Log that the connection is closed.
    console.log(
      chalk.yellow
        .bold`===========================================================`
    );
    console.log(
      chalk.red
        .bold`DATABASE CONNECTION CLOSED\n STATUS: ${connection.readyState}`
    );
    console.log(
      chalk.yellow
        .bold`===========================================================`
    );
  }
};

seedDatabase();
