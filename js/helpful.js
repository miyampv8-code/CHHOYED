/* "Was this lesson helpful?" buttons.
   The vote is remembered in this browser, and sent to your GoatCounter statistics as an event,
   so you can see which lessons help students and which confuse them.
   In GoatCounter, open the "Events" or the paths list and look for paths that start with "helpful/". */
(function () {
  const KEY = 'chhoyed-votes';
  const get = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; } };
  const set = v => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { } };
  const tr = window.I18N ? I18N.tr : s => s;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const html = (id, contactHref) =>
    '<div class="helpful" data-helpful="' + esc(id) + '" data-contact="' + esc(contactHref || '#/contact') + '">' +
    '<span class="hq">' + esc(tr('Was this lesson helpful?')) + '</span>' +
    '<button type="button" data-vote="yes">\uD83D\uDC4D ' + esc(tr('Yes')) + '</button>' +
    '<button type="button" data-vote="no">\uD83D\uDC4E ' + esc(tr('Not really')) + '</button>' +
    '<a class="hrep" href="' + esc(contactHref || '#/contact') + '">' + esc(tr('Found a mistake? Report it')) + '</a>' +
    '<span class="hm" role="status"></span></div>';

  const paint = el => {
    const v = get()[el.dataset.helpful];
    el.classList.toggle('voted', !!v);
    el.querySelectorAll('[data-vote]').forEach(b => b.classList.toggle('on', b.dataset.vote === v));
    el.querySelector('.hm').innerHTML = v === 'yes' ? esc(tr('Thank you! We are glad it helped.'))
      : v === 'no' ? esc(tr('Thank you for telling us.')) + ' <a href="' + esc(el.dataset.contact) + '">' + esc(tr('Tell us what was confusing')) + '</a>' : '';
  };

  const init = root => (root || document).querySelectorAll('.helpful').forEach(paint);

  document.addEventListener('click', e => {
    const b = e.target.closest('.helpful [data-vote]'); if (!b) return;
    const el = b.closest('.helpful'), id = el.dataset.helpful, vote = b.dataset.vote;
    const all = get(); const first = !all[id]; all[id] = vote; set(all); paint(el);
    try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: 'helpful/' + vote + '/' + id, title: 'Helpful ' + vote + ': ' + id, event: true }); } catch { }
  });

  window.ChhoyedHelpful = { html, init };
})();