/* Hành trình Nhịn ăn: lịch theo giờ, theo dõi nước và cảm nhận, tra cứu món và các công cụ nhỏ.
   Nội dung nằm ở data.js (window.NA). Mọi thứ người xem nhập chỉ lưu trong localStorage của họ. */
(function () {
'use strict';
const D = window.NA;
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const lc = s => s.charAt(0).toLowerCase() + s.slice(1);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  del(k) { try { localStorage.removeItem(k); } catch (e) { /* không lưu được thì thôi */ } }
};

/* ---------- biểu tượng nét (24×24) ---------- */
const IC = {
  bowl: '<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 7c0-1.5 1-2 1-3.5M12 7c0-1.5 1-2 1-3.5M16 7c0-1.5 1-2 1-3.5"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  leaf: '<path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15"/><path d="M5 19c3-4 6-7 10-9"/>',
  pulse: '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  apple: '<path d="M12 7.5c-2-1.5-7-1.3-7 4 0 4 3 8.5 5 8.5 1 0 1.3-.5 2-.5s1 .5 2 .5c2 0 5-4.5 5-8.5 0-5.3-5-5.5-7-4z"/><path d="M12 7.5c0-2 1-3.5 3-4.5"/>',
  carrot: '<path d="M15 9 5 19a1.4 1.4 0 0 1-2-2L13 7z"/><path d="M14 8c0-2 1-4 3-5M16 10c2 0 4-1 5-3M15 9l2-2"/>',
  grain: '<path d="M12 21V8"/><path d="M12 8c-2-1-3-2.5-3-4.5 2 1 3 2.5 3 4.5zM12 8c2-1 3-2.5 3-4.5-2 1-3 2.5-3 4.5zM12 13c-2-1-3-2.5-3-4.5 2 1 3 2.5 3 4.5zM12 13c2-1 3-2.5 3-4.5-2 1-3 2.5-3 4.5zM12 18c-2-1-3-2.5-3-4.5 2 1 3 2.5 3 4.5zM12 18c2-1 3-2.5 3-4.5-2 1-3 2.5-3 4.5z"/>',
  nut: '<path d="M12 3c4 0 7 3.5 7 8.5S16 21 12 21s-7-4.5-7-9.5S8 3 12 3z"/><path d="M12 6v12"/>',
  potato: '<path d="M7 6c3-3 9-2 11 2s1 9-3 11-10 0-11-4 0-6 3-9z"/><path d="M10 10h.01M14 13h.01M11 16h.01"/>',
  oil: '<path d="M10 3h4v3l2 3v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9l2-3z"/><path d="M8 13h8"/>',
  pot: '<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M2 10h20M9 6.5c0-1 1-1.5 1-3M14 6.5c0-1 1-1.5 1-3"/>',
  milk: '<path d="M9 3h6v3l2 3v12H7V9l2-3z"/><path d="M7 13h10"/>',
  fish: '<path d="M3 12c3-4 7-5.5 11-5.5 3 0 5.5 2.5 7 5.5-1.5 3-4 5.5-7 5.5-4 0-8-1.5-11-5.5z"/><path d="M3 12 1.5 8.5M3 12l-1.5 3.5M16.5 11h.01"/>',
  coffee: '<path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3v3M12 3v3"/>',
  bread: '<path d="M5 11a4 4 0 0 1 2-7h10a4 4 0 0 1 2 7v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"/>',
  bean: '<path d="M8 4.5c3.5-2 9-.5 10.5 3.5S17 13 14 13.5s-2.5 4.5-6 5.5S2 17 3 12.5 4.5 6.5 8 4.5z"/>',
  chili: '<path d="M15 7c-4.5 1-8.5 6-11.5 13 6.5-2 12.5-6 13.5-10.5"/><path d="M15 7c.5-2 2.5-3.5 4.5-3.5M17 9.5c-.5-1.5-1-2.5-2-2.5"/>',
  sugar: '<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>',
  mushroom: '<path d="M3 12a9 7 0 0 1 18 0z"/><path d="M9 12v6a3 3 0 0 0 6 0v-6"/>',
  book: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
  mouth: '<path d="M4 12c2.5-3 13.5-3 16 0-2.5 4-13.5 4-16 0z"/><path d="M4 12h16"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>',
  alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
  heart: '<path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  q: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17h.01"/>',
  cell: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M7 8h.01M16 7h.01M17 15h.01M8 16h.01"/>',
  basket: '<path d="M3 10h18l-2 10H5z"/><path d="M8 10l3-6M16 10l-3-6M9 14v3M15 14v3M12 14v3"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
};
const ico = (n, cls) => `<svg class="ico${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true">${IC[n] || IC.leaf}</svg>`;
const TYPE_ICO = { meal: 'bowl', drink: 'drop', do: 'leaf', body: 'pulse', prep: 'list' };

/* ---------- ảnh chưa có thì thay bằng khung minh hoạ; có ảnh rồi thì tự hiện ---------- */
function makePh(im) {
  if (!im.parentNode) return;
  const d = document.createElement('div');
  d.className = 'ph' + (im.className ? ' ' + im.className : '');
  d.setAttribute('role', 'img');
  d.setAttribute('aria-label', im.alt || '');
  d.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${IC[im.dataset.ph] || IC.leaf}</svg>`;
  im.replaceWith(d);
}
window.ph = makePh;
(window.phq || []).forEach(makePh);
window.phq = [];
const img = (name, alt, ph) => `<img src="img/${name}.jpg" data-ph="${ph || 'leaf'}" alt="${esc(alt)}" loading="lazy" onerror="ph(this)">`;

let toastT;
function toast(msg) {
  let t = $('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.hidden = false;
  clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 3600);
}

/* ---------- ngày giờ (giờ địa phương của máy) ---------- */
const WD = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
const pad = n => (n < 10 ? '0' : '') + n;
const hm = d => pad(d.getHours()) + ':' + pad(d.getMinutes());
const dm = d => pad(d.getDate()) + '/' + pad(d.getMonth() + 1);
const dayName = d => WD[d.getDay()] + ' ' + dm(d);
const sod = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n, d.getHours(), d.getMinutes());
const addMin = (d, m) => new Date(d.getTime() + m * 60000);
const at = (day, s) => { const p = s.split(':'); return new Date(day.getFullYear(), day.getMonth(), day.getDate(), +p[0], +p[1]); };
const dateVal = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const fmtDT = d => dateVal(d) + 'T' + hm(d);
const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const dayDiff = (a, b) => Math.round((sod(a) - sod(b)) / 864e5);
function parseDT(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(s || '');
  if (!m) return null;
  const d = new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
  return isNaN(d) ? null : d;
}
function fixHM(s) {
  const m = /^(\d{1,2}):?(\d{2})$/.exec(String(s || '').trim());
  return m && +m[1] < 24 && +m[2] < 60 ? pad(+m[1]) + ':' + m[2] : null;
}
function dur(ms) {
  const m = Math.round(ms / 60000);
  if (m < 1) return 'dưới 1 phút';
  const d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mm = m % 60;
  if (d) return d + ' ngày' + (h ? ' ' + h + ' giờ' : '');
  if (h) return h + ' giờ' + (mm ? ' ' + mm + ' phút' : '');
  return mm + ' phút';
}
const rel = (t, now) => Math.abs(t - now) < 60000 ? 'bây giờ' : (t > now ? 'còn ' + dur(t - now) : dur(now - t) + ' trước');
/* lower: dùng giữa câu (“hôm nay”, “mai”); tên thứ trong tuần vẫn viết hoa */
function whenLabel(t, now, lower) {
  const k = dayDiff(t, now);
  const w = k === 0 ? 'Hôm nay' : k === 1 ? 'Mai' : k === -1 ? 'Hôm qua' : '';
  return (w ? (lower ? w.toLowerCase() : w) : dayName(t)) + ' ' + hm(t);
}

/* =====================================================================
   LỊCH CỦA BẠN
   Mốc thời gian: S = ăn xong bữa cuối của Ngày 1 (bắt đầu nhịn), E = bữa phá nhịn.
   Ngày 1 (giảm ăn) = ngày của S; tuần chuẩn bị = 7 ngày trước đó.
   ===================================================================== */
const DEF_M = ['07:00', '12:00', '18:30'];
const DEF_EAT = [1, 1]; /* Ngày 1 có ăn bữa sáng, bữa trưa (chỉ ăn các bữa chính như bạn quen) */
const MK = { sang: 0, trua: 1, toi: 2 };
const MEALN = { sang: 'Bữa sáng', trua: 'Bữa trưa', toi: 'Bữa tối' };
const MAX_H = 72;
const slotOf = d => { const m = d.getHours() * 60 + d.getMinutes(); return m < 630 ? 'sang' : m < 900 ? 'trua' : 'toi'; };
const PREP_EV = [
  [-7, '20:00', 'Bắt đầu tuần chuẩn bị', 'Lên kế hoạch cá nhân: báo cho gia đình, đồng nghiệp ở gần; nhờ người nấu thay nếu bạn là người đứng bếp.', '#chuan-bi'],
  [-6, '20:00', 'Tự hỏi: vì sao mình nhịn lần này?', 'Và ý nghĩa của quyết định này ở thời điểm hiện tại. Viết ra để trang nhắc lại lúc khó.', '#why-tool'],
  [-5, '20:00', 'Đọc kỹ tài liệu lý thuyết', 'Insulin, ba nguồn năng lượng khi nhịn, tự thực, nhai kỹ.', '#hieu-them'],
  [-4, '09:00', 'Mua đồ cần thiết', 'Bắt buộc: rau củ quả tươi, dầu ép lạnh, hạt. Nên có: magie, trà xanh, muối biển, tinh dầu bạc hà.', '#do-can-co'],
  [-2, '20:00', 'Thu xếp công việc, chuẩn bị “thức ăn tinh thần”', 'Để không bị quá tải khi tham gia; chuẩn bị sách, phim hay, việc nhẹ nhàng mình thích.', '#chuan-bi'],
  [-1, '08:00', 'Nấu nước hầm xương gà', 'Lửa nhỏ, nấu chậm 6–8 tiếng với hành tây, cà rốt, củ cải, cần tây và giấm táo, để kịp dùng bữa sáng Ngày 1.', '#nuoc-ham'],
  [-1, '20:00', 'Mai là Ngày 1: ngày giảm ăn', 'Chuẩn bị rau củ quả cho ngày mai. Từ mai ngừng tám nhóm thực phẩm trong danh sách.', '#ngay-1']
];

function model(p) {
  const S = parseDT(p.b), E = parseDT(p.k);
  const M = p.m && p.m.length === 3 ? p.m : DEF_M;
  const eat = p.e && p.e.length === 2 ? p.e : DEF_EAT;
  const H = (E - S) / 36e5, D1 = sod(S);
  const ev = [];
  const add = (t, type, title, text, x) => ev.push(Object.assign({ t, type, title, text: text || '' }, x || {}));

  /* tuần chuẩn bị: bỏ những mốc đã qua từ trước lúc lập lịch */
  const since = addMin(p.c ? new Date(p.c) : new Date(0), -24 * 60);
  PREP_EV.forEach(x => {
    const t = at(addDays(D1, x[0]), x[1]);
    if (t >= since && t < D1) add(t, 'prep', x[2], x[3], { link: x[4], key: 1 });
  });

  /* Ngày 1: bữa cuối kết thúc lúc S */
  const last = addMin(S, -45), lastSlot = slotOf(last);
  const meals = ['sang', 'trua'].filter(k => eat[MK[k]]).map(k => [k, at(D1, M[MK[k]])]).filter(m => m[1] <= addMin(last, -180));
  const first = meals.length ? meals[0][1] : last;
  if (addMin(first, -30) >= D1) add(addMin(first, -30), 'drink', 'Bắt đầu Ngày 1: ngày giảm ăn', 'Uống 1,5–2 lít nước trắng trong ngày; chỉ ăn bữa chính, không ăn vặt; ngừng tám nhóm thực phẩm trong danh sách.', { key: 1, link: '#ngay-1' });
  meals.forEach(m => add(m[1], 'meal', MEALN[m[0]] + ' · Ngày 1', D.MENUS[m[0]].eat, { menu: m[0], key: 1 }));
  if (meals.length) ['10:00', '15:30'].forEach(h => {
    const t = at(D1, h);
    if (t > meals[0][1] && t < addMin(last, -60)) add(t, 'do', 'Không ăn vặt', 'Tuyệt đối không ăn vặt giữa các bữa. Nhớ uống nước.');
  });
  add(last, 'meal', MEALN[lastSlot] + ' · bữa cuối trước khi nhịn', D.MENUS[lastSlot].eat, { menu: lastSlot, key: 1 });

  /* những giờ nhịn */
  add(S, 'body', 'Bắt đầu nhịn', 'Từ giờ không ăn, uống nước trắng đều. Lắng nghe cơ thể; khó chịu thì xem Hộp hỗ trợ.', { key: 1, link: '#ho-tro' });
  D.MILESTONES.forEach(m => {
    const t = new Date(S.getTime() + m.h * 36e5);
    if (t < addMin(E, -60)) add(t, 'body', m.t, m.d, { key: 1 });
  });
  for (let day = sod(S); day <= E; day = addDays(day, 1)) {
    D.ROUTINE.forEach(r => {
      if (r.at === 'sang' || r.at === 'trua') { if (!eat[MK[r.at]]) return; } /* bữa không quen ăn thì không nhắc */
      const t = r.at in MK ? at(day, M[MK[r.at]]) : at(day, r.at);
      if (t > addMin(S, 60) && t < addMin(E, -60)) add(t, r.type, r.t, r.d);
    });
  }

  /* phá nhịn */
  add(E, 'meal', D.BREAK.t, D.BREAK.d, { key: 1, link: '#pha-nhin' });
  ev.sort((a, b) => a.t - b.t);
  return { S, E, M, eat, H, D1, ev };
}

function phaseAt(md, now) {
  if (now < addDays(md.D1, -7)) return { k: 'far' };
  if (now < md.D1) return { k: 'prep' };
  if (now < md.S) return { k: 'd1' };
  if (now < md.E) {
    const h = (now - md.S) / 36e5;
    return { k: 'fast', h, ph: D.PHASES.find(p => h >= p.from && h < p.to) };
  }
  return { k: 'done' };
}

let plan = null, demo = false, editing = false, trackKind = null, trackDay = '';

function validPlan(p) {
  const S = p && parseDT(p.b), E = p && parseDT(p.k);
  return !!(S && E && E - S >= 12 * 36e5 && E - S <= MAX_H * 36e5);
}
function loadPlan() {
  const q = new URLSearchParams(location.search);
  if (q.get('b') && q.get('k')) {
    const m = (q.get('m') || '').split('-').map(fixHM);
    const e = /^[01]{2}$/.test(q.get('e') || '') ? q.get('e').split('').map(Number) : DEF_EAT.slice();
    const p = { b: q.get('b'), k: q.get('k'), m: m.length === 3 && m.every(Boolean) ? m : DEF_M.slice(), e, c: Date.now() };
    if (validPlan(p)) {
      const old = store.get('na-plan', null);
      if (old && old.b === p.b && old.k === p.k) return old;
      store.set('na-plan', p);
      return p;
    }
  }
  const p = store.get('na-plan', null);
  return validPlan(p) ? p : null;
}

function prepProgress() {
  const st = store.get('na-prep', {});
  const ids = [].concat(...D.PREP.map(g => g.items.map(i => i.id)));
  const done = ids.filter(id => st[id]).length;
  return { done, total: ids.length, pct: Math.round(done / ids.length * 100) };
}
function whyBox(invite) {
  const w = store.get('na-why', '');
  if (w) return `<div class="why-box"><b>Lý do của bạn</b>${esc(w)}</div>`;
  return invite ? '<p class="small"><a href="#why-tool">Viết ra “vì sao mình nhịn”</a> để trang nhắc lại cho bạn lúc khó.</p>' : '';
}
function menuBox(key, title) {
  const m = D.MENUS[key];
  return `<div class="menu-box"><div class="mrow">${ico('bowl')}<div><b>${esc(title || m.t)}</b><br>${esc(m.eat)}</div></div>` +
    `<ul class="notes">${m.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul></div>`;
}

function journeyHTML(md, ps, now) {
  const segs = [
    { k: 'prep', n: 'Chuẩn bị', a: addDays(md.D1, -7), b: md.D1, w: 18, c: 'var(--brown)' },
    { k: 'd1', n: 'Ngày 1 · giảm ăn', a: md.D1, b: md.S, w: 18, c: 'var(--amber)' },
    { k: 'fast', n: 'Nhịn · ' + Math.round(md.H) + ' giờ', a: md.S, b: md.E, w: 64, c: 'var(--sage)' }
  ];
  const cur = ps.k === 'far' || ps.k === 'done' ? '' : ps.k;
  const where = (segs.find(s => s.k === cur) || { n: ps.k === 'done' ? 'đã phá nhịn' : 'trước tuần chuẩn bị' }).n;
  return `<div class="journey" role="img" aria-label="Bạn đang ở chặng: ${esc(where)}">` +
    segs.map(s => {
      const f = Math.max(0, Math.min(1, (now - s.a) / (s.b - s.a)));
      const ticks = s.k === 'fast' ? [12, 24, 48].filter(h => h < md.H - 2).map(h => `<span class="tk" style="left:${(h / md.H * 100).toFixed(2)}%"></span>`).join('') : '';
      const mark = s.k === cur ? `<span class="jmark" style="left:${(f * 100).toFixed(2)}%"></span>` : '';
      return `<div class="jseg" style="flex:${s.w} 1 0; --jc:${s.c}"><div class="bar"><i style="width:${(f * 100).toFixed(2)}%"></i>${ticks}</div>${mark}</div>`;
    }).join('') + '</div><div class="jlegend" aria-hidden="true">' +
    segs.map(s => `<span${s.k === cur ? ' class="cur"' : ''} style="--jc:${s.c}"><i></i>${s.n}</span>`).join('') + '</div>';
}

function phaseHTML(md, ps, now) {
  if (ps.k === 'far' || ps.k === 'prep') {
    const pr = prepProgress();
    return `<div class="phase" style="--pc:var(--brown)"><div class="phase-h"><span class="dotc"></span><h3>Tuần chuẩn bị</h3></div>
      <p>Cho tâm trí sự bảo đảm rằng mọi chuyện sẽ ổn. Sắp xếp gia đình, công việc; mua đồ; đọc tài liệu.</p>
      <dl><dt>Danh sách chuẩn bị · ${pr.done}/${pr.total} việc</dt><dd><div class="prog"><i style="width:${pr.pct}%"></i></div></dd></dl>
      ${whyBox(true)}<div class="btnrow"><a class="btn ghost sm" href="#prep">Mở danh sách chuẩn bị</a><a class="btn ghost sm" href="#khong-nen">Ai không nên nhịn</a></div></div>`;
  }
  if (ps.k === 'd1') {
    const nx = md.ev.find(e => e.menu && e.t > addMin(now, -45));
    return `<div class="phase" style="--pc:var(--amber)"><div class="phase-h"><span class="dotc"></span><h3>Ngày 1 · giảm ăn</h3></div>
      <p>${esc(D.DAY1.goal)}</p>
      ${nx ? menuBox(nx.menu, nx.title + ' · ' + hm(nx.t)) : ''}
      <dl><dt>Cả ngày</dt><dd><ul>${D.DAY1.rules.map(r => `<li>${esc(r.t)}. ${esc(r.d)}</li>`).join('')}</ul></dd></dl>
      <div class="btnrow"><a class="btn ghost sm" href="#finder">Món này ăn được không?</a><a class="btn ghost sm" href="#slow">Đồng hồ ăn chậm</a></div></div>`;
  }
  if (ps.k === 'fast') {
    const p = ps.ph;
    return `<div class="phase" style="--pc:var(--${p.c})"><div class="phase-h"><span class="dotc"></span><h3>${esc(p.name)}</h3><span class="tag">giờ ${p.from}${p.to === Infinity ? '+' : '–' + p.to}</span></div>
      <p>${esc(p.body)}</p><p><b>Theo tài liệu:</b> ${esc(lc(p.feel))}</p>
      <dl><dt>Lúc này</dt><dd><ul>${D.DURING.map(x => `<li>${esc(x.t)}. ${esc(x.d)}</li>`).join('')}</ul></dd></dl>
      ${p.from >= 12 ? whyBox(false) : ''}
      <div class="btnrow"><a class="btn ghost sm" href="#ho-tro">Khó chịu? Hộp hỗ trợ</a><a class="btn ghost sm" href="#bao-ngay">Khi nào báo người hướng dẫn</a></div></div>`;
  }
  return `<div class="phase" style="--pc:var(--sage)"><div class="phase-h"><span class="dotc"></span><h3>Đã phá nhịn</h3></div>
    <p>${esc(D.BREAK.d)}</p>
    <dl><dt>Giữ lại thói quen tốt</dt><dd><ul>${D.KEEP.map(k => `<li>${esc(k)}</li>`).join('')}</ul></dd></dl>
    <div class="btnrow"><button class="btn ghost sm" data-act="edit">Lập lịch cho lần nhịn mới</button></div></div>`;
}

function dayLabel(md, d) {
  if (d < md.D1) return 'Chuẩn bị';
  if (sameDay(d, md.D1)) return 'Ngày 1 · giảm ăn, bắt đầu nhịn';
  if (sameDay(d, md.E)) return 'Nhịn, phá nhịn lúc ' + hm(md.E);
  return 'Nhịn · ngày ' + dayDiff(d, md.D1);
}
function menuDetail(e) {
  if (!e.menu) return '';
  const m = D.MENUS[e.menu];
  return `<div class="menu">${m.groups.map(g => D.GROUPS[g].n).join(' · ')}${m.except ? ' · ' + lc(m.except) : ''}. ${esc(m.notes.join(' '))}</div>`;
}
function scheduleHTML(md, now, keep) {
  const groups = [];
  md.ev.forEach(e => {
    const k = dateVal(e.t);
    if (!groups.length || groups[groups.length - 1].k !== k) groups.push({ k, d: sod(e.t), ev: [] });
    groups[groups.length - 1].ev.push(e);
  });
  const nextEv = md.ev.find(e => e.t > now);
  return `<details class="more" id="sched-all"${keep && keep.all ? ' open' : ''}><summary>Lịch đầy đủ theo ngày · ${md.ev.length} mục</summary><div class="in sched-wrap">` +
    groups.map(g => {
      const today = sameDay(g.d, now);
      const open = keep && keep.days ? keep.days.indexOf(g.k) > -1 : today;
      return `<details class="day${today ? ' today' : ''}" data-k="${g.k}"${open ? ' open' : ''}><summary><b>${dayName(g.d)}</b><span class="tag">${dayLabel(md, g.d)}${today ? ' · hôm nay' : ''}</span><span class="small muted">${g.ev.length} mục</span></summary><ol class="sched">` +
        g.ev.map(e => `<li class="t-${e.type}${e.t < now ? ' past' : ''}${e === nextEv ? ' nowi' : ''}"><span class="hh">${hm(e.t)}</span><span class="ib">${ico(TYPE_ICO[e.type])}</span><div><b>${esc(e.title)}</b><p>${esc(e.text)}</p>${menuDetail(e)}</div></li>`).join('') +
        '</ol></details>';
    }).join('') + '</div></details>';
}

function renderTracker(keepState) {
  const box = $('#trk-now'), sched = $('#trk-sched');
  if (!plan || editing) {
    /* đang ở biểu mẫu: chỉ vẽ lại khi được gọi chủ động, để không xoá giờ người xem đang nhập */
    if (!keepState || !$('#setup', box)) { renderSetup(box); sched.innerHTML = ''; renderTrack(); }
    return;
  }
  let keep = null;
  const all = $('#sched-all');
  if (keepState && all) keep = { all: all.open, days: $$('details.day[open]', sched).map(d => d.dataset.k) };
  const md = model(plan), now = new Date(), ps = phaseAt(md, now);
  let big = '', sub = '';
  if (ps.k === 'far' || ps.k === 'prep') {
    const n = dayDiff(md.D1, now);
    big = n === 1 ? 'Mai là Ngày 1' : 'Còn ' + n + ' ngày';
    sub = `${n === 1 ? '' : 'tới Ngày 1, ngày giảm ăn (<b>' + dayName(md.D1) + '</b>). '}Bắt đầu nhịn <b>${whenLabel(md.S, now, 1)}</b>, phá nhịn <b>${whenLabel(md.E, now, 1)}</b>.`;
  } else if (ps.k === 'd1') {
    big = 'Ngày 1 · giảm ăn';
    sub = `Bắt đầu nhịn lúc <b>${hm(md.S)}</b> (${rel(md.S, now)}). Chỉ ăn bữa chính, không ăn vặt.`;
  } else if (ps.k === 'fast') {
    big = 'Giờ thứ ' + (Math.floor(ps.h) + 1);
    sub = `Đã nhịn <b>${dur(now - md.S)}</b> · còn <b>${dur(md.E - now)}</b> tới bữa phá nhịn (${whenLabel(md.E, now, 1)}).`;
  } else {
    big = 'Hoàn thành';
    sub = `Bạn đã nhịn ${Math.round(md.H)} giờ (${dayName(md.S)} ${hm(md.S)} – ${dayName(md.E)} ${hm(md.E)}).`;
  }
  const up = md.ev.filter(e => e.t > now).slice(0, 4);
  const upHTML = up.length ? `<ol class="up">${up.map((e, i) => `<li class="t-${e.type}${i === 0 ? ' first' : ''}"><span class="ib">${ico(TYPE_ICO[e.type])}</span><div><span class="when">${whenLabel(e.t, now)} · ${rel(e.t, now)}</span><b>${esc(e.title)}</b><p>${esc(e.text)}${e.link ? ` <a href="${e.link}">Xem</a>` : ''}</p></div></li>`).join('')}</ol>` : '<p class="small muted">Không còn mục nào trong lịch.</p>';
  const actions = demo
    ? '<div class="actions"><button class="btn primary sm" data-act="mine">Nhập giờ của bạn</button></div>'
    : `<div class="actions"><button class="btn ghost sm" data-act="edit">${ico('edit')}Sửa giờ</button><button class="btn ghost sm" data-act="ics">${ico('calendar')}Lưu vào lịch điện thoại</button><button class="btn ghost sm" data-act="link">${ico('link')}Sao chép link riêng</button><button class="btn ghost sm" data-act="del">${ico('trash')}Xoá</button></div>`;
  box.innerHTML = (demo ? '<div class="demo-bar"><span>Đang xem thử với giờ mẫu: bắt đầu nhịn khoảng 20 giờ trước. Chưa lưu gì.</span><button class="btn primary sm" data-act="mine">Nhập giờ của bạn</button></div>' : '') +
    `<div class="now-grid"><div class="now"><div class="big">${big}</div><p class="big-sub">${sub}</p>${journeyHTML(md, ps, now)}${phaseHTML(md, ps, now)}</div>` +
    `<div class="side"><h3>Tiếp theo</h3>${upHTML}${actions}<p class="small muted">Bắt đầu nhịn ${dayName(md.S)} ${hm(md.S)} · phá nhịn ${dayName(md.E)} ${hm(md.E)} · ${Math.round(md.H)} giờ.</p></div></div>`;
  sched.innerHTML = scheduleHTML(md, now, keep);
  if (ps.k !== trackKind || dateVal(now) !== trackDay) renderTrack(); /* qua ngày mới thì đếm nước lại từ 0 */
}

const DURS = [
  { n: '24 giờ', f: S => addMin(S, 1440) },
  { n: '1 ngày trọn', f: (S, M) => at(addDays(sod(S), 2), M[0]) }
];
function renderSetup(box) {
  const now = new Date();
  const M = plan ? plan.m.slice() : DEF_M.slice();
  const eat = plan && plan.e ? plan.e.slice() : DEF_EAT.slice();
  const S0 = plan ? parseDT(plan.b) : (now.getHours() < 18 ? at(now, '19:00') : at(addDays(sod(now), 1), '19:00'));
  const E0 = plan ? parseDT(plan.k) : DURS[1].f(S0, M);
  box.innerHTML = `<form class="setup" id="setup" novalidate>
    ${plan ? '' : '<p class="intro">Nhập giờ bạn ăn xong bữa cuối (thường là bữa tối của Ngày 1) và giờ định phá nhịn. Trang sẽ tính bạn đang ở giờ thứ mấy, cơ thể đang ở chặng nào, bữa và việc tiếp theo. Đã bắt đầu rồi thì chọn giờ trong quá khứ.</p>'}
    <div class="fgrid">
      <div class="field"><span>Bắt đầu nhịn (ăn xong bữa cuối)</span><div class="two"><input type="date" id="b-d" aria-label="Ngày bắt đầu nhịn"><input type="time" id="b-t" aria-label="Giờ bắt đầu nhịn"></div></div>
      <div class="field"><span>Phá nhịn (bữa ăn lại đầu tiên)</span><div class="two"><input type="date" id="k-d" aria-label="Ngày phá nhịn"><input type="time" id="k-t" aria-label="Giờ phá nhịn"></div></div>
    </div>
    <div class="field"><span>Hoặc chọn nhanh thời gian nhịn</span><div class="durs" id="durs" role="group" aria-label="Thời gian nhịn"></div></div>
    <details class="more"><summary>Bữa ăn quen thuộc của bạn</summary><div class="in"><p class="small muted">Ngày 1 chỉ ăn các bữa chính như bạn quen (3, 2 hay 1 bữa): bỏ chọn bữa bạn không ăn. Giờ này cũng dùng để nhắc trong ngày nhịn.</p>
      <div class="three">
        <div class="mt"><label for="m0">Sáng</label><input type="time" id="m0"><label class="eat"><input type="checkbox" id="e0">có ăn</label></div>
        <div class="mt"><label for="m1">Trưa</label><input type="time" id="m1"><label class="eat"><input type="checkbox" id="e1">có ăn</label></div>
        <div class="mt"><label for="m2">Tối</label><input type="time" id="m2"><span class="eat">bữa cuối</span></div>
      </div></div></details>
    <p class="msg" id="setup-msg" aria-live="polite"></p>
    <div class="btnrow"><button class="btn primary" type="submit">${ico('calendar')}Lưu và xem lịch</button>${plan ? '<button class="btn ghost" type="button" id="cancel">Huỷ</button>' : '<button class="btn ghost" type="button" id="try">Xem thử</button>'}</div>
    <p class="small muted">Lịch chỉ lưu trên trình duyệt của bạn, không gửi đi đâu.</p>
  </form>`;
  const f = $('#setup', box);
  const set = (id, v) => { $('#' + id, f).value = v; };
  set('b-d', dateVal(S0)); set('b-t', hm(S0)); set('k-d', dateVal(E0)); set('k-t', hm(E0));
  M.forEach((m, i) => set('m' + i, m));
  eat.forEach((v, i) => { $('#e' + i, f).checked = !!v; });
  const read = () => {
    const S = parseDT($('#b-d', f).value + 'T' + $('#b-t', f).value);
    const E = parseDT($('#k-d', f).value + 'T' + $('#k-t', f).value);
    const Ms = [0, 1, 2].map(i => fixHM($('#m' + i, f).value) || DEF_M[i]);
    return { S, E, M: Ms, e: [0, 1].map(i => $('#e' + i, f).checked ? 1 : 0) };
  };
  const check = () => {
    const r = read(), msg = $('#setup-msg', f);
    msg.className = 'msg';
    if (!r.S || !r.E) { msg.textContent = ''; return null; }
    const H = (r.E - r.S) / 36e5;
    if (H < 12) { msg.className = 'msg bad'; msg.textContent = 'Giờ phá nhịn phải sau giờ bắt đầu nhịn ít nhất 12 giờ.'; return null; }
    if (H > MAX_H) { msg.className = 'msg bad'; msg.textContent = 'Lịch hỗ trợ tối đa 3 ngày nhịn.'; return null; }
    msg.textContent = H > 40 ? `Nhịn ${Math.round(H)} giờ: dài hơn chương trình nhịn 1 ngày, chỉ làm khi người hướng dẫn đồng ý và theo sát.` : `Nhịn ${Math.round(H)} giờ.`;
    return r;
  };
  const paintDurs = () => {
    const r = read();
    $('#durs', f).innerHTML = DURS.map((d, i) => {
      if (!r.S) return `<button type="button" class="chip" data-i="${i}">${d.n}</button>`;
      const E = d.f(r.S, r.M), H = Math.round((E - r.S) / 36e5);
      const on = r.E && Math.abs(E - r.E) < 60000;
      return `<button type="button" class="chip" data-i="${i}" aria-pressed="${on}">${d.n}${i ? ' · ' + H + ' giờ' : ''}</button>`;
    }).join('');
  };
  paintDurs(); check();
  $('#durs', f).addEventListener('click', e => {
    const b = e.target.closest('button[data-i]'); if (!b) return;
    const r = read(); if (!r.S) return;
    const E = DURS[+b.dataset.i].f(r.S, r.M);
    set('k-d', dateVal(E)); set('k-t', hm(E));
    paintDurs(); check();
  });
  f.addEventListener('input', () => { paintDurs(); check(); });
  f.addEventListener('submit', e => {
    e.preventDefault();
    const r = check();
    if (!r) { if (!$('#setup-msg', f).textContent) { $('#setup-msg', f).className = 'msg bad'; $('#setup-msg', f).textContent = 'Chọn đủ ngày và giờ.'; } return; }
    plan = { b: fmtDT(r.S), k: fmtDT(r.E), m: r.M, e: r.e, c: Date.now() };
    demo = false; editing = false;
    if (!store.set('na-plan', plan)) toast('Trình duyệt không cho lưu. Dùng “Sao chép link riêng” để mở lại lịch.');
    if (location.search) history.replaceState(null, '', location.pathname + '#lich');
    onPlanChange();
    $('#lich').scrollIntoView({ block: 'start' });
  });
  const cancel = $('#cancel', f);
  if (cancel) cancel.onclick = () => { editing = false; onPlanChange(); };
  const tryB = $('#try', f);
  if (tryB) tryB.onclick = () => {
    const S = new Date(Math.round((Date.now() - 20 * 36e5) / 9e5) * 9e5);
    plan = { b: fmtDT(S), k: fmtDT(addMin(S, 36 * 60)), m: DEF_M.slice(), e: DEF_EAT.slice(), c: Date.now() - 30 * 864e5 };
    demo = true; editing = false;
    onPlanChange();
  };
}

function planLink(p) {
  const base = location.href.split('#')[0].split('?')[0];
  return `${base}?b=${p.b}&k=${p.k}&m=${p.m.map(x => x.replace(':', '')).join('-')}&e=${(p.e || DEF_EAT).join('')}#lich`;
}
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
  return new Promise((res, rej) => {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.remove();
    if (ok) res(); else rej(new Error('copy'));
  });
}
function buildICS(md) {
  const now = new Date(), enc = new TextEncoder();
  const fold = line => {
    const out = []; let cur = '', bytes = 0;
    for (const ch of line) {
      const b = enc.encode(ch).length;
      if (bytes + b > 73) { out.push(cur); cur = ' ' + ch; bytes = 1 + b; } else { cur += ch; bytes += b; }
    }
    out.push(cur);
    return out.join('\r\n');
  };
  const e2 = s => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
  const dt = d => d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + 'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00';
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const link = planLink(plan);
  const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Hanh trinh Nhin an//VI', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:Hành trình Nhịn ăn'];
  md.ev.filter(e => e.key && e.t > addMin(now, -60)).forEach((e, i) => {
    const desc = e.text + (e.menu ? '\n' + D.MENUS[e.menu].notes.join(' ') : '') + '\n\n' + link;
    L.push('BEGIN:VEVENT', `UID:na-${dt(e.t)}-${i}@hanh-trinh-nhin-an`, 'DTSTAMP:' + stamp, 'DTSTART:' + dt(e.t),
      'DURATION:' + (e.type === 'meal' ? 'PT30M' : 'PT15M'), 'SUMMARY:' + e2(e.title), 'DESCRIPTION:' + e2(desc),
      'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + e2(e.title), 'TRIGGER:-PT5M', 'END:VALARM', 'END:VEVENT');
  });
  L.push('END:VCALENDAR');
  return L.map(fold).join('\r\n') + '\r\n';
}

$('#trk-now').addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const act = b.dataset.act;
  if (act === 'edit') { editing = true; onPlanChange(); }
  else if (act === 'mine') { plan = demo ? null : plan; demo = false; editing = !!plan; onPlanChange(); }
  else if (act === 'del') {
    if (!confirm('Xoá lịch đã lưu trên máy này? Nhật ký theo dõi vẫn giữ.')) return;
    store.del('na-plan'); plan = null; editing = false;
    if (location.search) history.replaceState(null, '', location.pathname + '#lich');
    onPlanChange();
  } else if (act === 'link') {
    const u = planLink(plan);
    copyText(u).then(() => toast('Đã sao chép. Lưu link này để mở lại lịch trên máy khác.'), () => prompt('Sao chép link này:', u));
  } else if (act === 'ics') {
    const a = document.createElement('a');
    a.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(buildICS(model(plan)));
    a.download = 'lich-nhin-an.ics';
    document.body.appendChild(a); a.click(); a.remove();
    toast('Đã tạo tệp lịch. Mở tệp vừa tải để thêm các mốc vào ứng dụng Lịch.');
  }
});

