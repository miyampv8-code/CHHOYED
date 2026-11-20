/* Playground: write HTML, CSS and JavaScript, and see the result.
   The code runs inside a sandboxed iframe, so it cannot touch the rest of the page.
   Used by the course view (#/playground) and by playground.html. */
(function () {
  const KEY = 'chhoyed-playground';
  const tr = window.I18N ? I18N.tr : s => s;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const EX = {
    hello: {
      name: 'Hello page',
      html: '<h1>Hello, CHHOYED!</h1>\n<p>Change this text, then look at the result.</p>\n<ul>\n  <li>HTML builds the page</li>\n  <li>CSS makes it beautiful</li>\n  <li>JavaScript makes it move</li>\n</ul>',
      css: 'body {\n  font-family: system-ui, sans-serif;\n  padding: 20px;\n}\n\nh1 {\n  color: #5b3df5;\n}\n\nli {\n  margin: 6px 0;\n}',
      js: ''
    },
    counter: {
      name: 'Click counter (with JavaScript)',
      html: '<h2>Counter</h2>\n<p id="count">0</p>\n<button id="plus">+1</button>\n<button id="reset">Reset</button>',
      css: 'body {\n  font-family: system-ui, sans-serif;\n  text-align: center;\n  padding: 20px;\n}\n\n#count {\n  font-size: 3rem;\n  font-weight: 800;\n  margin: 10px 0;\n}\n\nbutton {\n  padding: 10px 20px;\n  border: 0;\n  border-radius: 99px;\n  background: #5b3df5;\n  color: white;\n  font-size: 1rem;\n  cursor: pointer;\n}',
      js: 'let count = 0;\nconst show = document.getElementById("count");\n\ndocument.getElementById("plus").addEventListener("click", () => {\n  count++;\n  show.textContent = count;\n  console.log("count is now", count);\n});\n\ndocument.getElementById("reset").addEventListener("click", () => {\n  count = 0;\n  show.textContent = count;\n  console.log("reset");\n});'
    },
    cards: {
      name: 'Cards with Flexbox',
      html: '<div class="row">\n  <div class="card"><h3>HTML</h3><p>Structure</p></div>\n  <div class="card"><h3>CSS</h3><p>Style</p></div>\n  <div class="card"><h3>JavaScript</h3><p>Behavior</p></div>\n</div>',
      css: 'body {\n  font-family: system-ui, sans-serif;\n  padding: 20px;\n}\n\n.row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.card {\n  flex: 1 1 140px;\n  padding: 18px;\n  border-radius: 14px;\n  background: #f4f5fb;\n  border: 1px solid #e3e6f0;\n  transition: transform .2s;\n}\n\n.card:hover {\n  transform: translateY(-4px);\n}\n\n.card h3 {\n  margin: 0 0 6px;\n}',
      js: ''
    },
    dark: {
      name: 'Dark mode switch',
      html: '<h2>Dark mode</h2>\n<p>Press the button to switch the colors.</p>\n<button id="mode">Switch</button>',
      css: 'body {\n  font-family: system-ui, sans-serif;\n  padding: 20px;\n  background: #ffffff;\n  color: #1a1a2e;\n  transition: background .3s, color .3s;\n}\n\nbody.dark {\n  background: #0f1020;\n  color: #eceefb;\n}\n\nbutton {\n  padding: 10px 20px;\n  border-radius: 99px;\n  border: 2px solid currentColor;\n  background: transparent;\n  color: inherit;\n  font-size: 1rem;\n  cursor: pointer;\n}',
      js: 'document.getElementById("mode").addEventListener("click", () => {\n  const dark = document.body.classList.toggle("dark");\n  console.log(dark ? "dark mode on" : "dark mode off");\n});'
    }
  };

  const BASE = '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;line-height:1.5;margin:0;padding:12px}</style>';
  const CONSOLE = '<script>(function(){function f(x){try{return typeof x==="string"?x:(x&&typeof x==="object"?JSON.stringify(x):String(x))}catch(e){return String(x)}}' +
    'function send(t,a){try{parent.postMessage({pg:1,type:t,text:a.map(f).join(" ")},"*")}catch(e){}}' +
    'console.log=function(){send("log",[].slice.call(arguments))};console.info=console.log;' +
    'console.warn=function(){send("warn",[].slice.call(arguments))};console.error=function(){send("error",[].slice.call(arguments))};' +
    'window.onerror=function(m,s,l){send("error",[m+(l?" (line "+l+")":"")])};' +
    'window.addEventListener("unhandledrejection",function(e){send("error",[String(e.reason)])})})()<\/script>';

  const safeScript = t => t.replace(/<\/script/gi, '<\\/script');
  const safeStyle = t => t.replace(/<\/style/gi, '<\\/style');

  function build(html, css, js, withJs) {
    return '<!doctype html><html lang="en"><head>' + BASE + '<style>' + safeStyle(css) + '</style></head><body>' + html +
      (withJs ? CONSOLE + '<script>' + safeScript(js) + '<\/script>' : '') + '</body></html>';
  }

  function download(html, css, js) {
    return '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>My page</title>\n  <style>\n' +
      css + '\n  </style>\n</head>\n<body>\n' + html + (js.trim() ? '\n\n<script>\n' + js + '\n</script>' : '') + '\n</body>\n</html>\n';
  }

  function markup() {
    const opts = Object.keys(EX).map(k => '<option value="' + k + '">' + esc(EX[k].name) + '</option>').join('');
    return '<div class="pg" id="pg">' +
      '<div class="pg-bar"><label>' + esc(tr('Example')) + ' <select data-pg-ex>' + opts + '</select></label><span class="pg-sp"></span>' +
      '<button type="button" class="pg-run" data-pg="run">\u25B6 ' + esc(tr('Run')) + '</button>' +
      '<button type="button" data-pg="reset">' + esc(tr('Reset')) + '</button>' +
      '<button type="button" data-pg="copy">' + esc(tr('Copy all')) + '</button>' +
      '<button type="button" data-pg="download">' + esc(tr('Download')) + '</button></div>' +
      '<div class="pg-g"><div class="pg-ed">' +
      '<div class="pg-tabs" role="tablist"><button type="button" class="on" data-tab="html">HTML</button><button type="button" data-tab="css">CSS</button><button type="button" data-tab="js">JavaScript</button></div>' +
      '<textarea data-pane="html" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="HTML"></textarea>' +
      '<textarea data-pane="css" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="CSS" hidden></textarea>' +
      '<textarea data-pane="js" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="JavaScript" hidden></textarea></div>' +
      '<div class="pg-out"><iframe data-pg-frame sandbox="allow-scripts allow-modals allow-forms" title="Result"></iframe>' +
      '<div class="pg-con"><div class="pg-con-h"><b>Console</b><button type="button" data-pg="clear">' + esc(tr('Clear')) + '</button></div><div class="pg-log" data-pg-log role="log"></div></div></div></div>' +
      '<p class="pg-hint">' + esc(tr('HTML and CSS update as you type. After you change the JavaScript, press Run (or Ctrl + Enter). Your work is saved in this browser.')) + '</p></div>';
  }

  function init(root) {
    const pg = root.querySelector('#pg'); if (!pg) return;
    const q = s => pg.querySelector(s);
    const panes = { html: q('[data-pane=html]'), css: q('[data-pane=css]'), js: q('[data-pane=js]') };
    const frame = q('[data-pg-frame]'), log = q('[data-pg-log]'), sel = q('[data-pg-ex]');
    let jsActive = false, tm, saveTm;

    const values = () => ({ html: panes.html.value, css: panes.css.value, js: panes.js.value });
    const say = (text, type) => {
      const d = document.createElement('div'); d.className = 'pg-line ' + (type || 'log'); d.textContent = text; log.appendChild(d);
      while (log.children.length > 200) log.removeChild(log.firstChild);
      log.scrollTop = log.scrollHeight;
    };
    const render = () => {
      const v = values(); log.textContent = '';
      if (!jsActive && v.js.trim()) say(tr('JavaScript has not run yet. Press Run.'), 'hint');
      frame.srcdoc = build(v.html, v.css, v.js, jsActive);
    };
    const load = key => { const e = EX[key]; panes.html.value = e.html; panes.css.value = e.css; panes.js.value = e.js; jsActive = true; render(); };
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify({ ...values(), ex: sel.value })); } catch { } };

    // start from the saved work, or from the first example
    let imp = null; try { imp = JSON.parse(sessionStorage.getItem('chhoyed-pg-import') || 'null'); sessionStorage.removeItem('chhoyed-pg-import'); } catch { }
    let saved = null; try { saved = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { }
    if (imp && typeof imp.html === 'string') {
      panes.html.value = imp.html; panes.css.value = imp.css || ''; panes.js.value = imp.js || '';
      jsActive = true; render(); save();
    } else if (saved && typeof saved.html === 'string') {
      panes.html.value = saved.html; panes.css.value = saved.css || ''; panes.js.value = saved.js || '';
      if (EX[saved.ex]) sel.value = saved.ex;
      jsActive = true; render();
    } else load('hello');

    // messages from the console inside the iframe
    const onMsg = e => { if (e.source === frame.contentWindow && e.data && e.data.pg) say(e.data.text, e.data.type); };
    if (window.__pgMsg) removeEventListener('message', window.__pgMsg);
    window.__pgMsg = onMsg; addEventListener('message', onMsg);

    pg.addEventListener('input', e => {
      if (!e.target.dataset.pane) return;
      clearTimeout(saveTm); saveTm = setTimeout(save, 400);
      if (e.target.dataset.pane !== 'js') { clearTimeout(tm); tm = setTimeout(render, 350); }
    });
    pg.addEventListener('keydown', e => {
      if (!e.target.dataset || !e.target.dataset.pane) return;
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); jsActive = true; render(); }
      if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); const t = e.target; t.setRangeText('  ', t.selectionStart, t.selectionEnd, 'end'); t.dispatchEvent(new Event('input', { bubbles: true })); }
    });
    sel.addEventListener('change', () => { load(sel.value); save(); });
    pg.addEventListener('click', async e => {
      const tab = e.target.closest('[data-tab]');
      if (tab) {
        pg.querySelectorAll('.pg-tabs button').forEach(b => b.classList.toggle('on', b === tab));
        Object.keys(panes).forEach(k => { panes[k].hidden = k !== tab.dataset.tab; });
        panes[tab.dataset.tab].focus(); return;
      }
      const b = e.target.closest('[data-pg]'); if (!b) return;
      const v = values(), a = b.dataset.pg;
      if (a === 'run') { jsActive = true; render(); save(); }
      if (a === 'reset') { load(sel.value); save(); }
      if (a === 'clear') log.textContent = '';
      if (a === 'copy') {
        const text = download(v.html, v.css, v.js);
        let ok = true; try { await navigator.clipboard.writeText(text); } catch { ok = false; }
        const old = b.textContent; b.textContent = ok ? tr('Copied!') : tr('Press Ctrl+C'); setTimeout(() => { b.textContent = old; }, 1500);
      }
      if (a === 'download') {
        const url = URL.createObjectURL(new Blob([download(v.html, v.css, v.js)], { type: 'text/html' }));
        const l = document.createElement('a'); l.href = url; l.download = 'index.html'; document.body.appendChild(l); l.click(); l.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      }
    });
  }

  window.ChhoyedPlayground = { markup, init };
  // on playground.html the script mounts the editor by itself
  const mount = document.getElementById('pg-root');
  if (mount) { mount.innerHTML = markup(); init(mount); }
})();
