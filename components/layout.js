customElements.define("ca-header", class extends Siput {
  html = `
    <style>
      header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 16px !important;
        padding-bottom: 16px !important;
        background: #FFFB;
        backdrop-filter: blur(8px);
      }
      header .container-logo {
        display: flex;
        align-items: center;
        gap: 14px;
        font-family: "Plus Jakarta Sans", sans-serif;
      }
      header .container-logo > img {
        height: 30px;
        object-fit: contain;
      }
      header .logo {
        font-weight: 800;
        font-size: 20px;
        color: #283618;
      }
      header .menu {
        font-family: "Plus Jakarta Sans", sans-serif;
        display: flex;
        align-items: center;
        gap: 36px;
        font-size: 14px;
        font-weight: 500;
      }
      header .menu img {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
    </style>
    <header class="px">
      <a href="/" class="container-logo">
        <img src="/img/logo.svg" />
        <div class="logo">
          Siput.JS
        </div>
      </a>
      <div class="menu">
        <a href="/docs">
          Docs
        </a>
        <a href="/blog">
          Blog
        </a>
        <ca-button 
          $onclick="gotoGetStarted">
          Getting Started
        </ca-button>
        <a href="https://github.com/Graf-Research/siput-js">
          <img src="/img/github.svg" />
        </a>
      </div>
    </header>
  `;

  gotoGetStarted() {
    window.location.href = '/docs/getting-started';
  }
});

customElements.define("ca-footer", class extends Siput {
  html = `
    <style>
      footer {
        display: flex;
        flex-direction: column;
        gap: 12px;
        font-size: 13px;
        padding-top: 64px !important;
        padding-bottom: 24px !important;
      }
      footer .disclaimer {
        color: #888;
        font-size: 12px;
        text-align: justify;
      }
    </style>
    <footer class="px">
      <div>
        Copyright &copy; 2025 Graf Research
      </div>
      <div class="disclaimer">
        THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </div>
    </footer>
  `;
});

customElements.define("ca-template", class extends Siput {
  html = `
    <style>
      main {
        display: flex;
        flex-direction: column;
      }
      .sticky-header {
        position: sticky;
        top: 0;
        margin-bottom: 24px;
        z-index: 999;
      }
    </style>
    <main>
      <div class="sticky-header">
        <ca-header></ca-header>
      </div>
      ${this.children_view}
      <ca-footer></ca-footer>
    </main>
  `;
});
