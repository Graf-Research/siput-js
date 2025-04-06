customElements.define("main-page", class extends Siput {
  html = `
    <style>
      .main {
        padding: 12px 5%;
      }
      .main .container {
        display: flex;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 0px 1px 25px 1px rgba(0,0,0,.1);
      }
      .main .vs-container {
        width: 100%;
        height: 80vh;
        flex: 1;
      }
      .main .frame-container {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .main iframe {
        width: 100%;
        flex: 1;
        border: none;
        background: white;
      }
    </style>
    <div class="main">
      <div class="container">
        <div 
          ref="vs_container"
          class="vs-container">
        </div>
        <div class="frame-container">
          <iframe height="100%" ref="iframe"></iframe>
        </div>
      </div>
    </div>
  `;

  init() {
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs' } });
    require(["vs/editor/editor.main"], () => {
      this.monaco_editor = monaco.editor.create(this.ref.vs_container, {
        value: initial_code,
        language: 'html',
        theme: 'tne',
        fontSize: 12,
        padding: {
          top: 12,
          bottom: 12
        }
      });

      // more theme preview check https://editor.bitwiser.in/
      fetch('/assets/monaco-themes/Tomorrow-Night-Eighties.json')
        .then(data => data.json())
        .then(data => {
          monaco.editor.defineTheme('tne', data);
          monaco.editor.setTheme('tne');

          this.monaco_editor.getModel().onDidChangeContent(() => this.updateValue());
          this.updateValue();
        });
    });
  }

  updateValue() {
    if (this.__to) {
      clearTimeout(this.__to);
    }
    this.__to = setTimeout(() => {
      this.ref.iframe.srcdoc = this.monaco_editor.getValue();
    }, 500);
  }
});

var initial_code = `<!DOCTYPE html>
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
    <script src="/siput.js"></script>
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
</html>
`;
