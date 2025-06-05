/* prism-demo.js */
   const version = "1.30.0";
   const head    = document.head;
   
   const bundles = {
     default: {
       css: [`https://cdn.jsdelivr.net/npm/prismjs@${version}/themes/prism.css`],
       js : [`https://cdn.jsdelivr.net/npm/prismjs@${version}/prism.min.js`],
       preClass: ""
     },
     okaidia: {
       css: [`https://cdn.jsdelivr.net/npm/prismjs@${version}/themes/prism-okaidia.css`],
       js : [`https://cdn.jsdelivr.net/npm/prismjs@${version}/prism.min.js`],
       preClass: ""
     },
     dark: {
       css: [`https://cdn.jsdelivr.net/npm/prismjs@${version}/themes/prism-dark.css`],
       js : [`https://cdn.jsdelivr.net/npm/prismjs@${version}/prism.min.js`],
       preClass: ""
     },
     "line-numbers": {
       css: [
         `https://cdn.jsdelivr.net/npm/prismjs@${version}/themes/prism.css`,
         `https://cdn.jsdelivr.net/npm/prismjs@${version}/plugins/line-numbers/prism-line-numbers.css`
       ],
       js: [
         `https://cdn.jsdelivr.net/npm/prismjs@${version}/prism.min.js`,
         `https://cdn.jsdelivr.net/npm/prismjs@${version}/plugins/line-numbers/prism-line-numbers.min.js`
       ],
       preClass: "line-numbers"
     }
   };
   
   /* ------------------------------------------------------------ */
   function appendScript(url) {
     const s = document.createElement("script");
     s.src = url;
     s.defer = true;
     s.setAttribute("data-prism", "");
     head.appendChild(s);
     return s;
   }
   
   function loadBundle(name) {
     const bundle = bundles[name];
     if (!bundle) return;
   
     /* Remove any previously injected Prism assets */
     document.querySelectorAll('link[data-prism]').forEach(l => l.remove());
     document.querySelectorAll('script[data-prism]').forEach(s => s.remove());
   
     /* Inject CSS */
     bundle.css.forEach(url => {
       const link = document.createElement("link");
       link.rel  = "stylesheet";
       link.href = url;
       link.setAttribute("data-prism", "");
       head.appendChild(link);
     });
   
     /* Load Prism core first */
     const core = appendScript(bundle.js[0]);
     core.onload = () => {
       /* Load plug-ins (if any).  Highlight only after the LAST one fires. */
       const plugins = bundle.js.slice(1);
       if (!plugins.length) {
         applyPreClass(bundle.preClass);
         Prism.highlightAll();
         return;
       }
   
       /* Load all plug-ins; wait for the last to load */
       const lastPluginUrl = plugins.pop();
       plugins.forEach(appendScript);
       const lastPlugin = appendScript(lastPluginUrl);
   
       lastPlugin.onload = () => {
         applyPreClass(bundle.preClass);
         Prism.highlightAll();
       };
     };
   }
   
   /* Ensure line-numbers class is applied/removed before highlighting */
   function applyPreClass(preClass) {
     document.querySelectorAll("pre").forEach(pre => {
       pre.classList.remove("line-numbers");
       if (preClass) pre.classList.add(preClass);
     });
   }
   
   /* ------------------------------------------------------------ */
   document
     .getElementById("bundle")
     .addEventListener("change", e => loadBundle(e.target.value));
   
   /* Initial load */
   loadBundle("default");
   
