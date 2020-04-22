import { gql } from 'apollo-boost';

export const getMDAS = gql`
  query mdas {
    MDAs {
      id
      name
      address
      prefix
      address
      email
      phone
      status
      token
    }
  }
`;

export const productForMDA = gql`
  query mdas($id: MongoID!) {
    products(mdaID: $id) {
      type
      name
      shortCode
      unitPrice
      bundleSize
      minOrderCount
    }
  }
`;
