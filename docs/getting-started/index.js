customElements.define("main-page", class extends Siput {
  html = `
    <docs-template active="getting_started">
      <div>
        <h2 style="margin-top: 0px">
          Getting Started
        </h2>
        <p>
          Create a html file, add script tag below:
        </p>
        <code-highlight>${Siput.escapeHTML(`
<script src="https://siput.dev/siput.js"></script>
        `.trim())}</code-highlight>
        <p>
          Your html file might look like this:
        </p>
        <code-highlight>${Siput.escapeHTML(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Example</title>
  </head>
  <body>
    <!-- Main Elements -->

    <!-- Scripts -->
    <script src="https://siput.dev/siput.js"></script>
  </body>
</html>
        `.trim())}</code-highlight>
        <p>
          Create your first component
        </p>
        <code-highlight lang="js">${Siput.escapeHTML(`
customElements.define("my-component", class extends Siput {
  html = \`
    <div>
      Web Components is {{ message }}
    </div>
  \`;

  init() {
    this.data.message.value = 'awesome';
  }
});
        `.trim())}</code-highlight>
        <p>
          Use your component as html element
        </p>
        <code-highlight lang="html">${Siput.escapeHTML(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Example</title>
  </head>
  <body>
    <!-- Main Elements -->
    <my-component></my-component>

    <!-- Scripts -->
    <script src="https://siput.dev/siput.js"></script>
    <script>
      customElements.define("my-component", class extends Siput {
        ...
      });
    </script>
  </body>
</html>
        `.trim())}</code-highlight>
        <p>
          You can preview the result by open the html file directly on your web browser
        </p>
        <p>
          Although you can open it directly on web browser, we don't recommend it that way. See our best practice how to <a href="/docs/start-development">serve your page on development mode</a>.
        </p>
        <br/>
        <ca-anchor 
          href="/docs/start-development"
          bigger 
          outline>
          Next: Start Development
        </ca-anchor>
      </div>
    </docs-template>
  `;
});