/* =====================================================================
   THEO DÕI: nước uống trong ngày và nhật ký cảm nhận (chỉ lưu trên máy)
   ===================================================================== */
const TB = {};
D.TOOLBOX.forEach(t => { TB[t.id] = t; });
const FEELN = {};
D.FEEL.forEach(f => { FEELN[f.id] = f.n; });
const liters = n => (n * D.CUP_ML / 1000).toLocaleString('vi-VN', { maximumFractionDigits: 2 });

function helpHTML(ids) {
  const hard = ids.filter(id => TB[id]);
  if (!hard.length) return ids.length ? '<div class="help"><span>Tốt. Tiếp tục uống nước và lắng nghe cơ thể.</span></div>' : '';
  return `<div class="help">${hard.map(id => `<div><b>${esc(TB[id].n)}</b><ul>${TB[id].tips.map(t => `<li>${ico('check')}<span>${esc(t)}</span></li>`).join('')}</ul></div>`).join('')}
    <span class="who">Có biểu hiện lạ trên cơ thể: báo người hướng dẫn.</span></div>`;
}
function renderTrack() {
  const box = $('#trk-log');
  const ps = plan && !editing && !demo ? phaseAt(model(plan), new Date()) : null;
  trackKind = ps ? ps.k : null;
  trackDay = dateVal(new Date());
  if (!ps || ps.k === 'far' || ps.k === 'prep') { box.hidden = true; box.innerHTML = ''; return; }
  const md = model(plan), now = new Date();
  const w = store.get('na-water', {})[dateVal(now)] || 0;
  const d1 = ps.k === 'd1';
  const log = store.get('na-log', []).slice().sort((a, b) => b.t - a.t);
  const item = x => {
    const t = new Date(x.t), h = t >= md.S && t < md.E ? ' · giờ thứ ' + (Math.floor((t - md.S) / 36e5) + 1) : '';
    const what = x.f.map(id => FEELN[id] || id).join(', ') + (x.n ? (x.f.length ? ' · ' : '') + x.n : '');
    return `<li><span class="when">${whenLabel(t, now)}${h}</span><button class="x" data-del="${x.t}" aria-label="Xoá lần ghi này">${ico('x')}</button><span class="what">${esc(what)}</span></li>`;
  };
  box.hidden = false;
  box.innerHTML = `<div class="tcard"><div class="tool-head"><h3>Nước hôm nay</h3><span class="small muted">1 cốc = ${D.CUP_ML} ml</span></div>
      <div class="water"><span class="num">${liters(w)} lít</span><span class="small muted">${w} cốc${d1 ? ' · Ngày 1 cần 1,5–2 lít (6–8 cốc)' : ''}</span></div>
      ${d1 ? `<div class="cups" aria-hidden="true">${Array.from({ length: Math.max(8, w) }, (_, i) => `<i${i < w ? ' class="f"' : ''}></i>`).join('')}</div>`
        : '<p class="small muted">Uống nước trắng đều, đủ nước cho cơ thể.</p>'}
      <div class="btnrow"><button class="btn primary sm" data-w="1">+ 1 cốc</button><button class="btn ghost sm" data-w="-1"${w ? '' : ' disabled'}>− 1 cốc</button></div></div>
    <div class="tcard"><h3>Bạn thấy thế nào?</h3>
      <div class="chips" id="feel" role="group" aria-label="Cảm nhận lúc này">${D.FEEL.map(f => `<button type="button" class="chip" data-f="${f.id}" aria-pressed="false">${esc(f.n)}</button>`).join('')}</div>
      <input type="text" id="feel-note" maxlength="200" placeholder="Ghi chú thêm (không bắt buộc)" aria-label="Ghi chú">
      <div class="btnrow"><button class="btn primary sm" data-act="log">Ghi lại</button><span class="small muted">Nhật ký chỉ lưu trên máy của bạn.</span></div>
      <div id="feel-help" aria-live="polite"></div>
      ${log.length ? `<details class="more"${log.length <= 3 ? ' open' : ''}><summary>Nhật ký · ${log.length} lần ghi</summary><div class="in"><ol class="logl">${log.map(item).join('')}</ol></div></details>` : ''}
    </div>`;
}
$('#trk-log').addEventListener('click', e => {
  const wb = e.target.closest('[data-w]');
  if (wb) {
    const all = store.get('na-water', {}), k = dateVal(new Date());
    all[k] = Math.max(0, (all[k] || 0) + (+wb.dataset.w));
    store.set('na-water', all);
    renderTrack();
    return;
  }
  const chip = e.target.closest('[data-f]');
  if (chip) {
    const on = chip.getAttribute('aria-pressed') !== 'true';
    if (chip.dataset.f === 'on' && on) $$('#feel [data-f]').forEach(c => c.setAttribute('aria-pressed', 'false'));
    else if (on) { const ok = $('#feel [data-f="on"]'); if (ok) ok.setAttribute('aria-pressed', 'false'); }
    chip.setAttribute('aria-pressed', on ? 'true' : 'false');
    return;
  }
  const del = e.target.closest('[data-del]');
  if (del) {
    store.set('na-log', store.get('na-log', []).filter(x => String(x.t) !== del.dataset.del));
    renderTrack();
    return;
  }
  if (e.target.closest('[data-act="log"]')) {
    const f = $$('#feel [aria-pressed="true"]').map(c => c.dataset.f);
    const n = $('#feel-note').value.trim();
    if (!f.length && !n) { toast('Chọn ít nhất một cảm nhận, hoặc viết ghi chú.'); return; }
    const log = store.get('na-log', []);
    log.push({ t: Date.now(), f, n });
    if (!store.set('na-log', log)) toast('Trình duyệt không cho lưu nhật ký.');
    renderTrack();
    $('#feel-help').innerHTML = helpHTML(f);
  }
});
$('#trk-log').addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.id === 'feel-note') { e.preventDefault(); $('[data-act="log"]', $('#trk-log')).click(); }
});

