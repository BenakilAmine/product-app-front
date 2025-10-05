import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments';

/**
 * Mutations GraphQL pour l'administration
 */

// Mutation pour mettre à jour le rôle d'un utilisateur
export const UPDATE_USER_ROLE_MUTATION = gql`
  mutation UpdateUserRole($id: ID!, $role: String!) {
    updateUserRole(id: $id, role: $role) {
      ...UserFields
    }
  }
  ${USER_FRAGMENT}
`;

// Mutation pour supprimer un utilisateur
export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

// Mutation pour bannir/débannir un utilisateur
export const TOGGLE_USER_STATUS_MUTATION = gql`
  mutation ToggleUserStatus($id: ID!, $status: String!) {
    toggleUserStatus(id: $id, status: $status) {
      ...UserFields
    }
  }
  ${USER_FRAGMENT}
`;

