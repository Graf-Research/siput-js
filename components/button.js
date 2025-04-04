customElements.define("ca-button", class extends Siput {
  static observedAttributes = [
    'loading', 
    '$onclick',
    'outline'
  ];

  html = `
    <style>
      button {
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
      .loading-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
    <button onclick="submit" class="{{btn_class}}">
      <div style="display:{{display_button}};">
        ${this.children_view}
      </div>
      <div class="loading-container" style="display:{{display_loading}}">
        <ca-loading></ca-loading>
      </div>
    </button>
  `;

  init() {
    this.data.btn_class.value = this.attr.hasOwnProperty('outline') ? 'outline' : '';
    this.toggleLoading();
  }

  toggleLoading() {
    this.data.display_button.value = this.attr.loading == 'show' ? 'none' : 'block';
    this.data.display_loading.value = this.attr.loading == 'show' ? 'flex' : 'none';
  }

  'attr-loading'(val) {
    this.toggleLoading();
  }

  submit() {
    this.attr.$onclick();
  }
});
