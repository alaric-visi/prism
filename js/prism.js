const version = '1.30.0';
    const head = document.head;

    const bundles = {
      default: {
        css: [`https://cdn.jsdelivr.net/npm/prismjs@${version}/themes/prism.css`],
        js: [`https://cdn.jsdelivr.net/npm/prismjs@${version}/prism.min.js`],
        preClass: ''
      },
      okaidia: {
        css: [`https://cdn.jsdelivr.net/npm/prismjs@${version}/themes/prism-okaidia.css`],
        js: [`https://cdn.jsdelivr.net/npm/prismjs@${version}/prism.min.js`],
        preClass: ''
      },
      dark: {
        css: [`https://cdn.jsdelivr.net/npm/prismjs@${version}/themes/prism-dark.css`],
        js: [`https://cdn.jsdelivr.net/npm/prismjs@${version}/prism.min.js`],
        preClass: ''
      },
      'line-numbers': {
        css: [
          `https://cdn.jsdelivr.net/npm/prismjs@${version}/themes/prism.css`,
          `https://cdn.jsdelivr.net/npm/prismjs@${version}/plugins/line-numbers/prism-line-numbers.css`
        ],
        js: [
          `https://cdn.jsdelivr.net/npm/prismjs@${version}/prism.min.js`,
          `https://cdn.jsdelivr.net/npm/prismjs@${version}/plugins/line-numbers/prism-line-numbers.min.js`
        ],
        preClass: 'line-numbers'
      }
    };

    function loadBundle(name) {
      const bundle = bundles[name];
      if (!bundle) return;

      document.querySelectorAll('link[data-prism]').forEach(l => l.remove());
      document.querySelectorAll('script[data-prism]').forEach(s => s.remove());

      bundle.css.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.setAttribute('data-prism', '');
        head.appendChild(link);
      });

      const core = document.createElement('script');
      core.src = bundle.js[0];
      core.defer = true;
      core.setAttribute('data-prism', '');
      core.onload = () => {
        bundle.js.slice(1).forEach(url => {
          const s = document.createElement('script');
          s.src = url;
          s.defer = true;
          s.setAttribute('data-prism', '');
          head.appendChild(s);
        });

        document.querySelectorAll('pre').forEach(pre => {
          pre.classList.remove('line-numbers');
          if (bundle.preClass) pre.classList.add(bundle.preClass);
        });

        window.Prism && Prism.highlightAll();
      };
      head.appendChild(core);
    }

    document.getElementById('bundle').addEventListener('change', e => loadBundle(e.target.value));
    loadBundle('default');