/* ---------- các phần phụ thuộc lịch ---------- */
function curFastHour() {
  if (!plan) return null;
  const md = model(plan), now = new Date();
  return now >= md.S && now < md.E ? (now - md.S) / 36e5 : null;
}
function renderPhases() {
  const h = curFastHour();
  $('#phases').innerHTML = D.PHASES.map(p => {
    const cur = h != null && h >= p.from && h < p.to;
    return `<div class="pcard${cur ? ' cur' : ''}" style="--pc:var(--${p.c})"><span class="hh">giờ ${p.from}${p.to === Infinity ? ' trở đi' : '–' + p.to}${cur ? ' <span class="tag">bạn đang ở đây</span>' : ''}</span>
      <h4>${esc(p.name)}</h4><p>${esc(p.body)}</p><p class="small"><b>Theo tài liệu:</b> ${esc(lc(p.feel))}</p></div>`;
  }).join('');
}

/* =====================================================================
   PHẦN 1: chuẩn bị
   ===================================================================== */
function renderPrep() {
  const st = store.get('na-prep', {});
  $('#prep-list').innerHTML = D.PREP.map(g => `<div class="grp"${g.id ? ` id="${g.id}"` : ''}>${g.g}</div>` + g.items.map(it =>
    `<label><input type="checkbox" data-id="${it.id}"${st[it.id] ? ' checked' : ''}><span>${esc(it.t)}${it.must ? ' <span class="tag must">Bắt buộc</span>' : ''}</span></label>`).join('')).join('');
  paintPrep();
}
function paintPrep() {
  const p = prepProgress();
  $('#prep-count').textContent = p.done + '/' + p.total;
  $('#prep-bar').style.width = p.pct + '%';
}
$('#prep-list').addEventListener('change', e => {
  const c = e.target.closest('input[data-id]'); if (!c) return;
  const st = store.get('na-prep', {});
  if (c.checked) st[c.dataset.id] = 1; else delete st[c.dataset.id];
  store.set('na-prep', st);
  paintPrep(); renderTracker(true);
});
const whyEl = $('#why');
whyEl.value = store.get('na-why', '') || '';
let whyT;
whyEl.addEventListener('input', () => {
  clearTimeout(whyT);
  whyT = setTimeout(() => { store.set('na-why', whyEl.value.trim()); renderTracker(true); renderToolbox(curTool); }, 400);
});
$('#broth-ing').innerHTML = D.BROTH.ing.map(i => `<span class="chip static">${esc(i)}</span>`).join('');
$('#broth-how').textContent = D.BROTH.how;
$('#broth-use').innerHTML = D.BROTH.use.map(u => `<li>${esc(u)}</li>`).join('');
$('#not-for').innerHTML = D.NOT_FOR.map(x => `<li>${esc(x)}</li>`).join('');

