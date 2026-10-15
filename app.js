/* Hành trình Nhịn ăn: lịch theo giờ, tra cứu món, biểu đồ và các công cụ nhỏ.
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
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
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
  alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
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

/* ---------- trích nguồn ---------- */
const SRC = {};
D.SOURCES.forEach((s, i) => { SRC[s.id] = i + 1; });
const cite = ids => ids ? `<sup class="c" data-s="${ids}"></sup>` : '';
function fillCites(root) {
  $$('sup.c[data-s]', root).forEach(el => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    el.innerHTML = el.dataset.s.split(',').map(x => x.trim()).filter(x => SRC[x])
      .sort((a, b) => SRC[a] - SRC[b]).map(x => `<a href="#src-${x}">${SRC[x]}</a>`).join(',');
  });
}

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
   Mốc thời gian: S = ăn xong bữa cuối (bắt đầu nhịn), E = bữa phá nhịn.
   Ngày giảm ăn = ngày của S; tuần chuẩn bị = 7 ngày trước đó; ăn lại R ngày tuỳ độ dài.
   ===================================================================== */
const DEF_M = ['07:00', '12:00', '18:30'];
const MK = { sang: 0, trua: 1, toi: 2 };
const MEALN = { sang: 'Bữa sáng', trua: 'Bữa trưa', toi: 'Bữa tối' };
const refeedDays = H => H <= 40 ? 1 : H <= 64 ? 2 : H <= 112 ? 3 : 4;
const PREP_EV = [
  [-7, '20:00', 'Bắt đầu tuần chuẩn bị', 'Làm bài kiểm tra an toàn. Báo kế hoạch cho gia đình, đồng nghiệp; nhờ người nấu thay nếu cần.', '#screen'],
  [-6, '20:00', 'Viết ra: vì sao mình nhịn lần này?', 'Và ý nghĩa của quyết định này ở thời điểm hiện tại.', '#why-tool'],
  [-5, '20:00', 'Đọc phần lý thuyết', 'Insulin, tự thực, nhai kỹ (Phần 5–7).', '#insulin'],
  [-4, '09:00', 'Mua đồ cần thiết', 'Rau củ quả, dầu ép lạnh, hạt (bắt buộc); magie, trà xanh, muối biển, tinh dầu bạc hà.', '#chuan-bi'],
  [-3, '09:00', 'Giảm dần cà phê, đường, rượu bia', 'Gợi ý thêm: bỏ dần từ bây giờ cho đỡ đau đầu khi ngừng hẳn.', ''],
  [-2, '20:00', 'Thu xếp công việc, chuẩn bị “thức ăn tinh thần”', 'Sách, phim hay, việc nhẹ nhàng mình thích cho những ngày nhịn.', ''],
  [-1, '08:00', 'Nấu nước hầm xương gà', 'Lửa nhỏ, ninh chậm 6–8 tiếng với hành tây, cà rốt, củ cải, cần tây, giấm táo.', '#chuan-bi'],
  [-1, '20:00', 'Sơ chế rau củ cho ngày mai, ngủ sớm', 'Ngày mai là ngày giảm ăn.', '#giam-an']
];

function model(p) {
  const S = parseDT(p.b), E = parseDT(p.k), M = p.m && p.m.length === 3 ? p.m : DEF_M;
  const H = (E - S) / 36e5, R = refeedDays(H);
  const stages = [1, 2, 3, 4].slice(0, R);
  const maxSt = R === 1 ? 2 : R;
  const D1 = sod(S);
  const rStart = E.getHours() < 15 ? sod(E) : addDays(sod(E), 1);
  const rEnd = addDays(rStart, R);
  const ev = [];
  const add = (t, type, title, text, x) => ev.push(Object.assign({ t, type, title, text: text || '' }, x || {}));

  /* tuần chuẩn bị: bỏ những mốc đã qua từ trước lúc lập lịch */
  const since = addMin(p.c ? new Date(p.c) : new Date(0), -24 * 60);
  PREP_EV.forEach(x => {
    const t = at(addDays(D1, x[0]), x[1]);
    if (t >= since && t < D1) add(t, 'prep', x[2], x[3], { link: x[4], key: 1 });
  });

  /* ngày giảm ăn: bữa cuối kết thúc lúc S */
  const last = addMin(S, -45);
  const meals = ['sang', 'trua'].map(k => [k, at(D1, M[MK[k]])]).filter(m => m[1] <= addMin(last, -180));
  if (meals.length) add(addMin(meals[0][1], -30), 'drink', 'Thức dậy: một cốc nước ấm', 'Hôm nay uống 1,5–2 lít nước trắng, chia đều trong ngày.');
  meals.forEach(m => add(m[1], 'meal', MEALN[m[0]] + ' · ngày giảm ăn', D.MENUS[m[0]].eat, { menu: m[0], key: 1 }));
  if (meals.length) ['10:00', '15:30'].forEach(h => {
    const t = at(D1, h);
    if (t > meals[0][1] && t < addMin(last, -60)) add(t, 'do', 'Không ăn vặt', 'Thèm thì uống nước, đi lại một chút. Chỉ ăn các bữa chính.');
  });
  add(last, 'meal', last.getHours() >= 15 ? 'Bữa tối · bữa cuối trước khi nhịn' : 'Bữa cuối trước khi nhịn', D.MENUS.toi.eat, { menu: 'toi', key: 1 });

  /* những giờ nhịn */
  add(S, 'body', 'Bắt đầu nhịn', 'Từ giờ chỉ uống nước. Lắng nghe cơ thể; khó chịu thì mở Hộp hỗ trợ.', { key: 1 });
  D.MILESTONES.forEach(m => {
    const t = new Date(S.getTime() + m.h * 36e5);
    if (t < addMin(E, -60)) add(t, 'body', m.t, m.d, { key: 1 });
  });
  for (let day = sod(S); day <= E; day = addDays(day, 1)) {
    D.ROUTINE.forEach(r => {
      const t = addMin(r.at in MK ? at(day, M[MK[r.at]]) : at(day, r.at), r.off || 0);
      if (t > addMin(S, 60) && t < addMin(E, -60)) add(t, r.type, r.t, r.d);
    });
  }

  /* ăn lại */
  if (addMin(E, -30) > S) add(addMin(E, -30), 'do', 'Chuẩn bị bữa phá nhịn', 'Hấp hoặc nướng một quả táo, hoặc nấu bát súp rau nhừ.');
  add(E, 'meal', D.REFEED.first.t, D.REFEED.first.d, { key: 1, stage: 1 });
  stages.forEach((st, i) => {
    const day = addDays(rStart, i);
    ['sang', 'trua', 'toi'].forEach(k => {
      const t = at(day, M[MK[k]]);
      if (t < addMin(E, 180)) return;
      const s2 = R === 1 && k === 'toi' ? 2 : st;
      add(t, 'meal', MEALN[k] + ' · ăn lại ngày ' + (i + 1), D.REFEED.menus[s2][k], { key: 1, stage: s2 });
    });
    const w = at(day, '15:00');
    if (w > addMin(E, 60)) add(w, 'drink', 'Uống nước đều', 'Vẫn giữ 1,5–2 lít nước mỗi ngày.');
  });
  add(at(addDays(rStart, R - 1), '20:30'), 'do', 'Hoàn thành hành trình',
    `Những ngày tới: thêm lại dần theo bậc ${maxSt + 1} đến 5 ở Phần 4; để đường, đồ chiên rán, rượu bia sau cùng. Giữ thói quen không ăn vặt, nhai kỹ.`, { key: 1 });

  ev.sort((a, b) => a.t - b.t);
  return { S, E, M, H, R, stages, maxSt, D1, rStart, rEnd, ev };
}

