/* Nội dung trang “Hành trình Nhịn ăn”: bản đồng hành khi thực hành chương trình nhịn ăn 1 ngày.
   Chỉ lấy từ tài liệu của chương trình (thư mục ref/): tin nhắn tuần chuẩn bị, bộ ảnh hướng dẫn Ngày 1,
   bộ ảnh về insulin và tài liệu lý thuyết. Chỗ nào tài liệu chưa nói thì ghi “tài liệu chưa nói”, không tự bổ sung.
   Sửa chữ ở đây, không cần đụng tới app.js. */
window.NA = {};

/* ---------- Khi nhịn: ba nguồn năng lượng (tài liệu lý thuyết, mục III) ---------- */
NA.SOURCES3 = [
  { n: 1, c: 'f2', t: 'Đường dự trữ (glycogen)', w: 'khoảng 12–24 giờ đầu',
    d: 'Glucose cất dưới dạng glycogen trong gan (và một phần trong cơ), nguồn dễ lấy nhất. Vì thế ngày đầu nhịn bạn vẫn thấy rất ổn. Vận động càng mạnh thì càng nhanh cạn.' },
  { n: 2, c: 'f3', t: 'Mỡ dự trữ', w: 'khi đường dự trữ gần cạn',
    d: 'Mỡ tách thành glycerol (gan biến thành đường mới) và axit béo (gan, thận, tim, cơ dùng trực tiếp). Mỡ quanh bụng, eo giảm dần. Axit amin từ tế bào già, hỏng cũng được tái chế: đó là tự thực.' },
  { n: 3, c: 'f4', t: 'Thể ketone', w: 'từ ngày thứ 2 hay 3',
    d: 'Gan làm thể ketone từ axit béo, cơ thể vào trạng thái ketosis. Bước chuyển giống một cánh cửa, đôi khi khó qua: tài liệu gọi là “khủng hoảng axit” hay “khủng hoảng thải độc”, với nhiều hiện tượng khó chịu.' }
];

/* Chặng cơ thể theo số giờ kể từ khi ăn xong bữa cuối. Mốc 12, 24 giờ và “ngày thứ 2 hay 3” lấy từ tài liệu. */
NA.PHASES = [
  { id: 'p1', from: 0, to: 12, c: 'f2', name: 'Dùng đường dự trữ',
    body: 'Cơ thể ngừng nhận thức ăn từ bên ngoài và tự nuôi mình từ bên trong. Nguồn đầu tiên là glycogen trong gan, nguồn dễ lấy nhất.',
    feel: 'Ngày đầu nhịn bạn thường vẫn thấy rất ổn.' },
  { id: 'p2', from: 12, to: 24, c: 'f2', name: 'Đường dự trữ vơi dần',
    body: 'Glycogen nuôi cơ thể khoảng 12 đến 24 tiếng; vận động càng mạnh càng nhanh cạn. Khi kho này gần cạn, cơ thể thích nghi lần nữa và chuyển sang dùng mỡ.',
    feel: 'Ngày đầu nhịn bạn thường vẫn thấy rất ổn.' },
  { id: 'p3', from: 24, to: 48, c: 'f3', name: 'Dùng mỡ dự trữ',
    body: 'Mỡ dưới da và quanh nội tạng thành nguồn năng lượng. Gan tạo đường mới từ glycerol và axit amin; tế bào già, hỏng được tái chế (tự thực). Từ ngày thứ 2 hay 3, gan bắt đầu làm thể ketone.',
    feel: 'Bước chuyển sang thể ketone có thể khó chịu (“khủng hoảng thải độc”).' },
  { id: 'p4', from: 48, to: Infinity, c: 'f4', name: 'Thể ketone',
    body: 'Cơ thể đốt mỡ để lấy năng lượng, gan làm thể ketone. Ba nguồn năng lượng lần lượt bảo đảm hầu hết nhu cầu của cơ thể, miễn là có đủ nước.',
    feel: 'Đoạn chuyển giao có thể kèm nhiều hiện tượng khó chịu.' }
];

/* Mốc hiện trên lịch (giờ kể từ khi bắt đầu nhịn) */
NA.MILESTONES = [
  { h: 12, t: 'Mốc 12 giờ', d: 'Gan đang dùng đường dự trữ (glycogen), đủ cho khoảng 12–24 giờ đầu. Ngày đầu nhịn bạn thường vẫn thấy ổn.' },
  { h: 24, t: 'Mốc 24 giờ: chuyển sang mỡ', d: 'Đường dự trữ gần cạn, cơ thể dùng mỡ. Từ ngày thứ 2 hay 3 gan bắt đầu làm thể ketone; bước chuyển này có thể khó chịu.' },
  { h: 48, t: 'Mốc 48 giờ: thể ketone', d: 'Có thể gặp “khủng hoảng thải độc”. Khó chịu thì xem Hộp hỗ trợ; có biểu hiện lạ thì báo người hướng dẫn.' }
];

