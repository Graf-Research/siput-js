customElements.define("ca-header", class extends Siput {
  html = `
    <style>
      header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 24px !important;
        padding-bottom: 24px !important;
        background: #FFFB;
        backdrop-filter: blur(8px);
      }
      header .container-logo {
        display: flex;
        align-items: center;
        gap: 14px;
        font-family: "Plus Jakarta Sans", sans-serif;
      }
      header .container-logo > img {
        height: 36px;
        object-fit: contain;
      }
      header .logo {
        font-weight: 800;
        font-size: 24px;
        color: #283618;
      }
      header .menu {
        font-family: "Plus Jakarta Sans", sans-serif;
        display: flex;
        align-items: center;
        gap: 36px;
        font-weight: 500;
      }
      header .menu img {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
    </style>
    <header class="px">
      <a href="/" class="container-logo">
        <img src="/img/logo.svg" />
        <div class="logo">
          Siput.JS
        </div>
      </a>
      <div class="menu">
        <a href="/docs">
          Docs
        </a>
        <a href="/blog">
          Blog
        </a>
        <ca-button 
          loading="{{loading_button}}"
          $onclick="test">
          Getting Started
        </ca-button>
        <a href="https://github.com/Graf-Research/siput-js">
          <img src="/img/github.svg" />
        </a>
      </div>
    </header>
  `;

  init() {
    this.data.loading_button.value = 'hide';
  }

  test() {
    this.data.loading_button.value = 'show';
    setTimeout(() => {
      this.data.loading_button.value = 'hide';
    }, 1000);
  }
});

customElements.define("ca-footer", class extends Siput {
  html = `
    <style>
      footer {
        display: flex;
        flex-direction: column;
        font-size: 13px;
        padding-top: 24px !important;
        padding-bottom: 24px !important;
      }
    </style>
    <footer class="px">
      Copyright &copy; 2025 Graf Research
    </footer>
  `;
});

customElements.define("ca-template", class extends Siput {
  html = `
    <style>
      main {
        display: flex;
        flex-direction: column;
      }
      .sticky-header {
        position: sticky;
        top: 0;
      }
    </style>
    <main>
      <div class="sticky-header">
        <ca-header></ca-header>
      </div>
      ${this.children_view}
      <ca-footer></ca-footer>
    </main>
  `;
});
