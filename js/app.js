const app = document.getElementById('app'), nav = document.getElementById('nav');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const url = u => /^https?:\/\//i.test(u || '') ? esc(u) : '';
const col = c => /^#[0-9a-f]{3,8}$/i.test(c || '') ? c : '#888';
const fmt = d => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const ini = n => String(n).split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
let D;

async function getJSON(p) {
  const r = await fetch(p);
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
  nav.innerHTML = '<a href="#/">All</a>' + subjects.map(s => `<a href="#/subject/${esc(s.id)}">${esc(s.name)}</a>`).join('') + '<a href="#/contact">Contact</a>';
}

const tOf = p => D.T[p.teacherId] || { id: '', name: 'Unknown teacher', title: '' };
const topicOf = (s, id) => (s.topics || []).find(t => t.id === id);
const sOf = p => {
  const s = D.S[p.subject]; if (!s) return { name: p.subject || 'Other', color: '#888' };
  const t = topicOf(s, p.topic);
  return t ? { ...t, name: `${s.name} · ${t.name}` } : s;
};
const sameTrack = (a, b) => a.subject === b.subject && (a.topic || '') === (b.topic || '');
const trackUrl = p => `#/subject/${esc(p.subject)}${p.topic ? '/' + esc(p.topic) : ''}`;
const avatar = (t, size) => `<span class="av ${size}">${t.photo ? `<img src="${esc(t.photo)}" alt="" onerror="this.remove()">` : ''}${esc(ini(t.name))}</span>`;
const tag = s => `<span class="tag" style="--c:${col(s.color)}"><i></i>${esc(s.name)}</span>`;
const nf = () => '<p class="err">Page not found. <a href="#/">Back to lessons</a></p>';

const card = p => {
  const t = tOf(p), s = sOf(p);
  return `<a class="card" style="--c:${col(s.color)}" href="#/post/${esc(p.id)}">${tag(s)}<h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p>` +
    `<span class="by">${avatar(t, 'sm')}<span>${esc(t.name)}</span><time>${fmt(p.date)}</time></span></a>`;
};
const tcard = t => {
  const n = D.posts.filter(p => p.teacherId === t.id).length;
  return `<a class="card tc" href="#/teacher/${esc(t.id)}">${avatar(t, 'md')}<h3>${esc(t.name)}</h3><p>${esc(t.title)}</p><p class="sk">${esc((t.skills || []).join(', '))}</p><span class="pill" style="margin:0">${n} lesson${n === 1 ? '' : 's'}</span></a>`;
};
const links = t => {
  const l = Object.entries(t.links || {}).filter(([, u]) => url(u));
  return l.length ? `<p class="links">${l.map(([k, u]) => `<a href="${url(u)}" target="_blank" rel="noopener">${esc(k)}</a>`).join('')}</p>` : '';
};
const grid = ps => ps.length ? `<div class="grid">${ps.map(card).join('')}</div>` : '<p class="empty">No lessons here yet.</p>';

const seq = ps => ps.filter(p => p.order).sort((a, b) => a.order - b.order);
const step = p => `<a class="step" style="--c:${col(sOf(p).color)}" href="#/post/${esc(p.id)}"><b>${p.order}</b><div><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p></div></a>`;
const path = ps => `<div class="path">${seq(ps).map((p, i, a) => (p.part && p.part !== a[i - 1]?.part ? `<h3 class="part">${esc(p.part)}</h3>` : '') + step(p)).join('')}</div>`;
const HELLO = 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, CHHOYED!");\n    }\n}';

