customElements.define("main-page", class extends Siput {
  html = `
    <docs-template active="installation">
      <div>
        <h2 style="margin-top: 0px">
          Installation
        </h2>
        <p>
          Basically, Siput.JS doesn't require any tools need to be installed. Your favorite code editor and browser are all required tools you need to develop a website.
        </p>
        <p>
          But you may need a file server to serve your local files accessible from http protocol on browser. You can use your favorite file server program. Let's next 
          to how to start to develop a website with Siput.JS.
        </p>
        <br />
        <ca-anchor 
          href="/docs/start-development"
          bigger 
          outline>
          Next: Start Development
        </ca-anchor>
      </div>
    </docs-template>
  `;
});
