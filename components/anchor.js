customElements.define("ca-anchor", class extends Siput {
  static observedAttributes = [
    'href', 
    'target',
    'outline',
    'bigger'
  ];

  html = `
    <style>
      .anchor {
        font-family: "Libre Franklin", sans-serif;
        width: 100%;
        border: none;
        background: #588157;
        color: white;
        padding: 5px 12px;
        font-weight: 500;
        border-radius: 5px;
        outline: none;
        height: 33px;
        font-size: 13px;
        cursor: pointer;
      }
      .outline {
        border: solid 1.5px #588157;
        color: #588157;
        background-color: transparent;
      }
      .bigger {
        font-size: 14px;
        padding: 10px 19px;
      }
    </style>
    <a onclick="submit" class="anchor {{a_class}}" href="{{href}}" target="{{target}}">
      ${this.children_view}
    </a>
  `;

  init() {
    this.data.a_class.value = this.attr.hasOwnProperty('outline') ? 'outline' : '';
    if (this.attr.hasOwnProperty('bigger')) {
      this.data.a_class.value += ' bigger';
    }
    this.data.href.value = this.attr.href ? this.attr.href : '';
    this.data.target.value = this.attr.target ? this.attr.target : '';
  }
});
