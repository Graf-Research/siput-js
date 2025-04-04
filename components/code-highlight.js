customElements.define("code-highlight", class extends Siput {
  static observedAttributes = [
    'lang'
  ];

  html = `
    <style>
      .code {
        border-radius: 8px;
        overflow: hidden;
        font-size: 12px !important;
        max-height: 400px;
      }
    </style>
    <pre class="code {{line_number_class}}"><code class="language-{{lang}}">${this.children_view}</code></pre>
  `;

  init() {
    this.data.lang.value = this.attr.lang ? this.attr.lang : 'html';
    this.data.line_number_class.value = this.attr.hasOwnProperty('noline') ? '' : 'line-numbers';
  }

  'attr-lang'(val) {
    this.data.lang.value = val;
  }
});
