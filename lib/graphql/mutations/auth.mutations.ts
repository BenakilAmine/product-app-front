import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments';

/**
 * Mutations GraphQL pour l'authentification
 */

// Mutation pour la connexion
export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        ...UserFields
      }
    }
  }
  ${USER_FRAGMENT}
`;

// Mutation pour l'inscription
export const SIGNUP_MUTATION = gql`
  mutation Signup($input: CreateUserInput!) {
    signup(input: $input) {
      token
      user {
        ...UserFields
      }
    }
  }
  ${USER_FRAGMENT}
`;

// Mutation pour la déconnexion (si besoin côté serveur)
export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

