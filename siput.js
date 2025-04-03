class Siput extends HTMLElement {
  __proxy_var = {};
  __proxy_fn = {};
  ref = {};
  is_data_ready = false;
  data = this.__proxy_var;
  html = ``;
  use_shadow_root = false;

  custom_element = true;

  static stats = {
    total_proxy: 0,
    total_function: 0
  };

  static counter = 0;
  child_view_identifier = `__child_temporary_id_${Siput.counter++}`;

  constructor() {
    super();
  }

  // uuidv4() {
  //   return 'id' + "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
  //     (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  //   ).replace(/\-/g, '');
  // }

  get attr() {
    var mapkv = {};
    for (const attribute of this.attributes) {
      if (attribute.name.startsWith('$')) {
        let pn = this.parentNode;
        while (pn && !pn.custom_content) {
          pn = pn.parentNode;
        }
        mapkv[attribute.name] = pn[attribute.value].bind(pn);
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

  extractVariables(text_str) {
    const re = /{{\s*([a-zA-Z_$][\w$]*)\s*}}/g;
    let match, list_var = [];
    while (match = re.exec(text_str)) {
      list_var.push({
        text: match[0],
        var: match[1]
      });
    }
    return list_var;
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
        const node_object = { el: current_node };

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
                  current_node.addEventListener(attr.nodeName.slice(2), e => this[attr.nodeValue](e));
                  break;
                default:
                  const original_text_on_attr = String(attr.nodeValue);
                  const list_var_on_attr = this.extractVariables(attr.nodeValue);

                  // initialize proxy variable store if not exist
                  for (const node_var of list_var_on_attr) {
                    if (!this.__proxy_var[node_var.var]) {
                      Siput.stats.total_proxy++;
                      this.__proxy_var[node_var.var] = new Proxy({ value: undefined }, {
                        set: (target, key, value) => {
                          target[key] = value;
                          for (const fn of this.__proxy_fn[node_var.var]) {
                            fn();
                          }
                          return true;
                        }
                      });
                    }

                    // add function that executed on proxy variable setter
                    if (!this.__proxy_fn[node_var.var]) {
                      this.__proxy_fn[node_var.var] = [];
                    }
                    Siput.stats.total_function++;
                    this.__proxy_fn[node_var.var].push(() => {
                      let text_content = original_text_on_attr;
                      for (const d1_node_var of list_var_on_attr) {
                        text_content = text_content.replace(new RegExp(`{{\\s*(${d1_node_var.var})\\s*}}`,"gm"), this.__proxy_var[d1_node_var.var].value);
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
            const list_var_on_node = this.extractVariables(current_node.textContent);

            // initialize proxy variable store if not exist
            for (const node_var of list_var_on_node) {
              if (!this.__proxy_var[node_var.var]) {
                Siput.stats.total_proxy++;
                this.__proxy_var[node_var.var] = new Proxy({ value: undefined }, {
                  set: (target, key, value) => {
                    target[key] = value;
                    for (const fn of this.__proxy_fn[node_var.var]) {
                      fn();
                    }
                    return true;
                  }
                });
              }

              // add function that executed on proxy variable setter
              if (!this.__proxy_fn[node_var.var]) {
                this.__proxy_fn[node_var.var] = [];
              }
              Siput.stats.total_function++;
              this.__proxy_fn[node_var.var].push(() => {
                let text_content = original_text_on_node;
                for (const d1_node_var of list_var_on_node) {
                  text_content = text_content.replace(new RegExp(`{{\\s*(${d1_node_var.var})\\s*}}`,"gm"), this.__proxy_var[d1_node_var.var].value);
                }
                node_object.el.textContent = text_content;
              });
            }
            break;
        }
      }
    } while (current_node !== null);
    this.is_data_ready = true;
    shadow.appendChild(this.custom_content);
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
