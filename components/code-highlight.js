customElements.define("code-highlight", class extends Siput {
  html = `
    <style>
      .code {
        border-radius: 8px;
        overflow: hidden;
        font-size: 12px !important;
      }
    </style>
    <pre class="code"><code class="language-html">${this.children_view}</code></pre>
  `;
});
