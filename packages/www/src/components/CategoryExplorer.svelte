<div>
  {#each $getGenres as genre}
    <div
      on:click={showGenre(genre)}
      class={`mx-2 tag is-link is-clickable is-medium ${getRandomColorClass()}`}>
      {genre}
    </div>
  {/each}
</div>

<script>
  import getGenres from '../utils/getGenres';

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

  function showGenre(genre) {
    console.log(genre);
  }
</script>
