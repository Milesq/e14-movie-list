<div>
  {#each $genres as genre}
    <div
      use:link={`/category/genre`}
      class={`mx-2 tag is-link is-clickable is-medium ${getRandomColorClass()}`}>
      {genre}
    </div>
  {/each}
</div>

<script>
  import genres from '../utils/getGenres';
  import { push } from 'svelte-spa-router';

  const random = (min, max) => Math.round(Math.random() * (max - min) + min);

  function getRandomColorClass() {
    let classes = (random(0, 1) ? 'is-light' : '') + ' ';
    const possibleClasses = [
      'black',
      'dark',
      'white',
      'primary',
      'link',
      'info',
      'success',
      'warning',
      'danger',
    ];

    const chosenClass = possibleClasses[random(0, possibleClasses.length - 1)];

    classes += `is-${chosenClass}`;
    return classes;
  }

  function link(node, href) {
    node.addEventListener('click', () => {
      push(href)
    });
  }
</script>
