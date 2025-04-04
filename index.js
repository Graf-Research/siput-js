customElements.define("main-page", class extends Siput {
  html = `
    <style>
      .main {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
    </style>
    <div class="main px">
      <page-tagline></page-tagline>
      <page-sample-code></page-sample-code>
    </div>
  `;
});

customElements.define("page-tagline", class extends Siput {
  html = `
    <style>
      .container-tagline {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .tagline {
        font-size: 42px;
        font-weight: 800;
        padding: 50px 0;
        color: #283618;
      }
      .list-features {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
    </style>
    <div class="container-tagline">
      <div class="tagline">
        Zero Dependency + Reactive + Fast
      </div>
      <div class="list-features">
        <div>
          🔥 <b>Quick way</b> to create a modular website with zero-configuration dependency.
        </div>
        <div>
          🔥 <b>Reactive render</b> variables like ReactJS. Efficient DOM manipulation with minimal DOM updates.
        </div>
        <div>
          🔥 <b>Direct code</b> into browser without code compiler/transpiler/pre-processor.
        </div>
        <div>
          🔥 Powered by <b>Web Custom Elements + Proxy</b> on modern browser, compatible in almost all browsers.
        </div>
      </div>
    </div>
  `;
});

customElements.define("page-sample-code", class extends Siput {
  html_code = `\
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Example</title>
  </head>
  <body>
    <!-- Main Elements -->
    <my-custom-element></my-custom-element>

    <!-- Scripts -->
    <script src="https://siput.dev/siput.js"></script>
    <script>
      customElements.define("my-custom-element", class extends Siput {
        html = \`
          <style>
            .container {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }
          </style>
          <div class="container">
            <input type="text" value="{{myvar}}" oninput="updateMyVar" />
            <div>{{ myvar }}</div>
          </div>
        \`;

        init() {
          this.data.myvar.value = ''; // init empty value
        }

        updateMyVar(e) {
          this.data.myvar.value = e.target.value;
        }
      });
    </script>
  </body>
</html>`;

  html = `
    <code-highlight>${this.#escapeHTML(this.html_code)}</code-highlight>
  `;

  #escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
});
