// Buildings, districts and plots. Each building is unlocked by exactly one mission (see missions.js).
// `color` is the default index into COLORS (art/BuildingArt.jsx); `sign` is drawn on the building.

const s = (en, vi, ko) => ({ en, vi, ko });

export const BUILDINGS = [
  { id: 'home', cat: 'home', mission: 'm-home', color: 0,
    name: s('Little Home', 'Ngôi nhà nhỏ', '작은 집'),
    learn: s('Family, home and daily routines', 'Gia đình, ngôi nhà và sinh hoạt hằng ngày', '가족, 집, 하루 일과') },
  { id: 'bakery', cat: 'shop', mission: 'm-bakery', color: 1,
    name: s('Bakery', 'Tiệm bánh', '빵집'),
    learn: s('Food words and polite requests', 'Từ về đồ ăn và lời đề nghị lịch sự', '음식 단어와 공손한 부탁') },
  { id: 'cafe', cat: 'shop', mission: 'm-cafe', color: 2,
    name: s('Café', 'Quán cà phê', '카페'),
    learn: s('Food and drink words and ordering politely', 'Từ về đồ ăn, thức uống và cách gọi món lịch sự', '음식·음료 단어와 공손하게 주문하기') },
  { id: 'library', cat: 'learn', mission: 'm-library', color: 4,
    name: s('Library', 'Thư viện', '도서관'),
    learn: s('Reading stories and caring for shared books', 'Đọc truyện và giữ gìn sách chung', '이야기 읽기와 함께 쓰는 책 아끼기') },
  { id: 'park', cat: 'green', mission: 'm-park', color: 1,
    name: s('Park', 'Công viên', '공원'),
    learn: s('Caring for shared spaces and sorting trash', 'Giữ gìn không gian chung và phân loại rác', '함께 쓰는 공간 돌보기와 분리배출') },
  { id: 'toyshop', cat: 'shop', mission: 'm-toy', color: 3,
    name: s('Toy Shop', 'Cửa hàng đồ chơi', '장난감 가게'),
    learn: s('Sharing, taking turns and friendship', 'Chia sẻ, chơi lần lượt và tình bạn', '나누기, 차례 지키기, 우정') },
  { id: 'center', cat: 'community', mission: 'm-center', color: 0,
    name: s('Community Center', 'Nhà cộng đồng', '주민 센터'),
    learn: s('Feelings words and kind, supportive answers', 'Từ về cảm xúc và lời nói ân cần', '감정 단어와 다정한 말') },
  { id: 'hospital', cat: 'community', mission: 'm-hospital', color: 5,
    name: s('Hospital', 'Bệnh viện', '병원'),
    learn: s('Community helpers and asking for help', 'Những người giúp đỡ cộng đồng và cách nhờ giúp đỡ', '마을의 도우미와 도움 청하기') },
  { id: 'police', cat: 'community', mission: 'm-police', color: 2,
    name: s('Police Station', 'Đồn cảnh sát', '경찰서'),
    learn: s('Personal safety and trusted grown-ups', 'An toàn cá nhân và người lớn đáng tin cậy', '개인 안전과 믿을 수 있는 어른') },
  { id: 'plaza', cat: 'culture', mission: 'm-tet', color: 1,
    name: s('Festival Plaza', 'Quảng trường Lễ hội', '축제 광장'),
    learn: s('Tết traditions and New Year wishes', 'Phong tục ngày Tết và lời chúc năm mới', '뗏(베트남 설) 풍습과 새해 인사') },
  { id: 'culture', cat: 'culture', mission: 'm-chuseok', color: 5,
    name: s('Culture House', 'Nhà Văn hóa', '문화의 집'),
    learn: s('Chuseok traditions and saying thank you', 'Phong tục Chuseok và lời cảm ơn', '추석 풍습과 감사 표현') },
];

export const BUILDINGS_BY_ID = Object.fromEntries(BUILDINGS.map((b) => [b.id, b]));
export const TOTAL_BUILDINGS = BUILDINGS.length;

// 4 x 3 grid of plots. Districts only suggest where a building fits; children may build anywhere.
const DISTRICT = [
  ['learn', 'learn', 'culture', 'culture'],
  ['home', 'home', 'community', 'community'],
  ['shop', 'shop', 'green', 'green'],
];
export const PLOTS = DISTRICT.flatMap((row, j) => row.map((district, i) => ({ id: `p${j * 4 + i}`, i, j, district })));
export const PLOTS_BY_ID = Object.fromEntries(PLOTS.map((p) => [p.id, p]));

export const DECOS = [
  { id: 'none', needs: 0 },
  { id: 'flowers', needs: 0 },
  { id: 'flag', needs: 1 },   // unlocked after practising in the building once
  { id: 'lights', needs: 2 }, // ... twice
];
