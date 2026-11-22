/* ==========================================================================
   THÔN AN SƠN THÔNG MINH - LOGIC ỨNG DỤNG V2.0 (NÂNG CẤP TOÀN DIỆN)
   - PWA Offline-First (Service Worker + Manifest)
   - Lịch Âm Dương Việt Nam (Thuật toán thiên văn Hồ Ngọc Đức)
   - Loa Truyền Thanh Số (Text-to-Speech tiếng Việt)
   - Chợ Quê OCOP An Sơn - Cam Lộ
   - Phản ánh hiện trường kèm ảnh nén Canvas & Theo dõi tiến độ minh bạch
   ========================================================================== */

const STORAGE_KEYS = {
  NOTICES: 'anson_smart_notices_v2',
  EVENTS: 'anson_smart_events_v2',
  FEEDBACKS: 'anson_smart_feedbacks_v2',
  SUBSCRIBERS: 'anson_smart_subscribers_v2',
  FONT_SCALE: 'anson_smart_font_scale_v2',
  ADMIN_AUTH: 'anson_smart_admin_auth_v2'
};

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
    summary: 'Chỉ cần quét mã QR bằng Zalo hoặc mở trên điện thoại, bà con dễ dàng xem thông báo, lịch âm dương, lịch họp, gọi điện cho cán bộ thôn và gửi phản ánh kiến nghị mọi lúc mọi nơi.'
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
    photo: '',
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
    photo: '',
    reply: 'Đã tiếp nhận! Đội thanh niên xung kích sẽ xử lý trong sáng mai 23/11.'
  }
];

const MARKET_DATA = [
  {
    id: 'm1',
    icon: '🌿',
    tag: 'OCOP Cam Lộ',
    name: 'Cao Chè Vằng An Sơn nguyên chất',
    price: '120.000đ / hộp 500g',
    seller: 'Hộ cô Mai (Đội 1)',
    phone: '0912345611',
    desc: 'Nấu từ lá chè vằng sẻ vùng đồi Cam Lộ, giúp mát gan, lợi sữa, ngủ ngon.'
  },
  {
    id: 'm2',
    icon: '🌶️',
    tag: 'Đặc sản địa phương',
    name: 'Hồ Tiêu đen phơi nắng tự nhiên',
    price: '165.000đ / kg',
    seller: 'Vườn chú Tư (Đội 2)',
    phone: '0912345612',
    desc: 'Hạt chắc, cay thơm nồng, thu hái thủ công không chất bảo quản.'
  },
  {
    id: 'm3',
    icon: '🍯',
    tag: 'Nông sản sạch',
    name: 'Mật ong hoa rừng Cam Lộ',
    price: '250.000đ / chai 750ml',
    seller: 'Anh Bình (Đội 3)',
    phone: '0912345613',
    desc: 'Mật ong nguyên chất khai thác theo mùa, đặc sánh, thơm dịu.'
  },
  {
    id: 'm4',
    icon: '🐔',
    tag: 'Thực phẩm tươi',
    name: 'Gà đồi thả vườn An Sơn',
    price: '135.000đ / kg',
    seller: 'Trang trại chị Hạnh (Đội 4)',
    phone: '0912345614',
    desc: 'Gà nuôi thả tự nhiên ăn ngô lúa, thịt săn chắc, nhận làm sạch giao tận nhà.'
  },
  {
    id: 'm5',
    icon: '🥬',
    tag: 'Rau an toàn',
    name: 'Rau xanh theo mùa (Cải, Mồng tơi, Đậu)',
    price: '15.000đ - 25.000đ / kg',
    seller: 'Tổ hợp tác Rau Đội 3',
    phone: '0912345615',
    desc: 'Cắt sáng sớm mỗi ngày, tưới nước giếng sạch, không thuốc kích thích.'
  },
  {
    id: 'm6',
    icon: '🍄',
    tag: 'Nông sản sạch',
    name: 'Nấm bào ngư xám tươi',
    price: '55.000đ / kg',
    seller: 'Trại nấm anh Dũng (Đội 2)',
    phone: '0912345616',
    desc: 'Thu hái mỗi ngày, giòn ngọt tự nhiên, phù hợp xào hoặc nấu canh.'
  }
];

let currentNoticeFilter = 'all';
let currentSpeakingId = null;
let pendingFeedbackPhoto = '';
let deferredInstallPrompt = null;
let fontScaleIndex = 0;
const FONT_MODES = [
  { cls: '', label: 'Cỡ chữ: Vừa' },
  { cls: 'font-large', label: 'Cỡ chữ: To' },
  { cls: 'font-xlarge', label: 'Cỡ chữ: Rất to' }
];

