const wordSetOne = [
  "Bacon",
  "Biscuit",
  "Burger",
  "Cake",
  "Candy",
  "Cheese",
  "Chips",
  "Chocolate",
  "Cookie",
  "Donut",
  "Fries",
  "Milkshake",
  "Nuggets",
];

const wordSetTwo = [
  "Asteroid",
  "Astronaut",
  "Black-Hole",
  "Comet",
  "Constellation",
  "Cosmos",
  "Dark-Matter",
  "Galaxy",
  "Gravity",
  "Meteor",
  "Milky Way",
  "Moon",
  "Nebula",
];

const firstNameSet = [
  "Chris",
  "John",
  "Sarah",
  "Michael",
  "Michelle",
  "Robert",
  "Jennifer",
  "William",
  "Elizabeth",
  "David",
  "Mary",
];

const lastNameSet = [
  "Smith",
  "Johnson",
  "Williams",
  "Jones",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
];

const emailSet = [
  "@gmail.com",
  "@yahoo.com",
  "@hotmail.com",
  "@outlook.com",
  "@icloud.com",
  "@aol.com",
  "@zoho.com",
  "@protonmail.com",
];

const categorySet = [
  "Home",
  "Electronics",
  "Kitchen",
  "Baby",
  "Sports",
  "Beauty",
  "Health",
  "Outdoors",
  "Toys",
  "Automotive",
  "Books",
  "Movies",
  "Music",
  "Video Games",
  "Pet Supplies",
  "Tools",
  "Grocery",
  "Arts",
  "Antiques",
  "Miscellaneous",
];

const productSet = [
  "4k TV",
  "Air Fryer",
  "Air Purifier",
  "Apple Watch",
  "Baby Monitor",
  "Backpack",
  "Bike",
  "Blender",
  "Bluetooth Speaker",
  "Camera",
  "Car Seat",
  "Coffee Maker",
  "Computer Monitor",
  "Cordless Drill",
  "Cordless Vacuum",
  "Crock Pot",
  "Digital Camera",
  "Dishwasher",
  "Drone",
  "Electric Toothbrush",
  "Espresso Machine",
  "Food Processor",
  "Gaming Chair",
];

// HELPER FUNCTION TO GET A RANDOM ITEM FROM AN ARRAY
const getRandomItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// HELPER FUNCTION TO GENERATE A RANDOM PRICE
const getRandomPrice = () => {
  // Generate a random price between 0 and 500
  const randomPrice = +(Math.random() * 500).toFixed(2);
  return randomPrice;
};

// GENERATE RANDOM USERNAME
const getRandomUsername = () => {
  const randomSetOne = getRandomItem(wordSetOne);
  const randomSetTwo = getRandomItem(wordSetTwo);

  // Generate a random number between 10 and 99 after the generated username
  const username =
    randomSetTwo + randomSetOne + Math.floor(Math.random() * 90 + 10);

  return username;
};

// GENERATE RANDOM EMAIL FOR A USER
const getRandomEmail = (username) => {
  const randomEmailDomain = getRandomItem(emailSet);
  const email = username.toLowerCase() + randomEmailDomain;

  return email;
};

// GENERATE RANDOM NAME FOR A USER
const getRandomName = () => {
  const randomFirstName = getRandomItem(firstNameSet);
  const randomLastName = getRandomItem(lastNameSet);
  const name = randomFirstName + " " + randomLastName;

  return name;
};

const createRandomOrder = (users, products) => {
  // Select a random user as the userId
  const validUsers = users.filter((user) => user.products.length > 0); // Exclude users with no products
  const userId = getRandomItem(validUsers)._id;

  // Select a random product as the productId
  const selectedProduct = getRandomItem(products);
  const maxOrderQuantity = selectedProduct.quantity;
  const orderQuantity = Math.floor(Math.random() * maxOrderQuantity) + 1;

  return {
    userId,
    products: [
      {
        product: selectedProduct._id,
        quantity: orderQuantity,
      },
    ],
  };
};

module.exports = {
  categorySet,
  productSet,
  getRandomItem,
  getRandomPrice,
  getRandomUsername,
  getRandomEmail,
  getRandomName,
  createRandomOrder,
};