/* =====================================================================
   PHẦN 2: Ngày 1
   ===================================================================== */
$('#d1-goal').textContent = D.DAY1.goal;
$('#d1-rules').innerHTML = D.DAY1.rules.map(r => `<div><span class="ib">${ico(r.ico)}</span><div><h4>${esc(r.t)}</h4><p>${esc(r.d)}</p></div></div>`).join('');

function tabs(root, attr, onSel) {
  const btns = $$('button', root);
  const sel = b => {
    btns.forEach(x => { x.setAttribute('aria-selected', x === b ? 'true' : 'false'); x.tabIndex = x === b ? 0 : -1; });
    onSel(b.dataset[attr], b);
  };
  btns.forEach((b, i) => {
    b.addEventListener('click', () => sel(b));
    b.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const j = (i + (e.key === 'ArrowRight' ? 1 : btns.length - 1)) % btns.length;
      btns[j].focus(); sel(btns[j]);
    });
  });
  const first = btns.find(b => b.getAttribute('aria-selected') === 'true') || btns[0];
  if (first) sel(first);
}
const MEAL_ITEMS = {
  trua: { ngucoc: 'Cơm trắng, tam giác mạch, yến mạch, diêm mạch. Bỏ bột mì nguyên cám.' },
  toi: { rau: 'Chín và/hoặc sống, kèm dầu ép lạnh giàu omega-3', traicay: 'Bỏ chuối và các loại trái cây nhiều đường' }
};
tabs($('#meal-tabs'), 'meal', k => {
  const m = D.MENUS[k];
  $('#meal-panel').innerHTML = `<figure>${img(m.img, m.alt, 'bowl')}</figure><div class="mbody"><p class="lead-t">${esc(m.lead)}</p>
    ${m.except ? `<span class="except">${ico('x')}${esc(m.except)}</span>` : ''}
    <div class="gl">${m.groups.map(g => {
      const G = D.GROUPS[g];
      return `<div><span class="ib">${ico(G.ico)}</span><div><b>${esc(G.n)}</b><span>${esc((MEAL_ITEMS[k] && MEAL_ITEMS[k][g]) || G.items)}</span></div></div>`;
    }).join('')}</div>
    <ul class="notes">${m.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul></div>`;
});