// ==========================================================================
// KHỞI TẠO ỨNG DỤNG & SERVICE WORKER
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  registerServiceWorker();
  setupNetworkListeners();
  setupPWAInstallPrompt();
  initDateAndLunarDisplay();
  initFontScale();
  initStorageDefaults();
  renderAll();
  generateQRCodes();
  updateAdminUI();
});

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

function setupNetworkListeners() {
  const banner = document.getElementById('offline-banner');
  const syncStatus = () => {
    if (banner) banner.classList.toggle('hidden', navigator.onLine);
  };
  window.addEventListener('online', () => {
    syncStatus();
    showToast('Đã kết nối lại Internet!', '🌐');
  });
  window.addEventListener('offline', syncStatus);
  syncStatus();
}

function setupPWAInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const btn = document.getElementById('btn-install-pwa');
    if (btn) btn.classList.remove('hidden');
  });
}

async function installPWA() {
  if (!deferredInstallPrompt) {
    navigateTo('utilities');
    showToast('Xem hướng dẫn cài đặt ở mục Tiện ích!', '📲');
    return;
  }
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  document.getElementById('btn-install-pwa')?.classList.add('hidden');
}

// ==========================================================================
// THUẬT TOÁN ÂM LỊCH VIỆT NAM (TS. HỒ NGỌC ĐỨC)
// ==========================================================================
const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

function jdFromDate(dd, mm, yy) {
  const a = Math.floor((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  if (jd < 2299161) {
    jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  }
  return jd;
}

function getNewMoonDay(k, timeZone) {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 -= 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 -= 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 += 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 -= 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
  C1 -= 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 += 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  const deltat = (T < -11)
    ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
    : -0.000278 + 0.000265 * T + 0.000262 * T2;
  return Math.floor(Jd1 + C1 - deltat + 0.5 + timeZone / 24);
}

function getSunLongitude(jdn, timeZone) {
  const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;
  const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
  let L = (L0 + DL) * dr;
  L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2));
  return Math.floor((L / Math.PI) * 6);
}

function getLunarMonth11(yy, timeZone) {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = Math.floor(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  if (getSunLongitude(nm, timeZone) >= 9) nm = getNewMoonDay(k - 1, timeZone);
  return nm;
}

function getLeapMonthOffset(a11, timeZone) {
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0, i = 1;
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc !== last && i < 14);
  return i - 1;
}

function convertSolar2Lunar(dd, mm, yy, timeZone = 7) {
  const dayNumber = jdFromDate(dd, mm, yy);
  const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) monthStart = getNewMoonDay(k, timeZone);
  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear;
  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }
  const lunarDay = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);
  let lunarLeap = 0;
  let lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) lunarLeap = 1;
    }
  }
  if (lunarMonth > 12) lunarMonth -= 12;
  if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
  return { day: lunarDay, month: lunarMonth, year: lunarYear, leap: lunarLeap };
}

function initDateAndLunarDisplay() {
  const now = new Date();
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const dayName = days[now.getDay()];
  const dd = now.getDate();
  const mm = now.getMonth() + 1;
  const yyyy = now.getFullYear();

  const dateEl = document.getElementById('current-date-text');
  if (dateEl) {
    dateEl.textContent = `${dayName}, ${String(dd).padStart(2, '0')}/${String(mm).padStart(2, '0')}/${yyyy}`;
  }

  const lunar = convertSolar2Lunar(dd, mm, yyyy, 7);
  const canChiYear = `${CAN[(lunar.year + 6) % 10]} ${CHI[(lunar.year + 8) % 12]}`;
  const lunarEl = document.getElementById('current-lunar-text');
  if (lunarEl) {
    lunarEl.textContent = `Âm lịch: ${lunar.day}/${lunar.month}${lunar.leap ? ' (Nhuận)' : ''} • Năm ${canChiYear}`;
  }
}

// ==========================================================================
// DỮ LIỆU LOCAL STORAGE
// ==========================================================================
function initStorageDefaults() {
  if (!localStorage.getItem(STORAGE_KEYS.NOTICES)) {
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(DEFAULT_NOTICES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(DEFAULT_EVENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FEEDBACKS)) {
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(DEFAULT_FEEDBACKS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS)) {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify([]));
  }
}

