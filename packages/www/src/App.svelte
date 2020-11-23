<main>
  <section class="section has-text-centered hero is-fullheight py-0 px-0">
    <div class="hero-body is-flex is-flex-direction-column">
        <h1 class="my-6">Filmoteka</h1>
        <h2 class="subtitle is-capitalized is-size-4">Największa baza filmów!</h2>
    </div>
  </section>

  <MovieOptions />

  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        Filmoteka - Polska baza baza filmów &copy; 2020
      </p>
    </div>
  </footer>
</main>

<script>
  import MovieOptions from './components/MovieOptions.svelte'
</script>

<style lang="scss">
  @use 'sass:color';

  .hero-body {
    background-image: url(/frame.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.4);
    background-blend-mode: multiply;
    background-attachment: fixed;

    * {
      color: color.invert(#222);
    }
  }

  h1 {
    font-weight: 600;
    line-height: 1.125;
    font-size: 5rem;
  }
</style>