/* Những việc lặp lại mỗi ngày nhịn. at: giờ cố định, hoặc tên bữa quen (sang/trua/toi) */
NA.ROUTINE = [
  { at: 'sang', type: 'do', t: 'Giờ ăn sáng quen thuộc', d: 'Uống nước. Làm việc nhẹ nhàng mình thích.' },
  { at: '10:00', type: 'drink', t: 'Uống nước', d: 'Uống nước trắng đều, đủ nước cho cơ thể. Bấm +1 cốc ở phần Theo dõi.' },
  { at: 'trua', type: 'do', t: 'Giờ cơm trưa', d: 'Tránh bếp và mùi thức ăn; đừng ngồi nhìn mọi người ăn. Đọc sách, xem phim hay.' },
  { at: '15:00', type: 'drink', t: 'Uống nước', d: 'Khó chịu trong người: xem Hộp hỗ trợ.' },
  { at: 'toi', type: 'do', t: 'Giờ cơm tối', d: 'Nhờ người khác nấu; tránh mùi thức ăn, đừng ngồi nhìn mọi người ăn.' },
  { at: '21:00', type: 'do', t: 'Ghi lại cảm nhận', d: 'Hôm nay cơ thể và tâm trí ra sao? Ghi vào phần Theo dõi.' }
];

/* Việc nên làm suốt những giờ nhịn (tin nhắn tuần chuẩn bị, tài liệu lý thuyết) */
NA.DURING = [
  { ico: 'drop', t: 'Uống nước trắng', d: 'Cơ thể sống được nhờ dự trữ, miễn là có đủ nước.' },
  { ico: 'pot', t: 'Tránh bếp, tránh giờ cơm', d: 'Nhờ người nấu thay; đừng chống cằm ngồi nhìn mọi người ăn.' },
  { ico: 'book', t: 'Việc nhẹ nhàng mình thích', d: 'Sách, phim hay: “thức ăn tinh thần” đã chuẩn bị sẵn.' },
  { ico: 'heart', t: 'Lắng nghe cơ thể', d: 'Có câu hỏi hay biểu hiện lạ trên cơ thể: liên lạc người hướng dẫn.' }
];

/* ---------- Ngày 1: ngày giảm ăn ---------- */
NA.DAY1 = {
  goal: 'Cung cấp cho cơ thể đủ dinh dưỡng, đồng thời giảm lượng thực phẩm đưa vào: cực kỳ ưu tiên chất lượng hơn số lượng. Chỉ ăn các bữa chính như bạn quen (3, 2 hay 1 bữa), tuyệt đối không ăn vặt giữa các bữa.',
  rules: [
    { ico: 'drop', t: 'Uống 1,5–2 lít nước trắng', d: 'Đếm cốc ở phần Theo dõi trong lịch của bạn.' },
    { ico: 'carrot', t: 'Ăn rau củ sống', d: 'Nếu không quen, có thể hấp sơ qua, còn độ giòn.' },
    { ico: 'clock', t: 'Ăn chậm rãi, nhai kỹ', d: 'Lắng nghe cơ thể, dừng lại khi cảm thấy đủ no.' },
    { ico: 'x', t: 'Không ăn vặt, không đồ chiên rán', d: 'Chất béo duy nhất: dầu thực vật ép lạnh chất lượng tốt.' }
  ]
};

/* Thực đơn theo bữa: groups là các nhóm được ăn (khoá trong NA.GROUPS) */
NA.MENUS = {
  sang: { t: 'Bữa sáng', img: 'm_sang', alt: 'Minh hoạ bữa sáng: yến mạch với táo và hạt, sinh tố xanh, khoai lang nghiền',
    lead: 'Được ăn: ngũ cốc nguyên hạt, trái cây, rau củ, các loại hạt khô, các loại khoai.',
    eat: 'Ngũ cốc nguyên hạt (kể cả bột mì nguyên cám), trái cây, rau củ, hạt khô, khoai. Có thể dùng nước hầm gà.',
    groups: ['ngucoc', 'traicay', 'rau', 'hat', 'khoai'],
    notes: [
      'Rưới dầu ép lạnh giàu omega-3 lên rau củ (dầu mè, sacha inchi ép lạnh).',
      'Muốn ăn sáng đồ ngọt: làm sinh tố, hoặc món khoai nghiền trộn với các loại hạt.',
      'Có thể dùng nước hầm gà: uống, trộn sốt rau củ, salad, hoặc cho chung vào sinh tố.'
    ] },
  trua: { t: 'Bữa trưa', img: 'm_trua', alt: 'Minh hoạ bữa trưa: cơm, rau củ hấp, salad và chén nước hầm gà',
    lead: 'Tương tự buổi sáng nhưng bỏ bột mì nguyên cám khỏi thực đơn.',
    eat: 'Như bữa sáng nhưng bỏ bột mì nguyên cám. Có thể dùng nước hầm gà.',
    groups: ['ngucoc', 'traicay', 'rau', 'hat', 'khoai'], except: 'Bỏ bột mì nguyên cám',
    notes: ['Vẫn dùng được nước hầm gà.', 'Rưới dầu ép lạnh lên rau củ.'] },
  toi: { t: 'Bữa tối', img: 'm_toi', alt: 'Minh hoạ bữa tối nhẹ: salad, rau củ hấp và vài lát trái cây',
    lead: 'Chỉ được phép ăn: rau củ chín và/hoặc sống kèm dầu ép lạnh giàu omega-3; trái cây (bỏ chuối và các loại nhiều đường).',
    eat: 'Chỉ rau củ (chín hoặc sống) kèm dầu ép lạnh, và trái cây ít ngọt.',
    groups: ['rau', 'traicay'],
    notes: ['Không dùng nước hầm gà nữa.', 'Không ngũ cốc, không khoai, không hạt.'] }
};

