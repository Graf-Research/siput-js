customElements.define("main-page", class extends Siput {
  html = `
    <docs-template active="start_development">
      <style>
        .filename {
          font-style: italic;
        }
      </style>
      <div>
        <h2 style="margin-top: 0px">
          Start Development (Best Practice)
        </h2>
        <p>
          Basically you can start the development with Siput.JS with only text editor and web browser.
          But you may experience some difficulty to access page resources from web browser.
          Our recommendation to start a development by using npm package like <code class="small">http-server</code> or <code class="small">serve</code> or similar tools.
        </p>
        <p>
          In this example, I will use Node.JS program since I familiar with the tools (you can use any other programs/tools as a file server). Now, make sure you already have <code class="small">node</code> <code class="small">npm</code> and <code class="small">npx</code>, we recommended install it with
          <a target="_blank" href="https://github.com/nvm-sh/nvm"><b>Node Version Manager</b></a>.
        </p>
        <h3>
          Start a Project
        </h3>
        <p>
          Create project folder, <code class="small">cd</code> into folder
        </p>
        <code-highlight noline lang="bash">${Siput.escapeHTML(`
mkdir my-website
cd my-website
        `.trim())}</code-highlight>
        <p>
          Run your file server program:
        </p>
        <code-highlight noline lang="bash">${Siput.escapeHTML(`
npx http-server -o .
        `.trim())}</code-highlight>
        <p>
          Sometimes you want to adjust cache behavior of file server, since it most likely store cache in the browser and you may not like it.
          To adjust it, here a sample:
        </p>
        <code-highlight noline lang="bash">${Siput.escapeHTML(`
npx http-server -o . -c-1
        `.trim())}</code-highlight>
        <p style="font-style:italic">
          Note: the program that running file server above can be different, you can use your own favorite tools, or even you can open your html file in browser locally. 
        </p>
        <hr/>
        <h3>
          Files Structure
        </h3>
        <p>
          Our recommendation folder structure looks like below:
        </p>
        <code-highlight noline lang="bash">${Siput.escapeHTML(`
my-website
│
├── login-page   ------------- sub page
│   ├── index.html
│   └── index.js
│
├── dashboard-page  ---------- another sub page
│   ├── index.html
│   └── index.js
│
├── assets  ------------------ website assets
│   ├── logo.png
│   ├── favicon.ico
│   └── other.mp4
│
├── index.html  -------------- main page
└── index.js
        `.trim())}</code-highlight>
        <p>
          You may notice each page consist of html and js files, here an example:
        </p>
        <div class="filename">
          index.html
        </div>
        <code-highlight>${Siput.escapeHTML(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Example</title>
  </head>
  <body>
    <!-- Main Elements -->
    <my-component></my-component>

    <!-- Scripts -->
    <script src="https://siput.dev/siput.js"></script>
    <script src="index.js"></script>
  </body>
</html>
        `.trim())}</code-highlight>
        <div class="filename">
          index.js
        </div>
        <code-highlight lang="js">${Siput.escapeHTML(`
customElements.define("my-component", class extends Siput {
  html = \`
    <div>
      Web Components is {{ message }}
    </div>
  \`;

  init() {
    this.data.message.value = 'awesome';
  }
});
        `.trim())}</code-highlight>
        <br/>
        <ca-anchor 
          href="/docs/example-web-1"
          bigger 
          outline>
          Next: Example Web 1
        </ca-anchor>
      </div>
    </docs-template>
  `;
});
