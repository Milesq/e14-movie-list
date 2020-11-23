<form on:submit|preventDefault="{submit}">
  <div class="field">
    <label class="label has-text-white" for="title">Tytuł</label>
    <div class="control has-icons-left">
      <input class="input" type="text" id="title" placeholder="Tytuł Filmu" />

      <span class="icon is-left"> <i class="fas fa-heading"></i> </span>
    </div>
  </div>

  <div class="field">
    <div class="field">
      <label class="label has-text-white" for="genre">Gatunek</label>
      <div class="control">
        <AutoComplete
          items="{$getGenres}"
          bind:selectedItem="{selectedGenre}"
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
        bind:value="{year}"
        placeholder="Rok wydania" />
    </div>
    {#if year < 1900}
      <p class="help is-danger is-size-6 error-info">
        Minimalna wartość to 1900
      </p>
    {/if}
  </div>

  <div class="label has-text-white">Ocena</div>
  <Rate afterRate="{newRate => (rating = newRate)}" />

  <div class="level">
    <div class="level-left"></div>
    <div class="level-right">
      <button class="button is-link level-item">Dodaj film</button>
    </div>
  </div>
</form>

<script>
  import Rate from 'svelte-rate-it/Rate.svelte';
  import AutoComplete from 'simple-svelte-autocomplete';
  import getGenres from '../utils/getGenres';

  let year,
    selectedGenre,
    rating;


  function submit() {}
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
