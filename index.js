customElements.define("main-page", class extends Siput {
  html = `
    <style>
      .main {
        display: flex;
        flex-direction: column;
      }
    </style>
    <div class="main px">
      <div style="margin-top:24px; background: lightyellow; padding: 5px 9px;">
        ⚠ <b>Caution</b>: this library is still on development, some features might be not working properly or missing. Use at your own risk.
      </div>
      <page-tagline></page-tagline>
      <h2 style="padding-top: 32px;">
        Code Example
      </h2>
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
        Zero Dependency + Reactive + Modular
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
          🔥 Powered by <b><a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components">Web Components</a> + <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy">Proxy</a></b> on modern browser, compatible in almost all browsers.
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
    <my-template>
      <my-custom-element></my-custom-element>
    </my-template>

    <!-- Scripts -->
    <script src="https://siput.dev/siput.js"></script>
    <script>
      customElements.define("my-template", class extends Siput {
        html = \`
          <div>
            <div>
              Web Components is awesome
            </div>
            <div style="border:solid 1px #CCC; padding: 8px;">
              \${this.children_view}
            </div>
          </div>
        \`;
      });

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
            <input
              type="text"
              value="{{myvar}}"
              oninput="updateMyVar"
              placeholder="Type here" />
            <div>Input Value: {{ myvar }}</div>
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
    <style>
      .page-sample-code {
        display: flex;
        gap: 16px;
      }
      .page-sample-code > *:first-child {
        flex: 2;
      }
      .page-sample-code > *:last-child {
        flex: 1;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0px 1px 32px 1px rgba(0,0,0,.08);
      }
      .page-sample-code iframe {
        background: white;
        border: none;
      }
    </style>
    <div class="page-sample-code">
      <code-highlight>${escapeHTML(this.html_code)}</code-highlight>
      <div>
        <div style="padding: 8px; background: #F7F7F7; font-weight: bold;">
          Output
        </div>
        <iframe src="/sample.html"></iframe>
      </div>
    </div>
  `;
});
