<MainNav />
<div class="container pt-6">
  <main class="columns">
    {#each movies as {poster, title, year, plot, awards, rating}}
      <MovieTile
        img={poster}
        {title}
        {year}
        {plot}
        {rating}
        {awards}
        className="card pb-3 column is-3"
      />
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
    req(gql`
      query {
        movie {
          title
          year
          rating
          plot
          poster
          awards
        }
      }
    `).then(({ movie }) => {
      movies = movie;
    });
  });
</script>