function getNotices() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTICES)) || DEFAULT_NOTICES; } catch { return DEFAULT_NOTICES; }
}
function getEvents() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS)) || DEFAULT_EVENTS; } catch { return DEFAULT_EVENTS; }
}
function getFeedbacks() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACKS)) || DEFAULT_FEEDBACKS; } catch { return DEFAULT_FEEDBACKS; }
}
function getSubscribers() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS)) || []; } catch { return []; }
}
function isAdmin() {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
}

// ==========================================================================
// ĐIỀU HƯỚNG & MENU DI ĐỘNG
// ==========================================================================
function navigateTo(viewName) {
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));
  const target = document.getElementById(`view-${viewName}`);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-nav') === viewName);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openMobileMenu() {
  document.getElementById('modal-mobile-menu')?.classList.remove('hidden');
}

// ==========================================================================
// CỠ CHỮ CHO NGƯỜI LỚN TUỔI
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
// NGHE ĐỌC TIẾNG VIỆT (TÁCH SẠCH KHỎI INLINE STRING ĐỂ TRÁNH LỖI)
// ==========================================================================
function speakById(type, id, btnElement) {
  let text = '';
  if (type === 'notice') {
    const item = getNotices().find(n => n.id === id);
    if (item) text = `${item.title}. ${item.body}`;
  } else if (type === 'news') {
    const item = DEFAULT_NEWS.find(n => n.id === id);
    if (item) text = `${item.title}. ${item.summary}`;
  }
  if (!text) return;
  runSpeech(`${type}-${id}`, text, btnElement, '🔊 Nghe đọc');
}

function speakDailyBulletin(btnElement) {
  const notices = getNotices().slice(0, 3);
  if (notices.length === 0) {
    showToast('Hiện chưa có thông báo mới để đọc.', '📻');
    return;
  }
  const intro = 'Bản tin truyền thanh số Thôn An Sơn, xã Cam Lộ. ';
  const body = notices.map((n, idx) => `Tin thứ ${idx + 1}: ${n.title}. ${n.body}`).join(' ');
  runSpeech('daily-bulletin', intro + body, btnElement, '🔊 Nghe bản tin hôm nay');
}

function runSpeech(key, text, btnElement, defaultLabel) {
  if (!('speechSynthesis' in window)) {
    showToast('Trình duyệt này chưa hỗ trợ đọc giọng nói.', '⚠️');
    return;
  }
  if (currentSpeakingId === key && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    resetSpeakButtons();
    return;
  }

  window.speechSynthesis.cancel();
  resetSpeakButtons();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'vi-VN';
  utterance.rate = 0.95;

  currentSpeakingId = key;
  if (btnElement) {
    btnElement.dataset.defaultLabel = defaultLabel;
    btnElement.classList.add('speaking-active');
    btnElement.textContent = '⏹️ Dừng đọc';
  }

  utterance.onend = () => resetSpeakButtons();
  utterance.onerror = () => resetSpeakButtons();
  window.speechSynthesis.speak(utterance);
}

function resetSpeakButtons() {
  currentSpeakingId = null;
  document.querySelectorAll('.btn-speak').forEach(btn => {
    btn.classList.remove('speaking-active');
    btn.textContent = btn.dataset.defaultLabel || '🔊 Nghe đọc';
  });
}