/* ---------- Nhóm thực phẩm ---------- */
NA.GROUPS = {
  ngucoc: { n: 'Ngũ cốc nguyên hạt', ok: 1, ico: 'grain', img: 'f_ngucoc', items: 'Bột mì nguyên cám, cơm trắng, tam giác mạch, yến mạch, diêm mạch (quinoa)' },
  traicay: { n: 'Trái cây', ok: 1, ico: 'apple', img: 'f_traicay', items: 'Hầu hết các loại, trừ quả quá ngọt, nhiều đường: chuối, nho, sầu riêng, mít…' },
  rau: { n: 'Rau củ', ok: 1, ico: 'carrot', img: 'f_rau', items: 'Chín hoặc sống. Ưu tiên rau sạch, rõ nguồn gốc, màu xanh hoặc sắc màu sặc sỡ.' },
  hat: { n: 'Các loại hạt khô', ok: 1, ico: 'nut', img: 'f_hat', items: 'Hạt óc chó, hạnh nhân, hạt điều, hạt bí, hạt mè' },
  khoai: { n: 'Các loại khoai', ok: 1, ico: 'potato', img: 'f_khoai', items: 'Khoai tây, khoai lang, khoai mì (sắn)' },
  dauep: { n: 'Dầu ép lạnh', ok: 1, ico: 'oil', items: 'Dầu thực vật ép lạnh chất lượng tốt, rưới lên rau củ' },
  nuoc: { n: 'Nước và nước hầm', ok: 1, ico: 'drop', items: 'Nước trắng; nước hầm gà bữa sáng và trưa Ngày 1' },
  ngot: { n: 'Trái cây quá ngọt', ok: 0, ico: 'apple', items: 'Chuối, nho, sầu riêng, mít và các loại quả nhiều đường' },
  sua: { n: 'Sản phẩm từ sữa', ok: 0, ico: 'milk', img: 's_sua', items: 'Sữa (bò, dê, cừu), sữa chua, phô mai, kem, bơ' },
  dam: { n: 'Đạm động vật', ok: 0, ico: 'fish', img: 's_dam', items: 'Thịt, cá và hải sản, trứng' },
  khac: { n: 'Nấm, rau mầm, mỡ, sô cô la', ok: 0, ico: 'mushroom', img: 's_khac', items: 'Nấm các loại, rau mầm, chất béo đun nóng (mỡ heo, mỡ động vật, dầu thực vật đun nóng…), sô cô la' },
  uong: { n: 'Đồ uống', ok: 0, ico: 'coffee', img: 's_uong', items: 'Rượu, bia, thức uống có cồn; cà phê; các loại trà; soda, nước ngọt đóng chai; nước trái cây (tươi hay công nghiệp)' },
  tinhbot: { n: 'Ngũ cốc và tinh bột', ok: 0, ico: 'bread', img: 's_tinhbot', items: 'Ngô; các sản phẩm từ bột mì trắng tinh (bánh mì, mì ống, pizza…)' },
  dau: { n: 'Đậu và sản phẩm từ đậu', ok: 0, ico: 'bean', img: 's_dau', items: 'Lạc (đậu phộng); đậu nành và sản phẩm (đậu hũ, sữa đậu nành, tàu hũ ky, chao); đậu đỗ (đậu lăng, đậu gà, đậu xanh, đen, trắng, lima)' },
  giavi: { n: 'Gia vị', ok: 0, ico: 'chili', img: 's_giavi', items: 'Tiêu, ớt' },
  duong: { n: 'Đường và chất ngọt', ok: 0, ico: 'sugar', img: 's_duong', items: 'Tất cả các loại đường (kể cả đường toàn nguyên), chất tạo ngọt, mật ong' }
};
NA.ALLOWED = ['ngucoc', 'traicay', 'rau', 'hat', 'khoai'];
NA.STOPPED = ['sua', 'dam', 'khac', 'uong', 'tinhbot', 'dau', 'giavi', 'duong'];

/* ---------- Tra cứu “Món này ăn được không?” (Ngày 1)
   [tên, từ khoá (không dấu), nhóm, sáng/trưa/tối (Y = được, N = không, ? = chưa rõ), ghi chú,
    nguồn: c = có trong tài liệu, s = suy ra từ nhóm trong tài liệu, q = tài liệu không nói] */
