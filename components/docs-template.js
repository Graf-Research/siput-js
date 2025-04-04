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
      <section>
        ${this.children_view}
      </section>
    </div>
  `;

  init() {
    this.data.active.value = this.attr.active;
  }
});
