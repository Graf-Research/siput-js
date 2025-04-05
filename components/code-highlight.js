customElements.define("code-highlight", class extends Siput {
  static observedAttributes = [
    'lang',
    'fullscreen'
  ];

  html = `
    <style>
      .code {
        border-radius: 8px;
        overflow: hidden;
        font-size: 12px !important;
        max-height: {{ max_height }};
        transition: 300ms;
      }
    </style>
    <pre ref="code_container" class="code {{line_number_class}}"><code ref="code" class="language-{{lang}}">${this.children_view}</code></pre>
  `;

  init() {
    this.data.lang.value = this.attr.lang ? this.attr.lang : 'html';
    this.data.line_number_class.value = this.attr.hasOwnProperty('noline') ? '' : 'line-numbers';
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this.max_scroll_height = entry.target.scrollHeight;
      }
      this.data.max_height.value = this.attr.fullscreen == 'full' ? `${this.max_scroll_height}px` : '400px';
    });
    resizeObserver.observe(this.ref.code_container);
  }

  update() {
    Prism.highlightElement(this.ref.code);
  }

  'attr-fullscreen'(val) {
    this.data.max_height.value = val == 'full' ? `${this.max_scroll_height}px` : '400px';
  }

  'attr-lang'(val) {
    this.data.lang.value = val;
  }
});
