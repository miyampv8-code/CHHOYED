/* Small helper for the static lesson pages made by build_pages.py:
   theme button, code colours, copy buttons, callout boxes, "Mark as done", Try it editor, helpful buttons. */
(function () {
  // Theme toggle (same setting as the course view)
  const themeBtn = document.getElementById('theme');
  if (themeBtn) {
    const SUN = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    const MOON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    const eff = () => document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const paint = () => { const d = eff() === 'dark', l = d ? 'Switch to light mode' : 'Switch to dark mode'; themeBtn.innerHTML = d ? SUN : MOON; themeBtn.title = l; themeBtn.setAttribute('aria-label', l); };
    themeBtn.addEventListener('click', () => { const n = eff() === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = n; try { localStorage.setItem('chhoyed-theme', n); } catch { } paint(); });
    paint();
  }

  // Code colours
  if (window.hljs) document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));

  // Copy buttons
  document.querySelectorAll('.lesson pre').forEach(pre => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'copy'; b.textContent = 'Copy'; b.setAttribute('aria-label', 'Copy code'); pre.appendChild(b);
  });
  const copyText = async t => { try { await navigator.clipboard.writeText(t); return true; } catch { const a = document.createElement('textarea'); a.value = t; a.style.position = 'fixed'; a.style.opacity = '0'; document.body.appendChild(a); a.select(); let ok = false; try { ok = document.execCommand('copy'); } catch { } a.remove(); return ok; } };

  // Callout boxes
  document.querySelectorAll('.lesson blockquote').forEach(bq => { const f = bq.querySelector('strong')?.textContent || ''; bq.classList.add('co', /key idea/i.test(f) ? 'key' : /remember/i.test(f) ? 'rem' : 'note'); });

  // Try it editor and helpful buttons
  if (window.ChhoyedTry) ChhoyedTry.enhance(document);
  if (window.ChhoyedHelpful) ChhoyedHelpful.init(document);
  if (window.ChhoyedReader) ChhoyedReader.enhance(document);

  // Progress (same storage as the course view)
  const PK = 'chhoyed-progress';
  const getP = () => { try { const p = JSON.parse(localStorage.getItem(PK) || '{}'); return { done: Array.isArray(p.done) ? p.done : [], last: typeof p.last === 'string' ? p.last : '' }; } catch { return { done: [], last: '' }; } };
  const setP = p => { try { localStorage.setItem(PK, JSON.stringify(p)); } catch { } };
  const art = document.querySelector('article[data-id]');
  const paintDone = (b, on) => { b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); b.textContent = on ? '\u2713 Done' : 'Mark as done'; };
  if (art && art.dataset.ordered) {
    const P = getP(); if (P.last !== art.dataset.id) { P.last = art.dataset.id; setP(P); }
    const b = document.querySelector('[data-done]'); if (b) paintDone(b, P.done.includes(art.dataset.id));
  }

  document.addEventListener('click', async e => {
    const c = e.target.closest('.copy');
    if (c) { const pre = c.parentElement, ok = await copyText((pre.querySelector('code') || pre).textContent); c.textContent = ok ? 'Copied!' : 'Press Ctrl+C'; c.classList.toggle('ok', ok); setTimeout(() => { c.textContent = 'Copy'; c.classList.remove('ok'); }, 1600); return; }
    const b = e.target.closest('[data-done]');
    if (b) { const P = getP(), id = b.dataset.done, i = P.done.indexOf(id); if (i < 0) P.done.push(id); else P.done.splice(i, 1); setP(P); paintDone(b, i < 0); }
  });

  // Phone header: hide the menu row while scrolling down, show it again when scrolling up
  (function () {
    let last = window.scrollY, busy = false;
    const small = matchMedia('(max-width:760px)');
    addEventListener('scroll', () => {
      if (busy) return; busy = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (!small.matches) document.body.classList.remove('nav-hidden');
        else if (y > last + 6 && y > 120) document.body.classList.add('nav-hidden');
        else if (y < last - 6 || y < 60) document.body.classList.remove('nav-hidden');
        last = y; busy = false;
      });
    }, { passive: true });
  })();

  // Offline support (same worker as the course view)
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    navigator.serviceWorker.register((location.pathname.indexOf('/lessons/') >= 0 ? '../' : '') + 'sw.js').catch(() => { });
  }
})();