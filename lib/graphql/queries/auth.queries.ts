import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments';

/**
 * Queries GraphQL pour l'authentification
 */

// Query pour récupérer l'utilisateur connecté
export const ME_QUERY = gql`
  query Me {
    me {
      ...UserFields
    }
  }
  ${USER_FRAGMENT}
`;

