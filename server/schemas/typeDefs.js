const typeDefs = `#graphql
type User {
    _id: ID
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    orders: [Order]
}

type Book {
#! Revisit
    _id: ID

    bookId: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
    price: Float
}

type Order {
#! Revisit
    _id: ID

    #userId: ID!
    purchaseDate: String
    books: [Book]
    quantity: Int
}

type Checkout {
    session: ID
  }

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users: [User]
    user(userId: ID!): User
    books: [Book]
    book(bookId: ID!): Book
    order(_id: ID!): Order
    #checkout(itmes: [BookInput]): Checkout
}



`;

module.exports = typeDefs;

// type Mutation {
//     login(email: String!, password: String!): Auth
//     addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
//     updateUser(firstName: String, lastName: String, username: String, email: String, password: String): User
//     removeUser(userId: ID!): User
//     addBook(bookId: ID!, authors: [String], description: String, image: String, link: String, title: String!, price: Float): Book
//     removeBook(bookId: ID!): Book
//     addCart(userId: ID!, purchaseDate: String, books: [Book], quantity: Int): Cart
//     updateCart(userId: ID!, purchaseDate: String, books: [Book], quantity: Int): Cart
//     removeCart(userId: ID!): Cart
// }