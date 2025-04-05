# Siput.JS

⚠ **Caution**: this library is still on development, some features might be not working properly or missing. Use at your own risk.

## Usage

1. Include script

```html
<script src="https://siput.dev/siput.js"></script>
```

2. Create Custom Element

```html
<script>
  customElements.define("my-custom-element", class extends Siput {
    html = `
      <style>
        .container { display: flex; flex-direction: column; gap: 8px }
      </style>
      <div class="container">
        <input type="text" value="{{myvar}}" oninput="updateMyVar" />
        <div>{{ myvar }}</div>
      </div>
    `;

    init() {
      this.data.myvar.value = ''; // init empty value
    }

    updateMyVar(e) {
      this.data.myvar.value = e.target.value;
    }
  });
</script>
```

3. Use your custom element on body

```html
<body>
  <my-custom-element></my-custom-element>
</body>
```

## Run Development

`cd` into project directory

```bash
npx http-server -o . -c-1
```

## Known Issues

### Invalid HTML Parsing (intentionally from HTML spec)

Element that semantically invalid by HTML spec, will be fail on parsing, ex:

```html
<tr>
  <td>
    {{ no }}
  </td>
  <td>
    {{ nama }}
  </td>
  <td>
    {{ email }}
  </td>
  <td>
    {{ alamat }}
  </td>
</tr>
```

will not be parsed as ELEMENT_NODE, instead it become TEXT_NODE.

Another similar issue found when create dynamic child render below:

```html
<table>
  {{ #rows }}
</table>
```

will be rearranged to be:


```html
{{ #rows }}
<table>
</table>
```

