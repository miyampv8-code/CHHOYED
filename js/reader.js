/* Reader helpers for lesson pages (used by the course view and by the pages made for Google):
   - a "5 min read" label,
   - a Print button (the print layout is in css/style.css),
   - an "On this page" list of the lesson's headings, with the current section highlighted. */
(function () {
  const tr = window.I18N ? I18N.tr : (s, v) => (v ? s.replace(/\{(\w+)\}/g, (m, k) => (k in v ? v[k] : m)) : s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const slug = t => t.toLowerCase().replace(/[^a-z0-9\u1780-\u17ff]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'section';
  let io = null;

  function enhance(root) {
    root = root || document;
    if (io) { io.disconnect(); io = null; }
    const art = root.querySelector('article');
    const les = art && art.querySelector('.lesson');
    // only on real lesson pages (they have the "Mark as done" bar or the helpful buttons)
    if (!les || !(art.querySelector('.donebar') || art.querySelector('.helpful')) || art.querySelector('.rt, .printbtn')) return;

    // 1. reading time and print button, placed just above the title
    const h1 = art.querySelector('h1');
    const words = (les.innerText || '').trim().split(/\s+/).filter(Boolean).length;
    let bar = '';
    if (words >= 60) bar += '<span class="pill rt">\u23F1 ' + esc(tr('{n} min read', { n: Math.max(1, Math.round(words / 200)) })) + '</span>';
    bar += '<button type="button" class="pill printbtn" data-print>\uD83D\uDDA8 ' + esc(tr('Print')) + '</button>';
    if (h1) h1.insertAdjacentHTML('beforebegin', bar);

    // 2. "On this page": for lessons with at least three headings
    const heads = Array.from(les.querySelectorAll(':scope > h2'));
    if (heads.length < 3) return;
    heads.forEach((h, i) => { if (!h.id) h.id = 'sec-' + (i + 1) + '-' + slug(h.textContent); });
    const items = heads.map(h => '<button type="button" data-otp="' + esc(h.id) + '">' + esc(h.textContent) + '</button>').join('');
    const title = esc(tr('On this page'));
    les.insertAdjacentHTML('afterbegin',
      '<details class="otp otp-top"><summary>' + title + '</summary>' + items + '</details>' +
      '<nav class="otp otp-side" aria-label="' + title + '"><div class="otp-in"><b>' + title + '</b>' + items + '</div></nav>');

    // highlight the section the reader is in
    if ('IntersectionObserver' in window) {
      const side = les.querySelector('.otp-side');
      io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          side.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.otp === e.target.id));
        });
      }, { rootMargin: '-15% 0px -75% 0px' });
      heads.forEach(h => io.observe(h));
    }
  }

  document.addEventListener('click', e => {
    const o = e.target.closest('[data-otp]');
    if (o) {
      const el = document.getElementById(o.dataset.otp);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const d = o.closest('details'); if (d) d.open = false;
      return;
    }
    if (e.target.closest('[data-print]')) window.print();
  });

  window.ChhoyedReader = { enhance };
})();
