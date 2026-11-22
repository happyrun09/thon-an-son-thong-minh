/* ==========================================================================
   THÔN AN SƠN THÔNG MINH - LOGIC ỨNG DỤNG
   Tổng hợp tinh hoa kiến trúc Smart Village mã nguồn mở (PWA, Civic Tech)
   Tối ưu trải nghiệm cho mọi người dân trên Điện thoại & Máy tính
   ========================================================================== */

const STORAGE_KEYS = {
  NOTICES: 'anson_smart_notices_v1',
  FEEDBACKS: 'anson_smart_feedbacks_v1',
  SUBSCRIBERS: 'anson_smart_subscribers_v1',
  FONT_SCALE: 'anson_smart_font_scale_v1',
  ADMIN_AUTH: 'anson_smart_admin_auth_v1'
};

// Dữ liệu mẫu chuẩn thực tế Thôn An Sơn, Xã Cam Lộ, Tỉnh Quảng Trị
const DEFAULT_NOTICES = [
  {
    id: 'n1',
    title: 'Lịch tiêm phòng dại cho đàn chó, mèo đợt 2 năm 2026',
    level: 'important',
    categoryLabel: '⚠️ Quan trọng',
    date: '22/11/2026',
    author: 'Ban Thú y & Ban Thôn',
    body: 'Kính mời bà con các đội đưa vật nuôi (chó, mèo) đến điểm tiêm tập trung tại sân Nhà văn hóa Thôn An Sơn từ 07h30 đến 11h00 sáng thứ Ba (24/11/2026). Bà con nhớ mang theo sổ theo dõi hoặc rọ mõm để đảm bảo an toàn.'
  },
  {
    id: 'n2',
    title: 'Thông báo lịch tạm ngừng cấp điện bảo trì đường dây khu vực Đội 1 - Đội 2',
    level: 'urgent',
    categoryLabel: '🚨 Khẩn cấp',
    date: '21/11/2026',
    author: 'Điện lực Cam Lộ',
    body: 'Điện lực thông báo tạm ngừng cấp điện từ 07h00 đến 11h30 ngày 25/11/2026 tại khu vực Đội 1 và Đội 2 Thôn An Sơn để phát quang hành lang lưới điện và thay sứ cách điện. Mong bà con chủ động sắp xếp sinh hoạt.'
  },
  {
    id: 'n3',
    title: 'Ra quân Ngày Chủ Nhật Xanh - Tổng vệ sinh đường làng ngõ xóm',
    level: 'normal',
    categoryLabel: '📢 Sinh hoạt chung',
    date: '20/11/2026',
    author: 'Chi đoàn Thanh niên Thôn An Sơn',
    body: 'Kính mời toàn thể đoàn viên thanh niên và bà con nhân dân tham gia phát quang bụi rậm, khơi thông cống rãnh tuyến đường liên thôn vào lúc 06h30 sáng Chủ Nhật tuần này. Dụng cụ: chổi, cuốc, bao đựng rác.'
  },
  {
    id: 'n4',
    title: 'Hướng dẫn bà con cài đặt và tích hợp Giấy tờ xe, BHYT lên ứng dụng VNeID',
    level: 'normal',
    categoryLabel: '📢 Sinh hoạt chung',
    date: '18/11/2026',
    author: 'Tổ Công nghệ số cộng đồng',
    body: 'Tổ Công nghệ số cộng đồng Thôn An Sơn trực hỗ trợ bà con cài đặt VNeID mức độ 2 và tích hợp BHYT, GPLX vào các buổi tối thứ 4 và thứ 6 hàng tuần tại Nhà văn hóa thôn.'
  }
];

