const typeDefs = `#graphql
type User {
    _id: ID
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    products: [Product]
    orders: [Order]
    # Removed password field for security reasons
}

type Product {
    _id: ID
    user: User!
    name: String!
    description: String
    price: Float!
    quantity: Int
    category: Category! # Ensure this type is defined
    image: String
}

type Order {
    _id: ID
    user: User! # Assume that we have a reference to the User object, not just the ID
    purchaseDate: String
    products: [Product]
    quantity: Int
    # Consider adding other relevant fields such as order status
}

type Category {
    _id: ID
    name: String!
}

type Auth {
    token: ID!
    user: User
}

type Checkout {
    session: ID
}

type Query {
    me: User
    users: [User]
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    #checkout(products: [ProductInput]): Checkout
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    createCheckoutSession(products: [ProductInput]!): Checkout # This is the new mutation for Stripe
}

# The input type for the products being passed to the checkout session
input ProductInput {
    id: ID!
    quantity: Int!
}

`;

module.exports = typeDefs;