const home = () => {
  const tracks = D.subjects.flatMap(s => (s.topics || [s]).map(t => ({ s, t, ps: seq(D.posts.filter(p => p.subject === s.id && (s.topics ? p.topic === t.id : true))) }))).filter(x => x.ps.length);
  const first = tracks[0]?.ps[0];
  const paths = tracks.length ? `<h2>Learning paths</h2><div class="grid">${tracks.map(x => topicCard(x.s, x.t)).join('')}</div>` : '';
  const more = D.posts.filter(p => !p.order);
  const stats = `<div class="stats">${[[D.posts.length, 'lessons'], [tracks.length, 'learning paths'], [D.subjects.length, 'categories'], [D.teachers.length, 'authors']].map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join('')}</div>`;
  return `<section class="hero"><div><h1 lang="km">រៀនឱ្យចេះ <span class="hl">ហាត់ឱ្យពូកែ។</span></h1><p lang="km">មេរៀនឥតគិតថ្លៃ ផ្នែកកូដ គណិតវិទ្យា និងរូបវិទ្យា ពីមូលដ្ឋានដល់កម្រិតខ្ពស់។</p>` +
    (first ? `<div class="btns"><a class="btn" href="#/post/${esc(first.id)}">Start: ${esc(first.title)}</a><a class="btn alt" href="${trackUrl(first)}">See all lessons</a></div>` : '') +
    `</div><div class="win" aria-hidden="true"><div class="top"><i></i><i></i><i></i><span>Main.java</span></div><pre><code class="language-java">${esc(HELLO)}</code></pre><div class="out">Hello, CHHOYED!</div></div></section>` +
    `${stats}${paths}<h2>More lessons</h2>${grid(more)}<h2>Our teachers</h2><div class="grid">${D.teachers.map(tcard).join('')}</div>`;
};

const topicCard = (s, t) => {
  const n = D.posts.filter(p => p.subject === s.id && (s.topics ? p.topic === t.id : true)).length;
  return `<a class="card" style="--c:${col(t.color)}" href="#/subject/${esc(s.id)}${s.topics ? '/' + esc(t.id) : ''}">${tag(t)}<h3>${esc(t.tagline || t.name)}</h3><p>${n} lesson${n === 1 ? '' : 's'}</p></a>`;
};

const subject = (id, tid) => {
  const s = D.S[id]; if (!s) return nf();
  if (s.topics && !tid) {
    const loose = D.posts.filter(p => p.subject === id && !topicOf(s, p.topic));
    return `<h1>${esc(s.name)}</h1><div class="grid">${s.topics.map(t => topicCard(s, t)).join('')}</div>${loose.length ? `<h2>Other lessons</h2>${grid(loose)}` : ''}`;
  }
  const t = tid ? topicOf(s, tid) : s; if (!t) return nf();
  const ps = D.posts.filter(p => p.subject === id && (tid ? p.topic === tid : true));
  const back = tid ? `<a class="back" href="#/subject/${esc(id)}">Back to ${esc(s.name)}</a>` : '';
  return `${back}<h1>${esc(t.name)}</h1>${t.tagline ? `<p class="empty" style="border-style:solid">${esc(t.tagline)}. Follow the lessons in order.</p><br>` : ''}${ps.some(p => p.order) ? path(ps) : grid(ps)}`;
};

