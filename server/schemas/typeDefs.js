const typeDefs = `#graphql
type User {
    _id: ID
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    products: [Product]
    orders: [Order]
}

type Product {
    _id: ID

    # ! Revisit
    user: User!
    name: String!
    description: String
    price: Float!
    quantity: Int
    category: Category!
    image: String
}

type Order {
    #! Revisit

    _id: ID
    userId: ID!
    purchaseDate: String
    products: [Product]
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
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ProductInput]): Checkout
}

type Mutation {
    login (email: String!, password: String!): Auth
    addUser (firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    addOrder (books: [ID]!): Order
}

`;

module.exports = typeDefs;
