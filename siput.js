/**
 * 
 * Siput.JS
 * https://siput.dev
 * 
 * Copyright 2025 Graf Research and other contributors
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the “Software”),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 * 
 * Date: 2025-04-06T11:00Z
 */

class Siput extends HTMLElement {
  __proxy_var = {};
  __proxy_var_fn = {};
  ref = {};
  is_data_ready = false;
  data = this.__proxy_var;
  list_view = this.__proxy_lv;
  html = ``;
  use_shadow_root = false;

  static stats = {
    total_proxy_var: 0,
    total_var_function: 0,
  };

  static counter = 0;
  child_view_identifier = `__child_temporary_id_${Siput.counter++}`;

  constructor() {
    super();
  }

  uuidv4() {
    return 'id-' + "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    ).replace(/\-/g, '');
  }

  /**
   * 
   * Rules:
   * 1. Attributes that starts with $ sign, will invoked as a function 
   *    on the element scope, example:
   * 
   *    class MyElement extends Siput {
   *      html = `
   *        <child-el $onbuka="buka">   ---------- invokes (scope MyElement).buka(params)
   *        </child-el>
   *      `
   *      buka(params) {   ----------------------- expecting this action/function exist
   *        //
   *      }
   *    }
   * 
   * 2. Other attributes will be store as string
   * 
   * @returns object element attributes
   * example: { name, props1, $onupdate, $onbuka }
   */
  get attr() {
    var mapkv = {};
    for (const attribute of this.attributes) {
      if (attribute.name.startsWith('$')) {

        mapkv[attribute.name] = (param) => {
          let pn = this.parentNode;
          while (pn && !(pn instanceof Siput)) {
            pn = pn.parentNode;
          }
          
          // #1 attempt, check the component itself
          if (pn[attribute.value]) {
            pn[attribute.value].bind(pn)(param);
            return;
          }

          // #2 attempt, check __scope_string_html (this coming from uuid: element which variable starts with "#")
          if (pn.__scope_string_html && pn.__scope_string_html[attribute.value]) {
            pn.__scope_string_html[attribute.value].bind(pn.__scope_string_html)(param);
            return;
          }

          // #3 attempt, check __scope_custom_element (this coming from custom element inside custom element)
          if (pn.__scope_custom_element && pn.__scope_custom_element[attribute.value]) {
            pn.__scope_custom_element[attribute.value].bind(pn.__scope_custom_element)(param);
            return;
          }

          throw new Error(`action "${attribute.value}" not found`);
        }
      } else {
        mapkv[attribute.name] = attribute.value;
      }
    }
    return mapkv;
  }

  /**
   * 
   * Temporary children view, will be replaced later with element childNodes
   */
  get children_view() {
    return `<div id="${this.child_view_identifier}"></div>`;
  }

  /**
   * 
   * @param {string} html html string template
   * @returns DocumentFragment node
   */
  parseHTML(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content;
  }

  extractKeys(text_str) {
    const re = /{{\s*(#?[a-zA-Z_$][\w$]*)\s*}}/g;
    let match, list_key = [];
    while (match = re.exec(text_str)) {
      list_key.push({
        text: match[0],
        key: match[1],
        position: match.index
      });
    }
    return list_key;
  }

  init() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.is_data_ready) {
      return;
    }
    const fn = this[`attr-${name}`];
    if (fn) {
      fn.bind(this)(newValue);
    }
  }

  createProxyVarIfNotExist(node_var) {
    if (!this.__proxy_var[node_var.key]) {
      Siput.stats.total_proxy_var++;
      this.__proxy_var[node_var.key] = new Proxy({ value: undefined }, {
        set: (target, key, value) => {
          target[key] = value;
          for (const fn of this.__proxy_var_fn[node_var.key]) {
            fn();
          }
          return true;
        }
      });
    }
  }

  addProxyVarFn(node_var, fn) {
    if (!this.__proxy_var_fn[node_var.key]) {
      this.__proxy_var_fn[node_var.key] = [];
    }
    Siput.stats.total_var_function++;
    this.__proxy_var_fn[node_var.key].push(fn);
  }

  static escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }  