const teacher = id => {
  const t = D.T[id]; if (!t) return nf();
  return `<a class="back" href="#/">Back to lessons</a><div class="profile">${avatar(t, 'lg')}<div><h1>${esc(t.name)}</h1><p>${esc(t.title)}</p></div></div>` +
    `<p>${esc(t.bio)}</p><ul class="chips">${(t.skills || []).map(s => `<li>${esc(s)}</li>`).join('')}</ul>${links(t)}` +
    `<h2>Lessons by ${esc(t.name)}</h2>${grid(D.posts.filter(p => p.teacherId === id))}`;
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
  const prog = k < 0 ? '' : `<span class="pill">Lesson ${k + 1} of ${track.length}</span>`;
  const pn = k < 0 ? '' : `<div class="pn">${[track[k - 1], track[k + 1]].map((x, n) => x ? `<a href="#/post/${esc(x.id)}" class="${n ? 'nx' : ''}"><small>${n ? 'Next lesson' : 'Previous lesson'}</small>${esc(x.title)}</a>` : '').join('')}</div>`;
  let body = '';
  try {
    if (p.contentFile) {
      const r = await fetch(p.contentFile);
      if (!r.ok) throw new Error();
      body = DOMPurify.sanitize(marked.parse(await r.text())).replace(/<img /g, '<img loading="lazy" decoding="async" ');
    } else if (!p.pages) throw new Error();
  } catch { body = '<p class="err">This lesson could not be loaded. Check the contentFile path in data/posts.json.</p>'; }
  if (p.pages && p.book) body += (p.contentFile ? '' : `<p>${esc(p.summary)} On a phone, pinch to zoom in on a page.</p>`) + bookPages(p);
  return `<a class="back" href="#/">Back to lessons</a><article>${tag(s)}${prog}<h1>${esc(p.title)}</h1>` +
    `<a class="byline" href="#/teacher/${esc(t.id)}">${avatar(t, 'sm')}<span>${esc(t.name)}</span><time>${fmt(p.date)}</time></a>` +
    (p.file ? `<div class="btns fileb"><a class="btn" href="${esc(p.file)}" target="_blank" rel="noopener">Open the PDF</a><a class="btn alt" href="${esc(p.file)}" download>Download</a></div>` : '') +
    `<div class="lesson">${body}</div></article>${pn}` +
    `<aside class="credit">${avatar(t, 'md')}<div><h3>${esc(t.name)}</h3><p>${esc(t.title)}</p><p>${esc(t.bio)}</p><p><a href="#/teacher/${esc(t.id)}">See all lessons by ${esc(t.name)}</a></p></div></aside>`;
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
const contact = () => `<h1>Contact us</h1><p class="blurb">Send us a message and we will reply to your email.</p>` +
  `<form id="cf" class="cform" novalidate>` +
  `<label>Your name<input name="name" maxlength="80" required autocomplete="name"></label>` +
  `<label>Your email<input name="email" type="email" maxlength="120" required autocomplete="email"></label>` +
  `<label>Message<textarea name="message" rows="6" maxlength="1000" required></textarea></label>` +
  `<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">` +
  `<p class="hint">Please do not include links. Your email is only used to reply to you.</p>` +
  `<button class="btn" type="submit">Send message</button><p id="cmsg" role="status"></p></form>`;

async function sendContact(e) {
  e.preventDefault();
  const f = e.target, m = document.getElementById('cmsg'), b = f.querySelector('button');
  const d = Object.fromEntries(new FormData(f));
  const say = (t, ok) => { m.textContent = t; m.className = ok ? 'ok' : 'bad'; };
  if (!d.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim()) || d.message.trim().length < 10) return say('Please enter your name, a valid email and a message of at least 10 characters.');
  if (hasLink(d.name + ' ' + d.message)) return say('Links are not allowed in the message. Please remove them and try again.');
  if (CONTACT_URL.includes('YOUR-SUBDOMAIN')) return say('The contact form is not set up yet.');
  b.disabled = true; say('Sending…', true);
  try {
    const r = await fetch(CONTACT_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || 'Could not send. Please try again.');
    f.reset(); say('Thank you! Your message was sent. We will reply to your email.', true);
  } catch (err) { say(err.message || 'Could not send. Please try again.'); }
  b.disabled = false;
}

// Visitor statistics (GoatCounter). Put your GoatCounter site code between the quotes, e.g. 'chhoyed'. Leave '' to turn it off.
const GC_CODE = '';
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
    const view = { post, teacher, subject, contact }[page];
    app.innerHTML = view ? await view(id, sub) : home();
  } catch (e) {
    app.innerHTML = `<p class="err">${esc(e.message)}<br>If you opened index.html straight from your computer, start a local server instead (see README.md).</p>`;
  }
  if (window.hljs) app.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
  const cf = document.getElementById('cf'); if (cf) cf.addEventListener('submit', sendContact);
  const h = app.querySelector('h1');
  document.title = page && h ? `${h.textContent} - CHHOYED` : 'CHHOYED';
  const active = page === 'subject' ? `#/subject/${id}` : page === 'contact' ? '#/contact' : (!page ? '#/' : null);
  nav.querySelectorAll('a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === active));
  window.scrollTo(0, 0);
  track();
}
addEventListener('hashchange', route);
route();