function phaseAt(md, now) {
  if (now < addDays(md.D1, -7)) return { k: 'far' };
  if (now < md.D1) return { k: 'prep' };
  if (now < md.S) return { k: 'd1' };
  if (now < md.E) {
    const h = (now - md.S) / 36e5;
    return { k: 'fast', h, ph: D.PHASES.find(p => h >= p.from && h < p.to) };
  }
  if (now < md.rEnd) {
    const i = Math.min(md.R, Math.max(1, dayDiff(now, md.rStart) + 1));
    return { k: 'refeed', i, st: md.R === 1 && now.getHours() >= 15 && now > addMin(md.E, 180) ? 2 : md.stages[i - 1] };
  }
  return { k: 'done' };
}

let plan = null, demo = false, editing = false;

function validPlan(p) {
  const S = p && parseDT(p.b), E = p && parseDT(p.k);
  return !!(S && E && E - S >= 12 * 36e5 && E - S <= 240 * 36e5);
}
function loadPlan() {
  const q = new URLSearchParams(location.search);
  if (q.get('b') && q.get('k')) {
    const m = (q.get('m') || '').split('-').map(fixHM);
    const p = { b: q.get('b'), k: q.get('k'), m: m.length === 3 && m.every(Boolean) ? m : DEF_M.slice(), c: Date.now() };
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
    { k: 'prep', n: 'Chuẩn bị', a: addDays(md.D1, -7), b: md.D1, w: 14, c: 'var(--brown)' },
    { k: 'd1', n: 'Giảm ăn', a: md.D1, b: md.S, w: 14, c: 'var(--amber)' },
    { k: 'fast', n: 'Nhịn · ' + Math.round(md.H) + ' giờ', a: md.S, b: md.E, w: 52, c: 'var(--sage)' },
    { k: 'refeed', n: 'Ăn lại · ' + md.R + ' ngày', a: md.E, b: md.rEnd, w: 20, c: 'var(--indigo)' }
  ];
  const cur = ps.k === 'far' || ps.k === 'done' ? '' : ps.k;
  const where = (segs.find(s => s.k === cur) || { n: ps.k === 'done' ? 'hoàn thành' : 'trước tuần chuẩn bị' }).n;
  return `<div class="journey" role="img" aria-label="Bạn đang ở chặng: ${esc(where)}">` +
    segs.map(s => {
      const f = Math.max(0, Math.min(1, (now - s.a) / (s.b - s.a)));
      let ticks = '';
      if (s.k === 'fast') ticks = [12, 24, 48, 72, 96].filter(h => h < md.H - 2).map(h => `<span class="tk" style="left:${(h / md.H * 100).toFixed(2)}%"></span>`).join('');
      const mark = s.k === cur ? `<span class="jmark" style="left:${(f * 100).toFixed(2)}%"></span>` : '';
      return `<div class="jseg" style="flex:${s.w} 1 0; --jc:${s.c}"><div class="bar"><i style="width:${(f * 100).toFixed(2)}%"></i>${ticks}</div>${mark}</div>`;
    }).join('') + '</div><div class="jlegend" aria-hidden="true">' +
    segs.map(s => `<span${s.k === cur ? ' class="cur"' : ''} style="--jc:${s.c}"><i></i>${s.n}</span>`).join('') + '</div>';
}

function phaseHTML(md, ps, now) {
  if (ps.k === 'far' || ps.k === 'prep') {
    const pr = prepProgress();
    return `<div class="phase" style="--pc:var(--brown)"><div class="phase-h"><span class="dotc"></span><h3>Tuần chuẩn bị</h3></div>
      <p>Cho tâm trí sự bảo đảm rằng mọi chuyện sẽ ổn. Sắp xếp gia đình, công việc; mua đồ; đọc tài liệu.${cite('ct_chuanbi')}</p>
      <dl><dt>Danh sách chuẩn bị · ${pr.done}/${pr.total} việc</dt><dd><div class="prog"><i style="width:${pr.pct}%"></i></div></dd></dl>
      ${whyBox(true)}<div class="btnrow"><a class="btn ghost sm" href="#chuan-bi">Mở danh sách chuẩn bị</a><a class="btn ghost sm" href="#screen">Kiểm tra an toàn</a></div></div>`;
  }
  if (ps.k === 'd1') {
    const nx = md.ev.find(e => e.menu && e.t > addMin(now, -45));
    return `<div class="phase" style="--pc:var(--amber)"><div class="phase-h"><span class="dotc"></span><h3>Ngày giảm ăn</h3></div>
      <p>${esc(D.DAY1.goal)}${cite('ct_ngay1')}</p>
      ${nx ? menuBox(nx.menu, nx.title + ' · ' + hm(nx.t)) : ''}
      <dl><dt>Cả ngày</dt><dd><ul>${D.DAY1.rules.map(r => `<li>${r.t}. ${r.d}</li>`).join('')}</ul></dd></dl>
      <div class="btnrow"><a class="btn ghost sm" href="#finder">Món này ăn được không?</a></div></div>`;
  }
  if (ps.k === 'fast') {
    const p = ps.ph;
    return `<div class="phase" style="--pc:var(--${p.fuel})"><div class="phase-h"><span class="dotc"></span><h3>${p.name}</h3><span class="tag">giờ ${p.from}${p.to === Infinity ? '+' : '–' + p.to}</span></div>
      <p>${p.body}${cite(p.s)}</p>
      <dl><dt>Có thể thấy</dt><dd class="chips">${p.feel.map(f => `<span class="chip static">${f}</span>`).join('')}</dd>
      <dt>Nên làm</dt><dd><ul>${p.todo.map(t => `<li>${t}</li>`).join('')}</ul></dd></dl>
      ${p.from >= 12 ? whyBox(false) : ''}
      <div class="btnrow"><a class="btn ghost sm" href="#ho-tro">Khó chịu? Hộp hỗ trợ</a><a class="btn ghost sm" href="#dung">Dấu hiệu phải dừng</a></div></div>`;
  }
  if (ps.k === 'refeed') {
    const L = D.LADDER[ps.st - 1];
    const today = md.ev.filter(e => e.type === 'meal' && e.t >= md.E && sameDay(e.t, now));
    return `<div class="phase" style="--pc:var(--indigo)"><div class="phase-h"><span class="dotc"></span><h3>Ăn lại · ${lc(L.n)}</h3></div>
      <p>${L.t}. Ăn ít, ăn chậm, nhai kỹ; dừng khi vừa đủ no.</p>
      ${today.length ? `<dl><dt>Hôm nay</dt><dd><ul>${today.map(e => `<li><b>${hm(e.t)} ${esc(e.title.split(' · ')[0])}:</b> ${esc(e.text)}</li>`).join('')}</ul></dd></dl>` : ''}
      <div class="btnrow"><a class="btn ghost sm" href="#an-lai">Hướng dẫn ăn lại</a><a class="btn ghost sm" href="#finder">Tra món</a></div></div>`;
  }
  return `<div class="phase" style="--pc:var(--sage)"><div class="phase-h"><span class="dotc"></span><h3>Giữ lại thói quen tốt</h3></div>
    <ul>${D.REFEED.keep.map(k => `<li>${k.t}${cite(k.s)}</li>`).join('')}</ul>
    <p>Những ngày tới, thêm lại dần theo bậc ${md.maxSt + 1} đến 5; đường, đồ chiên rán, rượu bia để sau cùng.</p>
    <div class="btnrow"><button class="btn ghost sm" data-act="edit">Lập lịch cho lần nhịn mới</button></div></div>`;
}

