import { writable } from 'svelte/store';
import req, { gql } from './graphqlClient';

async function fetchGenres(set) {
  const { genre } = await req(gql`
    query {
      genre {
        title
      }
    }
  `);

  set(genre.map(({ title }) => title));
}

const { subscribe, update } = writable([], fetchGenres);

export default {
  subscribe,
  create(title) {
    update(arr => [...arr, title]);
  },
};