// ==========================================================================
// RENDER TẤT CẢ CÁC PHÂN HỆ
// ==========================================================================
function renderAll() {
  renderHome();
  renderNoticesPage();
  renderNewsPage();
  renderCalendarPage();
  renderOfficialsPage();
  renderFeedbackPage();
  renderMarketPage();
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
    badge.textContent = notices.length;
    badge.classList.toggle('hidden', notices.length === 0);
  }

  const latestBox = document.getElementById('home-latest-notices');
  if (latestBox) {
    latestBox.innerHTML = notices.slice(0, 2).map(n => `
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
          <button onclick="speakById('notice', '${escapeHtml(n.id)}', this)"
            class="btn-speak text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition cursor-pointer">
            🔊 Nghe đọc
          </button>
        </div>
      </article>
    `).join('');
  }

  const evBox = document.getElementById('home-upcoming-events');
  if (evBox) {
    evBox.innerHTML = getEvents().slice(0, 3).map(ev => `
      <div class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
        <div class="w-12 h-12 rounded-xl bg-emerald-600 text-white flex flex-col items-center justify-center shrink-0 leading-tight">
          <span class="text-base font-extrabold">${escapeHtml(ev.day)}</span>
          <span class="text-[10px] uppercase font-semibold opacity-90">${escapeHtml(ev.month)}</span>
        </div>
        <div class="min-w-0">
          <div class="text-sm font-bold text-slate-900 truncate">${escapeHtml(ev.title)}</div>
          <div class="text-xs text-slate-500 truncate">⏰ ${escapeHtml(ev.time)} • 📍 ${escapeHtml(ev.location)}</div>
        </div>
      </div>
    `).join('');
  }

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
        <button onclick="speakById('notice', '${escapeHtml(n.id)}', this)"
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
        <button onclick="speakById('news', '${escapeHtml(item.id)}', this)"
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
  el.innerHTML = getEvents().map(ev => `
    <div class="civic-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-start sm:items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex flex-col items-center justify-center shrink-0 shadow-xs">
          <span class="text-xl font-extrabold leading-none">${escapeHtml(ev.day)}</span>
          <span class="text-[11px] font-semibold uppercase mt-0.5">${escapeHtml(ev.month)}</span>
        </div>
        <div class="space-y-1">
          <h3 class="text-base font-extrabold text-slate-900">${escapeHtml(ev.title)}</h3>
          <div class="text-xs sm:text-sm text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
            <span>⏰ <strong>${escapeHtml(ev.time)}</strong></span>
            <span>📍 ${escapeHtml(ev.location)}</span>
          </div>
          <div class="text-xs text-emerald-700 font-semibold">👥 ${escapeHtml(ev.audience || 'Toàn thể bà con')}</div>
        </div>
      </div>
      <button onclick="saveEventReminder('${escapeHtml(ev.id)}')"
        class="shrink-0 px-4 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-bold transition cursor-pointer">
        🔔 Nhắc tôi
      </button>
    </div>
  `).join('');
}