function dayLabel(md, d) {
  if (d < md.D1) return 'Chuẩn bị';
  if (sameDay(d, md.D1)) return 'Ngày giảm ăn, bắt đầu nhịn';
  if (d < md.rStart) return sameDay(d, md.E) ? 'Nhịn, phá nhịn lúc ' + hm(md.E) : 'Nhịn · ngày ' + dayDiff(d, md.D1);
  if (d < md.rEnd) return 'Ăn lại · ngày ' + (dayDiff(d, md.rStart) + 1);
  return '';
}
function menuDetail(e) {
  if (!e.menu) return '';
  const m = D.MENUS[e.menu];
  return `<div class="menu">${m.groups.map(g => D.GROUPS[g].n).join(' · ')}${m.except ? ' · ' + m.except.toLowerCase() : ''}. ${esc(m.notes.join(' '))}</div>`;
}
function scheduleHTML(md, now, keep) {
  const groups = [];
  md.ev.forEach(e => {
    const k = dateVal(e.t);
    if (!groups.length || groups[groups.length - 1].k !== k) groups.push({ k, d: sod(e.t), ev: [] });
    groups[groups.length - 1].ev.push(e);
  });
  const nextIdx = md.ev.findIndex(e => e.t > now);
  const nextEv = md.ev[nextIdx];
  const allOpen = keep ? keep.all : false;
  return `<details class="more" id="sched-all"${allOpen ? ' open' : ''}><summary>Lịch đầy đủ theo ngày · ${md.ev.length} mục</summary><div class="in sched-wrap">` +
    groups.map(g => {
      const today = sameDay(g.d, now);
      const open = keep && keep.days ? keep.days.indexOf(g.k) > -1 : today;
      return `<details class="day${today ? ' today' : ''}" data-k="${g.k}"${open ? ' open' : ''}><summary><b>${dayName(g.d)}</b><span class="tag">${dayLabel(md, g.d)}${today ? ' · hôm nay' : ''}</span><span class="small muted">${g.ev.length} mục</span></summary><ol class="sched">` +
        g.ev.map(e => `<li class="t-${e.type}${e.t < now ? ' past' : ''}${e === nextEv ? ' nowi' : ''}"><span class="hh">${hm(e.t)}</span><span class="ib">${ico(TYPE_ICO[e.type])}</span><div><b>${esc(e.title)}</b><p>${esc(e.text)}</p>${menuDetail(e)}</div></li>`).join('') +
        '</ol></details>';
    }).join('') + '</div></details>';
}

function renderTracker(keepState) {
  const body = $('#trk-body');
  if (!plan || editing) {
    /* đang ở biểu mẫu: chỉ vẽ lại khi được gọi chủ động, để không xoá giờ người xem đang nhập */
    if (!keepState || !$('#setup', body)) renderSetup(body);
    return;
  }
  let keep = null;
  if (keepState) {
    const all = $('#sched-all');
    keep = { all: !!(all && all.open), days: $$('details.day[open]', body).map(d => d.dataset.k) };
    if (!all) keep = null;
  }
  const md = model(plan), now = new Date(), ps = phaseAt(md, now);
  let big = '', sub = '';
  if (ps.k === 'far' || ps.k === 'prep') {
    const n = dayDiff(md.D1, now);
    big = n === 1 ? 'Mai là ngày giảm ăn' : 'Còn ' + n + ' ngày';
    sub = `${n === 1 ? '' : 'tới ngày giảm ăn (<b>' + dayName(md.D1) + '</b>). '}Bắt đầu nhịn <b>${whenLabel(md.S, now, 1)}</b>, ăn lại <b>${whenLabel(md.E, now, 1)}</b>.`;
  } else if (ps.k === 'd1') {
    big = 'Ngày giảm ăn';
    sub = `Bắt đầu nhịn lúc <b>${hm(md.S)}</b> (${rel(md.S, now)}). Chỉ ăn bữa chính, không ăn vặt.`;
  } else if (ps.k === 'fast') {
    big = 'Giờ thứ ' + (Math.floor(ps.h) + 1);
    sub = `Đã nhịn <b>${dur(now - md.S)}</b> · còn <b>${dur(md.E - now)}</b> tới bữa phá nhịn (${whenLabel(md.E, now, 1)}).`;
  } else if (ps.k === 'refeed') {
    big = 'Ăn lại · ngày ' + ps.i;
    sub = (md.R > 1 ? `Ngày ${ps.i}/${md.R}. ` : '') + `Đã nhịn ${Math.round(md.H)} giờ, phá nhịn ${whenLabel(md.E, now, 1)}.`;
  } else {
    big = 'Hoàn thành';
    sub = `Bạn đã đi hết hành trình ${Math.round(md.H)} giờ nhịn (${dayName(md.S)} – ${dayName(md.E)}).`;
  }
  const up = md.ev.filter(e => e.t > now).slice(0, 4);
  const upHTML = up.length ? `<ol class="up">${up.map((e, i) => `<li class="t-${e.type}${i === 0 ? ' first' : ''}"><span class="ib">${ico(TYPE_ICO[e.type])}</span><div><span class="when">${whenLabel(e.t, now)} · ${rel(e.t, now)}</span><b>${esc(e.title)}</b><p>${esc(e.text)}${e.link ? ` <a href="${e.link}">Xem</a>` : ''}</p></div></li>`).join('')}</ol>` : '<p class="small muted">Không còn mục nào trong lịch.</p>';
  const actions = demo
    ? '<div class="actions"><button class="btn primary sm" data-act="mine">Nhập giờ của bạn</button></div>'
    : `<div class="actions"><button class="btn ghost sm" data-act="edit">${ico('edit')}Sửa giờ</button><button class="btn ghost sm" data-act="ics">${ico('calendar')}Lưu vào lịch điện thoại</button><button class="btn ghost sm" data-act="link">${ico('link')}Sao chép link riêng</button><button class="btn ghost sm" data-act="del">${ico('trash')}Xoá</button></div>`;
  body.innerHTML = (demo ? '<div class="demo-bar"><span>Đang xem thử với giờ mẫu: bắt đầu nhịn khoảng 20 giờ trước. Chưa lưu gì.</span><button class="btn primary sm" data-act="mine">Nhập giờ của bạn</button></div>' : '') +
    `<div class="now-grid"><div class="now"><div class="big">${big}</div><p class="big-sub">${sub}</p>${journeyHTML(md, ps, now)}${phaseHTML(md, ps, now)}</div>` +
    `<div class="side"><h3>Tiếp theo</h3>${upHTML}${actions}<p class="small muted">Bắt đầu nhịn ${dayName(md.S)} ${hm(md.S)} · ăn lại ${dayName(md.E)} ${hm(md.E)} · ${Math.round(md.H)} giờ.</p></div></div>` +
    scheduleHTML(md, now, keep);
  fillCites(body);
}

