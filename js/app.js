const app = document.getElementById('app'), nav = document.getElementById('nav');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const url = u => /^https?:\/\//i.test(u || '') ? esc(u) : '';
const col = c => /^#[0-9a-f]{3,8}$/i.test(c || '') ? c : '#888';
const tr = window.I18N ? I18N.tr : (s, v) => (v ? s.replace(/\{(\w+)\}/g, (m, k) => (k in v ? v[k] : m)) : s);
const KMODE = () => window.I18N && I18N.lang === 'km';
const nm = x => (KMODE() && x.name_km) || x.name;
const tg = x => (KMODE() && x.tagline_km) || x.tagline;
const fmt = d => new Date(d + 'T00:00:00').toLocaleDateString(KMODE() ? 'km-KH' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const ini = n => String(n).split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
let D;

async function getJSON(p) {
  const r = await fetch(p, { cache: 'no-cache' });
  if (!r.ok) throw new Error(`Could not load ${p} (${r.status}).`);
  return r.json();
}

async function init() {
  const [teachers, subjects, posts] = await Promise.all(['teachers', 'subjects', 'posts'].map(n => getJSON(`data/${n}.json`)));
  const T = Object.fromEntries(teachers.map(t => [t.id, t]));
  const S = Object.fromEntries(subjects.map(s => [s.id, s]));
  posts.sort((a, b) => b.date.localeCompare(a.date));
  posts.forEach(p => {
    if (!T[p.teacherId]) console.error(`Post "${p.id}" has unknown teacherId "${p.teacherId}"`);
    if (!S[p.subject]) console.error(`Post "${p.id}" has unknown subject "${p.subject}"`);
    else if (S[p.subject].topics && !S[p.subject].topics.some(t => t.id === p.topic)) console.error(`Post "${p.id}" needs a topic from subject "${p.subject}" (got "${p.topic}")`);
    if (p.pages && (!p.book || p.pages.length !== 2)) console.error(`Post "${p.id}" needs "book" and "pages": [first, last]`);
  });
  D = { teachers, subjects, posts, T, S };
  renderNav();
}
function renderNav() {
  nav.innerHTML = `<a href="#/">${tr('All')}</a>` + D.subjects.map(s => `<a href="#/subject/${esc(s.id)}">${esc(nm(s))}</a>`).join('') + `<a href="#/contact">${tr('Contact')}</a><a href="#/search">${tr('Search')}</a>`;
}

const tOf = p => D.T[p.teacherId] || { id: '', name: 'Unknown teacher', title: '' };
const topicOf = (s, id) => (s.topics || []).find(t => t.id === id);
const sOf = p => {
  const s = D.S[p.subject]; if (!s) return { name: p.subject || 'Other', color: '#888' };
  const t = topicOf(s, p.topic);
  return t ? { ...t, label: `${nm(s)} · ${nm(t)}`, name: `${s.name} · ${t.name}` } : s;
};
const sameTrack = (a, b) => a.subject === b.subject && (a.topic || '') === (b.topic || '');
const trackUrl = p => `#/subject/${esc(p.subject)}${p.topic ? '/' + esc(p.topic) : ''}`;
const avatar = (t, size) => `<span class="av ${size}">${t.photo ? `<img src="${esc(t.photo)}" alt="" onerror="this.remove()">` : ''}${esc(ini(t.name))}</span>`;
const tag = s => `<span class="tag" style="--c:${col(s.color)}"><i></i>${esc(s.label || nm(s))}</span>`;
const nf = () => '<p class="err">Page not found. <a href="#/">Back to lessons</a></p>';

// ---- Language icons and progress (progress is saved in this browser only)
const ico = (x, big) => x && x.icon ? `<span class="ico${big ? ' big' : ''} n${Math.min([...String(x.icon)].length, 4)}" style="--c:${col(x.color)}" aria-hidden="true">${esc(x.icon)}</span>` : '';
const bar = (n, total, cls = '') => `<span class="pbar ${cls}"><i style="width:${total ? Math.round(100 * n / total) : 0}%"></i></span>`;
const PK = 'chhoyed-progress';
const getP = () => { try { const p = JSON.parse(localStorage.getItem(PK) || '{}'); return { done: Array.isArray(p.done) ? p.done : [], last: typeof p.last === 'string' ? p.last : '' }; } catch { return { done: [], last: '' }; } };
const setP = p => { try { localStorage.setItem(PK, JSON.stringify(p)); } catch { } };
const doneBtn = (id, on) => `<button type="button" class="btn donebtn${on ? ' on' : ''}" data-done="${esc(id)}" aria-pressed="${on}">${on ? tr('✓ Done') : tr('Mark as done')}</button>`;

const card = p => {
  const t = tOf(p), s = sOf(p);
  return `<a class="card" style="--c:${col(s.color)}" href="#/post/${esc(p.id)}">${tag(s)}<h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p>` +
    `<span class="by">${avatar(t, 'sm')}<span>${esc(t.name)}</span><time>${fmt(p.date)}</time></span></a>`;
};
const tcard = t => {
  const n = D.posts.filter(p => p.teacherId === t.id).length;
  return `<a class="card tc" href="#/teacher/${esc(t.id)}">${avatar(t, 'md')}<h3>${esc(t.name)}</h3><p>${esc(t.title)}</p><p class="sk">${esc((t.skills || []).join(', '))}</p><span class="pill" style="margin:0">${tr(n === 1 ? '{n} lesson' : '{n} lessons', { n })}</span></a>`;
};
const links = t => {
  const l = Object.entries(t.links || {}).filter(([, u]) => url(u));
  return l.length ? `<p class="links">${l.map(([k, u]) => `<a href="${url(u)}" target="_blank" rel="noopener">${esc(k)}</a>`).join('')}</p>` : '';
};
const grid = ps => ps.length ? `<div class="grid">${ps.map(card).join('')}</div>` : `<p class="empty">${tr('No lessons here yet.')}</p>`;

const seq = ps => ps.filter(p => p.order).sort((a, b) => a.order - b.order);
const step = (p, dn) => `<a class="step${dn.has(p.id) ? ' done' : ''}" style="--c:${col(sOf(p).color)}" href="#/post/${esc(p.id)}"><b>${dn.has(p.id) ? '✓' : p.order}</b><div><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p></div></a>`;
const path = ps => { const dn = new Set(getP().done); return `<div class="path">${seq(ps).map((p, i, a) => (p.part && p.part !== a[i - 1]?.part ? `<h3 class="part">${esc(p.part)}</h3>` : '') + step(p, dn)).join('')}</div>`; };
const HELLO = 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, CHHOYED!");\n    }\n}';

const resume = () => {
  const P = getP(), lp = D.posts.find(p => p.id === P.last); if (!lp || !lp.order) return '';
  const tk = seq(D.posts.filter(x => sameTrack(x, lp))), dn = new Set(P.done), d = tk.filter(x => dn.has(x.id)).length, s = sOf(lp);
  const nx = dn.has(lp.id) ? (tk.find(x => x.order > lp.order && !dn.has(x.id)) || tk.find(x => !dn.has(x.id))) : lp;
  const reset = `<p class="rs"><button type="button" class="lnk" data-reset>${tr('Reset my progress')}</button></p>`;
  if (!nx) return `<div class="resume" style="--c:${col(s.color)}"><div><small>${tr('Course complete')}</small><h3>${esc(tr('You finished {name}. Well done!', { name: s.label || nm(s) }))}</h3>${bar(d, tk.length)}</div></div>${reset}`;
  return `<a class="resume" style="--c:${col(s.color)}" href="#/post/${esc(nx.id)}"><div><small>${tr('Continue where you left off')}</small><h3>${esc(nx.title)}</h3><p>${esc(s.label || nm(s))} · ${tr('lesson {k} of {n}', { k: tk.indexOf(nx) + 1, n: tk.length })}</p>${bar(d, tk.length)}</div><span class="btn">${tr('Continue')}</span></a>${reset}`;
};

const home = () => {
  const tracks = D.subjects.flatMap(s => (s.topics || [s]).map(t => ({ s, t, ps: seq(D.posts.filter(p => p.subject === s.id && (s.topics ? p.topic === t.id : true))) }))).filter(x => x.ps.length);
  const first = tracks[0]?.ps[0];
  const paths = tracks.length ? `<h2>${tr('Learning paths')}</h2><div class="grid">${tracks.map(x => topicCard(x.s, x.t)).join('')}</div>` : '';
  const more = D.posts.filter(p => !p.order);
  const stats = `<div class="stats">${[[D.posts.length, 'lessons'], [tracks.length, 'learning paths'], [D.subjects.length, 'categories'], [D.teachers.length, 'authors']].map(([n, l]) => `<div><b>${n}</b><span>${tr(l)}</span></div>`).join('')}</div>`;
  return `<section class="hero"><div><h1 lang="km">រៀនឱ្យចេះ <span class="hl">ហាត់ឱ្យពូកែ។</span></h1><p lang="km">មេរៀនឥតគិតថ្លៃ ផ្នែកកូដ គណិតវិទ្យា និងរូបវិទ្យា ពីមូលដ្ឋានដល់កម្រិតខ្ពស់។</p>` +
    (first ? (() => { const a = D.posts.find(p => p.id === 'byc-01-how-a-computer-works') || first, b = D.posts.find(p => p.id === 'html-first-page'); return `<div class="btns"><a class="btn" href="#/post/${esc(a.id)}">${tr('Start learning')}</a>${b ? `<a class="btn alt" href="#/post/${esc(b.id)}">${tr('Build your first website')}</a>` : `<a class="btn alt" href="${trackUrl(first)}">See all lessons</a>`}</div>`; })() : '') +
    `</div><div class="win" aria-hidden="true"><div class="top"><i></i><i></i><i></i><span>Main.java</span></div><pre><code class="language-java">${esc(HELLO)}</code></pre><div class="out">Hello, CHHOYED!</div></div></section>` +
    `${stats}${resume()}${paths}<h2>${tr('More lessons')}</h2>${grid(more)}<h2>${tr('Our teachers')}</h2><div class="grid">${D.teachers.map(tcard).join('')}</div>`;
};

const topicCard = (s, t) => {
  const ps = D.posts.filter(p => p.subject === s.id && (s.topics ? p.topic === t.id : true)), n = ps.length;
  const ord = seq(ps), dn = new Set(getP().done), d = ord.filter(p => dn.has(p.id)).length;
  return `<a class="card" style="--c:${col(t.color)}" href="#/subject/${esc(s.id)}${s.topics ? '/' + esc(t.id) : ''}"><div class="ct">${ico(t)}${tag(t)}</div><h3>${esc(tg(t) || nm(t))}</h3>` +
    `<p>${tr(n === 1 ? '{n} lesson' : '{n} lessons', { n })}${d ? ` · ${tr('{d} of {n} done', { d, n: ord.length })}` : ''}</p>${d ? bar(d, ord.length, 'sm') : ''}</a>`;
};

const subject = async (id, tid) => {
  const s = D.S[id]; if (!s) return nf();
  if (s.topics && !tid) {
    const loose = D.posts.filter(p => p.subject === id && !topicOf(s, p.topic));
    return `<h1>${esc(nm(s))}</h1><div class="grid">${s.topics.map(t => topicCard(s, t)).join('')}</div>${loose.length ? `<h2>${tr('Other lessons')}</h2>${grid(loose)}` : ''}`;
  }
  const t = tid ? topicOf(s, tid) : s; if (!t) return nf();
  const ps = D.posts.filter(p => p.subject === id && (tid ? p.topic === tid : true));
  const pr = t.exercises ? await getJSON(t.exercises).catch(() => null) : null;
  const back = tid ? `<a class="back" href="#/subject/${esc(id)}">${esc(tr('Back to {name}', { name: nm(s) }))}</a>` : '';
  const ord = seq(ps), dn = new Set(getP().done), nd = ord.filter(p => dn.has(p.id)).length;
  const meter = ord.length ? `<div class="score" style="--c:${col(t.color)}"><span>${tr('{d} of {n} lessons done', { d: nd, n: ord.length })}</span>${bar(nd, ord.length)}</div>` : '';
  return `${back}<div class="th1">${ico(t, true)}<h1>${esc(nm(t))}</h1></div>${meter}${t.tagline ? `<p class="empty" style="border-style:solid">${esc(tg(t))}${KMODE() ? '។ ' : '. '}${tr('Follow the lessons in order.')}</p><br>` : ''}${ps.some(p => p.order) ? withPractice(path(ps), t, id, tid, pr, ps) : grid(ps)}`;
};

// ---- Practice exercises
let PDATA = null;
const withPractice = (html, t, id, tid, pr, ps) => !pr ? html : html.replace(/<\/div>$/,
  `<h3 class="part">${tr('Practice')}</h3><a class="step practice" style="--c:${col(t.color)}" href="#/practice/${esc(id)}/${esc(tid)}"><b>${seq(ps).length + 1}</b><div><h3>${tr('Practice: {n} exercises', { n: pr.items.length })}</h3><p>${tr('Test yourself and check your answers.')}</p></div></a></div>`);
const KIND = { choice: 'Choose the answer', output: 'What does it print?', blank: 'Fill in the blank', code: 'Write the code' };
const exItem = (e, i, lang) => {
  const input = e.options
    ? `<div class="opts">${e.options.map((o, k) => `<label><input type="radio" name="q${i}" value="${k}"><span>${esc(o)}</span></label>`).join('')}</div>`
    : e.type === 'blank' ? '<input class="blank" type="text" autocomplete="off" spellcheck="false" placeholder="Type your answer">' : '';
  return `<section class="ex" data-i="${i}"><div class="exh"><b>${i + 1}</b><span class="pill">${esc(e.topic)}</span><span class="pill">${KIND[e.type] || ''}</span></div>` +
    `<p>${esc(e.question)}</p>${e.code ? `<pre><code class="language-${esc(lang)}">${esc(e.code)}</code></pre>` : ''}${input}` +
    `<div class="btns"><button class="btn" data-a="check">${e.type === 'code' ? 'Show model answer' : 'Check answer'}</button>` +
    (e.hint ? '<button class="btn alt" data-a="hint">Hint</button>' : '') + (e.type === 'code' ? '' : '<button class="btn alt" data-a="show">Show answer</button>') +
    `</div><div class="res" role="status"></div></section>`;
};
const practice = async (id, tid) => {
  const s = D.S[id], t = s && topicOf(s, tid); if (!t || !t.exercises) return nf();
  const P = await getJSON(t.exercises);
  PDATA = { key: `${id}-${tid}`, ...P };
  const auto = P.items.filter(e => e.type !== 'code').length;
  return `<a class="back" href="#/subject/${esc(id)}/${esc(tid)}">${esc(tr('Back to {name}', { name: nm(t) }))}</a><h1>${esc(P.title || t.name + ' practice')}</h1>` +
    `<div class="score" id="prc"><span><b id="sc">0</b> of ${auto} solved</span><span class="pbar"><i id="bar"></i></span></div>` +
    `<p class="hint">Check answer, Hint and Show answer are there to help you. Write-the-code exercises are not scored: try them on your own computer first.</p>` +
    P.items.map((e, i) => exItem(e, i, P.lang || 'text')).join('');
};
function bindPractice() {
  const P = PDATA, key = 'chhoyed-practice-' + P.key, items = P.items;
  const auto = items.filter(e => e.type !== 'code');
  let done = new Set();
  try { done = new Set(JSON.parse(localStorage.getItem(key) || '[]')); } catch { }
  const norm = s => String(s).trim().replace(/\s+/g, ' ');
  const hl = el => { if (window.hljs) el.querySelectorAll('pre code').forEach(c => hljs.highlightElement(c)); };
  const update = () => {
    const n = auto.filter(e => done.has(e.id)).length;
    document.getElementById('sc').textContent = n;
    document.getElementById('bar').style.width = (auto.length ? 100 * n / auto.length : 0) + '%';
  };
  document.querySelectorAll('.ex').forEach(sec => { if (done.has(items[+sec.dataset.i].id)) sec.classList.add('solved'); });
  update();
  document.querySelector('main').onclick = ev => {
    const b = ev.target.closest('button[data-a]'); if (!b) return;
    const sec = b.closest('.ex'), e = items[+sec.dataset.i], res = sec.querySelector('.res'), a = b.dataset.a;
    const say = (cls, head, extra = '') => { res.className = 'res ' + cls; res.innerHTML = `<b>${esc(head)}</b>${extra}`; hl(res); };
    const reveal = () => (e.type === 'code' ? `<pre><code class="language-${esc(P.lang || 'text')}">${esc(e.solution)}</code></pre>` : `<p>Answer: <code>${esc(e.options ? e.options[e.answer] : e.answers[0])}</code></p>`) + `<p>${esc(e.explanation)}</p>`;
    if (a === 'hint') return say('info', 'Hint: ' + e.hint);
    if (a === 'show' || e.type === 'code') return say('info', e.type === 'code' ? 'Model answer' : 'Answer', reveal());
    let ok;
    if (e.options) {
      const c = sec.querySelector('input:checked'); if (!c) return say('bad', 'Pick an answer first.');
      ok = +c.value === e.answer;
    } else {
      const v = norm(sec.querySelector('.blank').value); if (!v) return say('bad', 'Type your answer first.');
      ok = e.answers.some(x => norm(x) === v);
    }
    if (ok) {
      done.add(e.id); try { localStorage.setItem(key, JSON.stringify([...done])); } catch { }
      sec.classList.add('solved'); update(); say('ok', 'Correct!', `<p>${esc(e.explanation)}</p>`);
    } else say('bad', 'Not quite. Try again, use the hint, or show the answer.');
  };
}

// ---- Search
let TEXT = null;
const plain = t => t.replace(/```[a-z]*/g, ' ').replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[`*>#|]/g, ' ').replace(/\s+/g, ' ').trim();
const loadText = () => TEXT || (TEXT = Promise.all(D.posts.filter(p => p.contentFile).map(p => fetch(p.contentFile).then(r => r.ok ? r.text() : '').catch(() => '').then(t => [p.id, plain(t)]))).then(Object.fromEntries));
const rx = w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const runSearch = (q, text) => {
  const w = q.toLowerCase().split(/\s+/).filter(Boolean); if (!w.length) return [];
  return D.posts.map(p => {
    const head = `${p.title} ${p.summary} ${p.part || ''} ${sOf(p).name}`.toLowerCase(), title = p.title.toLowerCase(), body = (text && text[p.id]) || '';
    const low = body.toLowerCase(); let sc = 0;
    for (const x of w) {
      const inT = title.includes(x), inH = head.includes(x), inB = low.includes(x);
      if (!inH && !inB) return null;
      sc += inT ? (title.startsWith(x) ? 15 : 10) : inH ? 4 : 1;
    }
    return { p, sc, body, low, w };
  }).filter(Boolean).sort((a, b) => b.sc - a.sc || (a.p.order || 999) - (b.p.order || 999)).slice(0, 30);
};
const mark = (t, w) => w.reduce((h, x) => h.replace(new RegExp('(' + rx(esc(x)) + ')', 'gi'), '<mark>$1</mark>'), esc(t));
const resItem = r => {
  const { p, body, low, w } = r, s = sOf(p);
  let snip = p.summary;
  const i = w.map(x => low.indexOf(x)).filter(k => k >= 0).sort((a, b) => a - b)[0];
  const inHead = w.every(x => `${p.title} ${p.summary}`.toLowerCase().includes(x));
  if (!inHead && i !== undefined) snip = (i > 50 ? '…' : '') + body.slice(Math.max(0, i - 50), i + 110) + '…';
  return `<a class="sri" style="--c:${col(s.color)}" href="#/post/${esc(p.id)}">${tag(s)}<h3>${mark(p.title, w)}</h3><p>${mark(snip, w)}</p></a>`;
};
const search = q => `<h1>${tr('Search')}</h1><p class="blurb">${tr('Find a lesson by its title, its topic or any word inside it.')}</p>` +
  `<div class="sbox"><input id="sq" type="search" placeholder="${esc(tr('Try: flexbox, loops, API, JSON'))}" value="${esc(q)}" autocomplete="off" spellcheck="false" aria-label="${esc(tr('Search lessons'))}"><p id="sst" class="hint" role="status"></p></div><div id="sr" class="sres"></div>`;
function bindSearch() {
  const inp = document.getElementById('sq'), out = document.getElementById('sr'), st = document.getElementById('sst');
  let text = null;
  const go = () => {
    const q = inp.value.trim();
    history.replaceState(null, '', q ? '#/search/' + encodeURIComponent(q) : '#/search');
    if (!q) { out.innerHTML = ''; st.textContent = ''; return; }
    const r = runSearch(q, text);
    out.innerHTML = r.length ? r.map(resItem).join('') : `<p class="empty">${tr('No lessons found. Try a shorter or different word.')}</p>`;
    st.textContent = tr(r.length === 1 ? '{n} lesson found' : '{n} lessons found', { n: r.length }) + (text ? '' : ' · ' + tr('searching inside lessons…'));
  };
  inp.addEventListener('input', go);
  loadText().then(t => { text = t; go(); });
  go(); inp.focus();
}

const teacher = id => {
  const t = D.T[id]; if (!t) return nf();
  return `<a class="back" href="#/">${tr('Back to lessons')}</a><div class="profile">${avatar(t, 'lg')}<div><h1>${esc(t.name)}</h1><p>${esc(t.title)}</p></div></div>` +
    `<p>${esc(t.bio)}</p><ul class="chips">${(t.skills || []).map(s => `<li>${esc(s)}</li>`).join('')}</ul>${links(t)}` +
    `<h2>${esc(tr('Lessons by {name}', { name: t.name }))}</h2>${grid(D.posts.filter(p => p.teacherId === id))}`;
};

const bookPages = p => {
  const [a, b] = p.pages;
  let h = '';
  for (let i = a; i <= b; i++) h += `<img class="bookpage" loading="lazy" decoding="async" src="images/books/${esc(p.book)}/${String(i).padStart(4, '0')}.webp" alt="${esc(p.title)}, page ${i}">`;
  return h;
};

const post = async id => {
  const p = D.posts.find(x => x.id === id); if (!p) return nf();
  const t = tOf(p), s = sOf(p);
  const track = seq(D.posts.filter(x => sameTrack(x, p))), k = track.findIndex(x => x.id === id);
  const prog = k < 0 ? '' : `<span class="pill">${tr('Lesson {k} of {n}', { k: k + 1, n: track.length })}</span>`;
  const pn = k < 0 ? '' : `<div class="pn">${[track[k - 1], track[k + 1]].map((x, n) => x ? `<a href="#/post/${esc(x.id)}" class="${n ? 'nx' : ''}"><small>${tr(n ? 'Next lesson' : 'Previous lesson')}</small>${esc(x.title)}</a>` : '').join('')}</div>`;
  let body = '';
  try {
    if (p.contentFile) {
      const r = await fetch(p.contentFile, { cache: 'no-cache' });
      if (!r.ok) throw new Error();
      body = DOMPurify.sanitize(marked.parse(await r.text())).replace(/<img /g, '<img loading="lazy" decoding="async" ');
    } else if (!p.pages) throw new Error();
  } catch { body = '<p class="err">This lesson could not be loaded. Check the contentFile path in data/posts.json.</p>'; }
  if (p.pages && p.book) body += (p.contentFile ? '' : `<p>${esc(p.summary)} On a phone, pinch to zoom in on a page.</p>`) + bookPages(p);
  return `<a class="back" href="#/">${tr('Back to lessons')}</a><article>${tag(s)}${prog}<h1>${esc(p.title)}</h1>` +
    `<a class="byline" href="#/teacher/${esc(t.id)}">${avatar(t, 'sm')}<span>${esc(t.name)}</span><time>${fmt(p.date)}</time></a>` +
    (p.file ? `<div class="btns fileb"><a class="btn" href="${esc(p.file)}" target="_blank" rel="noopener">Open the PDF</a><a class="btn alt" href="${esc(p.file)}" download>Download</a></div>` : '') +
    `<div class="lesson">${body}</div>${k < 0 ? '' : `<div class="donebar"><span>${tr('Finished this lesson?')}</span>${doneBtn(id, getP().done.includes(id))}</div>`}${p.contentFile && window.ChhoyedHelpful ? ChhoyedHelpful.html(id, '#/contact') : ''}</article>${pn}` +
    `<aside class="credit">${avatar(t, 'md')}<div><h3>${esc(t.name)}</h3><p>${esc(t.title)}</p><p>${esc(t.bio)}</p><p><a href="#/teacher/${esc(t.id)}">${esc(tr('See all lessons by {name}', { name: t.name }))}</a></p></div></aside>`;
};

const CONTACT_URL = 'https://chhoyed-contact.miyampv8.workers.dev'; // set this after deploying worker/contact-worker.js
const hasLink = t => {
  const n = String(t).normalize('NFKC').replace(/[\u200B-\u200D\u2060\uFEFF]/g, '');
  return [
    /\b(?:https?|ftp):\/\//i, /\bwww\./i, /\b(?:t|telegram)\.me\b/i, /\bhxxps?\b/i, /\bdot\s*(?:com|net|org)\b/i,
    /\b[a-z0-9-]+\.(?:com|net|org|io|me|co|app|dev|xyz|info|biz|link|click|top|site|online|store|kh|gl|ly)\b/i,
    /(?:^|\s)@\w{3,}/
  ].some(r => r.test(n));
};
const contact = () => `<h1>${tr('Contact us')}</h1><p class="blurb">${tr('Send us a message and we will reply to your email.')}</p>` +
  `<form id="cf" class="cform" novalidate>` +
  `<label>${tr('Your name')}<input name="name" maxlength="80" required autocomplete="name"></label>` +
  `<label>${tr('Your email')}<input name="email" type="email" maxlength="120" required autocomplete="email"></label>` +
  `<label>${tr('Message')}<textarea name="message" rows="6" maxlength="1000" required></textarea></label>` +
  `<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">` +
  `<p class="hint">${tr('Please do not include links. Your email is only used to reply to you.')}</p>` +
  `<button class="btn" type="submit">${tr('Send message')}</button><p id="cmsg" role="status"></p></form>`;

async function sendContact(e) {
  e.preventDefault();
  const f = e.target, m = document.getElementById('cmsg'), b = f.querySelector('button');
  const d = Object.fromEntries(new FormData(f));
  const say = (t, ok) => { m.textContent = t; m.className = ok ? 'ok' : 'bad'; };
  if (!d.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim()) || d.message.trim().length < 10) return say(tr('Please enter your name, a valid email and a message of at least 10 characters.'));
  if (hasLink(d.name + ' ' + d.message)) return say(tr('Links are not allowed in the message. Please remove them and try again.'));
  if (CONTACT_URL.includes('YOUR-SUBDOMAIN')) return say('The contact form is not set up yet.');
  b.disabled = true; say(tr('Sending…'), true);
  try {
    const r = await fetch(CONTACT_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || 'Could not send. Please try again.');
    f.reset(); say(tr('Thank you! Your message was sent. We will reply to your email.'), true);
  } catch (err) { say(err.message || tr('Could not send. Please try again.')); }
  b.disabled = false;
}

// Visitor statistics (GoatCounter). Put your GoatCounter site code between the quotes, e.g. 'chhoyed'. Leave '' to turn it off.
const GC_CODE = 'chhoyed';
window.goatcounter = { no_onload: true };
if (GC_CODE) {
  const s = document.createElement('script');
  s.async = true; s.src = 'https://gc.zgo.at/count.js';
  s.dataset.goatcounter = `https://${GC_CODE}.goatcounter.com/count`;
  document.head.appendChild(s);
}
const track = () => {
  if (!GC_CODE) return;
  let n = 0;
  const t = setInterval(() => {
    if (window.goatcounter && window.goatcounter.count) { clearInterval(t); window.goatcounter.count({ path: location.pathname + location.hash, title: document.title }); }
    else if (++n > 50) clearInterval(t);
  }, 100);
};

async function route() {
  const [, page, raw, raw2] = location.hash.split('/');
  const id = decodeURIComponent(raw || ''), sub = decodeURIComponent(raw2 || '');
  try {
    if (!D) await init();
    const view = { post, teacher, subject, contact, practice, search }[page];
    app.innerHTML = view ? await view(id, sub) : home();
  } catch (e) {
    app.innerHTML = `<p class="err">${esc(e.message)}<br>If you opened index.html straight from your computer, start a local server instead (see README.md).</p>`;
  }
  if (page === 'post') { const lp = D && D.posts.find(p => p.id === id); if (lp && lp.order) { const P = getP(); if (P.last !== id) { P.last = id; setP(P); } } }
  if (window.hljs) app.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
  app.querySelectorAll('.lesson pre').forEach(pre => { if (pre.querySelector('.copy')) return; const b = document.createElement('button'); b.type = 'button'; b.className = 'copy'; b.textContent = 'Copy'; b.setAttribute('aria-label', 'Copy code'); pre.appendChild(b); });
  if (window.ChhoyedTry) ChhoyedTry.enhance(app);
  if (window.ChhoyedHelpful) ChhoyedHelpful.init(app);
  app.querySelectorAll('.lesson blockquote').forEach(bq => { const f = bq.querySelector('strong')?.textContent || ''; bq.classList.add('co', /key idea/i.test(f) ? 'key' : /remember/i.test(f) ? 'rem' : 'note'); });
  if (document.getElementById('prc')) bindPractice();
  if (document.getElementById('sq')) bindSearch();
  const cf = document.getElementById('cf'); if (cf) cf.addEventListener('submit', sendContact);
  const h = app.querySelector('h1');
  document.title = page && h ? `${h.textContent} - CHHOYED` : 'CHHOYED';
  const active = page === 'subject' ? `#/subject/${id}` : page === 'contact' ? '#/contact' : page === 'search' ? '#/search' : (!page ? '#/' : null);
  nav.querySelectorAll('a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === active));
  { const on = nav.querySelector('a.on'); if (on && nav.scrollWidth > nav.clientWidth) { const x = on.getBoundingClientRect().left - nav.getBoundingClientRect().left + nav.scrollLeft; nav.scrollTo({ left: Math.max(0, x - (nav.clientWidth - on.offsetWidth) / 2), behavior: 'smooth' }); } }
  window.scrollTo(0, 0);
  track();
}
addEventListener('hashchange', route);
function applyStatic() {
  const L = KMODE(), lb = document.getElementById('lang');
  if (lb) { lb.textContent = L ? 'EN' : 'ខ្មែរ'; lb.title = L ? 'Switch to English' : 'ប្តូរទៅភាសាខ្មែរ'; lb.setAttribute('aria-label', lb.title); }
  const fp = document.querySelectorAll('footer p');
  if (fp[0]) fp[0].textContent = tr('Free lessons in coding, math and physics. Every lesson is posted by the CHHOYED team.');
  if (fp[1]) fp[1].innerHTML = `<a href="about.html">${tr('About')}</a> · <a href="lessons/index.html">${tr('All lessons')}</a>`;
}
const langBtn = document.getElementById('lang');
if (langBtn && window.I18N) langBtn.addEventListener('click', () => { I18N.set(KMODE() ? 'en' : 'km'); if (D) renderNav(); applyStatic(); route(); });
applyStatic();
const copyText = async t => { try { await navigator.clipboard.writeText(t); return true; } catch { const a = document.createElement('textarea'); a.value = t; a.style.position = 'fixed'; a.style.opacity = '0'; document.body.appendChild(a); a.select(); let ok = false; try { ok = document.execCommand('copy'); } catch { } a.remove(); return ok; } };
app.addEventListener('click', async e => {
  const c = e.target.closest('.copy');
  if (c) { const pre = c.parentElement, ok = await copyText((pre.querySelector('code') || pre).textContent); c.textContent = ok ? 'Copied!' : 'Press Ctrl+C'; c.classList.toggle('ok', ok); setTimeout(() => { c.textContent = 'Copy'; c.classList.remove('ok'); }, 1600); return; }
  const b = e.target.closest('[data-done]');
  if (b) {
    const P = getP(), id = b.dataset.done, i = P.done.indexOf(id);
    if (i < 0) P.done.push(id); else P.done.splice(i, 1);
    setP(P);
    const on = i < 0;
    b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); b.textContent = on ? tr('✓ Done') : tr('Mark as done');
    return;
  }
  if (e.target.closest('[data-reset]') && confirm(tr('Clear your lesson progress on this device?'))) { setP({ done: [], last: '' }); route(); }
});
route();
// ---- Theme toggle (light / dark) and the "/" shortcut for search
const themeBtn = document.getElementById('theme');
if (themeBtn) {
  const SUN = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  const eff = () => document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const paint = () => { const d = eff() === 'dark'; themeBtn.innerHTML = d ? SUN : MOON; const l = d ? 'Switch to light mode' : 'Switch to dark mode'; themeBtn.title = l; themeBtn.setAttribute('aria-label', l); };
  themeBtn.addEventListener('click', () => { const n = eff() === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = n; try { localStorage.setItem('chhoyed-theme', n); } catch { } paint(); });
  paint();
}
addEventListener('keydown', e => {
  if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey || /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '')) return;
  e.preventDefault(); if (location.hash.startsWith('#/search')) document.getElementById('sq')?.focus(); else location.hash = '#/search';
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