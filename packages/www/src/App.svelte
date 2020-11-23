<Router {routes} />

<script>
  import Router from 'svelte-spa-router';
  import Home from './pages/Home.svelte';
  import Category from './pages/Category.svelte';

  const routes = {
    '/': Home,
    '/category/:category': Category,
  };
</script>