const DURS = [
  { n: '24 giờ', f: S => addMin(S, 1440) },
  { n: '1 ngày trọn', f: (S, M) => at(addDays(sod(S), 2), M[0]) },
  { n: '2 ngày', f: (S, M) => at(addDays(sod(S), 3), M[0]) },
  { n: '3 ngày', f: (S, M) => at(addDays(sod(S), 4), M[0]) },
  { n: '5 ngày', f: (S, M) => at(addDays(sod(S), 6), M[0]) },
  { n: '7 ngày', f: (S, M) => at(addDays(sod(S), 8), M[0]) }
];
function renderSetup(body) {
  const now = new Date();
  const M = plan ? plan.m.slice() : DEF_M.slice();
  const S0 = plan ? parseDT(plan.b) : (now.getHours() < 18 ? at(now, '19:00') : at(addDays(sod(now), 1), '19:00'));
  const E0 = plan ? parseDT(plan.k) : DURS[1].f(S0, M);
  body.innerHTML = `<form class="setup" id="setup" novalidate>
    ${plan ? '' : '<p class="intro">Nhập giờ bạn ăn xong bữa cuối (thường là bữa tối của ngày giảm ăn) và giờ định ăn lại. Trang sẽ tính bạn đang ở giờ thứ mấy, cơ thể đang làm gì, bữa và việc tiếp theo. Đã bắt đầu rồi thì chọn giờ trong quá khứ.</p>'}
    <div class="fgrid">
      <div class="field"><span>Bắt đầu nhịn (ăn xong bữa cuối)</span><div class="two"><input type="date" id="b-d" aria-label="Ngày bắt đầu nhịn"><input type="time" id="b-t" aria-label="Giờ bắt đầu nhịn"></div></div>
      <div class="field"><span>Bữa ăn lại đầu tiên (phá nhịn)</span><div class="two"><input type="date" id="k-d" aria-label="Ngày ăn lại"><input type="time" id="k-t" aria-label="Giờ ăn lại"></div></div>
    </div>
    <div class="field"><span>Hoặc chọn nhanh thời gian nhịn</span><div class="durs" id="durs" role="group" aria-label="Thời gian nhịn"></div></div>
    <details class="more"><summary>Giờ ăn quen thuộc của bạn</summary><div class="in"><p class="small muted">Dùng cho ngày giảm ăn, nhắc nhở trong ngày nhịn và ngày ăn lại.</p>
      <div class="three"><label>Sáng<input type="time" id="m0"></label><label>Trưa<input type="time" id="m1"></label><label>Tối<input type="time" id="m2"></label></div></div></details>
    <p class="msg" id="setup-msg" aria-live="polite"></p>
    <div class="btnrow"><button class="btn primary" type="submit">${ico('calendar')}Lưu và xem lịch</button>${plan ? '<button class="btn ghost" type="button" id="cancel">Huỷ</button>' : '<button class="btn ghost" type="button" id="try">Xem thử</button>'}</div>
    <p class="small muted">Lịch chỉ lưu trên trình duyệt của bạn, không gửi đi đâu.</p>
  </form>`;
  const f = $('#setup', body);
  const set = (id, v) => { $('#' + id, f).value = v; };
  set('b-d', dateVal(S0)); set('b-t', hm(S0)); set('k-d', dateVal(E0)); set('k-t', hm(E0));
  M.forEach((m, i) => set('m' + i, m));
  const read = () => {
    const S = parseDT($('#b-d', f).value + 'T' + $('#b-t', f).value);
    const E = parseDT($('#k-d', f).value + 'T' + $('#k-t', f).value);
    const Ms = [0, 1, 2].map(i => fixHM($('#m' + i, f).value) || DEF_M[i]);
    return { S, E, M: Ms };
  };
  const check = () => {
    const r = read(), msg = $('#setup-msg', f);
    msg.className = 'msg';
    if (!r.S || !r.E) { msg.textContent = ''; return null; }
    const H = (r.E - r.S) / 36e5;
    if (H < 12) { msg.className = 'msg bad'; msg.textContent = 'Bữa ăn lại phải sau giờ bắt đầu nhịn ít nhất 12 giờ.'; return null; }
    if (H > 240) { msg.className = 'msg bad'; msg.textContent = 'Lịch hỗ trợ tối đa 10 ngày nhịn.'; return null; }
    msg.textContent = H > 72 ? `Nhịn ${Math.round(H)} giờ: cần người hướng dẫn theo sát mỗi ngày, và đã qua bài kiểm tra an toàn.` : `Nhịn ${Math.round(H)} giờ, ăn lại ${refeedDays(H)} ngày.`;
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
    plan = { b: fmtDT(r.S), k: fmtDT(r.E), m: r.M, c: Date.now() };
    demo = false; editing = false;
    if (!store.set('na-plan', plan)) toast('Trình duyệt không cho lưu. Dùng “Sao chép link riêng” để mở lại lịch.');
    if (location.search) history.replaceState(null, '', location.pathname + '#lich');
    onPlanChange();
    $('#lich').scrollIntoView({ block: 'start' });
  });
  const cancel = $('#cancel', f);
  if (cancel) cancel.onclick = () => { editing = false; renderTracker(); };
  const tryB = $('#try', f);
  if (tryB) tryB.onclick = () => {
    const S = new Date(Math.round((Date.now() - 20 * 36e5) / 9e5) * 9e5);
    plan = { b: fmtDT(S), k: fmtDT(addMin(S, 36 * 60)), m: DEF_M.slice(), c: Date.now() - 30 * 864e5 };
    demo = true; editing = false;
    onPlanChange();
  };
}

function planLink(p) {
  const base = location.href.split('#')[0].split('?')[0];
  return `${base}?b=${p.b}&k=${p.k}&m=${p.m.map(x => x.replace(':', '')).join('-')}#lich`;
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

$('#trk-body').addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const act = b.dataset.act;
  if (act === 'edit') { editing = true; renderTracker(); }
  else if (act === 'mine') { plan = demo ? null : plan; demo = false; editing = !!plan; renderTracker(); onPlanChange(); }
  else if (act === 'del') {
    if (!confirm('Xoá lịch đã lưu trên máy này?')) return;
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
    return `<div class="pcard${cur ? ' cur' : ''}" style="--pc:var(--${p.fuel})"><span class="hh">giờ ${p.from}${p.to === Infinity ? ' trở đi' : '–' + p.to}${cur ? ' <span class="tag">bạn đang ở đây</span>' : ''}</span>
      <h4>${p.name}</h4><p>${p.body}${cite(p.s)}</p><p class="small"><b>Có thể thấy:</b> ${p.feel.join(', ').toLowerCase()}.</p><ul>${p.todo.map(t => `<li>${t}</li>`).join('')}</ul></div>`;
  }).join('');
  fillCites($('#phases'));
}
function renderRoutine() {
  const M = plan ? plan.m : DEF_M;
  const rows = D.ROUTINE.map(r => {
    const base = r.at in MK ? at(new Date(2000, 0, 1), M[MK[r.at]]) : at(new Date(2000, 0, 1), r.at);
    return { t: addMin(base, r.off || 0), r };
  }).sort((a, b) => a.t - b.t);
  $('#routine').innerHTML = rows.map(x => `<li><span class="min">${hm(x.t)}</span><div><b>${x.r.t}</b><p>${x.r.d}</p></div></li>`).join('');
}

/* =====================================================================
   PHẦN 1: chuẩn bị
   ===================================================================== */
