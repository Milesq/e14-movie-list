<MainNav />
<div class="container pt-6 px-4">
  <main class="columns">
    {#each movies as {poster, title, year, plot, awards, rating}}
      <div class="column is-6-tablet is-4-desktop is-3-widescreen">
        <MovieTile
          img={poster}
          {title}
          {year}
          {plot}
          {rating}
          {awards}
          className="card pb-3"
        />
      </div>
    {/each}
  </main>
</div>

<script>
  import { onMount } from 'svelte';
  import MainNav from '../components/MainNav.svelte';
  import MovieTile from '../components/MovieTile.svelte';
  import req, { gql } from '../utils/graphqlClient';

  export let params = {};

  let movies = [];

  onMount(() => {
    const category = params.category || '';

    const myData = gql`
      fragment MyData on Movie {
        title
        year
        rating
        plot
        poster
        awards
      }
    `;

    let query = gql`
      ${myData}
      query {
        movie {
          ...MyData
        }
      }
    `;

    if (category) {
      query = gql`
      ${myData}
        query($category: String!) {
          movie(where: { genre: { is: $category } }) {
            ...MyData
          }
        }
      `;
    }

    req(query, { category }).then(({ movie }) => {
      movies = movie;
    });
  });
</script>

<style>
  :global(html) {
    background: #f5f5f5;
  }
</style>