const groupCard = (g, stop) => {
  const G = D.GROUPS[g];
  return `<div class="gcard${stop ? ' stop' : ''}">${img(G.img, 'Minh hoạ ' + lc(G.n), G.ico)}<div class="body"><h3>${esc(G.n)}</h3><p>${esc(G.items)}</p></div></div>`;
};
$('#allowed').innerHTML = D.ALLOWED.map(g => groupCard(g, false)).join('');
$('#stopped').innerHTML = D.STOPPED.map(g => groupCard(g, true)).join('');

/* tra cứu món */
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const FOODS = D.FOODS.map(f => ({ n: f[0], keys: [norm(f[0])].concat(f[1].split(',').map(norm)).filter(Boolean), g: f[2], r: f[3], note: f[4], src: f[5] }));
function search(q) {
  q = norm(q);
  if (q.length < 2) return [];
  const res = FOODS.map(f => {
    let s = 0;
    f.keys.forEach(k => {
      let v = 0;
      if (k === q) v = 100;
      else if (k.indexOf(q) === 0) v = 80 - (k.length - q.length) * 0.2;
      else if ((' ' + k).indexOf(' ' + q) > -1) v = 60;
      else if (k.indexOf(q) > -1) v = 40;
      else if (k.length >= 3 && (' ' + q + ' ').indexOf(' ' + k + ' ') > -1) v = 50 + k.length * 0.5;
      if (v > s) s = v;
    });
    return { f, s };
  }).filter(x => x.s > 0).sort((a, b) => b.s - a.s);
  /* khớp hẳn tên thì chỉ hiện món đó; không thì bỏ các kết quả kém xa kết quả đầu */
  const best = res.length ? res[0].s : 0;
  return res.filter(x => best >= 100 ? x.s >= 100 : x.s >= best * 0.6).slice(0, 6).map(x => x.f);
}
const SLOT = { Y: ['check', 'được'], N: ['x', 'không'], '?': ['q', 'chưa rõ'] };
const SRC_LB = { c: ['ct', 'Theo tài liệu'], s: ['', 'Suy ra từ nhóm trong tài liệu'], q: ['q', 'Tài liệu không nói'] };
function renderFinder() {
  const q = $('#fq').value, out = $('#fres');
  if (norm(q).length < 2) { out.innerHTML = '<p class="small muted">Gõ ít nhất 2 chữ, có dấu hay không dấu đều được.</p>'; return; }
  const res = search(q);
  if (!res.length) {
    out.innerHTML = `<div class="fitem"><b>Chưa có “${esc(q)}” trong danh sách</b><p>Nguyên tắc Ngày 1: rau củ, trái cây ít ngọt, ngũ cốc nguyên hạt, khoai, hạt khô, dầu ép lạnh. Không sữa, thịt cá trứng, đậu, nấm, đường, đồ chiên, cà phê, trà, rượu bia. Không chắc thì hỏi người hướng dẫn.</p></div>`;
    return;
  }
  out.innerHTML = res.map(f => {
    const G = D.GROUPS[f.g], no = f.r === 'NNN', lb = SRC_LB[f.src];
    const slots = ['Sáng', 'Trưa', 'Tối'].map((n, i) => {
      const c = f.r[i], s = SLOT[c];
      return `<span class="slot ${c === '?' ? 'Q' : c}">${ico(s[0])}${n}: ${s[1]}</span>`;
    }).join('');
    return `<div class="fitem${no ? ' no' : ''}"><div class="fitem-h"><b>${esc(f.n)}</b><span class="g">${esc(G.n)}${G.ok ? '' : ' · ngừng từ Ngày 1'}</span></div>
      <div class="slots">${slots}</div>${f.note ? `<p>${esc(f.note)}</p>` : ''}
      <span class="tag${lb[0] ? ' ' + lb[0] : ''}">${lb[1]}</span></div>`;
  }).join('');
}
$('#finder-n').textContent = 'Ngày 1 · ' + D.FOODS.length + ' món';
$('#fq-pop').innerHTML = D.POPULAR.map(p => `<button type="button" class="chip">${esc(p)}</button>`).join('');
$('#fq-pop').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  $('#fq').value = b.textContent; renderFinder();
});
let fqT;
$('#fq').addEventListener('input', () => { clearTimeout(fqT); fqT = setTimeout(renderFinder, 90); });