function renderPrep() {
  const st = store.get('na-prep', {});
  $('#prep-list').innerHTML = D.PREP.map(g => `<div class="grp">${g.g}</div>` + g.items.map(it =>
    `<label><input type="checkbox" data-id="${it.id}"${st[it.id] ? ' checked' : ''}><span>${esc(it.t)}${it.must ? ' <span class="tag must">Bắt buộc</span>' : ''}${it.s === 'ct_chuanbi' ? '' : cite(it.s)}</span></label>`).join('')).join('');
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

$('#broth-ing').innerHTML = D.BROTH.ing.map(i => `<span class="chip static">${i}</span>`).join('');
$('#broth-steps').innerHTML = D.BROTH.steps.map(s => `<li>${s}</li>`).join('');
$('#broth-use').innerHTML = D.BROTH.use + cite('ct_chuanbi,ct_ngay1');

function renderScreen() {
  $('#screen-list').innerHTML = D.SAFETY.map(g => `<div class="grp">${g.g}</div>` + g.items.map(it =>
    `<label><input type="checkbox" data-id="${it.id}"><span>${esc(it.t)}${cite(it.s)}</span></label>`).join('')).join('');
  paintScreen();
}
function paintScreen() {
  const on = $$('#screen-list input:checked').map(c => c.dataset.id);
  const all = [].concat(...D.SAFETY.map(g => g.items));
  const hit = all.filter(i => on.indexOf(i.id) > -1);
  const stop = hit.filter(i => i.lv === 'stop'), adj = hit.filter(i => i.lv === 'adj');
  const box = $('#screen-result');
  if (stop.length) {
    box.className = 'result stop';
    box.innerHTML = `<span class="st">${ico('x')}Không nên tự nhịn</span><ul>${stop.map(i => `<li>${esc(i.t)}</li>`).join('')}</ul><p class="small">Hãy nói chuyện với bác sĩ trước. Nếu vẫn muốn tham gia, chỉ làm khi bác sĩ đồng ý và theo dõi; có thể chỉ tập không ăn vặt, ăn chậm, nhai kỹ.</p>`;
  } else if (adj.length) {
    box.className = 'result adj';
    box.innerHTML = `<span class="st">${ico('alert')}Cần bác sĩ hoặc người hướng dẫn theo sát</span><ul>${adj.map(i => `<li>${esc(i.t)}</li>`).join('')}</ul><p class="small">Hỏi bác sĩ về thuốc đang dùng, giữ liên lạc với người hướng dẫn mỗi ngày, và chuẩn bị sẵn Hộp hỗ trợ.</p>`;
  } else {
    box.className = 'result ok';
    box.innerHTML = `<span class="st">${ico('check')}Chưa thấy điều gì cần dừng</span><p class="small">Vẫn nhịn cùng người hướng dẫn, lắng nghe cơ thể, và biết các dấu hiệu phải dừng ở Phần 3.</p>`;
  }
}
$('#screen-list').addEventListener('change', paintScreen);

/* =====================================================================
   PHẦN 2: ngày giảm ăn
   ===================================================================== */
$('#d1-goal').innerHTML = esc(D.DAY1.goal) + cite('ct_ngay1');
$('#d1-rules').innerHTML = D.DAY1.rules.map(r => `<div><span class="ib">${ico(r.ico)}</span><div><h4>${r.t}</h4><p>${r.d}</p></div></div>`).join('');

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
  $('#meal-panel').innerHTML = `<figure>${img(m.img, m.alt, 'bowl')}</figure><div class="mbody"><p class="lead-t">${esc(m.lead)}${cite(m.s)}</p>
    ${m.except ? `<span class="except">${ico('x')}${m.except}</span>` : ''}
    <div class="gl">${m.groups.map(g => {
      const G = D.GROUPS[g];
      return `<div><span class="ib">${ico(G.ico)}</span><div><b>${G.n}</b><span>${(MEAL_ITEMS[k] && MEAL_ITEMS[k][g]) || G.items}</span></div></div>`;
    }).join('')}</div>
    <ul class="notes">${m.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul></div>`;
  fillCites($('#meal-panel'));
});

const groupCard = (g, stop) => {
  const G = D.GROUPS[g];
  return `<div class="gcard${stop ? ' stop' : ''}">${img(G.img, 'Minh hoạ ' + lc(G.n), G.ico)}<div class="body"><h3>${G.n}</h3><p>${G.items}</p></div></div>`;
};
$('#allowed').innerHTML = D.ALLOWED.map(g => groupCard(g, false)).join('');
$('#stopped').innerHTML = D.STOPPED.map(g => groupCard(g, true)).join('');

/* tra cứu món */
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const FOODS = D.FOODS.map(f => ({ n: f[0], keys: [norm(f[0])].concat(f[1].split(',').map(norm)).filter(Boolean), g: f[2], r: f[3], note: f[4], src: f[5], lad: f[6] || D.GROUPS[f[2]].lad }));
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
const SRC_LB = { c: 'Theo tài liệu', s: 'Suy ra từ nhóm', q: 'Tài liệu không nói' };
function refeedWhen(st) {
  if (st >= 6) return 'Ăn lại: sau cùng, càng muộn càng tốt';
  if (!plan) return 'Ăn lại: bậc ' + st;
  const md = model(plan);
  const i = md.R === 1 ? (st <= 2 ? 1 : 0) : (st <= md.R ? st : 0);
  return i ? `Ăn lại: bậc ${st} · ngày ăn lại thứ ${i} (${dayName(addDays(md.rStart, i - 1))})` : `Ăn lại: bậc ${st} · sau những ngày ăn lại`;
}
function renderFinder() {
  const q = $('#fq').value, out = $('#fres');
  if (norm(q).length < 2) { out.innerHTML = '<p class="small muted">Gõ ít nhất 2 chữ, có dấu hay không dấu đều được.</p>'; return; }
  const res = search(q);
  if (!res.length) {
    out.innerHTML = `<div class="fitem"><b>Chưa có “${esc(q)}” trong danh sách</b><p>Nguyên tắc ngày giảm ăn: rau củ, trái cây ít ngọt, ngũ cốc nguyên hạt, khoai, hạt khô, dầu ép lạnh. Không sữa, thịt cá trứng, đậu, nấm, đường, đồ chiên, cà phê, trà, rượu bia. Không chắc thì hỏi người hướng dẫn.</p></div>`;
    return;
  }
  out.innerHTML = res.map(f => {
    const G = D.GROUPS[f.g], no = f.r === 'NNN';
    const slots = ['Sáng', 'Trưa', 'Tối'].map((n, i) => {
      const c = f.r[i], s = SLOT[c];
      return `<span class="slot ${c === '?' ? 'Q' : c}">${ico(s[0])}${n}: ${s[1]}</span>`;
    }).join('');
    return `<div class="fitem${no ? ' no' : ''}"><div class="fitem-h"><b>${esc(f.n)}</b><span class="g">${G.n}${G.ok ? '' : ' · ngừng từ Ngày 1'}</span></div>
      <div class="slots">${slots}</div>${f.note ? `<p>${esc(f.note)}</p>` : ''}
      <div class="meta"><span class="tag${f.src === 'c' ? ' ct' : ''}">${SRC_LB[f.src]}</span><span>${refeedWhen(f.lad)}</span></div></div>`;
  }).join('');
}
$('#fq-pop').innerHTML = D.POPULAR.map(p => `<button type="button" class="chip">${p}</button>`).join('');
$('#fq-pop').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  $('#fq').value = b.textContent; renderFinder();
});
let fqT;
$('#fq').addEventListener('input', () => { clearTimeout(fqT); fqT = setTimeout(renderFinder, 90); });

/* =====================================================================
   PHẦN 3: khi nhịn
   ===================================================================== */