NA.FOODS = [
  ['Cơm trắng', 'com, gao trang, com trang, gao', 'ngucoc', 'YYN', 'Ngũ cốc chỉ ăn sáng và trưa; bữa tối chỉ rau củ và trái cây.', 'c'],
  ['Gạo lứt', 'gao lut, com gao lut, brown rice', 'ngucoc', 'YYN', 'Gạo còn nguyên cám, cùng nhóm ngũ cốc nguyên hạt.', 's'],
  ['Cháo trắng', 'chao, chao trang, chao gao', 'ngucoc', 'YYN', 'Gạo nấu với nước, không thịt, không trứng.', 's'],
  ['Yến mạch', 'yen mach, oat, oats, avoine, oatmeal', 'ngucoc', 'YYN', '', 'c'],
  ['Tam giác mạch', 'tam giac mach, kieu mach, buckwheat, sarrasin', 'ngucoc', 'YYN', '', 'c'],
  ['Diêm mạch (quinoa)', 'diem mach, quinoa', 'ngucoc', 'YYN', '', 'c'],
  ['Bột mì nguyên cám, bánh mì nguyên cám', 'bot mi nguyen cam, banh mi nguyen cam, banh mi den, whole wheat', 'ngucoc', 'YNN', 'Chỉ bữa sáng. Bữa trưa bỏ bột mì nguyên cám.', 'c'],
  ['Bún, phở, hủ tiếu', 'bun, pho, banh pho, hu tieu, mien, banh canh', 'ngucoc', '???', 'Tài liệu không nhắc tới. Không chắc thì chọn cơm hoặc khoai, hoặc hỏi người hướng dẫn.', 'q'],

  ['Táo', 'tao, apple', 'traicay', 'YYY', '', 'c'],
  ['Ổi', 'oi, guava', 'traicay', 'YYY', '', 'c'],
  ['Cam, quýt', 'cam, quyt, orange', 'traicay', 'YYY', 'Ăn cả múi. Nước trái cây (kể cả vắt tươi) thuộc nhóm đồ uống phải ngừng.', 'c'],
  ['Lựu', 'luu, pomegranate', 'traicay', 'YYY', '', 'c'],
  ['Bưởi', 'buoi, pomelo', 'traicay', 'YYY', '', 's'],
  ['Lê', 'le, pear', 'traicay', 'YYY', '', 's'],
  ['Kiwi', 'kiwi', 'traicay', 'YYY', '', 's'],
  ['Dâu tây, việt quất', 'dau tay, viet quat, berry, blueberry, strawberry', 'traicay', 'YYY', '', 's'],
  ['Thanh long', 'thanh long, dragon fruit', 'traicay', 'YYY', '', 's'],
  ['Chanh', 'chanh, lemon, lime', 'traicay', 'YYY', '', 's'],
  ['Dưa hấu', 'dua hau, watermelon', 'traicay', '???', 'Tài liệu không nhắc tới. Không chắc thì hỏi người hướng dẫn.', 'q'],
  ['Quả bơ', 'qua bo, trai bo, avocado', 'traicay', '???', 'Tài liệu không nhắc tới. Khác với “bơ” làm từ sữa (butter) phải ngừng.', 'q'],

  ['Chuối', 'chuoi, banana', 'ngot', 'NNN', 'Quả quá ngọt, nhiều đường.', 'c'],
  ['Nho', 'nho, grape', 'ngot', 'NNN', 'Quả quá ngọt, nhiều đường.', 'c'],
  ['Sầu riêng', 'sau rieng, durian', 'ngot', 'NNN', 'Quả quá ngọt, nhiều đường.', 'c'],
  ['Mít', 'mit, jackfruit', 'ngot', 'NNN', 'Quả quá ngọt, nhiều đường.', 'c'],
  ['Xoài chín', 'xoai, mango', 'ngot', 'NNN', 'Rất ngọt, thuộc nhóm “quả quá ngọt”.', 's'],
  ['Nhãn, vải, chôm chôm', 'nhan, vai, chom chom, longan, lychee, rambutan', 'ngot', 'NNN', 'Rất ngọt, thuộc nhóm “quả quá ngọt”.', 's'],
  ['Hồng xiêm, na', 'hong xiem, sapoche, sapodilla, na, mang cau', 'ngot', 'NNN', 'Rất ngọt, thuộc nhóm “quả quá ngọt”.', 's'],
  ['Trái cây sấy, ô mai, mứt', 'trai cay say, hoa qua say, nho kho, o mai, mut, dried fruit', 'ngot', 'NNN', 'Đường đã cô đặc.', 's'],

  ['Rau xanh các loại', 'rau, rau xanh, rau cai, rau muong, cai, rau ma, rau ngot', 'rau', 'YYY', 'Ưu tiên rau sạch, rõ nguồn gốc. Ăn sống; không quen thì hấp sơ còn giòn.', 'c'],
  ['Bông cải xanh', 'bong cai, sup lo, broccoli', 'rau', 'YYY', '', 'c'],
  ['Bắp cải, xà lách', 'bap cai, xa lach, cabbage, lettuce, salad', 'rau', 'YYY', '', 'c'],
  ['Dưa leo', 'dua leo, dua chuot, cucumber', 'rau', 'YYY', '', 'c'],
  ['Cần tây, măng tây', 'can tay, mang tay, celery, asparagus', 'rau', 'YYY', '', 'c'],
  ['Đậu que', 'dau que, dau cove, green bean', 'rau', 'YYY', 'Ăn như rau; khác với nhóm đậu đỗ (hạt đậu) phải ngừng.', 'c'],
  ['Mướp đắng (khổ qua)', 'muop dang, kho qua, bitter melon', 'rau', 'YYY', '', 'c'],
  ['Bí ngòi, bí xanh, bí đỏ', 'bi ngoi, bi xanh, bi dao, bi do, zucchini, pumpkin', 'rau', 'YYY', '', 's'],
  ['Cà rốt, củ cải, củ dền', 'ca rot, cu cai, cu den, carrot, radish, beetroot', 'rau', 'YYY', '', 's'],
  ['Cà chua', 'ca chua, tomato', 'rau', 'YYY', '', 's'],
  ['Ớt chuông', 'ot chuong, bell pepper, ot ngot', 'rau', 'YYY', 'Không cay; khác với ớt trong nhóm gia vị phải ngừng.', 's'],
  ['Hành, tỏi, gừng', 'hanh, toi, gung, hanh tay, hanh la, garlic, ginger, onion', 'rau', 'YYY', 'Tài liệu chỉ ghi ngừng hai gia vị: tiêu và ớt.', 's'],

  ['Hạt óc chó', 'oc cho, hat oc cho, walnut', 'hat', 'YYN', 'Bữa tối không ăn hạt.', 'c'],
  ['Hạnh nhân', 'hanh nhan, almond', 'hat', 'YYN', 'Bữa tối không ăn hạt.', 'c'],
  ['Hạt điều', 'hat dieu, dieu, cashew', 'hat', 'YYN', 'Bữa tối không ăn hạt.', 'c'],
  ['Hạt bí', 'hat bi, pumpkin seed', 'hat', 'YYN', 'Bữa tối không ăn hạt.', 'c'],
  ['Hạt mè (vừng)', 'hat me, me, vung, sesame', 'hat', 'YYN', 'Bữa tối không ăn hạt.', 'c'],
  ['Hạt chia, hạt lanh', 'chia, hat chia, lanh, hat lanh, flax', 'hat', 'YYN', 'Bữa tối không ăn hạt.', 's'],

  ['Khoai tây', 'khoai tay, potato', 'khoai', 'YYN', 'Bữa tối không ăn khoai.', 'c'],
  ['Khoai lang', 'khoai lang, khoai lang tim, sweet potato', 'khoai', 'YYN', 'Bữa tối không ăn khoai.', 'c'],
  ['Khoai mì (sắn)', 'khoai mi, san, cassava', 'khoai', 'YYN', 'Bữa tối không ăn khoai.', 'c'],
  ['Khoai môn, khoai sọ', 'khoai mon, khoai so, taro', 'khoai', 'YYN', 'Bữa tối không ăn khoai.', 's'],

  ['Dầu mè ép lạnh', 'dau me, dau vung, sesame oil', 'dauep', 'YYY', 'Rưới lên rau củ. Dầu đã đun nóng thì phải ngừng.', 'c'],
  ['Dầu sacha inchi ép lạnh', 'sacha inchi, dau sacha', 'dauep', 'YYY', 'Rưới lên rau củ. Dầu đã đun nóng thì phải ngừng.', 'c'],
  ['Dầu ô liu ép lạnh (extra virgin)', 'dau oliu, dau o liu, olive oil', 'dauep', 'YYY', 'Thuộc nhóm “dầu thực vật ép lạnh chất lượng tốt”.', 's'],

  ['Nước trắng', 'nuoc, nuoc loc, nuoc trang, nuoc am, water', 'nuoc', 'YYY', 'Ngày 1 uống 1,5–2 lít.', 'c'],
  ['Nước hầm xương gà', 'nuoc ham, nuoc ham ga, nuoc ham xuong, bone broth, nuoc dung', 'nuoc', 'YYN', 'Sáng và trưa Ngày 1: uống, trộn sốt rau củ, salad hoặc cho vào sinh tố. Bữa tối không dùng. Khi nhịn: chỉ khi cần hỗ trợ khẩn cấp.', 'c'],
  ['Sinh tố (smoothie)', 'sinh to, smoothie', 'nuoc', 'YY?', 'Tài liệu gợi ý cho bữa sáng. Xay từ rau củ, trái cây được ăn; không đường, không sữa. Bữa tối tài liệu chỉ ghi rau củ và trái cây.', 'c'],

  ['Cà phê', 'ca phe, cafe, coffee', 'uong', 'NNN', '', 'c'],
  ['Trà các loại', 'tra, che, tra sua, tra thao moc, tra gung, tea', 'uong', 'NNN', 'Ngoại lệ: trà xanh khi tụt huyết áp nặng (Hộp hỗ trợ).', 'c'],
  ['Trà xanh', 'tra xanh, che xanh, green tea', 'uong', 'NNN', 'Không uống thường ngày; chỉ dùng khi tụt huyết áp nặng.', 'c'],
  ['Nước ép trái cây', 'nuoc ep, nuoc trai cay, nuoc cam, juice', 'uong', 'NNN', 'Kể cả nước ép tươi.', 'c'],
  ['Nước dừa', 'nuoc dua, coconut water', 'uong', 'NNN', 'Gần với nhóm nước trái cây phải ngừng.', 's'],
  ['Soda, nước ngọt đóng chai', 'soda, nuoc ngot, coca, pepsi, nuoc co ga, tra chai', 'uong', 'NNN', '', 'c'],
  ['Rượu, bia', 'ruou, bia, beer, wine, con, do uong co con', 'uong', 'NNN', '', 'c'],

  ['Sữa (bò, dê, cừu)', 'sua, sua bo, sua de, sua tuoi, milk', 'sua', 'NNN', '', 'c'],
  ['Sữa chua', 'sua chua, yogurt, yaourt', 'sua', 'NNN', '', 'c'],
  ['Phô mai', 'pho mai, cheese', 'sua', 'NNN', '', 'c'],
  ['Kem', 'kem, ice cream, whipping cream', 'sua', 'NNN', '', 'c'],
  ['Bơ (butter)', 'bo, butter, bo dong vat, bo lat', 'sua', 'NNN', 'Bơ làm từ sữa. Quả bơ (avocado) là chuyện khác: gõ “quả bơ”.', 'c'],
  ['Siro, sữa đặc', 'siro, sua dac', 'duong', 'NNN', 'Đường và sữa.', 's'],

  ['Thịt (heo, bò, gà…)', 'thit, thit heo, thit lon, thit bo, thit ga, pork, beef, chicken, xuc xich, cha', 'dam', 'NNN', 'Nước hầm gà là ngoại lệ trong bữa sáng, trưa Ngày 1.', 'c'],
  ['Cá', 'ca, fish, ca hoi, salmon', 'dam', 'NNN', '', 'c'],
  ['Tôm, cua, mực, hải sản', 'tom, cua, muc, hai san, oc, ngheu, seafood', 'dam', 'NNN', '', 'c'],
  ['Trứng', 'trung, egg, trung ga, trung vit', 'dam', 'NNN', '', 'c'],
  ['Nước mắm, mắm', 'nuoc mam, mam, fish sauce', 'dam', 'NNN', 'Làm từ cá.', 's'],

  ['Nấm các loại', 'nam, mushroom, nam rom, nam huong', 'khac', 'NNN', '', 'c'],
  ['Rau mầm, giá đỗ', 'rau mam, gia, gia do, sprout', 'khac', 'NNN', 'Giá đỗ cũng là một loại rau mầm.', 'c'],
  ['Đồ chiên rán, xào', 'chien, ran, xao, do chien, fried', 'khac', 'NNN', 'Chất béo đun nóng phải ngừng; chỉ dùng dầu ép lạnh rưới lên rau.', 'c'],
  ['Mỡ heo, mỡ động vật', 'mo, mo heo, mo lon, lard', 'khac', 'NNN', '', 'c'],
  ['Dầu ăn đun nóng', 'dau an, dau chien, dau dau nanh, dau huong duong', 'khac', 'NNN', 'Dầu dùng để chiên, xào.', 'c'],
  ['Sô cô la', 'so co la, socola, chocolate, cacao', 'khac', 'NNN', '', 'c'],

  ['Ngô (bắp)', 'ngo, bap, corn', 'tinhbot', 'NNN', '', 'c'],
  ['Bánh mì trắng', 'banh mi, banh mi trang, bread, banh bao', 'tinhbot', 'NNN', 'Làm từ bột mì trắng tinh.', 'c'],
  ['Mì ống, mì Ý, pizza', 'mi ong, mi y, spaghetti, pasta, pizza, nui', 'tinhbot', 'NNN', 'Làm từ bột mì trắng tinh.', 'c'],
  ['Mì gói', 'mi goi, mi tom, mi an lien, instant noodle', 'tinhbot', 'NNN', 'Bột mì trắng, thường đã chiên.', 's'],
  ['Bánh quy, bánh ngọt', 'banh quy, banh ngot, banh kem, cookie, cake, snack', 'tinhbot', 'NNN', 'Bột mì trắng và đường.', 's'],

  ['Lạc (đậu phộng)', 'lac, dau phong, peanut', 'dau', 'NNN', 'Thuộc nhóm đậu, không phải hạt khô.', 'c'],
  ['Đậu hũ', 'dau hu, dau phu, tofu', 'dau', 'NNN', '', 'c'],
  ['Đậu nành, sữa đậu nành', 'dau nanh, sua dau nanh, soy, soy milk', 'dau', 'NNN', '', 'c'],
  ['Tàu hũ ky, chao', 'tau hu ky, chao', 'dau', 'NNN', '', 'c'],
  ['Đậu lăng, đậu gà', 'dau lang, dau ga, lentil, chickpea', 'dau', 'NNN', '', 'c'],
  ['Đậu xanh, đậu đen, đậu trắng, đậu lima', 'dau xanh, dau den, dau trang, lima, che dau', 'dau', 'NNN', '', 'c'],
  ['Đậu đỏ', 'dau do, red bean', 'dau', 'NNN', '', 's'],
  ['Nước tương (xì dầu)', 'nuoc tuong, xi dau, soy sauce', 'dau', 'NNN', 'Làm từ đậu nành.', 's'],

  ['Tiêu', 'tieu, pepper', 'giavi', 'NNN', '', 'c'],
  ['Ớt cay', 'ot, ot cay, chili', 'giavi', 'NNN', '', 'c'],

  ['Đường (kể cả đường toàn nguyên)', 'duong, sugar, duong mia, duong phen, duong nau', 'duong', 'NNN', '', 'c'],
  ['Chất tạo ngọt', 'chat tao ngot, stevia, duong an kieng, sweetener', 'duong', 'NNN', '', 'c'],
  ['Mật ong', 'mat ong, honey', 'duong', 'NNN', '', 'c'],

  ['Muối', 'muoi, salt, muoi bien', 'nuoc', '???', 'Tài liệu không ghi muối vào danh sách ngừng; muối biển có trong đồ chuẩn bị (ngậm chút xíu khi tụt huyết áp).', 'q']
];
NA.POPULAR = ['cà phê', 'chuối', 'trứng', 'đậu hũ', 'cơm', 'khoai lang', 'sữa chua', 'nước hầm'];

