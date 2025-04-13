customElements.define("main-page", class extends Siput {
  html = `
    <docs-template active="class_siput">
      <div>
        <h2 style="margin-top: 0px">
          Class <code>Siput</code>
        </h2>
        <p>
          Class <code class="small">Siput</code> is the base component creation class. Here is some important attributes and methods
          that available on <code class="small">Siput</code>
        </p>
        <code-highlight lang="ts">${Siput.escapeHTML(`
class Siput {
  static observedAttributes: string[]
  static stats: { total_proxy_var: number, total_var_function: number }

  use_shadow_root: boolean
  html: string

  data: { [key: string]: Proxy<{ value: string | undefined }> }
  ref: { [key: string]: HTMLElement }

  get attr(): { [key: string]: (string | Function) }
  get children_view(): string

  init(): void
  'attr-<name>'(val: string): void
});
        `.trim())}</code-highlight>
        <p>
          Static <code class="small">observedAttributes</code> is built-in static attribute on <code class="small">HTMLElement</code> class in browser javascript features. 
          More information can be found <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes">here (Responding to attribute changes)</a>.
          Basically, you need to declare the name of component attributes on static <code class="small">observedAttributes</code> if you want to watch for attributes change made to the component.
          Declared attributes name on static <code class="small">observedAttributes</code> will trigger method <code class="small">'attr-&ltname&gt;'(val)</code>, 
          where &lt;name&gt; is the name of attribute, and first parameter <code class="small">val</code> is the new value changes.
        </p>
        <p>
          The rest of attributes and methods have their own docs, you can go to each docs from the sidebar menu.
        </p>
        <br/>
        <ca-anchor 
          href="/docs/attribute-html"
          bigger 
          outline>
          Next: Attribute html
        </ca-anchor>
      </div>
    </docs-template>
  `;
});