/* ăn chậm, nhai kỹ */
$('#chew').innerHTML = [
  ['mouth', 'Tiêu hoá bắt đầu từ miệng', 'Nhai tới khi thức ăn nhão, thành nước; khi đó thực phẩm mới giải phóng hết năng lượng và dưỡng chất.'],
  ['clock', 'Não cần khoảng 20 phút để biết đã no', 'Ăn nhanh, nuốt vội thì đã “ngốn” rất nhiều trước khi tín hiệu no tới.'],
  ['eye', 'Khi ăn, chỉ ăn', 'Không tivi, không nhạc, không điện thoại, không sách báo. Chú ý hương thơm, mùi vị, kết cấu và cảm nhận của cơ thể.'],
  ['heart', 'Ăn ít hơn mà no lâu', 'Tập nhai kỹ, bạn sẽ thấy chỉ cần ăn ít hơn thường lệ mà vẫn no lâu, và tận hưởng từng miếng.']
].map(x => `<div><span class="ib">${ico(x[0])}</span><div><h4>${x[1]}</h4><p>${x[2]}</p></div></div>`).join('');

/* đồng hồ ăn chậm 20 phút */
(function slowTimer() {
  const TOTAL = 1200, C = 2 * Math.PI * 52;
  const fg = $('#ring-fg'), tt = $('#ring-t'), ts = $('#ring-s'), pr = $('#slow-prompt'), go = $('#slow-go');
  const IDLE = pr.textContent;
  let start = 0, elapsed = 0, running = false, iv = null, last = -1;
  const paint = () => {
    const e = Math.min(TOTAL, elapsed), r = Math.ceil(TOTAL - e);
    tt.textContent = pad(Math.floor(r / 60)) + ':' + pad(r % 60);
    fg.style.strokeDashoffset = (C * e / TOTAL).toFixed(1);
    if (running) { const i = Math.floor(e / 200) % D.SLOW.length; if (i !== last) { last = i; pr.textContent = D.SLOW[i]; } }
  };
  const stop = done => {
    running = false; clearInterval(iv);
    go.textContent = done ? 'Bắt đầu lại' : 'Tiếp tục';
    ts.textContent = done ? 'xong' : 'tạm dừng';
    if (done) { pr.textContent = '20 phút rồi: tín hiệu no đã kịp lên não. Lắng nghe cơ thể, đủ no thì dừng.'; try { if (navigator.vibrate) navigator.vibrate(200); } catch (e) { /* không rung được thì thôi */ } }
  };
  const tick = () => { elapsed = (Date.now() - start) / 1000; if (elapsed >= TOTAL) { elapsed = TOTAL; paint(); stop(true); return; } paint(); };
  go.addEventListener('click', () => {
    if (running) { stop(false); return; }
    if (elapsed >= TOTAL) { elapsed = 0; last = -1; }
    start = Date.now() - elapsed * 1000; running = true;
    go.textContent = 'Tạm dừng'; ts.textContent = 'đang ăn';
    iv = setInterval(tick, 1000); tick();
  });
  $('#slow-reset').addEventListener('click', () => {
    clearInterval(iv); running = false; elapsed = 0; last = -1;
    go.textContent = 'Bắt đầu'; ts.textContent = 'sẵn sàng'; pr.textContent = IDLE; paint();
  });
  paint();
})();

