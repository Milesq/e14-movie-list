import { readable } from 'svelte/store';
import req, { gql } from './graphqlClient';

export default readable([], async set => {
  const { genre } = await req(gql`
    query {
      genre {
        title
      }
    }
  `);

  set(genre.map(({ title }) => title));
});
