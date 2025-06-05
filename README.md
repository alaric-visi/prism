# Prism Bundle Demo ✨

A tiny HTML + JS playground that lets you swap **Prism .js** themes (and optional plug-ins) on the fly.  
Great for A/B-testing colour schemes or teaching how Prism’s “build-your-own” bundles work.

<img width="945" alt="prism" src="https://github.com/user-attachments/assets/9f40cdc3-88f6-4bea-9f9b-2132f7f175fa" />

---

## 📂 Repository layout

| File / folder      | Purpose |
|--------------------|---------|
| index.html         | Minimal page with a dropdown, two sample code blocks, and a little CSS. |
| js/prism-demo.js   | Loads Prism core + plug-ins from jsDelivr, then runs `highlightAll()` **after** every script finishes (so line numbers work). |
| style.css          | Shared fonts/variables if you want to reuse site-wide styles. |

## 🚀 Quick start

```bash
git clone https://github.com/<your-user>/prism-bundle-demo.git
cd prism-bundle-demo
```

Or open index.html with Live Server or any static host

## 🛠️ How it works

- The dropdown triggers loadBundle(name).
- Required theme CSS files are injected.
- Prism core loads, followed by any plug-ins (e.g. line-numbers).
- When the last script’s onload fires we toggle any extra classes (line-numbers, etc.) and run Prism.highlightAll().

Because highlighting waits for every plug-in, line numbers (or whatever else you add) show up reliably.

## 🎨 Customising

### Add another theme

JavaScript
```JavaScript
bundles['tomorrow-night'] = {
  css: [`https://cdn.jsdelivr.net/npm/prismjs@${version}/themes/prism-tomorrow.min.css`],
  js:  [`https://cdn.jsdelivr.net/npm/prismjs@${version}/prism.min.js`],
  preClass: ''
};
```

HTML
Add an option in the HTML:
```HTML
<option value="tomorrow-night">Tomorrow Night</option>
```

### Add another plug-in

JavaScript
```JavaScript
bundles['dark+autoloader'] = {
  css: [`https://cdn.jsdelivr.net/npm/prismjs@${version}/themes/prism-dark.css`],
  js:  [
    `https://cdn.jsdelivr.net/npm/prismjs@${version}/prism.min.js`,
    `https://cdn.jsdelivr.net/npm/prismjs@${version}/plugins/autoloader/prism-autoloader.min.js`
  ],
  preClass: ''
};
```
### Using language classes

Any class that starts with language-xxxx (or lang-xxxx) will be highlighted as long as the language grammar is present in the bundle you’re loading.

| Language        | Class examples                                   |
|-----------------|--------------------------------------------------|
| JavaScript      | `language-js`, `language-javascript`             |
| Python          | `language-py`, `language-python`                 |
| TypeScript      | `language-ts`, `language-typescript`             |
| Bash / Shell    | `language-bash`, `language-sh`, `language-shell` |
| Markdown        | `language-md`, `language-markdown`               |
| JSON            | `language-json`                                  |
| C / C++         | `language-c`, `language-cpp`                     |
| **Java**        | `language-java`                                  |
| **PHP**         | `language-php`                                   |
| **Go**          | `language-go`                                    |
| **Ruby**        | `language-ruby`, `language-rb`                   |
| **Rust**        | `language-rust`                                  |
| **Swift**       | `language-swift`                                 |
| **Kotlin**      | `language-kotlin`, `language-kt`                 |
| **SQL**         | `language-sql`                                   |
| **YAML**        | `language-yaml`, `language-yml`                  |
| **HTML / Markup** | `language-markup`, `language-html`, `language-xml`, `language-svg` |

## 📚 Further reading and reference guide

- Prism .js documentation & bundle builder — https://prismjs.com/
- https://github.com/PrismJS






