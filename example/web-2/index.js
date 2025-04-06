customElements.define("input-label", class extends Siput {
  html = `
    <style>
      .input-label {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .input-label > .label {
        font-size: 14px;
        font-weight: bold;
        color: #555;
      }
    </style>
    <div class="input-label" onclick="click">
      <div class="label">
        {{ label }}
      </div>
      ${this.children_view}
    </div>
  `;

  init() {
    this.data.label.value = this.attr.label;
  }
});
customElements.define("main-page", class extends Siput {
  html = `
    <style>
      .form-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-family: sans;
      }
      input, textarea {
        font-size: 14px;
        padding: 7px 10px;
        outline: none;
        border: solid 2px #EEE;
        border-radius: 5px;
        transition: 250ms;
      }
      input:focus, textarea:focus {
        border-color: #BBB;
      }
      button {
        border: none;
        background: teal;
        color: white;
        border-radius: 5px;
        padding: 8px 12px;
        cursor: pointer;
      }
      h3 { margin-top: 0; }
    </style>
    <div class="form-container">
      <h3>
        Form Registrasi
      </h3>
      <input-label 
        label="Masukan Nama">
        <input 
          type="text"
          value="{{nama}}"
          oninput="updateNama"
          placeholder="Nama" />
      </input-label>
      <input-label 
        label="Email">
        <input 
          type="email"
          value="{{email}}"
          oninput="updateEmail"
          placeholder="Email" />
      </input-label>
      <input-label 
        label="Tulis Alamat">
        <textarea 
          rows="3"
          value="{{alamat}}"
          oninput="updateAlamat"
          placeholder="Alamat">
        </textarea>
      </input-label>
      <button onclick="kirim">
        Kirim
      </button>
      <pre>{{ hasil }}</pre>
    </div>
  `;

  updateNama = (e) => this.data.nama.value = e.target.value;
  updateEmail = (e) => this.data.email.value = e.target.value;
  updateAlamat = (e) => this.data.alamat.value = e.target.value;

  init() {
    this.data.nama.value = '';
    this.data.email.value = '';
    this.data.alamat.value = '';
    this.data.hasil.value = '';
  }

  kirim() {
    this.data.hasil.value = JSON.stringify({
      nama: this.data.nama.value,
      email: this.data.email.value,
      alamat: this.data.alamat.value,
    });
  }
});
