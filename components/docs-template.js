customElements.define("docs-template", class extends Siput {
  html = `
    <style>
      .docs-template {
        display: flex;
        gap: 24px;
      }
      .docs-template > section {
        flex: 1;
      }
    </style>
    <div class="docs-template px">
      <docs-sidebar active="{{active}}"></docs-sidebar>
      ${this.children_view}
    </div>
  `;

  init() {
    this.data.active.value = this.attr.active;
  }
});
