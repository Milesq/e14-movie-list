<div class={className}>
  <div class="card-image">
    <figure class="image is-4by3">
      <img {src} alt="Movie poster">
      <figcaption>
        ok
      </figcaption>
    </figure>
  </div>
  <div class="card-content">
    <p class="title is-4">{title}</p>
    <p class="subtitle is-6">{awards}</p>

    <div class="content">
      {shortPlot}
      <hr>
      <span class="is-pulled-left">{rating}/5</span>
      <span class="is-pulled-right">{year}</span>
    </div>
  </div>
</div>

<script>
  const emptyImage =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png';

  export let className = '';
  export let img = '';
  export let title;
  export let year;
  export let plot;
  export let awards;
  export let rating = 0;

  $: src = img || emptyImage;
  $: shortPlot = plot.slice(0, 150) + (plot.length > 150? '...' : '');
</script>

<style>
  img:hover {
    transform: scale(1.05);
    transition: .8s transform ease;
  }
</style>
