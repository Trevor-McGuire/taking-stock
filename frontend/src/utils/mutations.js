import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!) {
    addUser(username: $username, email: $email) {
      id
      username
      email
    }
  }
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      username
      email
    }
  }
}
`;

export const REGISTER_USER = gql`
  mutation registerUser($email: String!, $username: String!, $password: String!) {
    registerUser(email: $email, username: $username, password: $password) {
      _id
      email
      username
      createdAt
    }
  }
`;