$('#src3').innerHTML = [
  { f: 'f2', n: 1, t: 'Glycogen trong gan', w: 'khoảng 12–24 giờ đầu', d: 'Đường dự trữ trong gan (và một phần trong cơ), dễ lấy nhất. Vì thế ngày đầu nhịn bạn vẫn thấy khá ổn. Vận động càng mạnh thì càng nhanh cạn.', s: 'ct_lythuyet' },
  { f: 'f3', n: 2, t: 'Mỡ dự trữ', w: 'tăng dần khi glycogen vơi', d: 'Mỡ tách thành glycerol (gan biến thành đường mới) và axit béo (gan, thận, tim, cơ dùng trực tiếp). Axit amin từ tế bào cũ hỏng cũng được tái chế: đó là tự thực.', s: 'ct_lythuyet,cahill2006' },
  { f: 'f4', n: 3, t: 'Thể ketone', w: 'từ ngày thứ 2–3', d: 'Gan làm ketone từ axit béo; cơ thể vào trạng thái ketosis. Bước chuyển như một cánh cửa, đôi khi khó qua: “khủng hoảng axit” với nhiều cảm giác khó chịu.', s: 'ct_lythuyet,cahill2006' }
].map(x => `<div style="--fc:var(--${x.f})"><span class="n">${x.n}</span><div><span class="when">Nguồn ${x.n} · ${x.w}</span><h4>${x.t}</h4><p>${x.d}${cite(x.s)}</p></div></div>`).join('');

let curTool = D.TOOLBOX[0].id;
function renderToolbox(id) {
  curTool = id;
  $$('#tb-chips .chip').forEach(c => c.setAttribute('aria-pressed', c.dataset.id === id ? 'true' : 'false'));
  const t = D.TOOLBOX.find(x => x.id === id);
  const w = id === 'tam-ly' ? store.get('na-why', '') : '';
  $('#tb-card').innerHTML = `<div class="tbcard"><b>${t.n}</b><ul>${t.tips.map(x => `<li>${ico(x.c ? 'check' : 'arrow')}<span>${esc(x.t)}${x.c ? ' <span class="tag ct">Chương trình</span>' : ''}</span></li>`).join('')}</ul>
    ${w ? `<div class="why-box"><b>Lý do của bạn</b>${esc(w)}</div>` : ''}
    ${t.flag ? `<p class="flag">${ico('alert')}<span>${esc(t.flag)}</span></p>` : ''}</div>`;
}
$('#tb-chips').innerHTML = D.TOOLBOX.map(t => `<button type="button" class="chip" data-id="${t.id}" aria-pressed="false">${t.n}</button>`).join('');
$('#tb-chips').addEventListener('click', e => { const b = e.target.closest('button[data-id]'); if (b) renderToolbox(b.dataset.id); });
$('#redflags').innerHTML = D.REDFLAGS.map(r => `<li>${ico('alert')}<span>${r}</span></li>`).join('');

/* ---------- biểu đồ chung ---------- */
/* below = đặt dưới điểm neo (dùng cho biểu đồ có đường cong chạm mép trên) */
function tipShow(box, html, x, y, below) {
  let t = $('.tip', box);
  if (!t) { t = document.createElement('div'); t.className = 'tip'; t.setAttribute('role', 'tooltip'); box.appendChild(t); }
  t.innerHTML = html; t.hidden = false;
  t.style.transform = below ? 'translate(-50%, 0)' : '';
  const w = box.clientWidth, half = Math.min(t.offsetWidth / 2 || 120, w / 2 - 4);
  t.style.left = Math.max(half, Math.min(w - half, x)) + 'px';
  t.style.top = y + 'px';
}
const tipHide = box => { const t = $('.tip', box); if (t) t.hidden = true; };

/* ba nguồn năng lượng theo giờ: mỗi hàng một dải, đậm ở đoạn rõ nhất, nhạt dần hai đầu */
function drawFuel() {
  const box = $('#fuel-viz');
  box.style.position = 'relative';
  const W = Math.max(300, Math.round(box.clientWidth || 640));
  const xMax = 120, pl = 6, pr = 14, top = 34, rowH = 50, axisH = 44;
  const Hh = top + rowH * D.FUELS.length + axisH;
  const x = h => pl + (W - pl - pr) * Math.min(h, xMax) / xMax;
  const h0 = curFastHour();
  let s = '<defs>';
  D.FUELS.forEach(f => {
    const x0 = x(f.a), x1 = x(Math.min(f.d, xMax));
    const off = h => Math.max(0, Math.min(100, (x(Math.min(h, xMax)) - x0) / Math.max(1, x1 - x0) * 100)).toFixed(2) + '%';
    s += `<linearGradient id="g-${f.id}" gradientUnits="userSpaceOnUse" x1="${x0}" x2="${x1}" y1="0" y2="0">
      <stop offset="0%" style="stop-color:var(--${f.id});stop-opacity:${f.a === f.b ? 1 : 0.1}"/>
      <stop offset="${off(f.b)}" style="stop-color:var(--${f.id});stop-opacity:1"/>
      <stop offset="${off(f.c)}" style="stop-color:var(--${f.id});stop-opacity:1"/>
      <stop offset="100%" style="stop-color:var(--${f.id});stop-opacity:${f.d >= 999 ? 1 : 0.1}"/></linearGradient>`;
  });
  s += '</defs>';
  const yA = top + rowH * D.FUELS.length + 6;
  [0, 12, 24, 36, 48, 72, 96, 120].forEach(h => {
    s += `<line class="gridl" x1="${x(h)}" x2="${x(h)}" y1="${top - 6}" y2="${yA}"/>`;
    s += `<text class="ax" x="${x(h)}" y="${yA + 14}" text-anchor="${h === 0 ? 'start' : h === 120 ? 'end' : 'middle'}">${h === 120 ? '120 giờ' : h}</text>`;
  });
  for (let d = 0; d < 5; d++) s += `<text class="ax" x="${x(d * 24 + 12)}" y="${yA + 32}" text-anchor="middle" style="fill:var(--ink-2)">ngày ${d + 1}</text>`;
  D.FUELS.forEach((f, i) => {
    const y0 = top + i * rowH;
    s += `<text class="axl" x="${pl}" y="${y0 + 12}">${f.n}</text>`;
    s += `<rect x="${x(f.a)}" y="${y0 + 20}" width="${Math.max(4, x(Math.min(f.d, xMax)) - x(f.a))}" height="16" rx="4" fill="url(#g-${f.id})"/>`;
    s += `<rect class="hit" data-i="${i}" x="${pl}" y="${y0}" width="${W - pl - pr}" height="${rowH}" fill="transparent" tabindex="0" role="img" aria-label="${esc(f.n + ': ' + f.note)}"/>`;
  });
  if (h0 != null && h0 <= xMax) {
    const xm = x(h0), lab = 'Bạn: giờ ' + (Math.floor(h0) + 1), lw = lab.length * 6.6 + 14;
    const lx = Math.max(pl, Math.min(W - pr - lw, xm - lw / 2));
    s += `<line x1="${xm}" x2="${xm}" y1="${top - 8}" y2="${yA}" style="stroke:var(--ink);stroke-width:2"/>`;
    s += `<rect x="${lx}" y="2" width="${lw}" height="20" rx="10" style="fill:var(--ink)"/><text x="${lx + lw / 2}" y="16" text-anchor="middle" style="fill:var(--bg);font:600 11.5px var(--f-body)">${lab}</text>`;
  }
  box.innerHTML = `<svg class="chart" viewBox="0 0 ${W} ${Hh}" width="${W}" height="${Hh}" role="img" aria-label="Biểu đồ minh hoạ bốn nguồn năng lượng theo giờ nhịn">${s}</svg>`;
  const show = el => {
    const f = D.FUELS[+el.dataset.i], y0 = top + (+el.dataset.i) * rowH;
    const mid = (x(f.a) + x(Math.min(f.d, xMax))) / 2;
    tipShow(box, `<b>${esc(f.n)}</b>${esc(f.note)}`, mid, y0 + 18);
  };
  $$('.hit', box).forEach(el => {
    el.addEventListener('pointerenter', () => show(el));
    el.addEventListener('focus', () => show(el));
    el.addEventListener('pointerleave', () => tipHide(box));
    el.addEventListener('blur', () => tipHide(box));
  });
}
function fuelTable() {
  const fmt = f => [
    f.a === 0 ? 'ngay khi ăn' : 'khoảng giờ ' + f.a,
    f.c >= 999 ? 'từ giờ ' + f.b : 'giờ ' + f.b + '–' + f.c,
    f.d >= 999 ? 'kéo dài khi còn nhịn' : 'giờ ' + f.c + '–' + f.d
  ];
  $('#fuel-tbl').innerHTML = '<thead><tr><th>Nguồn</th><th>Bắt đầu</th><th>Rõ nhất</th><th>Nhạt dần</th><th>Ghi chú</th></tr></thead><tbody>' +
    D.FUELS.map(f => { const v = fmt(f); return `<tr><td>${f.n}</td><td>${v[0]}</td><td>${v[1]}</td><td>${v[2]}</td><td>${f.note}</td></tr>`; }).join('') + '</tbody>';
}

