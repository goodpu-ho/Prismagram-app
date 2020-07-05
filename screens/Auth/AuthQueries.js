import { gql } from "apollo-boost";

export const LOGIN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;
