import React, {Fragment} from 'react';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'https://cagd-api.herokuapp.com/graphql',
  cache: new InMemoryCache(),
  onError: ({networkError}) => {
    if (networkError) {
      console.log('network error');
    }
  },
});

const ClientAppollo = ({children}) => {
  return (
    <Fragment>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </Fragment>
  );
};

export default ClientAppollo;