/* =====================================================================
   PHẦN 3: khi nhịn
   ===================================================================== */
$('#src3').innerHTML = D.SOURCES3.map(x => `<div style="--fc:var(--${x.c})"><span class="n">${x.n}</span><div><span class="when">Nguồn ${x.n} · ${esc(x.w)}</span><h4>${esc(x.t)}</h4><p>${esc(x.d)}</p></div></div>`).join('');
$('#during').innerHTML = D.DURING.map(x => `<div><span class="ib">${ico(x.ico)}</span><div><h4>${esc(x.t)}</h4><p>${esc(x.d)}</p></div></div>`).join('');

let curTool = D.TOOLBOX[0].id;
function renderToolbox(id) {
  curTool = id;
  $$('#tb-chips .chip').forEach(c => c.setAttribute('aria-pressed', c.dataset.id === id ? 'true' : 'false'));
  const t = TB[id];
  const w = id === 'doi' || id === 'lo-lang' ? store.get('na-why', '') : '';
  $('#tb-card').innerHTML = `<div class="tbcard"><b>${esc(t.n)}</b><ul>${t.tips.map(x => `<li>${ico('check')}<span>${esc(x)}</span></li>`).join('')}</ul>
    ${w ? `<div class="why-box"><b>Lý do của bạn</b>${esc(w)}</div>` : ''}</div>`;
}
$('#tb-chips').innerHTML = D.TOOLBOX.map(t => `<button type="button" class="chip" data-id="${t.id}" aria-pressed="false">${esc(t.n)}</button>`).join('');
$('#tb-chips').addEventListener('click', e => { const b = e.target.closest('button[data-id]'); if (b) renderToolbox(b.dataset.id); });
$('#break-d').textContent = D.BREAK.d;
$('#keep').innerHTML = D.KEEP.map(k => `<li>${esc(k)}</li>`).join('');