/* ---------- Tuần chuẩn bị (tin nhắn của chương trình) ---------- */
NA.PREP = [
  { g: 'Tâm trí', items: [
    { id: 'why', t: 'Tự hỏi: Tại sao mình quyết định thực hiện thử thách này?' },
    { id: 'mean', t: 'Đâu là ý nghĩa của quyết định nhịn ăn ở thời điểm này?' },
    { id: 'read', t: 'Đọc kỹ tài liệu lý thuyết về nhịn ăn' }
  ] },
  { g: 'Gia đình và công việc', items: [
    { id: 'tell', t: 'Báo kế hoạch cho gia đình, bạn bè, đồng nghiệp ở gần (những người có thể bị ảnh hưởng trực tiếp)' },
    { id: 'cook', t: 'Nhờ người nấu thay nếu bạn là người đứng bếp, để mùi thức ăn không “trêu ngươi”' },
    { id: 'meal', t: 'Sắp xếp để giờ ăn không phải chống cằm ngồi nhìn mọi người ăn' },
    { id: 'work', t: 'Thu xếp công việc để không bị quá tải trong khi tham gia' },
    { id: 'fun', t: 'Chuẩn bị việc nhẹ nhàng yêu thích: sách, phim hay, “thức ăn tinh thần”' }
  ] },
  { g: 'Đồ cần có', id: 'do-can-co', items: [
    { id: 'veg', t: 'Rau củ quả tươi, dầu ép lạnh, hột hạt cho bữa ăn Ngày 1', must: 1 },
    { id: 'broth', t: 'Nước hầm xương và thịt gà (cách nấu ở bên cạnh)' },
    { id: 'mg', t: 'Magie: viên nén, dạng nước (magnésium marin), hoặc bột / viên nhộng magie bisglycinate' },
    { id: 'tea', t: 'Trà xanh để hãm uống, khi tụt huyết áp nặng' },
    { id: 'salt', t: 'Muối biển, ngậm chút xíu nếu tụt huyết áp mà không chịu được trà xanh' },
    { id: 'mint', t: 'Tinh dầu bạc hà, khi khó chịu, đau đầu' },
    { id: 'kit', t: 'Bộ dụng cụ thụt tháo đại tràng và vitamin C bột (kiềm hoặc acid nguyên chất): dùng theo hướng dẫn của người hướng dẫn' }
  ] }
];

