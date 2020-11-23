<form on:submit|preventDefault={submit} bind:this={form} autocomplete="off">
  <div class="field">
    <label class="label has-text-white" for="title">Tytuł</label>
    <div class="control has-icons-left">
      <input
        bind:value={title}
        class="input"
        type="text"
        id="title"
        placeholder="Tytuł Filmu" />

      <span class="icon is-left"> <i class="fas fa-heading" /> </span>
    </div>
  </div>

  <div class="field">
    <div class="field">
      <label class="label has-text-white" for="genre">Gatunek</label>
      <div class="control has-text-black">
        <Select
          bind:this={select}
          items={$genres}
          bind:selectedValue={selectedGenre}
          isCreatable={true}
          inputClassName="input"
          inputId="genre"
          placeholder="Gatunek Filmu - wybierze jeden z listy lub dodaj swój" />
      </div>
    </div>
  </div>

  <div class="field">
    <label class="label has-text-white" for="genre">Rok Wydania</label>
    <div class="control">
      <input
        class="input is-error"
        min="1900"
        type="number"
        bind:value={year}
        placeholder="Rok wydania" />
    </div>
    {#if year < 1900}
      <p class="help is-danger is-size-6 error-info">
        Minimalna wartość to 1900
      </p>
    {/if}
  </div>

  <div class="label has-text-white">Ocena</div>
  <Rate afterRate={newRate => (rating = newRate)} />

  <div><button class="button is-link is-pulled-right">Dodaj film</button></div>
</form>

<script>
  import Rate from 'svelte-rate-it/Rate.svelte';
  import Select from 'svelte-select';
  import req, { gql } from '../utils/graphqlClient';
  import genres from '../utils/getGenres';

  let form, select, title, selectedGenre, year, rating;

  async function submit() {
    const createMovie = gql`
      mutation($movie: MovieInput!) {
        createMovie(input: $movie) {
          title
        }
      }
    `;

    req(createMovie, {
      movie: {
        title,
        genre: selectedGenre.value,
        year,
        rating,
      },
    });

    form.reset();
    select.handleClear();
  }
</script>

<style>
  .error-info {
    animation: bounce 0.5s;
  }

  @keyframes bounce {
    from {
      transform: translateX(0px);
      timing-function: ease-in;
    }
    37% {
      transform: translateX(5px);
      timing-function: ease-out;
    }
    55% {
      transform: translateX(-5px);
      timing-function: ease-in;
    }
    73% {
      transform: translateX(4px);
      timing-function: ease-out;
    }
    82% {
      transform: translateX(-4px);
      timing-function: ease-in;
    }
    91% {
      transform: translateX(2px);
      timing-function: ease-out;
    }
    96% {
      transform: translateX(-2px);
      timing-function: ease-in;
    }
    to {
      transform: translateX(0px);
      timing-function: ease-in;
    }
  }
</style>