const DEFAULT_NEWS = [
  {
    id: 'news1',
    tag: 'Chuyển đổi số',
    date: '22/11/2026',
    title: 'Thôn An Sơn đưa vào vận hành Cổng thông tin Thôn Thông Minh phục vụ bà con',
    summary: 'Chỉ cần quét mã QR bằng Zalo hoặc mở trên điện thoại, bà con dễ dàng xem thông báo, lịch họp, gọi điện cho cán bộ thôn và gửi phản ánh kiến nghị mọi lúc mọi nơi.'
  },
  {
    id: 'news2',
    tag: 'Nông thôn mới',
    date: '19/11/2026',
    title: 'Hoàn thành lắp đặt thêm 12 bóng đèn năng lượng mặt trời tại tuyến đường Đội 3',
    summary: 'Từ nguồn xã hội hóa và sự đóng góp của bà con, tuyến đường vào Đội 3 đã sáng đẹp, đảm bảo an toàn giao thông và an ninh trật tự vào ban đêm.'
  },
  {
    id: 'news3',
    tag: 'Gương sáng',
    date: '15/11/2026',
    title: 'Chi đoàn Thôn An Sơn hỗ trợ ngày công sửa chữa mái nhà cho hộ gia đình chính sách',
    summary: 'Hơn 15 đoàn viên thanh niên đã tham gia lợp lại mái tôn, gia cố cửa sổ giúp gia đình bác Lê Văn M. ổn định chỗ ở trước mùa mưa bão.'
  }
];

const DEFAULT_EVENTS = [
  {
    id: 'ev1',
    day: '24',
    month: 'Th11',
    time: '07:30 - 11:00',
    title: 'Tiêm phòng dại cho chó, mèo toàn thôn',
    location: 'Sân Nhà văn hóa Thôn An Sơn',
    audience: 'Các hộ gia đình nuôi chó, mèo'
  },
  {
    id: 'ev2',
    day: '25',
    month: 'Th11',
    time: '19:30 - 21:00',
    title: 'Họp triển khai kế hoạch sản xuất vụ Đông Xuân',
    location: 'Hội trường Nhà văn hóa Thôn An Sơn',
    audience: 'Đại diện các hộ dân & Tổ trưởng các đội'
  },
  {
    id: 'ev3',
    day: '27',
    month: 'Th11',
    time: '19:00 - 20:30',
    title: 'Tổ Công nghệ số hướng dẫn VNeID & Dịch vụ công',
    location: 'Nhà văn hóa Thôn An Sơn',
    audience: 'Bà con có nhu cầu hỗ trợ điện thoại'
  },
  {
    id: 'ev4',
    day: '29',
    month: 'Th11',
    time: '06:30 - 08:30',
    title: 'Ngày Chủ Nhật Xanh - Dọn vệ sinh đường thôn',
    location: 'Các tuyến đường trục chính & xóm',
    audience: 'Toàn thể bà con & Đoàn thanh niên'
  }
];

const OFFICIALS_DATA = [
  {
    role: 'Trưởng thôn An Sơn',
    name: 'Ông Nguyễn Văn Hùng',
    duty: 'Điều hành chung, xác nhận giấy tờ thôn, giải quyết kiến nghị dân sinh',
    phone: '0912345601',
    badge: 'Lãnh đạo thôn'
  },
  {
    role: 'Bí thư Chi bộ Thôn',
    name: 'Ông Lê Văn Minh',
    duty: 'Công tác Đảng, định hướng phong trào Nông thôn mới kiểu mẫu',
    phone: '0912345602',
    badge: 'Chi bộ'
  },
  {
    role: 'Bí thư Chi đoàn Thôn',
    name: 'Đ/c Nguyễn Anh Hào',
    duty: 'Tổ Công nghệ số cộng đồng, hoạt động thanh niên, hỗ trợ chuyển đổi số',
    phone: '0912345603',
    badge: 'Đoàn thanh niên'
  },
  {
    role: 'Công an viên phụ trách địa bàn',
    name: 'Đ/c Trần Quốc Bảo',
    duty: 'An ninh trật tự, tạm trú tạm vắng, hỗ trợ VNeID',
    phone: '0912345604',
    badge: 'An ninh'
  },
  {
    role: 'Y tế thôn bản',
    name: 'Bà Phạm Thị Hoa',
    duty: 'Tư vấn sức khỏe ban đầu, lịch tiêm chủng, phòng chống dịch bệnh',
    phone: '0912345605',
    badge: 'Y tế'
  },
  {
    role: 'Chi hội Trưởng Phụ nữ',
    name: 'Bà Hoàng Thị Lan',
    duty: 'Vệ sinh môi trường, phân loại rác tại nguồn, vốn vay hội viên',
    phone: '0912345606',
    badge: 'Đoàn thể'
  }
];

