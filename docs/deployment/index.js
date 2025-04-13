customElements.define("main-page", class extends Siput {
  html = `
    <docs-template active="deployment">
      <div>
        <h2 style="margin-top: 0px">
          Deployment
        </h2>
        <p>
          We recommend deployment on Apache or Nginx, but deployment is not limited to other web server like: LiteSpeed, H2O, Microsoft-IIS, OpenResty, or any other program that can serve html, js, css, and other files.
        </p>
        <p>
          Look at our guide to deploy on Apache Web Server and Nginx
        </p>
        <br/>
        <div style="display:flex;gap:12px;">
          <ca-anchor 
            href="/docs/nginx"
            bigger 
            outline>
            Deploy on Nginx
          </ca-anchor>
          <ca-anchor 
            href="/docs/apache"
            bigger 
            outline>
            Deploy on Apache
          </ca-anchor>
        </div>
      </div>
    </docs-template>
  `;
});
