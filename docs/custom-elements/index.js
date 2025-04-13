customElements.define("main-page", class extends Siput {
  html = `
    <docs-template active="custom_elements">
      <div>
        <h2 style="margin-top: 0px">
          Custom Elements
        </h2>
        <p>
          <code class="small">customElements</code> is a built-in function provided in browser javascript. You can read more about customElements on MDN docs
          <b><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements" target="_blank">Using custom elements</a></b>.
          The main purpose of <code class="small">customElements</code> is to create custom elements: that is, HTML elements whose behavior is defined by
          the web developer, that extend the set of elements available in the browser. The HTML elements in here is called web components.
        </p>
        <p>
          On Siput.JS, if you want to create a web components you can directly write it into html string literal on a class that extends Siput class. The component will be defined as custom html tag and 
          can be used later on a html file or inside other web components.
        </p>
        <code-highlight lang="js">${Siput.escapeHTML(`
customElements.define("my-other-component", class extends Siput {
  html = \`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div>
        Test Component
      </div>
      <custom-component></custom-component>
    </div>
  \`;
});
        `.trim())}</code-highlight>
        <code-highlight>${Siput.escapeHTML(`
<html>
  <body>
    <my-other-component></my-other-component>
    <custom-component></custom-component>
  </body>
</html>
        `.trim())}</code-highlight>
      </div>
    </docs-template>
  `;
});
