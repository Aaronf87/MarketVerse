const typeDefs = `#graphql

type User {
    _id: ID
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    products: [Product]
    orders: [Order]
    
    # TODO: Remove password field before deploying
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

type OrderProduct {
  product: Product
  quantity: Int  
}

input OrderInput {
  product: ID!
  quantity: Int!
}

type Order {
    _id: ID
    userId: User!
    purchaseDate: String
    products: [OrderProduct]
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

# Response for Delete Mutation
type Response {
    data: String
    errors: [String]
}

# TODO: The input type for the products being passed to the checkout session

type Query {
    me: User
    getProducts(category: ID): [Product]
    getProduct(_id: ID!): Product
    getCategories: [Category]
    getOrder(_id: ID!): Order

    # TODO: checkout(products: [ProductInput]): Checkout
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, username: String, email: String, password: String): User
    deleteUser(confirm: Boolean!): Response
    addProduct(name: String!, description: String, price: Float!, quantity: Int, category: ID!, image: String): Product
    updateProduct(_id: ID!, name: String, description: String, price: Float, quantity: Int, category: ID, image: String): Product
    deleteProduct(_id: ID!, confirm: Boolean!): Response
    addOrder(input: [OrderInput]): Order
}
`;

module.exports = typeDefs;
