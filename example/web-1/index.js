customElements.define("table-row", class extends Siput {
  html = `
    <style>
      .row {
        display: flex;
        border-top: solid 1px #EEE;
        transition: 250ms;
        cursor: pointer;
      }
      .row:hover {
        background: #EEE;
      }
      .row > div {
        flex: 1;
        padding: 8px 12px;
      }
    </style>
    <div class="row" onclick="click">
      <div>
        {{ no }}
      </div>
      <div>
        {{ nama }}
      </div>
      <div>
        {{ email }}
      </div>
      <div>
        {{ alamat }}
      </div>
    </div>
  `;

  init() {
    this.data.no.value = this.attr.no;
    this.data.nama.value = this.attr.nama;
    this.data.email.value = this.attr.email;
    this.data.alamat.value = this.attr.alamat;
  }

  click() {
    this.attr.$click(this.attr);
  }
});
customElements.define("main-page", class extends Siput {
  html = `
    <style>
      .table {
        font-family: sans;
        display: flex;
        flex-direction: column;
        border: solid 2px #DDD;
        border-radius: 9px;
        overflow: hidden
      }
      .table .head {
        display: flex;
        background: #F9F9F9;
        font-weight: bold;
      }
      .table .head > div {
        flex: 1;
        padding: 8px 12px;
      }
      .table .body {
        display: flex;
        flex-direction: column;
      }
    </style>
    <div class="table">
      <div class="head">
        <div>
          No
        </div>
        <div>
          Nama
        </div>
        <div>
          Email
        </div>
        <div>
          Alamat
        </div>
      </div>
      <div class="body">
        {{ #rows }}
      </div>
    </div>
  `;

  updateTable(table_data) {
    this.data['#rows'].value = table_data.map(({ no, nama, email, alamat }) => (
      `<table-row 
        $click="showAlert"
        no="${no}"
        email="${email}"
        nama="${nama}"
        alamat="${alamat}">
      </table-row>`
    )).join('');
  }

  showAlert(data) {
    alert(`You clicked no ${data.no}`);
  }

  init() {
    const table_data = [
      { no: 1, nama: 'Andi', email: 'andi@aa.aa', alamat: 'Jalan A' },
      { no: 2, nama: 'Budi', email: 'budi@aa.aa', alamat: 'Jalan B' },
      { no: 3, nama: 'Cika', email: 'cika@aa.aa', alamat: 'Jalan C' },
      { no: 4, nama: 'Dedi', email: 'dedi@aa.aa', alamat: 'Jalan D' },
    ];
    this.updateTable(table_data);
  }
});
