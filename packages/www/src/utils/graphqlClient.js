import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('http://localhost:4000');

export { gql };
export default (query, variables) => client.request(query, variables);