  connectedCallback() {
    const shadow = this.use_shadow_root ? this.attachShadow({ mode: "open" }) : this;
    const list_child_node = Array.from(this.childNodes.entries()).map(x => x[1]);
    this.custom_content = this.parseHTML(this.html);
    let child_element_dom = null;
    let tree_walker = document.createTreeWalker(this.custom_content);
    let current_node = null;
    do {
      current_node = tree_walker.nextNode();
      if (current_node) {
        let node_object = { el: current_node };

        if (current_node.nodeType == Node.ELEMENT_NODE && current_node.attributes && current_node.attributes.id && current_node.attributes.id.nodeValue == this.child_view_identifier) {
          child_element_dom = node_object;
          continue;
        }

        switch (current_node.nodeType) {
          case Node.ELEMENT_NODE:
            // this doesnt work, sometimes attributes missing
            // for (const attr of current_node.attributes) {

            // use this instead
            for (const attr of Array.from(current_node.attributes)) {
              if (attr.nodeName === 'ref') {
                this.ref[attr.nodeValue] = node_object.el;
                continue;
              }
              switch (attr.nodeName) {
                // TODO: add more cases
                case 'oninput':
                case 'onclick':
                case 'onkeyup':
                case 'onkeydown':
                  current_node.removeAttribute(attr.nodeName);
                  current_node.addEventListener(attr.nodeName.slice(2), e => {
                    if (this.__scope_string_html && attr.nodeValue in this.__scope_string_html && typeof this.__scope_string_html[attr.nodeValue] == 'function') {
                      this.__scope_string_html[attr.nodeValue](e);
                      return;
                    }
                    if (attr.nodeValue in this && typeof this[attr.nodeValue] == 'function') {
                      this[attr.nodeValue](e);
                      return;
                    }
                    throw new Error(`Method "${attr.nodeValue}" doesnt exist on "this" or "__scope_string_html" scope`)
                  });
                  break;
                default:
                  const original_text_on_attr = String(attr.nodeValue);
                  const list_key_on_attr = this.extractKeys(attr.nodeValue);

                  // initialize proxy key variable store if not exist
                  for (const node_key of list_key_on_attr) {
                    this.createProxyVarIfNotExist(node_key);
                    this.addProxyVarFn(node_key, () => {
                      let text_content = original_text_on_attr;
                      for (const d1_node_key of list_key_on_attr) {
                        text_content = text_content.replace(new RegExp(`{{\\s*(#?${d1_node_key.key})\\s*}}`,"gm"), this.__proxy_var[d1_node_key.key].value);
                      }
                      node_object.el[attr.nodeName] = text_content;
                      node_object.el.setAttribute(attr.nodeName, text_content);
                    });
                  }
                  break;
              }
            }
            break;
          case Node.TEXT_NODE:
            const original_text_on_node = String(current_node.textContent);
            const list_key_on_node = this.extractKeys(current_node.textContent);

            // initialize proxy variable store if not exist
            for (const node_key of list_key_on_node) {
              this.createProxyVarIfNotExist(node_key);
              this.addProxyVarFn(node_key, () => {
                let text_content = original_text_on_node;

                for (const d1_node_key of list_key_on_node) {
                  text_content = text_content.replace(new RegExp(`{{\\s*(#?${d1_node_key.key})\\s*}}`,"gm"), this.__proxy_var[d1_node_key.key].value);
                }
                if (node_key.key.startsWith('#')) {
                  const element_name = this.uuidv4();
                  customElements.define(element_name, class extends Siput {
                    html = text_content;
                  });
                  
                  const old_reference = node_object.el;
                  const new_element = document.createElement(element_name);

                  // this may be really stupid, but it works anyway, cheers :)
                  new_element.__scope_string_html = this.__scope_string_html ? this.__scope_string_html : this;

                  node_object.el = node_object.el.parentNode.insertBefore(new_element, node_object.el);

                  old_reference.remove();
                } else {
                  node_object.el.textContent = text_content;
                }
              });
            }
            break;
        }
      }
    } while (current_node !== null);
    this.is_data_ready = true;
    shadow.appendChild(this.custom_content);
    shadow.firstChild.__scope_custom_element = this;
    this.init();

    // add child view
    if (child_element_dom && child_element_dom.el) {
      for (const child_node of list_child_node) {
        try {
          child_element_dom.el.parentNode.insertBefore(child_node, child_element_dom.el);
        } catch (err) {
          console.error(err);
          console.log(child_node, child_element_dom.el);
          return;
        }
      }
      child_element_dom.el.remove()
    }
  }
}