const DEFAULT_FEEDBACKS = [
  {
    id: 'fb1',
    topic: 'Đèn đường / Điện lưới',
    location: 'Ngã ba đầu xóm Đội 2',
    content: 'Bóng đèn đường số 08 bị chập chờn 2 hôm nay, mong ban thôn cho kiểm tra thay mới để bà con đi lại buổi tối an toàn.',
    author: 'Anh Tuấn (Đội 2)',
    date: '21/11/2026',
    status: 'done',
    reply: 'Ban thôn đã cử tổ điện kiểm tra và thay bóng LED mới vào chiều 21/11. Cảm ơn bà con đã báo tin!'
  },
  {
    id: 'fb2',
    topic: 'Đường giao thông / Mương thoát nước',
    location: 'Đoạn mương gần cầu nhỏ Đội 4',
    content: 'Sau trận mưa vừa rồi có ít rác và bèo tấp vào miệng cống thoát nước, cần khơi thông trước đợt mưa tới.',
    author: 'Cô Bảy (Đội 4)',
    date: '22/11/2026',
    status: 'processing',
    reply: 'Đã tiếp nhận! Đội thanh niên xung kích sẽ xử lý trong sáng mai 23/11.'
  }
];

// Biến trạng thái hiện tại
let currentNoticeFilter = 'all';
let currentSpeakingId = null;
let fontScaleIndex = 0; // 0: Vừa, 1: To, 2: Rất to
const FONT_MODES = [
  { cls: '', label: 'Cỡ chữ: Vừa' },
  { cls: 'font-large', label: 'Cỡ chữ: To' },
  { cls: 'font-xlarge', label: 'Cỡ chữ: Rất to' }
];

// ==========================================================================
// KHỞI TẠO ỨNG DỤNG
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initDateDisplay();
  initFontScale();
  initStorageDefaults();
  renderAll();
  generateQRCodes();
  updateAdminUI();
});

function initDateDisplay() {
  const now = new Date();
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const dayName = days[now.getDay()];
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const el = document.getElementById('current-date-text');
  if (el) el.textContent = `${dayName}, ${dd}/${mm}/${yyyy}`;
}

function initStorageDefaults() {
  if (!localStorage.getItem(STORAGE_KEYS.NOTICES)) {
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(DEFAULT_NOTICES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FEEDBACKS)) {
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(DEFAULT_FEEDBACKS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS)) {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify([]));
  }
}

function getNotices() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTICES)) || DEFAULT_NOTICES;
  } catch {
    return DEFAULT_NOTICES;
  }
}

function getFeedbacks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACKS)) || DEFAULT_FEEDBACKS;
  } catch {
    return DEFAULT_FEEDBACKS;
  }
}

function getSubscribers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS)) || [];
  } catch {
    return [];
  }
}

function isAdmin() {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
}

