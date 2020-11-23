<Router {routes} />

<script>
  import Router from 'svelte-spa-router';
  import Home from './pages/Home.svelte';
  import ShowMovies from './pages/ShowMovies.svelte';

  const routes = {
    '/': Home,
    '/movies/:category?': ShowMovies,
  };
</script>
