customElements.define("docs-sidebar", class extends Siput {
  static observedAttributes = [
    'active'
  ];

  list_menu = [
    ['getting_started', 'Getting Started', '/docs/getting-started', 'strong'],
    ['installation', 'Installation', '/docs/installation', ''],
    ['start_development', 'Start Development', '/docs/start-development', ''],
    ['example_web_1', 'Example Web 1', '/docs/example-web-1', ''],
    ['example_web_2', 'Example Web 2', '/docs/example-web-2', ''],
    ['example_web_3', 'Example Web 3', '/docs/example-web-3', ''],
    ['deployment', 'Deployment', '/docs/deployment', 'strong'],
    ['nginx', 'Nginx', '/docs/nginx', ''],
    ['apache', 'Apache', '/docs/apache', ''],
    ['components', 'Components', '/docs/components', 'strong'],
    ['custom_elements', 'Custom Elements', '/docs/custom-elements', ''],
    ['class_siput', 'Class <code>Siput</code>', '/docs/class-siput', ''],
    ['attribute_html', 'Attribute <code>html</code>', '/docs/attribute-html', ''],
    ['method_init', 'Method <code>init()</code>', '/docs/method-init', ''],
    ['getter_children_view', 'Getter <code>children_view()</code>', '/docs/getter-children-view', ''],
    ['getter_attr', 'Getter <code>attr()</code>', '/docs/getter-attr', ''],
    ['method_attr_name', 'Method <code>\'attr-&ltname&gt\'()</code>', '/docs/method-attr-name', ''],
    ['more_features', 'More Features', '/docs/more-features', 'strong'],
    ['attribute_ref', 'Attribute <code>ref</code>', '/docs/attribute-ref', ''],
    ['attribute_use_shadow_root', 'Attribute <code>use_shadow_root</code>', '/docs/attribute-use-shadow-root', ''],
    ['static_stats', 'Static <code>stats</code>', '/docs/static-stats', ''],
  ];

  html = `
    <style>
      nav {
        display: flex;
        flex-direction: column;
        gap: 12px;
        white-space: nowrap;
        padding-right: 24px;
      }
      nav a {
        font-family: "Plus Jakarta Sans", sans-serif;
        font-size: 15px;
        color: #555;
        cursor: pointer;
      }
      nav .strong {
        color: black;
        font-weight: bold;
        padding: 5px 0;
      }
      nav code {
        background: #2d2d2d;
        color: white;
        font-size: 10px;
        padding: 3px 8px;
        border-radius: 4px;
        margin: 0 2px;
      }
      nav .active {
        color: #588157 !important;
        font-weight: bold;
      }
    </style>
    <nav>
      ${this.list_menu.map(([key, label, url, class_name]) => (
        `<a href="${url}" class="${class_name} {{active_class_${key}}}">
          ${label}
        </a>`
      )).join('')}
    </nav>
  `;

  init() {
    for (const menu of this.list_menu) {
      this.data[`active_class_${menu[0]}`].value = '';
    }

    // TODO: fix lib, this checking should be unnecessary
    if (this.attr.active && this.data[`active_class_${this.attr.active}`]) {
      console.log(this.data, this.attr.active)
      this.data[`active_class_${this.attr.active}`].value = 'active';
    }
  }

  'attr-active'(val) {
    // TODO: fix lib, this checking should be unnecessary
    if (this.data[`active_class_${val}`]) {
      this.data[`active_class_${val}`].value = 'active';
    }
  }
});