NA.BROTH = {
  ing: ['Xương và thịt gà', 'Hành tây', 'Cà rốt', 'Củ cải', 'Cần tây', 'Giấm táo'],
  how: 'Nấu chậm, lửa nhỏ trong 6–8 tiếng.',
  use: [
    'Bữa sáng và trưa Ngày 1: uống, hoặc trộn sốt rau củ, salad, hoặc cho chung vào sinh tố.',
    'Bữa tối Ngày 1: không dùng nữa.',
    'Trong lúc nhịn: có sẵn để dùng khi cần hỗ trợ khẩn cấp, tuỳ tình trạng sức khoẻ.'
  ]
};

/* Ai không nên nhịn (tài liệu lý thuyết, mục V) */
NA.NOT_FOR = [
  'Phụ nữ đang mang bầu hoặc cho con bú',
  'Trẻ em dưới 18 tuổi',
  'Người suy dinh dưỡng, quá nhẹ cân',
  'Người mắc một số bệnh liên quan tới suy giảm thần kinh, hay một số loại ung thư'
];

/* ---------- Hộp hỗ trợ: đồ chuẩn bị nào dùng khi nào (danh sách đồ cần chuẩn bị của chương trình) ---------- */
NA.TOOLBOX = [
  { id: 'dau-dau', n: 'Đau đầu', tips: ['Magie', 'Tinh dầu bạc hà'] },
  { id: 'moi-co', n: 'Nhức mỏi cơ, chuột rút', tips: ['Magie'] },
  { id: 'mat-ngu', n: 'Mất ngủ', tips: ['Magie'] },
  { id: 'huyet-ap', n: 'Tụt huyết áp', tips: ['Trà xanh hãm uống, khi tụt huyết áp nặng', 'Không chịu được trà xanh: ngậm chút xíu muối biển'] },
  { id: 'kho-chiu', n: 'Khó chịu trong người', tips: ['Tinh dầu bạc hà', 'Nước hầm gà, khi cần hỗ trợ khẩn cấp'] },
  { id: 'doi', n: 'Đói, thèm ăn', tips: ['Tránh bếp, tránh mùi thức ăn; đừng ngồi nhìn mọi người ăn', 'Làm việc nhẹ nhàng mình thích: sách, phim hay', 'Đọc lại lý do bạn nhịn lần này', 'Nước hầm gà, khi cần hỗ trợ khẩn cấp'] },
  { id: 'lo-lang', n: 'Lo lắng, muốn bỏ cuộc', tips: ['Trí óc sợ điều nó chưa từng biết; hãy trấn an nó rằng mọi chuyện sẽ ổn', 'Đọc lại lý do bạn nhịn lần này', 'Nhắn người hướng dẫn'] }
];