/* =====================================================================
   PHẦN 4: hiểu thêm
   ===================================================================== */
$('#ins-jobs').innerHTML = D.INSULIN.jobs.map(j => `<li>${j}</li>`).join('');
$('#ins-cycle').innerHTML = D.INSULIN.cycle.map(c => `<li>${esc(c)}</li>`).join('');
$('#ins-harm').textContent = D.INSULIN.harm;
$('#ins-gain').textContent = D.INSULIN.gain;
$('#ins-know').innerHTML = D.INSULIN.know.map(k => `<li>${esc(k)}</li>`).join('');
$('#learn').innerHTML = D.LEARN.map((x, i) => `<details class="more"${i === 0 ? ' open' : ''}><summary>${esc(x.q)}</summary><div class="in">${x.a.map(p => `<p>${esc(p)}</p>`).join('')}</div></details>`).join('');
$('#why-eat').innerHTML = D.WHY_EAT.map(w => `<span class="chip static">${esc(w)}</span>`).join('');

/* ---------- nền sáng/tối ---------- */
$('#theme-btn').addEventListener('click', () => {
  const r = document.documentElement;
  const cur = r.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  r.dataset.theme = cur === 'dark' ? 'light' : 'dark';
  store.set('na-theme', r.dataset.theme);
});

/* ---------- mục lục theo vị trí đọc ---------- */
(function tocSpy() {
  const nav = $('#toc'), links = $$('a', nav), by = {};
  links.forEach(a => { by[a.getAttribute('href').slice(1)] = a; });
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const a = by[e.target.id];
    links.forEach(l => l.classList.toggle('on', l === a));
    if (a) nav.scrollTo({ left: a.offsetLeft - nav.clientWidth / 2 + a.clientWidth / 2, behavior: 'smooth' });
  }), { rootMargin: '-40% 0px -55% 0px' });
  Object.keys(by).forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
})();

/* ---------- khởi động ---------- */
function onPlanChange() {
  renderTracker();
  renderTrack();
  renderPhases();
}
const clock = () => { const n = new Date(); $('#trk-clock').textContent = dayName(n) + ' · ' + hm(n); };
const refresh = () => { clock(); if (plan && !editing) { renderTracker(true); renderPhases(); } };
plan = loadPlan();
renderPrep();
renderToolbox(curTool);
renderFinder();
onPlanChange();
clock();
setInterval(refresh, 30000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
})();
