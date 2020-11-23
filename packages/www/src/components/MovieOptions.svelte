<div class="movies container my-6 px-6-touch">
  <div class="tile is-ancestor">
    <div class="tile">
      <div class="tile">
        <div class="tile is-parent is-vertical">
          <article class="tile is-child notification is-primary">
            <p class="title">Dodawanie Filmów</p>
            <p class="subtitle">
              Twojego filmu nie ma w naszej bazie? Dodaj go!
            </p>
            <CreateMovie />
          </article>
          <article class="tile is-child notification is-info">
            <p class="title">Wyszukaj</p>
            <p class="subtitle">
              Przeglądaj filmy według wybranej kategori lub wszystkie na raz!
            </p>
            <CategoryExplorer />

            <button
              on:click={showAll}
              class="button is-transitioned is-pulled-right	mt-3 is-capitalized is-outlined is-inverted is-success">Przeglądaj
              wszystkie</button>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-warning">
            <p class="title">Film Dnia</p>
            <p class="subtitle">
              Zapoznaj się z filmem doceniomym przez krytyków!
            </p>
            <figure class="image is-4by3">
              <img src="https://picsum.photos/400/300" alt="" />
            </figure>
          </article>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  import { push } from 'svelte-spa-router';
  import CreateMovie from './CreateMovie.svelte';
  import CategoryExplorer from './CategoryExplorer.svelte';

  function showAll() {
    push('/movies');
  }
</script>

<style lang="scss">
  .movies {
    @media screen and (min-width: 550px) and (max-width: 1024px) {
      margin: auto 2rem;
    }
    @media screen and (max-width: 549px) {
      margin: auto 1rem;
    }
  }

  img {
    border-radius: 4px;
    box-shadow: 1px 1px 3px -2px black;
  }
</style>
