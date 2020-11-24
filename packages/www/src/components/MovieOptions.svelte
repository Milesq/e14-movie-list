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
              class="button is-transitioned is-pulled-right	mt-3 is-capitalized is-outlined is-inverted is-success">
              <span>Przeglądaj wszystkie</span>
              <span class="icon">
                <i class="fas fa-arrow-right"></i>
              </span>
            </button>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-warning">
            <p class="title">Film Dnia</p>
            <p class="subtitle">
              Zapoznaj się z filmem docenionym przez krytyków!
            </p>
            <div class="content">
              <div class="hero poster" style="background-image: url({randomMovie.poster})"></div>
              <h3 class="title">{randomMovie.title}</h3>
              <div class="subtitle">
                Gatunki: {randomMovie.genre} <br>
                Ocena: {randomMovie.rating}/5 <br>
                Nagrody: {randomMovie.awards}
              </div>

              <p>{randomMovie.plot}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import CreateMovie from './CreateMovie.svelte';
  import CategoryExplorer from './CategoryExplorer.svelte';
  import req, { gql } from '../utils/graphqlClient';

  let randomMovie = {}

  function showAll() {
    push('/movies');
  }

  onMount(async () => {
    const randomMovieQuery = gql`
      query {
        movie(order: RANDOM, limit: 1) {
          title
          genre
          poster
          rating
          plot
          awards
        }
      }
    `;

    const { movie: [movie] } = await req(randomMovieQuery);

    randomMovie = movie;
  });
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

  .poster {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 4px;
    box-shadow: 1px 1px 3px -2px black;
    height: 40vh;
  }
</style>
