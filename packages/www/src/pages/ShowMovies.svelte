<div>ok</div>

<script>
  import { onMount } from 'svelte';

  export let params = {};

  onMount(() => console.log(params));
</script>
