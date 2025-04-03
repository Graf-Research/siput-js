customElements.define("ca-loading", class extends Siput {
  html = `
    <style>
      .loader {
        width: 20px;
        aspect-ratio: 1;
        display: grid;
        border: 2px solid #0000;
        border-radius: 50%;
        border-color: gainsboro #0000;
        animation: l16 1s infinite linear;
      }
      .loader::before,
      .loader::after {
        content: "";
        grid-area: 1/1;
        margin: 2px;
        border: inherit;
        border-radius: 50%;
      }
      .loader::before {
        border-color: goldenrod #0000;
        animation: inherit; 
        animation-duration: .5s;
        animation-direction: reverse;
      }
      .loader::after {
        margin: 5.5px;
      }
      @keyframes l16 {
        100%{transform: rotate(1turn)}
      }
    </style>
    <div class="loader"></div>
  `;
});
