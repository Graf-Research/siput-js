customElements.define("main-page", class extends Siput {
  html = `
    <docs-template active="nginx">
      <div>
        <h2 style="margin-top: 0px">
          Nginx
        </h2>
        <p>
          This is our basic nginx configuration
        </p>
        <code-highlight lang="nginx">${Siput.escapeHTML(`
server {
  server_name <domain-name>; #   ------------ change <domain-name> to your domain name
  listen 80;
  root /var/www/html/<project-folder>; #  --- change <project-folder> to your project folder

  location ~* ^.+\.(css|js|html)$ {
    expires -1;
    add_header 'Cache-Control' 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
  }
}
        `.trim())}</code-highlight>
        <p>
          On lines 6-9 we recommend this config prevent any cache happening on html, css, and js files, since some browser might
          add cache headers on its own. The cache config will set no-cache expression on some files and keep the files up-to-date if there 
          are some code updates on your website.
        </p>
        <br/>
        <ca-anchor 
          href="/docs/components"
          bigger 
          outline>
          Next: Components
        </ca-anchor>
      </div>
    </docs-template>
  `;
});