function saveEventReminder(evId) {
  const ev = getEvents().find(e => e.id === evId);
  if (!ev) return;
  showToast(`Đã lưu nhắc lịch: ${ev.title} (${ev.day} ${ev.month})`, '📅');
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
        ${fb.photo ? `<img src="${fb.photo}" alt="Ảnh hiện trường" class="max-h-44 rounded-xl border border-slate-200 object-cover" />` : ''}
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
          <div class="pt-2 border-t border-slate-100 flex justify-end">
            <button onclick="openReplyModal('${escapeHtml(fb.id)}')" class="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer">
              ✏️ Cập nhật & Trả lời
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

function renderMarketPage() {
  const el = document.getElementById('market-list');
  if (!el) return;
  el.innerHTML = MARKET_DATA.map(item => `
    <div class="civic-card civic-card-hover p-5 flex flex-col justify-between gap-3">
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-3xl">${item.icon}</span>
          <span class="badge badge-important">${escapeHtml(item.tag)}</span>
        </div>
        <h3 class="text-base font-extrabold text-slate-900">${escapeHtml(item.name)}</h3>
        <div class="text-sm font-extrabold text-emerald-700">${escapeHtml(item.price)}</div>
        <p class="text-xs sm:text-sm text-slate-600">${escapeHtml(item.desc)}</p>
        <div class="text-xs font-semibold text-slate-500">🏡 ${escapeHtml(item.seller)}</div>
      </div>
      <div class="flex gap-2 pt-2 border-t border-slate-100">
        <a href="tel:${item.phone}" class="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl transition">
          📞 Gọi đặt mua
        </a>
        <a href="https://zalo.me/${item.phone}" target="_blank" rel="noopener" class="px-3.5 py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-bold text-xs sm:text-sm rounded-xl transition">
          💬 Zalo
        </a>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// NÉN ẢNH PHẢN ÁNH HIỆN TRƯỜNG & GỬI FORM
// ==========================================================================
function handleFeedbackPhoto(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const maxW = 640;
      const scale = Math.min(1, maxW / img.width);
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      pendingFeedbackPhoto = canvas.toDataURL('image/jpeg', 0.72);
      const preview = document.getElementById('fb-photo-preview');
      const box = document.getElementById('fb-photo-preview-box');
      if (preview && box) {
        preview.src = pendingFeedbackPhoto;
        box.classList.remove('hidden');
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function clearFeedbackPhoto() {
  pendingFeedbackPhoto = '';
  const input = document.getElementById('fb-photo');
  if (input) input.value = '';
  document.getElementById('fb-photo-preview-box')?.classList.add('hidden');
}

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
    photo: pendingFeedbackPhoto,
    author: name ? (phone ? `${name} (${phone})` : name) : 'Bà con ẩn danh',
    date: dateStr,
    status: 'received',
    reply: ''
  });

  try {
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(feedbacks));
  } catch {
    // Nếu bộ nhớ đầy do nhiều ảnh, bỏ ảnh của phản ánh mới để vẫn lưu được nội dung
    feedbacks[0].photo = '';
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(feedbacks));
  }

  document.getElementById('feedback-form').reset();
  clearFeedbackPhoto();
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
  subs.unshift({ name, phone, group, date: new Date().toLocaleDateString('vi-VN') });
  localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(subs));

  e.target.reset();
  closeModal('modal-subscribe');
  updateAdminUI();
  showToast(`Cảm ơn ${name}! Đã đăng ký nhận thông báo từ Thôn An Sơn.`, '🔔');
}

// ==========================================================================
// BAN QUẢN TRỊ & SAO LƯU DỮ LIỆU
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
  if (btnText) btnText.textContent = authed ? 'Quản trị (Đang bật)' : 'Ban quản trị';

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

  const catMap = { urgent: '🚨 Khẩn cấp', important: '⚠️ Quan trọng', normal: '📢 Sinh hoạt chung' };
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

function adminAddEvent(e) {
  e.preventDefault();
  const title = document.getElementById('adm-ev-title').value.trim();
  const day = document.getElementById('adm-ev-day').value.trim();
  const month = document.getElementById('adm-ev-month').value.trim();
  const time = document.getElementById('adm-ev-time').value.trim();
  const location = document.getElementById('adm-ev-location').value.trim();
  if (!title || !day || !month) return;

  const events = getEvents();
  events.unshift({
    id: 'ev-' + Date.now(),
    day,
    month,
    time,
    title,
    location,
    audience: 'Bà con nhân dân Thôn An Sơn'
  });
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));

  e.target.reset();
  closeModal('modal-admin');
  renderHome();
  renderCalendarPage();
  showToast('Đã thêm sự kiện mới vào Lịch thôn!', '📅');
}

function openReplyModal(fbId) {
  const fb = getFeedbacks().find(f => f.id === fbId);
  if (!fb) return;
  document.getElementById('reply-fb-id').value = fbId;
  document.getElementById('reply-fb-status').value = fb.status || 'processing';
  document.getElementById('reply-fb-text').value = fb.reply || '';
  document.getElementById('modal-reply-fb')?.classList.remove('hidden');
}

function submitAdminReply(e) {
  e.preventDefault();
  const fbId = document.getElementById('reply-fb-id').value;
  const status = document.getElementById('reply-fb-status').value;
  const replyText = document.getElementById('reply-fb-text').value.trim();

  const feedbacks = getFeedbacks().map(fb => {
    if (fb.id === fbId) {
      return {
        ...fb,
        status,
        reply: replyText || fb.reply || (status === 'done' ? 'Ban thôn đã xử lý xong.' : 'Ban thôn đang kiểm tra xử lý.')
      };
    }
    return fb;
  });
  localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(feedbacks));
  closeModal('modal-reply-fb');
  renderFeedbackPage();
  showToast('Đã cập nhật trạng thái phản ánh!', '✅');
}

function exportBackupData() {
  const data = {
    exportedAt: new Date().toISOString(),
    notices: getNotices(),
    events: getEvents(),
    feedbacks: getFeedbacks(),
    subscribers: getSubscribers()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `thon-an-son-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  showToast('Đã tải file sao lưu dữ liệu!', '💾');
}

function resetDemoData() {
  localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(DEFAULT_NOTICES));
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(DEFAULT_EVENTS));
  localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(DEFAULT_FEEDBACKS));
  renderAll();
  showToast('Đã khôi phục dữ liệu mẫu ban đầu.', '🔄');
}

// ==========================================================================
// MÃ QR, MODAL & TIỆN ÍCH
// ==========================================================================
function generateQRCodes() {
  const url = window.location.href;
  ['qrcode-page-box', 'qrcode-modal-box'].forEach(id => {
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
    }).catch(() => showToast('Hãy sao chép link trên thanh địa chỉ trình duyệt.', 'ℹ️'));
  } else {
    showToast('Hãy sao chép link trên thanh địa chỉ trình duyệt.', 'ℹ️');
  }
}

function openSubscribeModal() { document.getElementById('modal-subscribe')?.classList.remove('hidden'); }
function openQrModal() { generateQRCodes(); document.getElementById('modal-qr')?.classList.remove('hidden'); }
function openAdminModal() { updateAdminUI(); document.getElementById('modal-admin')?.classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id)?.classList.add('hidden'); }

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
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
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
