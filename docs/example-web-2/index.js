customElements.define("main-page", class extends Siput {
  html = `
    <docs-template active="example_web_2">
      <style>
        iframe {
          background: white;
          border: none;
          width: 100%;
          height: 435px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0px 1px 32px 1px rgba(0,0,0,.08);
        }
      </style>
      <div>
        <h2 style="margin-top: 0px">
          Example Web 2
        </h2>
      </div>
      <iframe src="/example/web-2"></iframe>
      <code-highlight fullscreen="{{ fullscreen }}" ref="code" lang="js">{{ code }}</code-highlight>
      <ca-button 
        $onclick="toggleExpand"
        outline>
        {{ expand_button_label }} Code
      </ca-button>
    </docs-template>
  `;

  async init() {
    this.data.code.value = '';
    this.data.fullscreen.value = '';
    this.data.expand_button_label.value = 'Expand';
    const req = await fetch('/example/web-2/index.js');
    const result = await req.text();
    this.data.code.value = result;
    this.ref.code.update();
  }
  
  toggleExpand() {
    this.data.expand_button_label.value = this.data.fullscreen.value == 'full' ? 'Expand' : 'Shrink';
    this.data.fullscreen.value = this.data.fullscreen.value == 'full' ? '' : 'full';
  }
});
