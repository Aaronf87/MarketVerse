const typeDefs = `#graphql
type User {
    _id: ID
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    products: [Product]
    orders: [Order]
    
    # ! Revisit: Remove password field for security reasons
    password: String!
}

type Product {
    _id: ID
    userId: User!
    name: String!
    description: String
    price: Float!
    quantity: Int
    category: Category! 
    image: String
}

type Order {
    _id: ID
    userId: User!
    purchaseDate: String
    products: [Product]
    quantity: Int

    # Consider adding other relevant fields such as order status
}

type Category {
    _id: ID
    name: String!
}

type Checkout {
    session: ID
}

type Auth {
    token: ID!
    user: User
}

type Response {
data: String
errors: [String]
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
    updateUser(firstName: String, lastName: String, username: String, email: String, password: String): User
    deleteUser(confirm: Boolean!): Response

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


