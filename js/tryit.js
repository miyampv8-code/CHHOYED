/* Live "Try it" editor for HTML, CSS and JavaScript code blocks.
   Adds a "Try it" button to each runnable block. The code runs inside a sandboxed iframe,
   so it cannot touch the rest of the page. Used by the course view and by the static lesson pages. */
(function () {
  const LANGS = ['html', 'css', 'javascript'];

  // Blocks that are only syntax templates (placeholders), not real examples
  const TEMPLATE = /\.\.\.|tagname|attribute="|selector\s*\{|property\s*:\s*value|\(condition\)|\(parameters\)|\(start; test; step\)|name\(parameters\)|function name\(|querySelector\("selector"\)|addEventListener\("event"|fetch\(url\)|href="address"|src="file"|console\.log\(value\)|\/\/ code\b|\/\/ repeated code|\/\/ runs when|\/\/ use the data|\/\/ ok\b/;

  const BASE = '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<style>body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;line-height:1.5;padding:12px;margin:0;color:#14162b}</style>';

  const SAMPLE = '<h1>Heading</h1><p class="note">A paragraph with a <a href="#">link</a> inside it.</p>' +
    '<nav class="menu"><a href="#">Home</a><a href="#">Courses</a><a href="#">Contact</a></nav>' +
    '<div class="card box"><p>A card</p></div><p><button class="button btn">Button</button></p>' +
    '<ul><li>One</li><li>Two</li><li>Three</li></ul>' +
    '<div class="gallery cards row container"><div class="item card">1</div><div class="item card">2</div><div class="item card">3</div></div>';

  const lang = code => (code.className.match(/language-(\w+)/) || [])[1] || '';
  const isFull = t => /<html|<!doctype/i.test(t);
  const noScripts = t => t.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<link[^>]*rel=["']?stylesheet[^>]*>/gi, '');
  const safeScript = t => t.replace(/<\/script/gi, '<\\/script');

  function context(htmlCtx) {
    return htmlCtx ? noScripts(htmlCtx) : BASE + SAMPLE;
  }

  function build(kind, code, htmlCtx) {
    if (kind === 'html') {
      return isFull(code) ? code : BASE + code;
    }
    if (kind === 'css') {
      const ctx = context(htmlCtx), style = '<style>' + code.replace(/<\/style/gi, '<\\/style') + '</style>';
      if (/<\/head>/i.test(ctx)) return ctx.replace(/<\/head>/i, style + '</head>');
      return (isFull(ctx) ? '' : BASE) + style + ctx.replace(BASE, '');
    }
    // javascript: show console output; run inside the last HTML example if there is one
    const logger = '<style>.l{white-space:pre-wrap;font:13px/1.5 ui-monospace,Menlo,Consolas,monospace;border-bottom:1px solid #8883;padding:3px 0}.e{color:#c62828}</style>' +
      '<script>(function(){function f(x){try{return typeof x==="string"?x:(x&&typeof x==="object"?JSON.stringify(x):String(x))}catch(e){return String(x)}}' +
      'function s(a,c){var d=document.createElement("div");d.className="l "+(c||"");d.textContent=a.map(f).join(" ");(document.getElementById("__log")||document.body).appendChild(d)}' +
      'console.log=function(){s([].slice.call(arguments))};console.warn=console.log;console.error=function(){s([].slice.call(arguments),"e")};' +
      'window.onerror=function(m){s([m],"e")};window.addEventListener("unhandledrejection",function(e){s([String(e.reason)],"e")})})()<\/script>';
    const body = htmlCtx ? noScripts(htmlCtx) : BASE;
    return body + '<div id="__log"></div>' + logger + '<script>' + safeScript(code) + '<\/script>';
  }

  // Send the code of a block to the Playground page (HTML, CSS and JavaScript go to their own tabs)
  function toPlayground(kind, code, htmlCtx) {
    let html = '', css = '', js = '';
    const frag = h => { const d = new DOMParser().parseFromString(h, 'text/html'); const st = [...d.querySelectorAll('style')].map(x => x.textContent).join('\n\n'), sc = [...d.querySelectorAll('script:not([src])')].map(x => x.textContent).join('\n\n'); d.querySelectorAll('script,style,link').forEach(x => x.remove()); return { html: d.body.innerHTML.trim(), css: st.trim(), js: sc.trim() }; };
    if (kind === 'html') ({ html, css, js } = frag(code));
    else if (kind === 'css') { css = code; html = htmlCtx ? frag(htmlCtx).html : SAMPLE; }
    else { js = code; html = htmlCtx ? frag(htmlCtx).html : ''; }
    try { sessionStorage.setItem('chhoyed-pg-import', JSON.stringify({ html, css, js })); } catch { }
    const spa = !!document.getElementById('app');
    location.href = (spa ? '' : (location.pathname.indexOf('/lessons/') >= 0 ? '../' : '') + 'index.html') + '#/playground';
  }

  function open(pre, kind, original, htmlCtx) {
    let panel = pre.nextElementSibling;
    if (panel && panel.classList.contains('try')) { panel.querySelector('textarea').focus(); return; }
    const live = kind !== 'javascript' && !/<script/i.test(original);
    panel = document.createElement('div');
    panel.className = 'try';
    panel.innerHTML = '<div class="try-h"><b>Try it</b><span>' + (live ? 'Edit the code. The result updates as you type.' : 'Edit the code, then press Run (or Ctrl + Enter).') + '</span>' +
      '<span class="try-sp"></span>' + (live ? '' : '<button type="button" class="try-run">Run</button>') +
      '<button type="button" class="try-pg">Open in Playground</button><button type="button" class="try-reset">Reset</button><button type="button" class="try-close">Close</button></div>' +
      '<div class="try-g"><textarea class="try-code" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Code editor"></textarea>' +
      '<iframe class="try-out" sandbox="allow-scripts allow-modals allow-forms" title="Result"></iframe></div>';
    pre.after(panel);
    const ta = panel.querySelector('textarea'), fr = panel.querySelector('iframe');
    ta.value = original;
    const run = () => { fr.srcdoc = build(kind, ta.value, htmlCtx); };
    let tm;
    if (live) ta.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(run, 300); });
    ta.addEventListener('keydown', e => {
      if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); const a = ta.selectionStart; ta.setRangeText('  ', a, ta.selectionEnd, 'end'); if (live) ta.dispatchEvent(new Event('input')); }
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); }
    });
    panel.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.classList.contains('try-run')) run();
      if (b.classList.contains('try-reset')) { ta.value = original; run(); }
      if (b.classList.contains('try-close')) panel.remove();
      if (b.classList.contains('try-pg')) toPlayground(kind, ta.value, htmlCtx);
    });
    run();
  }

  function enhance(root) {
    let lastHtml = '';
    (root || document).querySelectorAll('.lesson pre').forEach(pre => {
      const code = pre.querySelector('code'); if (!code) return;
      const kind = lang(code); if (!LANGS.includes(kind)) return;
      const text = code.textContent;
      const ctx = lastHtml;
      if (kind === 'html') lastHtml = text;
      if (pre.querySelector('.tryb') || TEMPLATE.test(text) || text.trim().split('\n').length < 2 && kind !== 'html' && !/console\.log|document\./.test(text)) return;
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'tryb'; b.textContent = '\u25B6 Try it'; b.setAttribute('aria-label', 'Try this code');
      b.addEventListener('click', () => open(pre, kind, text, ctx));
      pre.appendChild(b);
    });
  }

  window.ChhoyedTry = { enhance };
})();