/* insulin trong ngày: mỗi bữa là một xung lên rồi hạ */
const insVal = (sr, t) => sr.meals.reduce((v, m) => { const u = (t - m[0]) / 0.75; return u > 0 ? v + m[1] * 0.85 * u * Math.exp(1 - u) : v; }, 0.12);
const level = v => v < 0.22 ? 'thấp' : v < 0.5 ? 'vừa' : 'cao';
function drawInsulin() {
  const box = $('#ins-viz');
  box.style.position = 'relative';
  const W = Math.max(300, Math.round(box.clientWidth || 640)), Hh = 250;
  const pl = 34, pr = 10, top = 10, bot = 30, t0 = 6, t1 = 24, vMax = 1.1;
  const x = t => pl + (W - pl - pr) * (t - t0) / (t1 - t0);
  const y = v => top + (Hh - top - bot) * (1 - v / vMax);
  const col = ['var(--f1)', 'var(--f4)'];
  let s = `<rect x="${pl}" y="${y(0.22)}" width="${W - pl - pr}" height="${y(0) - y(0.22)}" style="fill:var(--sage-soft);opacity:.8"/>`;
  const step = W < 520 ? 6 : 3;
  for (let h = 6; h <= 24; h += 3) {
    s += `<line class="gridl" x1="${x(h)}" x2="${x(h)}" y1="${top}" y2="${y(0)}"/>`;
    if ((h - 6) % step === 0) s += `<text class="ax" x="${x(h)}" y="${Hh - 10}" text-anchor="${h === 6 ? 'start' : h === 24 ? 'end' : 'middle'}">${h}:00</text>`;
  }
  s += `<line class="gridl" x1="${pl}" x2="${W - pr}" y1="${y(0)}" y2="${y(0)}"/>`;
  s += `<text class="axl" x="${pl - 6}" y="${y(1) + 4}" text-anchor="end">cao</text><text class="axl" x="${pl - 6}" y="${y(0.1) + 4}" text-anchor="end">thấp</text>`;
  D.INSULIN.forEach((sr, i) => {
    let d = '';
    for (let t = t0; t <= t1 + 1e-9; t += 0.05) d += (d ? 'L' : 'M') + x(t).toFixed(1) + ' ' + y(insVal(sr, t)).toFixed(1);
    s += `<path d="${d}" style="fill:none;stroke:${col[i]};stroke-width:2;stroke-linejoin:round;stroke-linecap:round"/>`;
  });
  s += `<g id="ins-cross" visibility="hidden"><line x1="0" x2="0" y1="${top}" y2="${y(0)}" style="stroke:var(--ink-2);stroke-width:1"/>` +
    D.INSULIN.map((sr, i) => `<circle r="5" cx="0" cy="0" data-i="${i}" style="fill:${col[i]};stroke:var(--surface);stroke-width:2"/>`).join('') + '</g>';
  s += `<rect id="ins-hit" x="${pl}" y="${top}" width="${W - pl - pr}" height="${y(0) - top}" fill="transparent"/>`;
  box.innerHTML = `<svg class="chart" viewBox="0 0 ${W} ${Hh}" width="${W}" height="${Hh}" tabindex="0" role="img" aria-label="Biểu đồ minh hoạ mức insulin trong ngày: ăn vặt khiến insulin không về mức thấp; chỉ ăn ba bữa chính thì insulin có lúc hạ xuống">${s}</svg>`;
  const svg = $('svg', box), cross = $('#ins-cross', box);
  let cur = 10;
  const evName = (sr, t) => { const m = sr.meals.find(m => t - m[0] >= 0 && t - m[0] < 0.75); return m ? D.INSULIN_EVENTS[m[0]] : ''; };
  const show = t => {
    cur = Math.max(t0, Math.min(t1, Math.round(t * 4) / 4));
    const px = x(cur);
    cross.setAttribute('visibility', 'visible');
    $('line', cross).setAttribute('x1', px); $('line', cross).setAttribute('x2', px);
    $$('circle', cross).forEach(c => { const sr = D.INSULIN[+c.dataset.i]; c.setAttribute('cx', px); c.setAttribute('cy', y(insVal(sr, cur))); });
    const hh = Math.floor(cur), mm = Math.round((cur - hh) * 60);
    tipShow(box, `<b>${hh}:${pad(mm)}</b>` + D.INSULIN.map(sr => { const e = evName(sr, cur); return `${esc(sr.n)}: ${level(insVal(sr, cur))}${e ? ' (vừa ' + e + ')' : ''}`; }).join('<br>'), px * box.clientWidth / W, svg.getBoundingClientRect().height + 4, true);
  };
  const hide = () => { cross.setAttribute('visibility', 'hidden'); tipHide(box); };
  const hit = $('#ins-hit', box);
  hit.addEventListener('pointermove', e => { const r = svg.getBoundingClientRect(); show(t0 + ((e.clientX - r.left) * W / r.width - pl) / (W - pl - pr) * (t1 - t0)); });
  hit.addEventListener('pointerleave', hide);
  svg.addEventListener('focus', () => show(cur));
  svg.addEventListener('blur', hide);
  svg.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); show(cur + (e.key === 'ArrowRight' ? 0.5 : -0.5)); }
  });
}
$('#ins-legend').innerHTML = D.INSULIN.map((sr, i) => `<span><i class="sw" style="background:${['var(--f1)', 'var(--f4)'][i]}"></i>${sr.n}</span>`).join('') + '<span><i class="sw" style="background:var(--sage-soft);height:10px;width:14px"></i>Vùng insulin thấp</span>';
(function insTable() {
  const times = Object.keys(D.INSULIN_EVENTS).map(Number).sort((a, b) => a - b);
  const f = t => { const h = Math.floor(t); return h + ':' + pad(Math.round((t - h) * 60)); };
  $('#ins-tbl').innerHTML = '<thead><tr><th>Giờ</th>' + D.INSULIN.map(sr => `<th>${sr.n}</th>`).join('') + '</tr></thead><tbody>' +
    times.map(t => `<tr><td class="mono">${f(t)}</td>${D.INSULIN.map(sr => `<td>${sr.meals.some(m => m[0] === t) ? D.INSULIN_EVENTS[t] : '—'}</td>`).join('')}</tr>`).join('') + '</tbody>';
})();
$('#cycle').innerHTML = D.CYCLE.map(c => `<li>${c.t}</li>`).join('');

