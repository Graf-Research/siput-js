class Siput extends HTMLElement {
  __proxy_var = {};
  __proxy_var_fn = {};
  ref = {};
  is_data_ready = false;
  data = this.__proxy_var;
  list_view = this.__proxy_lv;
  html = ``;
  use_shadow_root = false;

  custom_element = true;

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

  get attr() {
    var mapkv = {};
    for (const attribute of this.attributes) {
      if (attribute.name.startsWith('$')) {

        mapkv[attribute.name] = (param) => {
          let pn = this.parentNode;
          while (pn && !pn.custom_element) {
            pn = pn.parentNode;
          }

          // TODO: fix this mess
          
          // #1 attempt, check the component itself
          if (pn[attribute.value]) {
            pn[attribute.value].bind(pn)(param);
            return;
          }

          // #2 attempt, check __parent (this coming from uuid element)
          if (pn.__parent && pn.__parent[attribute.value]) {
            pn.__parent[attribute.value].bind(pn.__parent)(param);
            return;
          }

          // #3 attempt, check ___parent (this coming from custom element inside custom element)
          if (pn.___parent && pn.___parent[attribute.value]) {
            pn.___parent[attribute.value].bind(pn.___parent)(param);
            return;
          }
        }
      } else {
        mapkv[attribute.name] = attribute.value;
      }
    }
    return mapkv;
  }

  get children_view() {
    return `<div id="${this.child_view_identifier}"></div>`;
  }

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
                  current_node.removeAttribute(attr.nodeName);
                  current_node.addEventListener(attr.nodeName.slice(2), e => {
                    if (this.__parent && attr.nodeValue in this.__parent && typeof this.__parent[attr.nodeValue] == 'function') {
                      this.__parent[attr.nodeValue](e);
                      return;
                    }
                    if (attr.nodeValue in this && typeof this[attr.nodeValue] == 'function') {
                      this[attr.nodeValue](e);
                      return;
                    }
                    throw new Error(`Method "${attr.nodeValue}" doesnt exist on "this" or "__parent" scope`)
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
                  new_element.__parent = this.__parent ? this.__parent : this;

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
    shadow.firstChild.___parent = this;
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