/* ---------- Phá nhịn ---------- */
NA.BREAK = {
  t: 'Phá nhịn',
  d: 'Tài liệu hiện có chưa nói ăn lại thế nào: hỏi người hướng dẫn. Điều tài liệu dặn cho mọi bữa ăn: ăn chậm, nhai kỹ, dừng khi vừa đủ no.'
};
NA.KEEP = [
  'Không ăn vặt giữa các bữa: cho hệ tiêu hoá được nghỉ',
  'Nhai kỹ, khi ăn chỉ ăn',
  'Nhiều rau củ quả; quen dần với đồ ăn “nhẹ bụng hơn”',
  'Nhịn định kỳ: hiệu quả hơn nhịn một lần, giúp kết nối lại với cảm giác đói và no'
];

/* ---------- Hiểu thêm: tóm tắt tài liệu lý thuyết và bộ ảnh insulin ---------- */
NA.INSULIN = {
  jobs: [
    '<b>Vận chuyển glucose vào tế bào</b> để tạo năng lượng; nhờ vậy đường huyết trở về mức bình thường.',
    '<b>Dự trữ năng lượng dư thừa</b> theo hai cách: chuyển glucose dư thành glycogen cất trong gan, và chuyển glucose thành mỡ dự trữ dưới da.'
  ],
  cycle: [
    'Ăn thực phẩm có chỉ số đường huyết cao → đường huyết tăng → insulin tăng.',
    'Ăn thường xuyên → cơ thể không sử dụng năng lượng dự trữ.'
  ],
  harm: 'tăng nguy cơ béo phì, tiểu đường type 2; phát triển tình trạng kháng insulin.',
  gain: '“reset” và cải thiện chu trình sản xuất insulin; ổn định và thúc đẩy quá trình trao đổi chất, hấp thu của cơ thể.',
  know: [
    'Ăn vặt giữa các bữa khiến hệ tiêu hoá không được nghỉ chút nào, phải làm việc thường trực.',
    'Nhiều mỡ vùng bụng có thể là dấu hiệu insulin trong máu luôn cao. Mỡ nội tạng mới là thứ không tốt cho sức khoẻ.'
  ]
};
NA.LEARN = [
  { q: 'Nhịn ăn có trái tự nhiên không?', a: [
    'Tài liệu trả lời là không: chính việc ăn uống suốt ngày mới là điều không bình thường. Lịch sử loài người luôn gắn với những giai đoạn thiếu, đói; cơ chế dự trữ mỡ để dùng khi cần đã được ghi vào gen.',
    'Ngày nay ta ăn ba bữa, thêm bữa xế, ăn vặt lai rai, có khi cả ban đêm; nhịn ăn chỉ còn xảy ra khi ngủ. Cơ thể vẫn mang sẵn những “lập trình” để thích ứng khi vắng thức ăn, chỉ cần được đánh thức dần.'
  ] },
  { q: 'Nhịn để làm gì?', a: [
    'Trước hết là cho cơ thể được nghỉ: không phải tiêu tốn năng lượng cho việc tiêu hoá. Theo tài liệu, cơ thể dùng phần năng lượng này để đào thải độc tố tích tụ, dọn những tế bào già cỗi và tự tái tạo.',
    'Nhịn còn giúp lập lại mối quan hệ lành mạnh với thức ăn: phân biệt cái đói thật với ăn theo thói quen, ăn vì buồn chán hay vì đến giờ.'
  ] },
  { q: 'Leptin, hormone báo no', a: [
    'Leptin tiết ra chủ yếu từ tế bào mỡ, báo cho não rằng ta đã no. Theo tài liệu, khi insulin cao kéo dài thì lâu dần sinh ra kháng leptin: não tin là chưa no, ta lại ăn, và thường thèm snack ngọt hay mặn chứ không phải đĩa rau.',
    'Não chỉ nhận được tín hiệu no khoảng 20 phút sau khi bắt đầu bữa ăn, nên ăn nhanh thì dễ ăn quá nhiều.'
  ] },
  { q: 'Tự thực (autophagy) là gì?', a: [
    'Là cách tế bào tự dọn dẹp: phân huỷ, tái chế các thành phần cũ, hư hại thành nguyên liệu mới, như đội vệ sinh đi qua từng con đường của một thành phố.',
    'Tự thực được kích hoạt khi cơ thể không được cung cấp thực phẩm liên tục. Nhịn ăn là cách hiệu quả nhất; tập thể dục cường độ cao, ngủ đủ giấc cũng hỗ trợ. Tài liệu khuyên tìm sự cân bằng giữa lúc nhịn và lúc ăn, giữa dọn dẹp và hoạt động.'
  ] }
];
NA.WHY_EAT = ['Ăn theo thói quen', 'Ăn vì buồn chán', 'Ăn vì đến giờ ăn', 'Ăn để lấp khoảng trống', 'Ăn vì buồn phiền', 'Ăn vì sợ lát nữa sẽ đói', 'Ăn cho sạch đĩa'];

