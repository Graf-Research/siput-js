customElements.define("main-page", class extends Siput {
  html = `
    <docs-template active="components">
      <div>
        <h2 style="margin-top: 0px">
          Components
        </h2>
        <p>
          Components on <b>Siput.JS</b> is a wrapper for actual <b><a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components">Web Components</a></b>
          that exists built-in in the web browser. Siput.JS simplify the process of creating a custom element with just extends the Siput class.
          <br/><br/>Look at the example:
        </p>
        <code-highlight lang="js">${Siput.escapeHTML(`
customElements.define("custom-component", class extends Siput {
  html = \`
    <div style="padding: 12px; color: blue;">
      Web Components is awesome
    </div>
  \`;
});
        `.trim())}</code-highlight>
        <p>
          The defined component can be used in html file or other components like built-in web components. The Siput extended class as a web component also can have attributes
          as a string, since all html tag attributes value expressed in string. The attributes later will interpreted as other value or a function call, depends on 
          your implementation.
        </p>
        <h4>
          Learn more about Siput class and the behavior
        </h4>
        <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:12px;margin-top:24px;">
          <component-feature 
            title="Custom Elements"
            href="/docs/custom-elements"
            description="What is custom element? Learn how custom elements works with Siput class">
          </component-feature>
          <component-feature 
            title="class Siput {}"
            href="/docs/class-siput"
            description="Explains in general class Siput how it works">
          </component-feature>
          <component-feature 
            title="attribute html"
            href="/docs/attribute-html"
            description="Web component templates literal, it renders the template and then manipulates the variables">
          </component-feature>
          <component-feature 
            title="method init()"
            href="/docs/method-init"
            description="Execute initialization function when component mounted on page">
          </component-feature>
          <component-feature 
            title="getter children_view()"
            href="/docs/getter-children-view"
            description="Child view of a component, like React children props">
          </component-feature>
          <component-feature 
            title="getter attr()"
            href="/docs/getter-attr"
            description="Component attributes, like React props">
          </component-feature>
          <component-feature 
            title="method 'attr-<name>'()"
            href="/docs/method-attr-name"
            description="Watch component attributes changes, like React useEffect on props">
          </component-feature>
          <component-feature 
            title="attribute ref"
            href="/docs/attribute-ref"
            description="Element reference, like useRef on React">
          </component-feature>
          <component-feature 
            title="static stats"
            href="/docs/static-stats"
            description="Siput.JS statistics on a page, like: total Proxy usage, functions created, and others">
          </component-feature>
        </div>
      </div>
    </docs-template>
  `;
});

customElements.define("component-feature", class extends Siput {
  html = `
<style>
  component-feature {
    display: flex;
  }
  .component-feature {
    background: white;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 1px 15px 1px rgba(0,0,0,.1);
    padding: 10px 16px;
    border-radius: 8px;
    gap: 8px;
    width: 100%;
  }
  .component-feature > .title {
    font-size: 18px;
    font-weight: 600;
  }
  .component-feature > .description {
    font-size: 14px;
    color: #555;
    line-height: 1.5;
    flex: 1;
  }
</style>
<a href="{{href}}" class="component-feature">
  <div class="title">
    {{ title }}
  </div>
  <div class="description">
    {{ description }}
  </div>
</a>
  `;

  init() {
    this.data.href.value = this.attr.href;
    this.data.title.value = this.attr.title;
    this.data.description.value = this.attr.description;
  }
});
