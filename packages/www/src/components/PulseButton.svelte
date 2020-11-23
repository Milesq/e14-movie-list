<!-- https://codepen.io/oliviale/pen/vPvvyr?editors=1100 -->
<div class="button-pulse" on:click>
  <div class="pulsing"></div>
  <button>Sprawdź to!</button>
</div>

<style lang="scss">
  * {
    &:before,
    &:after {
      content: "";
      position: absolute;
    }
  }

  button {
    background: transparent;
    color: #fff;
    border: 3px solid #fff;
    border-radius: 50px;
    padding: 0.8rem 2rem;
    font: 24px "Margarine", sans-serif;
    outline: none;
    cursor: pointer;
    position: relative;
    transition: 0.2s ease-in-out;
    letter-spacing: 2px;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .button-pulse {
    display: inline-block;
    position: relative;
    width: 230px;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      animation: jittery 2s infinite;
    }
  }

  .pulsing {
    width: 99%;
    height: 99%;
    border-radius: 50px;
    z-index: 1;
    position: relative;

    &::before,
    &::after {
      width: 100%;
      height: 100%;
      border: inherit;
      top: 0;
      left: 0;
      z-index: 0;
      background: #fff;
      border-radius: inherit;
      animation: pulsing 2.5s linear infinite;
    }

    &::after {
      animation: pulsing1 2.5s linear infinite;
    }
  }

  @keyframes pulsing {
    0% {
      opacity: 1;
      transform: scaleY(1) scaleX(1);
    }
    20% {
      opacity: 0.5;
    }
    70% {
      opacity: 0.2;
      transform: scaleY(1.8) scaleX(1.4);
    }
    80% {
      opacity: 0;
      transform: scaleY(1.8) scaleX(1.4);
    }
    90% {
      opacity: 0;
      transform: scaleY(1) scaleX(1);
    }
  }

  @keyframes pulsing1 {
    0% {
      opacity: 1;
      transform: scaleY(1) scaleX(1);
    }
    20% {
      opacity: 0.5;
    }
    70% {
      opacity: 0.2;
      transform: scaleY(1.3) scaleX(1.15);
    }
    80% {
      opacity: 0;
      transform: scaleY(1.3) scaleX(1.15);
    }
    90% {
      opacity: 0;
      transform: scaleY(1) scaleX(1);
    }
  }

  @keyframes jittery {
    10% {
      transform: scale(1);
    }

    20% {
      transform: scale(0.9);
    }

    30% {
      transform: scale(1.15);
    }

    40% {
      transform: scale(1.15) rotate(-5deg);
    }

    50% {
      transform: scale(1.15) rotate(5deg);
    }

    60% {
      transform: scale(1.15) rotate(-3deg);
    }

    70% {
      transform: scale(1.15) rotate(2deg);
    }

    90% {
      transform: scale(1.15) rotate(0);
    }
  }
</style>