/* Lời nhắc trong lúc ăn chậm (đồng hồ 20 phút), theo mục “Nhai kỹ” của tài liệu */
NA.SLOW = [
  'Khi ăn, chỉ ăn: không tivi, không điện thoại, không sách báo.',
  'Miếng này có hương thơm, mùi vị, kết cấu ra sao?',
  'Nhai tới khi thức ăn nhão, thành nước rồi mới nuốt.',
  'Vị của nó hôm nay có khác mọi khi không?',
  'Cơ thể bạn đang cảm thấy thế nào?',
  'Lắng nghe cơ thể: đã thấy đủ no chưa?'
];

/* ---------- Theo dõi: nước và cảm nhận ---------- */
NA.CUP_ML = 250;
NA.FEEL = [
  { id: 'on', n: 'Ổn' },
  { id: 'doi', n: 'Đói' },
  { id: 'dau-dau', n: 'Đau đầu' },
  { id: 'moi-co', n: 'Mỏi cơ, chuột rút' },
  { id: 'mat-ngu', n: 'Mất ngủ' },
  { id: 'huyet-ap', n: 'Chóng mặt, tụt huyết áp' },
  { id: 'kho-chiu', n: 'Khó chịu' },
  { id: 'lo-lang', n: 'Lo lắng' }
];