// ==========================================================================
// ĐIỀU HƯỚNG GIỮA CÁC TRANG (SPA NHANH MƯỢT)
// ==========================================================================
function navigateTo(viewName) {
  // Ẩn toàn bộ view
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));

  // Hiện view được chọn
  const target = document.getElementById(`view-${viewName}`);
  if (target) {
    target.classList.remove('hidden');
  }

  // Cập nhật active trên cả Bottom Nav & Desktop Nav
  document.querySelectorAll('[data-nav]').forEach(btn => {
    if (btn.getAttribute('data-nav') === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Cuộn nhẹ lên đầu trang cho dễ nhìn
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================================================
// TÍNH NĂNG CỠ CHỮ CHO NGƯỜI LỚN TUỔI
// ==========================================================================
function initFontScale() {
  const saved = parseInt(localStorage.getItem(STORAGE_KEYS.FONT_SCALE) || '0', 10);
  fontScaleIndex = isNaN(saved) ? 0 : saved % FONT_MODES.length;
  applyFontScale();
}

function cycleFontSize() {
  fontScaleIndex = (fontScaleIndex + 1) % FONT_MODES.length;
  localStorage.setItem(STORAGE_KEYS.FONT_SCALE, String(fontScaleIndex));
  applyFontScale();
  showToast(`Đã đổi sang ${FONT_MODES[fontScaleIndex].label}`, '🔎');
}

function applyFontScale() {
  const html = document.documentElement;
  html.classList.remove('font-large', 'font-xlarge');
  const mode = FONT_MODES[fontScaleIndex];
  if (mode.cls) html.classList.add(mode.cls);
  const labelEl = document.getElementById('font-label');
  if (labelEl) labelEl.textContent = mode.label;
}

// ==========================================================================
// TÍNH NĂNG NGHE ĐỌC TIẾNG VIỆT (TEXT-TO-SPEECH)
// ==========================================================================
function toggleSpeak(id, text, btnElement) {
  if (!('speechSynthesis' in window)) {
    showToast('Trình duyệt này chưa hỗ trợ đọc giọng nói.', '⚠️');
    return;
  }

  // Nếu đang đọc chính bài này thì dừng lại
  if (currentSpeakingId === id && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    resetSpeakButtons();
    return;
  }

  window.speechSynthesis.cancel();
  resetSpeakButtons();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'vi-VN';
  utterance.rate = 0.95; // Đọc hơi chậm một chút cho bà con dễ nghe

  currentSpeakingId = id;
  if (btnElement) {
    btnElement.classList.add('speaking-active');
    btnElement.innerHTML = '⏹️ Dừng đọc';
  }

  utterance.onend = () => resetSpeakButtons();
  utterance.onerror = () => resetSpeakButtons();

  window.speechSynthesis.speak(utterance);
}

function resetSpeakButtons() {
  currentSpeakingId = null;
  document.querySelectorAll('.btn-speak').forEach(btn => {
    btn.classList.remove('speaking-active');
    btn.innerHTML = '🔊 Nghe đọc';
  });
}

// ==========================================================================
// RENDER TẤT CẢ CÁC MỤC
// ==========================================================================
function renderAll() {
  renderHome();
  renderNoticesPage();
  renderNewsPage();
  renderCalendarPage();
  renderOfficialsPage();
  renderFeedbackPage();
}

function getLevelBadgeClass(level) {
  if (level === 'urgent') return 'badge-urgent';
  if (level === 'important') return 'badge-important';
  return 'badge-normal';
}

function renderHome() {
  const notices = getNotices();
  const badge = document.getElementById('home-notice-badge');
  if (badge) {
    if (notices.length > 0) {
      badge.textContent = notices.length;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  // 2 thông báo mới nhất trên trang chủ
  const latestBox = document.getElementById('home-latest-notices');
  if (latestBox) {
    const top2 = notices.slice(0, 2);
    latestBox.innerHTML = top2.map(n => `
      <article class="civic-card civic-card-hover p-4 sm:p-5 flex flex-col justify-between gap-3">
        <div class="space-y-2">
          <div class="flex items-center justify-between gap-2">
            <span class="badge ${getLevelBadgeClass(n.level)}">${escapeHtml(n.categoryLabel)}</span>
            <span class="text-xs text-slate-500 font-medium">${escapeHtml(n.date)}</span>
          </div>
          <h4 class="font-bold text-slate-900 text-base leading-snug">${escapeHtml(n.title)}</h4>
          <p class="text-sm text-slate-600 line-clamp-3">${escapeHtml(n.body)}</p>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-slate-100">
          <span class="text-xs text-slate-500 font-medium">✍️ ${escapeHtml(n.author)}</span>
          <button onclick="toggleSpeak('home-${n.id}', ${JSON.stringify(n.title + '. ' + n.body).replace(/"/g, '&quot;')}, this)"
            class="btn-speak text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition cursor-pointer">
            🔊 Nghe đọc
          </button>
        </div>
      </article>
    `).join('');
  }

  // Lịch sắp tới (3 mục)
  const evBox = document.getElementById('home-upcoming-events');
  if (evBox) {
    evBox.innerHTML = DEFAULT_EVENTS.slice(0, 3).map(ev => `
      <div class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
        <div class="w-12 h-12 rounded-xl bg-emerald-600 text-white flex flex-col items-center justify-center shrink-0 leading-tight">
          <span class="text-base font-extrabold">${ev.day}</span>
          <span class="text-[10px] uppercase font-semibold opacity-90">${ev.month}</span>
        </div>
        <div class="min-w-0">
          <div class="text-sm font-bold text-slate-900 truncate">${escapeHtml(ev.title)}</div>
          <div class="text-xs text-slate-500 truncate">⏰ ${ev.time} • 📍 ${escapeHtml(ev.location)}</div>
        </div>
      </div>
    `).join('');
  }

  // Gọi nhanh cán bộ (3 người đầu)
  const contactBox = document.getElementById('home-quick-contacts');
  if (contactBox) {
    contactBox.innerHTML = OFFICIALS_DATA.slice(0, 3).map(of => `
      <div class="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
        <div class="min-w-0">
          <div class="text-xs font-bold text-emerald-700 uppercase">${escapeHtml(of.role)}</div>
          <div class="text-sm font-bold text-slate-900 truncate">${escapeHtml(of.name)}</div>
        </div>
        <a href="tel:${of.phone}"
          class="shrink-0 inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition">
          📞 Gọi
        </a>
      </div>
    `).join('');
  }
}

function setNoticeFilter(cat, btn) {
  currentNoticeFilter = cat;
  document.querySelectorAll('.notice-filter-btn').forEach(b => {
    b.className = 'notice-filter-btn px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white border border-slate-300 text-slate-700 cursor-pointer shrink-0';
  });
  btn.className = 'notice-filter-btn px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-emerald-600 text-white cursor-pointer shrink-0';
  renderNoticesPage();
}

function renderNoticesPage() {
  const notices = getNotices();
  const query = (document.getElementById('notice-search')?.value || '').trim().toLowerCase();

  const filtered = notices.filter(n => {
    const matchCat = currentNoticeFilter === 'all' || n.level === currentNoticeFilter;
    const matchText = !query || n.title.toLowerCase().includes(query) || n.body.toLowerCase().includes(query);
    return matchCat && matchText;
  });

  const listEl = document.getElementById('notices-list');
  if (!listEl) return;

  if (filtered.length === 0) {
    listEl.innerHTML = `<div class="civic-card p-8 text-center text-slate-500 text-sm">Không tìm thấy thông báo phù hợp.</div>`;
    return;
  }

  listEl.innerHTML = filtered.map(n => `
    <article class="civic-card p-5 space-y-2.5">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="badge ${getLevelBadgeClass(n.level)}">${escapeHtml(n.categoryLabel)}</span>
        <span class="text-xs text-slate-500 font-medium">📅 ${escapeHtml(n.date)} • ✍️ ${escapeHtml(n.author)}</span>
      </div>
      <h3 class="text-base sm:text-lg font-extrabold text-slate-900">${escapeHtml(n.title)}</h3>
      <p class="text-sm sm:text-base text-slate-700 leading-relaxed">${escapeHtml(n.body)}</p>
      <div class="pt-2 flex items-center justify-end gap-2">
        <button onclick="toggleSpeak('page-${n.id}', ${JSON.stringify(n.title + '. ' + n.body).replace(/"/g, '&quot;')}, this)"
          class="btn-speak text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl transition cursor-pointer">
          🔊 Nghe đọc
        </button>
      </div>
    </article>
  `).join('');
}

function renderNewsPage() {
  const el = document.getElementById('news-list');
  if (!el) return;
  el.innerHTML = DEFAULT_NEWS.map(item => `
    <article class="civic-card civic-card-hover p-5 space-y-2.5 flex flex-col justify-between">
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs">
          <span class="badge badge-info">${escapeHtml(item.tag)}</span>
          <span class="text-slate-500">${escapeHtml(item.date)}</span>
        </div>
        <h3 class="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">${escapeHtml(item.title)}</h3>
        <p class="text-sm text-slate-600 leading-relaxed">${escapeHtml(item.summary)}</p>
      </div>
      <div class="pt-2">
        <button onclick="toggleSpeak('${item.id}', ${JSON.stringify(item.title + '. ' + item.summary).replace(/"/g, '&quot;')}, this)"
          class="btn-speak text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition cursor-pointer">
          🔊 Nghe đọc
        </button>
      </div>
    </article>
  `).join('');
}

function renderCalendarPage() {
  const el = document.getElementById('calendar-list');
  if (!el) return;
  el.innerHTML = DEFAULT_EVENTS.map(ev => `
    <div class="civic-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-start sm:items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex flex-col items-center justify-center shrink-0 shadow-xs">
          <span class="text-xl font-extrabold leading-none">${ev.day}</span>
          <span class="text-[11px] font-semibold uppercase mt-0.5">${ev.month}</span>
        </div>
        <div class="space-y-1">
          <h3 class="text-base font-extrabold text-slate-900">${escapeHtml(ev.title)}</h3>
          <div class="text-xs sm:text-sm text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
            <span>⏰ <strong>${ev.time}</strong></span>
            <span>📍 ${escapeHtml(ev.location)}</span>
          </div>
          <div class="text-xs text-emerald-700 font-semibold">👥 Thành phần: ${escapeHtml(ev.audience)}</div>
        </div>
      </div>
      <button onclick="showToast('Đã lưu nhắc lịch: ${escapeHtml(ev.title)}', '📅')"
        class="shrink-0 px-4 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-bold transition cursor-pointer">
        🔔 Nhắc tôi
      </button>
    </div>
  `).join('');
}

function renderOfficialsPage() {
  const el = document.getElementById('officials-list');
  if (!el) return;
  el.innerHTML = OFFICIALS_DATA.map(of => `
    <div class="civic-card p-5 flex flex-col justify-between gap-4">
      <div class="space-y-1.5">
        <div class="flex items-center justify-between gap-2">
          <span class="badge badge-normal">${escapeHtml(of.badge)}</span>
          <span class="text-xs font-mono text-slate-500">${of.phone}</span>
        </div>
        <h3 class="text-base sm:text-lg font-extrabold text-slate-900">${escapeHtml(of.name)}</h3>
        <div class="text-xs font-bold text-emerald-700 uppercase">${escapeHtml(of.role)}</div>
        <p class="text-xs sm:text-sm text-slate-600 pt-1">${escapeHtml(of.duty)}</p>
      </div>
      <div class="flex gap-2 pt-2 border-t border-slate-100">
        <a href="tel:${of.phone}"
          class="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 rounded-xl transition">
          📞 Gọi ngay
        </a>
        <a href="https://zalo.me/${of.phone}" target="_blank" rel="noopener"
          class="inline-flex items-center justify-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-bold text-sm px-4 py-2.5 rounded-xl transition">
          💬 Zalo
        </a>
      </div>
    </div>
  `).join('');
}

function renderFeedbackPage() {
  const feedbacks = getFeedbacks();
  const countBadge = document.getElementById('fb-count-badge');
  if (countBadge) countBadge.textContent = `${feedbacks.length} phản ánh`;

  const listEl = document.getElementById('feedback-list');
  if (!listEl) return;

  const adminMode = isAdmin();

  listEl.innerHTML = feedbacks.map(fb => {
    let statusHtml = `<span class="badge badge-info">📥 Đã tiếp nhận</span>`;
    if (fb.status === 'processing') statusHtml = `<span class="badge badge-important">🔧 Đang xử lý</span>`;
    if (fb.status === 'done') statusHtml = `<span class="badge badge-normal">✅ Đã hoàn thành</span>`;

    return `
      <div class="civic-card p-4 sm:p-5 space-y-2.5">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md">${escapeHtml(fb.topic)}</span>
          ${statusHtml}
        </div>
        ${fb.location ? `<div class="text-xs font-semibold text-slate-500">📍 Khu vực: ${escapeHtml(fb.location)}</div>` : ''}
        <p class="text-sm text-slate-800 leading-relaxed">${escapeHtml(fb.content)}</p>
        <div class="text-xs text-slate-500 flex items-center justify-between">
          <span>👤 ${escapeHtml(fb.author || 'Bà con ẩn danh')}</span>
          <span>📅 ${escapeHtml(fb.date)}</span>
        </div>
        ${fb.reply ? `
          <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs sm:text-sm text-emerald-900">
            <strong>🛡️ Ban thôn phản hồi:</strong> ${escapeHtml(fb.reply)}
          </div>
        ` : ''}
        ${adminMode ? `
          <div class="pt-2 border-t border-slate-100 flex flex-wrap gap-2">
            <button onclick="adminUpdateFeedback('${fb.id}', 'processing')" class="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 cursor-pointer">Đang xử lý</button>
            <button onclick="adminUpdateFeedback('${fb.id}', 'done')" class="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 cursor-pointer">Hoàn thành</button>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

// ==========================================================================
// XỬ LÝ FORM PHẢN ÁNH & ĐĂNG KÝ NHẬN TIN
// ==========================================================================
function submitFeedback(e) {
  e.preventDefault();
  const topic = document.getElementById('fb-topic').value;
  const location = document.getElementById('fb-location').value.trim();
  const content = document.getElementById('fb-content').value.trim();
  const name = document.getElementById('fb-name').value.trim();
  const phone = document.getElementById('fb-phone').value.trim();

  if (!content) return;

  const now = new Date();
  const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

  const feedbacks = getFeedbacks();
  feedbacks.unshift({
    id: 'fb-' + Date.now(),
    topic,
    location,
    content,
    author: name ? (phone ? `${name} (${phone})` : name) : 'Bà con ẩn danh',
    date: dateStr,
    status: 'received',
    reply: ''
  });

  localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(feedbacks));
  document.getElementById('feedback-form').reset();
  renderFeedbackPage();
  showToast('Đã gửi phản ánh thành công! Ban thôn sẽ kiểm tra sớm.', '✅');
}

function submitSubscribe(e) {
  e.preventDefault();
  const name = document.getElementById('sub-name').value.trim();
  const phone = document.getElementById('sub-phone').value.trim();
  const group = document.getElementById('sub-group').value;

  if (!name || !phone) return;

  const subs = getSubscribers();
  subs.unshift({
    name,
    phone,
    group,
    date: new Date().toLocaleDateString('vi-VN')
  });
  localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(subs));

  e.target.reset();
  closeModal('modal-subscribe');
  updateAdminUI();
  showToast(`Cảm ơn ${name}! Đã đăng ký nhận thông báo từ Thôn An Sơn.`, '🔔');
}

// ==========================================================================
// BAN QUẢN TRỊ (ADMIN MODE)
// ==========================================================================
function verifyAdminPin() {
  const pin = document.getElementById('admin-pin-input').value.trim();
  if (pin === '1234') {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    document.getElementById('admin-pin-input').value = '';
    updateAdminUI();
    renderFeedbackPage();
    showToast('Đăng nhập Ban Quản Trị thành công!', '🛡️');
  } else {
    showToast('Mã PIN chưa đúng (Mặc định dùng thử: 1234)', '⚠️');
  }
}

function logoutAdmin() {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  updateAdminUI();
  renderFeedbackPage();
  showToast('Đã thoát chế độ Ban Quản Trị.', '👋');
}

function updateAdminUI() {
  const authed = isAdmin();
  const loginPanel = document.getElementById('admin-login-panel');
  const dashPanel = document.getElementById('admin-dashboard-panel');
  const btnText = document.getElementById('admin-btn-text');

  if (loginPanel && dashPanel) {
    loginPanel.classList.toggle('hidden', authed);
    dashPanel.classList.toggle('hidden', !authed);
  }
  if (btnText) {
    btnText.textContent = authed ? 'Quản trị (Đang bật)' : 'Ban quản trị';
  }

  // Render danh sách bà con đăng ký
  const subs = getSubscribers();
  const subCount = document.getElementById('adm-sub-count');
  const subList = document.getElementById('adm-sub-list');
  if (subCount) subCount.textContent = subs.length;
  if (subList) {
    subList.innerHTML = subs.length === 0
      ? '<div class="text-slate-400 italic">Chưa có bà con nào đăng ký mới.</div>'
      : subs.map(s => `<div class="p-2 bg-slate-50 rounded-lg border border-slate-200 flex justify-between"><span><strong>${escapeHtml(s.name)}</strong> (${escapeHtml(s.group)})</span><span class="font-mono">${escapeHtml(s.phone)}</span></div>`).join('');
  }
}

function adminAddNotice(e) {
  e.preventDefault();
  const title = document.getElementById('adm-notice-title').value.trim();
  const level = document.getElementById('adm-notice-level').value;
  const author = document.getElementById('adm-notice-author').value.trim() || 'Ban cán sự thôn';
  const body = document.getElementById('adm-notice-body').value.trim();

  if (!title || !body) return;

  const catMap = {
    urgent: '🚨 Khẩn cấp',
    important: '⚠️ Quan trọng',
    normal: '📢 Sinh hoạt chung'
  };
  const now = new Date();
  const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

  const notices = getNotices();
  notices.unshift({
    id: 'n-' + Date.now(),
    title,
    level,
    categoryLabel: catMap[level] || '📢 Sinh hoạt chung',
    date: dateStr,
    author,
    body
  });
  localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(notices));

  e.target.reset();
  closeModal('modal-admin');
  renderHome();
  renderNoticesPage();
  showToast('Đã đăng thông báo mới lên trang chủ!', '📢');
}

function adminUpdateFeedback(fbId, status) {
  const replyText = prompt('Nhập lời phản hồi ngắn gửi bà con (có thể bỏ trống):') || '';
  const feedbacks = getFeedbacks().map(fb => {
    if (fb.id === fbId) {
      return {
        ...fb,
        status,
        reply: replyText.trim() || fb.reply || (status === 'done' ? 'Ban thôn đã xử lý xong.' : 'Ban thôn đã tiếp nhận và đang xử lý.')
      };
    }
    return fb;
  });
  localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(feedbacks));
  renderFeedbackPage();
  showToast('Đã cập nhật trạng thái phản ánh!', '✅');
}

// ==========================================================================
// MÃ QR & CHIA SẺ
// ==========================================================================
function generateQRCodes() {
  const url = window.location.href;
  const targets = ['qrcode-page-box', 'qrcode-modal-box'];
  targets.forEach(id => {
    const el = document.getElementById(id);
    if (el && typeof QRCode !== 'undefined') {
      el.innerHTML = '';
      new QRCode(el, {
        text: url,
        width: 170,
        height: 170,
        colorDark: '#064e3b',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
    }
  });
}

function copyShareLink() {
  const url = window.location.href;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      showToast('Đã sao chép đường link trang Thôn An Sơn!', '🔗');
    }).catch(() => {
      showToast('Hãy sao chép link trên thanh địa chỉ trình duyệt.', 'ℹ️');
    });
  } else {
    showToast('Hãy sao chép link trên thanh địa chỉ trình duyệt.', 'ℹ️');
  }
}

// ==========================================================================
// MODAL & TIỆN ÍCH CHUNG
// ==========================================================================
function openSubscribeModal() {
  document.getElementById('modal-subscribe')?.classList.remove('hidden');
}

function openQrModal() {
  generateQRCodes();
  document.getElementById('modal-qr')?.classList.remove('hidden');
}

function openAdminModal() {
  updateAdminUI();
  document.getElementById('modal-admin')?.classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id)?.classList.add('hidden');
}

let toastTimer = null;
function showToast(msg, icon = '✅') {
  const toast = document.getElementById('toast');
  const iconEl = document.getElementById('toast-icon');
  const textEl = document.getElementById('toast-text');
  if (!toast) return;

  if (iconEl) iconEl.textContent = icon;
  if (textEl) textEl.textContent = msg;

  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
