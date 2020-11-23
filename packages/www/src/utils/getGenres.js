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

// https://github.com/sveltejs/svelte/issues/4765
const { subscribe, update } = writable([], set => {
  fetchGenres(set);
});

export default {
  subscribe,
  create(title) {
    update(arr => [...arr, title]);
  },
};
