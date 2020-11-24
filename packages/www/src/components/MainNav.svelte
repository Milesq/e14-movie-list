<div>
  <nav class="navbar has-background-info-light" role="navigation">
    <div class="navbar-brand is-clickable">
      <div class="navbar-item">
        <a use:link href="/" class="icon is-large is-size-3 has-text-info">
          <i class="fas fa-home"></i>
        </a>
      </div>

      <div on:click={() => (hamburgerIsActive = !hamburgerIsActive)} role="button" class="navbar-burger" class:is-active={hamburgerIsActive} aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <span class="navbar-link">Gatunki</span>

          <div class="navbar-dropdown is-boxed">
            <a use:link href="/movies" class="navbar-item">
              Pokaż wszystko
            </a>

            <hr class="navbar-divider">
            <div class="navbar-item">Według gatunku:</div>
            <hr class="navbar-divider">

            {#each $genres as genre}
              <a use:link href="/movies/{genre}" class="navbar-item">
                {genre}
              </a>
            {/each}
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <a href="https://github.com/milesq" target="blank" class="navbar-item">
          <div class="icon is-large is-size-4">
            <i class="fab fa-github"></i>
          </div>
        </a>
      </div>
    </div>
  </nav>
</div>

<script>
  import { link } from 'svelte-spa-router';
  import genres from '../utils/getGenres';
  let hamburgerIsActive = true;
</script>