/* =====================================================================
   PHẦN 4: ăn lại
   ===================================================================== */
$('#rf-first-t').textContent = D.REFEED.first.t;
$('#rf-first-d').textContent = D.REFEED.first.d;
$('#rf-rules').innerHTML = D.REFEED.rules.map(r => `<div><span class="ib">${ico(r.ico)}</span><div><h4>${r.t}</h4><p>${r.d}</p></div></div>`).join('');
$('#ladder').innerHTML = D.LADDER.map((l, i) => `<li style="--k:${8 + i * 9}"><span class="ib">${ico(l.ico)}</span><span class="n">${l.n}</span><p>${l.t}</p></li>`).join('');
$('#keep').innerHTML = D.REFEED.keep.map(k => `<li>${k.t}${cite(k.s)}</li>`).join('');
const RF_OPTS = [{ n: '1 ngày', H: 36 }, { n: '2 ngày', H: 60 }, { n: '3 ngày', H: 84 }, { n: '5 ngày', H: 132 }, { n: '7 ngày', H: 180 }];
function renderRefeedPlan(i) {
  const R = refeedDays(RF_OPTS[i].H), maxSt = R === 1 ? 2 : R;
  const M = D.REFEED.menus;
  let h = '<div class="rfdays">';
  for (let d = 0; d < R; d++) {
    const st = d + 1;
    h += `<div class="rfday"><h4>Ăn lại ngày ${d + 1} <span class="tag">Bậc ${st}${R === 1 ? '–2' : ''}</span></h4><dl>
      <dt>Sáng</dt><dd>${d === 0 ? '<b>Bữa phá nhịn:</b> ' + D.REFEED.first.d : M[st].sang}</dd>
      <dt>Trưa</dt><dd>${M[st].trua}</dd><dt>Tối</dt><dd>${R === 1 ? M[2].toi : M[st].toi}</dd></dl></div>`;
  }
  h += `<div class="rfday" style="background:var(--surface-2)"><h4>Sau đó</h4><dl>${D.LADDER.filter(l => l.s > maxSt).map(l => `<dt>${l.n}</dt><dd>${l.t}</dd>`).join('')}</dl></div></div>`;
  $('#rf-plan').innerHTML = h;
}
$('#rf-len').innerHTML = RF_OPTS.map((o, i) => `<button role="tab" data-i="${i}" aria-selected="false">${o.n}</button>`).join('');
function pickRefeedDefault() {
  let i = 0;
  if (plan) {
    const H = model(plan).H;
    RF_OPTS.forEach((o, j) => { if (Math.abs(o.H - H) < Math.abs(RF_OPTS[i].H - H)) i = j; });
  }
  $$('#rf-len button').forEach((b, j) => b.setAttribute('aria-selected', j === i ? 'true' : 'false'));
}
pickRefeedDefault();
tabs($('#rf-len'), 'i', v => renderRefeedPlan(+v));

/* =====================================================================
   PHẦN 6–9
   ===================================================================== */
$('#qa').innerHTML = D.QA.map((x, i) => `<details class="more"${i === 0 ? ' open' : ''}><summary>${x.q}</summary><div class="in"><p>${x.a}${cite(x.s)}</p></div></details>`).join('');
$('#evlegend').innerHTML = Object.keys(D.EV).map(k => `<span class="ev ev-${k}">${D.EV[k]}</span>`).join('');
$('#benefits').innerHTML = D.BENEFITS.map(b => `<div class="ben"><div class="meta"><span class="ev ev-${b.ev}">${D.EV[b.ev]}</span></div><h4>${b.t}</h4><p>${b.d}${cite(b.s)}</p></div>`).join('');
$('#why-eat').innerHTML = D.WHY_EAT.map(w => `<span class="chip static">${w}</span>`).join('');
const ERA_C = { tien: 'var(--brown)', co: 'var(--amber)', trung: 'var(--rose)', hd: 'var(--sage)', tg: 'var(--plum)', kh: 'var(--indigo)' };
function renderTimeline(era) {
  $('#timeline').innerHTML = D.HISTORY.filter(h => era === 'all' || h.e === era).map(h =>
    `<li style="--tc:${ERA_C[h.e]}"><span class="yr">${h.y} · ${D.ERAS[h.e]}</span><b>${h.t}</b><p>${h.d}</p></li>`).join('');
}
$('#tl-filter').innerHTML = '<button type="button" class="chip" data-e="all" aria-pressed="true">Tất cả</button>' +
  Object.keys(D.ERAS).map(k => `<button type="button" class="chip" data-e="${k}" aria-pressed="false">${D.ERAS[k]}</button>`).join('');
$('#tl-filter').addEventListener('click', e => {
  const b = e.target.closest('button[data-e]'); if (!b) return;
  $$('#tl-filter .chip').forEach(c => c.setAttribute('aria-pressed', c === b ? 'true' : 'false'));
  renderTimeline(b.dataset.e);
});
renderTimeline('all');
$('#sources').innerHTML = D.SOURCES.map(s => `<li id="src-${s.id}">${esc(s.t)}${s.u ? ` <a href="${s.u}" target="_blank" rel="noopener">${esc(s.u.replace(/^https?:\/\//, '').split('/')[0])}</a>` : ' <span class="int">(tài liệu nội bộ, không công khai)</span>'}</li>`).join('');
$('#vtoc').innerHTML = D.CHAPTERS.map(c => `<a href="#${c.id}">${img(c.img, '', 'leaf')}<span><b>${c.n}</b>${c.t}</span></a>`).join('');

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
    if (running) { const i = Math.floor(e / 180) % D.SLOW.length; if (i !== last) { last = i; pr.textContent = D.SLOW[i]; } }
  };
  const stop = done => {
    running = false; clearInterval(iv);
    go.textContent = done ? 'Bắt đầu lại' : 'Tiếp tục';
    ts.textContent = done ? 'xong' : 'tạm dừng';
    if (done) { pr.textContent = '20 phút rồi. Tín hiệu no đã kịp lên não: bạn đang no mấy phần?'; try { if (navigator.vibrate) navigator.vibrate(200); } catch (e) { /* không rung được thì thôi */ } }
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
  renderPhases();
  renderRoutine();
  drawFuel();
  pickRefeedDefault();
  renderRefeedPlan(+($('#rf-len button[aria-selected="true"]') || { dataset: { i: 0 } }).dataset.i);
  if ($('#fq').value) renderFinder();
}
const clock = () => { const n = new Date(); $('#trk-clock').textContent = dayName(n) + ' · ' + hm(n); };
plan = loadPlan();
renderPrep();
renderScreen();
renderToolbox(curTool);
fuelTable();
renderFinder();
onPlanChange();
drawInsulin();
clock();
fillCites(document);
setInterval(() => { clock(); if (plan && !editing) { renderTracker(true); renderPhases(); drawFuel(); } }, 30000);
document.addEventListener('visibilitychange', () => { if (!document.hidden && plan && !editing) { clock(); renderTracker(true); renderPhases(); drawFuel(); } });
let lastW = window.innerWidth, rzT;
window.addEventListener('resize', () => {
  clearTimeout(rzT);
  rzT = setTimeout(() => { if (window.innerWidth !== lastW) { lastW = window.innerWidth; drawFuel(); drawInsulin(); } }, 150);
});
})();
