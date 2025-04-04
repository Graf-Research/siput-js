customElements.define("main-page", class extends Siput {
  html = `
    <docs-template>
      <div>
        <img style="width:88px;object-fit:contain;" src="/img/logo.svg" />
        <p style="color:#444">
          Siput.JS is a library that wraps javascript features to provide react-like modular components and reactivity behavior. 
          This library indirectly shows how current modern browser already powerful enough provides developer a way to build
          a website directly into HTML, JS, and CSS without needed for pre-processing tools.
        </p>
        <h3>
          What to expect?
        </h3>
        <p>
          Siput.JS purpose is not to replace other framework like React, Vue, also Siput.JS is neither a web framework. 
          Siput.JS is just another JS library which help to easily develop a website straight into web browser native HTML, CSS, JS but 
          benefits developer with modular and reactive features.
        </p>
        <h3>
          What can I build with this? Why use this lib?
        </h3>
        <p>
          In my opinion, Siput.JS best use cases would be building less-complex website but needed a lot of repetitive UI components
          like landing page, small online store, and many more. It saves you time by skipping project initialization steps and dealing with
          so many dependencies to other files/projects. You only need to do is create project folder then write your UI components 
          directly into html, css, js files and thats all your website is ready to use.
        </p>
        <h3>
          How to read the Documentation
        </h3>
        <p>
          There are several points you might need to know:
          <ol>
            <li>
              <a href="/docs/getting-started">
                Look how to start to use this lib
              </a>
            </li>
            <li>
              <a href="/docs/start-development">
                Do I need package manager like npm? No, see our best practice to run the project while on development
              </a>
            </li>
            <li>
              We provided some examples, that might help you to get started: <a href="/docs/example-web-1">Example 1</a>, <a href="/docs/example-web-2">Example 2</a>, <a href="/docs/example-web-3">Example 3</a>
            </li>
            <li>
              <a href="/docs/custom-elements">
                What is <code>customElements</code> function, did you made it up?
              </a>
            </li>
            <li>
              <a href="/docs/class-siput">
                What is <code>Siput</code> class?
              </a>
            </li>
            <li>
              Basic class attributes and methods you need (provides reactivity and modular features):
              <ul>
                <li>
                  <a href="/docs/attribute-html">
                    <code>html</code>
                  </a>
                </li>
                <li>
                  <a href="/docs/method-init">
                    <code>init()</code>
                  </a>
                </li>
                <li>
                  <a href="/docs/getter-children-view">
                    <code>get children_view()</code>
                  </a>
                </li>
                <li>
                  <a href="/docs/getter-attr">
                    <code>get attr()</code>
                  </a>
                </li>
                <li>
                  <a href="/docs/method-attr-name">
                    <code>'attr-&lt;name&gt;'()</code>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              See our best practice how to deploy your website on <a href="/docs/nginx">Nginx</a> or <a href="/docs/apache">Apache</a>
            </li>
          </ol>
        </p>
      </div>
    </docs-template>
  `;
});
