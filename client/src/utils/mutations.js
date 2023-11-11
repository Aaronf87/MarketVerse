import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
  addUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
    token
    user {
      _id
    }
  }
}
`;

export const LOGIN_USER = gql`
mutation loginUser($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;

export const UPDATE_USER = gql`
mutation updateUser($firstName: String, $lastName: String, $username: String, $email: String, $password: String) {
  updateUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
    _id
  }
}
`;

export const DELETE_USER = gql`
mutation deleteUser($confirm: Boolean!) {
  deleteUser(confirm: $confirm) {
    data
    errors
  }
}
`;

export const ADD_PRODUCT = gql`
mutation AddProduct($name: String!, $description: String, $price: Float!, $quantity: Int, $category: ID!, $image: String) {
  addProduct(name: $name, description: $description, price: $price, quantity: $quantity, category: $category, image: $image) {
    _id
  }
}
`;

export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($id: ID!, $name: String, $description: String, $price: Float, $quantity: Int, $category: ID, $image: String) {
  updateProduct(_id: $id, name: $name, description: $description, price: $price, quantity: $quantity, category: $category, image: $image) {
    _id
  }
}
`;

export const DELETE_PRODUCT = gql`
mutation DeleteProduct($id: ID!, $confirm: Boolean!) {
  deleteProduct(_id: $id, confirm: $confirm) {
    data
    errors
  }
}
`;

