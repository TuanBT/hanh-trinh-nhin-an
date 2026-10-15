/* Nội dung trang “Hành trình Nhịn ăn”.
   Phần lớn lấy từ tài liệu của chương trình (thư mục ref/); chỗ nào là kiến thức bổ sung thì ghi rõ và có nguồn.
   Sửa chữ ở đây, không cần đụng tới app.js. */
window.NA = {};

/* ---------- Nguồn: số nhỏ trên trang dẫn về đây, đánh số theo thứ tự trong mảng ---------- */
NA.SOURCES = [
  { id: 'ct_lythuyet', t: 'Tài liệu lý thuyết về nhịn ăn (handout của chương trình): lịch sử nhịn ăn, insulin, leptin, ba nguồn năng lượng khi nhịn, tự thực, nhai kỹ, lợi ích, hỏi đáp.' },
  { id: 'ct_ngay1', t: 'Hướng dẫn Ngày 1 của chương trình “Nhịn ăn 1 ngày mùa thu”: lưu ý chung, thực phẩm được ăn theo từng bữa, thực phẩm cần ngừng; tin nhắn về nước hầm gà và việc không ăn vặt.' },
  { id: 'ct_chuanbi', t: 'Tin nhắn tuần chuẩn bị của chương trình: kế hoạch cá nhân, câu hỏi tự đặt cho mình, danh sách đồ cần chuẩn bị.' },
  { id: 'ct_insulin', t: 'Bộ ảnh “Những điều bạn cần biết về hormone insulin” của chương trình.' },
  { id: 'buchinger2013', t: 'Wilhelmi de Toledo F. và cs. Fasting therapy – an expert panel update of the 2002 consensus guidelines. Forschende Komplementärmedizin 2013;20(6):434–443.', u: 'https://karger.com/fok/article/20/6/434/356679/Fasting-Therapy-an-Expert-Panel-Update-of-the-2002' },
  { id: 'buchinger2019', t: 'Wilhelmi de Toledo F. và cs. Safety, health improvement and well-being during a 4 to 21-day fasting period in an observational study including 1422 subjects. PLoS ONE 2019;14(1):e0209353.', u: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0209353' },
  { id: 'anton2018', t: 'Anton S.D. và cs. Flipping the metabolic switch: understanding and applying the health benefits of fasting. Obesity 2018;26(2):254–268.', u: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5783752/' },
  { id: 'cahill2006', t: 'Cahill G.F. Jr. Fuel metabolism in starvation. Annual Review of Nutrition 2006;26:1–22.', u: 'https://pubmed.ncbi.nlm.nih.gov/16848698/' },
  { id: 'insulin', t: 'StatPearls. Biochemistry, Insulin Metabolic Effects. NCBI Bookshelf NBK525983.', u: 'https://www.ncbi.nlm.nih.gov/books/NBK525983/' },
  { id: 'zhang1994', t: 'Zhang Y. và cs. Positional cloning of the mouse obese gene and its human homologue. Nature 1994;372:425–432 (công trình tìm ra leptin, hormone do tế bào mỡ tiết ra).', u: 'https://pubmed.ncbi.nlm.nih.gov/7984236/' },
  { id: 'nobel2016', t: 'Nobel Assembly at Karolinska Institutet. Giải Nobel Sinh lý học hoặc Y học 2016: Yoshinori Ohsumi, “for his discoveries of mechanisms for autophagy”. Thông cáo báo chí.', u: 'https://www.nobelprize.org/prizes/medicine/2016/press-release/' },
  { id: 'bagherniya2018', t: 'Bagherniya M. và cs. The effect of fasting or calorie restriction on autophagy induction: A review of the literature. Ageing Research Reviews 2018;47:183–197.', u: 'https://pubmed.ncbi.nlm.nih.gov/30172870/' },
  { id: 'decabo2019', t: 'de Cabo R., Mattson M.P. Effects of intermittent fasting on health, aging, and disease. New England Journal of Medicine 2019;381:2541–2551.', u: 'https://www.nejm.org/doi/full/10.1056/NEJMra1905136' },
  { id: 'andrade2008', t: 'Andrade A.M., Greene G.W., Melanson K.J. Eating slowly led to decreases in energy intake within meals in healthy women. Journal of the American Dietetic Association 2008;108(7):1186–1191.', u: 'https://pubmed.ncbi.nlm.nih.gov/18589027/' },
  { id: 'grajower2019', t: 'Grajower M.M., Horne B.D. Clinical management of intermittent fasting in patients with diabetes mellitus. Nutrients 2019;11(4):873.', u: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6521152/' },
  { id: 'refeed', t: 'StatPearls. Refeeding Syndrome. NCBI Bookshelf NBK564513.', u: 'https://www.ncbi.nlm.nih.gov/books/NBK564513/' },
  { id: 'sacha', t: 'Gutiérrez L.F., Rosada L.M., Jiménez Á. Chemical composition of Sacha Inchi (Plukenetia volubilis L.) seeds and characteristics of their lipid fraction. Grasas y Aceites 2011;62(1):76–83.', u: 'https://grasasyaceites.revistas.csic.es/index.php/grasasyaceites/article/view/1301' }
];

/* ---------- Các chương (thẻ ảnh ở đầu trang) ---------- */
NA.CHAPTERS = [
  { id: 'chuan-bi', n: 'Phần 1', t: 'Chuẩn bị', img: 'c_prep' },
  { id: 'giam-an', n: 'Phần 2', t: 'Ngày giảm ăn', img: 'c_day1' },
  { id: 'khi-nhin', n: 'Phần 3', t: 'Cơ thể khi nhịn', img: 'c_fast' },
  { id: 'an-lai', n: 'Phần 4', t: 'Ăn lại', img: 'c_refeed' },
  { id: 'insulin', n: 'Phần 5', t: 'Insulin và leptin', img: 'c_insulin' },
  { id: 'tu-thuc', n: 'Phần 6', t: 'Tự thực', img: 'c_autophagy' },
  { id: 'nhai-ky', n: 'Phần 7', t: 'Nhai kỹ', img: 'c_chew' },
  { id: 'loi-ich', n: 'Phần 8', t: 'Lợi ích và an toàn', img: 'c_benefit' },
  { id: 'lich-su', n: 'Phần 9', t: 'Lịch sử', img: 'c_history' }
];

/* ---------- Giai đoạn cơ thể khi nhịn, theo số giờ kể từ bữa cuối ---------- */
NA.PHASES = [
  { id: 'p0', from: 0, to: 4, fuel: 'f1', name: 'Tiêu hoá bữa cuối',
    body: 'Đường từ bữa ăn đi vào máu. Tuỵ tiết insulin để đưa glucose vào tế bào làm năng lượng; phần dư được cất thành glycogen trong gan và cơ.',
    feel: ['No, ấm người', 'Có thể buồn ngủ'],
    todo: ['Đi dạo nhẹ 10–15 phút', 'Uống nước khi khát', 'Nếu là buổi tối: ngủ sớm'], s: 'ct_lythuyet,insulin' },
  { id: 'p1', from: 4, to: 12, fuel: 'f2', name: 'Insulin hạ, gan mở kho glycogen',
    body: 'Đường huyết về mức nền, insulin giảm. Đó là tín hiệu để cơ thể bắt đầu dùng dự trữ: gan phân giải glycogen thành glucose để giữ đường huyết ổn định.',
    feel: ['Thường đang ngủ', 'Sáng dậy có thể đói nhẹ đúng giờ ăn quen'],
    todo: ['Thức dậy: một cốc nước ấm', 'Ngủ đủ giấc'], s: 'ct_lythuyet,anton2018' },
  { id: 'p2', from: 12, to: 24, fuel: 'f2', name: 'Glycogen vơi dần, bắt đầu chuyển sang mỡ',
    body: 'Glycogen trong gan nuôi cơ thể khoảng 12–24 giờ; vận động càng mạnh thì càng nhanh cạn. Khi kho này vơi, cơ thể huy động mỡ: axit béo nuôi tim, cơ, thận; glycerol được gan biến thành đường mới.',
    feel: ['Đói từng cơn vào giờ ăn quen, rồi qua', 'Lạnh tay chân', 'Hơi uể oải'],
    todo: ['Uống nước khi cơn đói tới', 'Vận động nhẹ, không tập nặng', 'Tránh bếp và giờ cơm của người khác'], s: 'ct_lythuyet,anton2018,cahill2006' },
  { id: 'p3', from: 24, to: 48, fuel: 'f3', name: 'Đốt mỡ là chính, tự thực tăng dần',
    body: 'Mỡ dưới da và quanh nội tạng thành nguồn năng lượng chính. Gan tạo đường mới từ glycerol và axit amin; một phần axit amin đến từ việc tái chế thành phần tế bào cũ, hỏng (tự thực).',
    feel: ['Cơn đói có thể rõ hơn', 'Đau đầu nhẹ', 'Chóng mặt khi đứng dậy nhanh', 'Khó tập trung'],
    todo: ['Đứng dậy từ từ', 'Nghỉ ngơi xen vận động nhẹ', 'Uống khoảng 2–3 lít nước, chia nhiều lần', 'Khó chịu: mở Hộp hỗ trợ'], s: 'ct_lythuyet,cahill2006,buchinger2013' },
  { id: 'p4', from: 48, to: 72, fuel: 'f4', name: 'Bước qua “cánh cửa” ketone',
    body: 'Từ ngày thứ 2–3, gan làm ra thể ketone từ axit béo và não dần dùng ketone thay một phần glucose. Đoạn chuyển giao này có thể khó chịu; tài liệu gọi là “khủng hoảng axit” hay “khủng hoảng thải độc”.',
    feel: ['Đau đầu', 'Buồn nôn nhẹ', 'Hơi thở, lưỡi có mùi', 'Mệt, khó ngủ', 'Cảm xúc lên xuống'],
    todo: ['Nghỉ nhiều hơn', 'Magie khi đau đầu, chuột rút, mất ngủ', 'Báo người hướng dẫn nếu khó chịu nhiều', 'Biết các dấu hiệu phải dừng'], s: 'ct_lythuyet,cahill2006' },
  { id: 'p5', from: 72, to: Infinity, fuel: 'f4', name: 'Ketone ổn định',
    body: 'Cơ thể đã quen nguồn năng lượng mới, cơn đói thường dịu đi. Trong một nghiên cứu 1.422 người nhịn theo phương pháp Buchinger (khoảng 200–250 kcal mỗi ngày), 93,2% không thấy đói.',
    feel: ['Cơn đói dịu đi', 'Nhẹ người', 'Đầu óc sáng hơn'],
    todo: ['Giữ nước, nghỉ ngơi, vận động nhẹ', 'Chuẩn bị đồ cho ngày ăn lại', 'Ghi lại cảm nhận'], s: 'buchinger2019,cahill2006' }
];

/* Mốc hiện trên lịch (giờ kể từ khi bắt đầu nhịn) */
NA.MILESTONES = [
  { h: 4, t: 'Insulin bắt đầu hạ', d: 'Bữa cuối đã tiêu hoá gần xong; cơ thể chuẩn bị dùng dự trữ.' },
  { h: 12, t: 'Mốc 12 giờ: gan đang dùng glycogen', d: 'Bạn thường vẫn thấy ổn. Uống một cốc nước ấm khi thức dậy.' },
  { h: 16, t: 'Mốc 16 giờ: “công tắc chuyển hoá”', d: 'Glycogen vơi dần, mỡ được huy động nhiều hơn.' },
  { h: 24, t: 'Mốc 24 giờ: mỡ thành nguồn năng lượng chính', d: 'Đói có thể đến từng cơn rồi qua. Đứng dậy từ từ, uống đủ nước.' },
  { h: 36, t: 'Mốc 36 giờ: tân tạo đường và tự thực tăng', d: 'Nghỉ ngơi xen vận động nhẹ. Khó chịu thì mở Hộp hỗ trợ.' },
  { h: 48, t: 'Mốc 48 giờ: thể ketone tăng', d: 'Có thể gặp “khủng hoảng thải độc”: đau đầu, mệt, buồn nôn nhẹ. Nghỉ nhiều hơn, báo người hướng dẫn nếu khó chịu nhiều.' },
  { h: 72, t: 'Mốc 72 giờ: ketone ổn định', d: 'Cơn đói thường dịu đi, nhiều người thấy nhẹ người hơn.' },
  { h: 96, t: 'Ngày nhịn thứ 5', d: 'Giữ nước, nghỉ ngơi, theo dõi cơ thể; liên lạc người hướng dẫn mỗi ngày.' },
  { h: 120, t: 'Ngày nhịn thứ 6', d: 'Giữ nước, nghỉ ngơi, theo dõi cơ thể; liên lạc người hướng dẫn mỗi ngày.' },
  { h: 144, t: 'Ngày nhịn thứ 7', d: 'Giữ nước, nghỉ ngơi, theo dõi cơ thể; liên lạc người hướng dẫn mỗi ngày.' }
];

/* Một ngày nhịn mẫu. at: giờ cố định hoặc tên bữa quen (sang/trua/toi) cộng phút lệch */
NA.ROUTINE = [
  { at: 'sang', off: -30, type: 'drink', t: 'Thức dậy: một cốc nước ấm', d: 'Uống chậm. Cả ngày khoảng 2–3 lít, chia nhiều lần.' },
  { at: 'sang', off: 0, type: 'do', t: 'Giờ ăn sáng quen thuộc', d: 'Cơn đói thường đến theo thói quen rồi qua. Uống nước, đi lại nhẹ nhàng.' },
  { at: '10:00', type: 'do', t: 'Vận động nhẹ', d: 'Đi bộ ngoài trời 20–30 phút hoặc yoga nhẹ. Không tập nặng.' },
  { at: 'trua', off: 0, type: 'do', t: 'Giờ cơm trưa của mọi người', d: 'Đừng ngồi nhìn người khác ăn. Nghỉ trưa, đọc sách, làm việc nhẹ mình thích.' },
  { at: '15:00', type: 'drink', t: 'Uống nước', d: 'Đau đầu, chóng mặt hay chuột rút: mở Hộp hỗ trợ.' },
  { at: 'toi', off: 0, type: 'do', t: 'Giờ cơm tối', d: 'Ra khỏi bếp, tránh mùi đồ ăn. Đi dạo hoặc làm việc nhẹ nhàng.' },
  { at: '21:00', type: 'do', t: 'Ghi vài dòng', d: 'Hôm nay cơ thể và cảm xúc ra sao? Mình nhận ra điều gì về thói quen ăn uống?' },
  { at: '22:00', type: 'do', t: 'Đi ngủ sớm', d: 'Ngủ đủ giúp cơ thể nghỉ ngơi và hồi phục.' }
];

/* ---------- Ngày giảm ăn (Ngày 1) ---------- */
NA.DAY1 = {
  goal: 'Cung cấp đủ dinh dưỡng nhưng giảm lượng thức ăn: cực kỳ ưu tiên chất lượng hơn số lượng. Chỉ ăn các bữa chính như bạn quen (3, 2 hay 1 bữa), tuyệt đối không ăn vặt giữa các bữa.',
  rules: [
    { ico: 'drop', t: 'Uống 1,5–2 lít nước trắng', d: 'Chia đều trong ngày.' },
    { ico: 'carrot', t: 'Ăn rau củ sống', d: 'Nếu không quen, hấp sơ, vẫn còn độ giòn.' },
    { ico: 'clock', t: 'Ăn chậm, nhai kỹ, lắng nghe cơ thể', d: 'Dừng lại khi thấy đủ no.' },
    { ico: 'x', t: 'Không ăn vặt, không đồ chiên rán', d: 'Chất béo duy nhất: dầu thực vật ép lạnh chất lượng tốt.' }
  ]
};

/* Thực đơn theo bữa: groups là các nhóm được ăn (khoá trong NA.GROUPS) */
NA.MENUS = {
  sang: { t: 'Bữa sáng', img: 'm_sang', alt: 'Minh hoạ bữa sáng: yến mạch với táo, hạt óc chó và sinh tố xanh',
    lead: 'Được ăn năm nhóm: ngũ cốc nguyên hạt, trái cây ít ngọt, rau củ, hạt khô, các loại khoai.',
    eat: 'Ngũ cốc nguyên hạt (kể cả bột mì nguyên cám), trái cây ít ngọt, rau củ, hạt khô, khoai.',
    groups: ['ngucoc', 'traicay', 'rau', 'hat', 'khoai'],
    notes: [
      'Rưới dầu ép lạnh giàu omega-3 lên rau củ (dầu mè, sacha inchi ép lạnh).',
      'Muốn ăn sáng đồ ngọt: làm sinh tố, hoặc khoai nghiền trộn các loại hạt.',
      'Có thể dùng nước hầm gà: uống, trộn sốt rau củ, salad, hoặc cho vào sinh tố.'
    ], s: 'ct_ngay1' },
  trua: { t: 'Bữa trưa', img: 'm_trua', alt: 'Minh hoạ bữa trưa: cơm, rau củ hấp, salad và chén nước hầm gà',
    lead: 'Tương tự buổi sáng nhưng bỏ bột mì nguyên cám khỏi thực đơn.',
    eat: 'Cơm, yến mạch, tam giác mạch hoặc diêm mạch (không bột mì nguyên cám); trái cây ít ngọt, rau củ, hạt khô, khoai.',
    groups: ['ngucoc', 'traicay', 'rau', 'hat', 'khoai'], except: 'Bỏ bột mì nguyên cám',
    notes: ['Vẫn dùng được nước hầm gà.', 'Rưới dầu ép lạnh lên rau.'], s: 'ct_ngay1' },
  toi: { t: 'Bữa tối', img: 'm_toi', alt: 'Minh hoạ bữa tối nhẹ: salad, rau củ hấp và vài lát trái cây',
    lead: 'Chỉ được ăn: rau củ chín và/hoặc sống kèm dầu ép lạnh giàu omega-3; trái cây (bỏ chuối và các loại nhiều đường).',
    eat: 'Chỉ rau củ (chín hoặc sống) rưới dầu ép lạnh, và trái cây ít ngọt.',
    groups: ['rau', 'traicay'],
    notes: ['Không dùng nước hầm gà nữa.', 'Không ngũ cốc, không khoai, không hạt.', 'Nếu đây là bữa cuối trước khi nhịn: ăn chậm, đủ no là dừng.'], s: 'ct_ngay1' }
};

/* ---------- Nhóm thực phẩm. lad: bậc thêm lại khi ăn lại (xem NA.LADDER) ---------- */
NA.GROUPS = {
  ngucoc: { n: 'Ngũ cốc nguyên hạt', ok: 1, lad: 2, ico: 'grain', img: 'f_ngucoc', items: 'Bột mì nguyên cám, cơm trắng, tam giác mạch, yến mạch, diêm mạch (quinoa)' },
  traicay: { n: 'Trái cây', ok: 1, lad: 1, ico: 'apple', img: 'f_traicay', items: 'Hầu hết các loại, trừ quả quá ngọt, nhiều đường: chuối, nho, sầu riêng, mít…' },
  rau: { n: 'Rau củ', ok: 1, lad: 1, ico: 'carrot', img: 'f_rau', items: 'Chín hoặc sống. Ưu tiên rau sạch, rõ nguồn gốc, màu xanh hoặc sặc sỡ.' },
  hat: { n: 'Các loại hạt khô', ok: 1, lad: 2, ico: 'nut', img: 'f_hat', items: 'Hạt óc chó, hạnh nhân, hạt điều, hạt bí, hạt mè' },
  khoai: { n: 'Các loại khoai', ok: 1, lad: 2, ico: 'potato', img: 'f_khoai', items: 'Khoai tây, khoai lang, khoai mì (sắn)' },
  dauep: { n: 'Dầu ép lạnh', ok: 1, lad: 2, ico: 'oil', items: 'Dầu thực vật ép lạnh chất lượng tốt, rưới nguội lên rau' },
  nuoc: { n: 'Nước và nước hầm', ok: 1, lad: 1, ico: 'drop', items: 'Nước trắng; nước hầm gà bữa sáng và trưa' },
  ngot: { n: 'Trái cây quá ngọt', ok: 0, lad: 2, ico: 'apple', items: 'Chuối, nho, sầu riêng, mít và các loại quả nhiều đường' },
  sua: { n: 'Sản phẩm từ sữa', ok: 0, lad: 5, ico: 'milk', img: 's_sua', items: 'Sữa (bò, dê, cừu), sữa chua, phô mai, kem, bơ' },
  dam: { n: 'Đạm động vật', ok: 0, lad: 4, ico: 'fish', img: 's_dam', items: 'Thịt, cá và hải sản, trứng' },
  khac: { n: 'Nấm, rau mầm, mỡ, sô cô la', ok: 0, lad: 3, ico: 'mushroom', img: 's_khac', items: 'Nấm các loại, rau mầm, chất béo đun nóng (mỡ heo, mỡ động vật, dầu thực vật đun nóng…), sô cô la' },
  uong: { n: 'Đồ uống', ok: 0, lad: 5, ico: 'coffee', img: 's_uong', items: 'Rượu, bia, thức uống có cồn; cà phê; các loại trà; soda, nước ngọt đóng chai; nước trái cây (tươi hay công nghiệp)' },
  tinhbot: { n: 'Ngũ cốc và tinh bột', ok: 0, lad: 5, ico: 'bread', img: 's_tinhbot', items: 'Ngô; các sản phẩm từ bột mì trắng tinh (bánh mì, mì ống, pizza…)' },
  dau: { n: 'Đậu và sản phẩm từ đậu', ok: 0, lad: 3, ico: 'bean', img: 's_dau', items: 'Lạc (đậu phộng); đậu nành và sản phẩm (đậu hũ, sữa đậu nành, tàu hũ ky, chao); đậu đỗ (đậu lăng, đậu gà, đậu xanh, đen, trắng, lima)' },
  giavi: { n: 'Gia vị', ok: 0, lad: 4, ico: 'chili', img: 's_giavi', items: 'Tiêu, ớt' },
  duong: { n: 'Đường và chất ngọt', ok: 0, lad: 6, ico: 'sugar', img: 's_duong', items: 'Tất cả các loại đường (kể cả đường toàn nguyên), chất tạo ngọt, mật ong' }
};
NA.ALLOWED = ['ngucoc', 'traicay', 'rau', 'hat', 'khoai'];
NA.STOPPED = ['sua', 'dam', 'khac', 'uong', 'tinhbot', 'dau', 'giavi', 'duong'];

/* ---------- Tra cứu “Món này ăn được không?”
   [tên, từ khoá (không dấu), nhóm, quy tắc sáng/trưa/tối (Y = được, N = không, ? = chưa rõ), ghi chú, nguồn: c = chương trình, s = suy ra từ nhóm, q = tài liệu không nói, bậc ăn lại riêng nếu khác nhóm] */
NA.FOODS = [
  ['Cơm trắng', 'com, gao trang, com trang, gao', 'ngucoc', 'YYN', 'Ngũ cốc chỉ ăn sáng và trưa; bữa tối chỉ rau củ và trái cây.', 'c'],
  ['Gạo lứt', 'gao lut, com gao lut, brown rice', 'ngucoc', 'YYN', 'Gạo còn nguyên cám, cùng nhóm ngũ cốc nguyên hạt.', 's'],
  ['Cháo trắng', 'chao, chao trang, chao gao', 'ngucoc', 'YYN', 'Gạo nấu với nước, không thịt, không trứng.', 's'],
  ['Yến mạch', 'yen mach, oat, oats, avoine, oatmeal', 'ngucoc', 'YYN', '', 'c'],
  ['Tam giác mạch', 'tam giac mach, kieu mach, buckwheat, sarrasin', 'ngucoc', 'YYN', '', 'c'],
  ['Diêm mạch (quinoa)', 'diem mach, quinoa', 'ngucoc', 'YYN', '', 'c'],
  ['Bột mì nguyên cám, bánh mì nguyên cám', 'bot mi nguyen cam, banh mi nguyen cam, banh mi den, whole wheat', 'ngucoc', 'YNN', 'Chỉ bữa sáng. Bữa trưa đã bỏ bột mì nguyên cám.', 'c'],
  ['Bún, phở, hủ tiếu', 'bun, pho, banh pho, hu tieu, mien, banh canh', 'ngucoc', '???', 'Tài liệu không nhắc tới. Đây là bột gạo đã chế biến; nếu không chắc, chọn cơm hoặc khoai, hoặc hỏi người hướng dẫn.', 'q'],

  ['Táo', 'tao, apple', 'traicay', 'YYY', '', 'c'],
  ['Ổi', 'oi, guava', 'traicay', 'YYY', '', 'c'],
  ['Cam, quýt', 'cam, quyt, orange', 'traicay', 'YYY', 'Ăn cả múi; không vắt lấy nước.', 'c'],
  ['Lựu', 'luu, pomegranate', 'traicay', 'YYY', '', 'c'],
  ['Bưởi', 'buoi, pomelo', 'traicay', 'YYY', '', 's'],
  ['Lê', 'le, pear', 'traicay', 'YYY', '', 's'],
  ['Kiwi', 'kiwi', 'traicay', 'YYY', '', 's'],
  ['Dâu tây, việt quất', 'dau tay, viet quat, berry, blueberry, strawberry', 'traicay', 'YYY', '', 's'],
  ['Thanh long', 'thanh long, dragon fruit', 'traicay', 'YYY', '', 's'],
  ['Chanh', 'chanh, lemon, lime', 'traicay', 'YYY', 'Vắt vào rau, salad.', 's'],
  ['Dưa hấu', 'dua hau, watermelon', 'traicay', '???', 'Tài liệu không nhắc tới. Vị ngọt nhưng nhiều nước; nếu ăn thì ăn ít, hoặc hỏi người hướng dẫn.', 'q'],
  ['Quả bơ', 'qua bo, trai bo, avocado', 'traicay', '???', 'Tài liệu không nhắc tới. Khác với “bơ” (butter) trong nhóm sữa phải ngừng. Quả bơ ít đường nhưng nhiều béo.', 'q'],

  ['Chuối', 'chuoi, banana', 'ngot', 'NNN', 'Quả quá ngọt, nhiều đường.', 'c'],
  ['Nho', 'nho, grape', 'ngot', 'NNN', 'Quả quá ngọt, nhiều đường.', 'c'],
  ['Sầu riêng', 'sau rieng, durian', 'ngot', 'NNN', 'Quả quá ngọt, nhiều đường.', 'c'],
  ['Mít', 'mit, jackfruit', 'ngot', 'NNN', 'Quả quá ngọt, nhiều đường.', 'c'],
  ['Xoài chín', 'xoai, mango', 'ngot', 'NNN', 'Rất ngọt, thuộc nhóm “quả quá ngọt”.', 's'],
  ['Nhãn, vải, chôm chôm', 'nhan, vai, chom chom, longan, lychee, rambutan', 'ngot', 'NNN', 'Rất ngọt, thuộc nhóm “quả quá ngọt”.', 's'],
  ['Hồng xiêm, na', 'hong xiem, sapoche, sapodilla, na, mang cau', 'ngot', 'NNN', 'Rất ngọt, thuộc nhóm “quả quá ngọt”.', 's'],
  ['Trái cây sấy, ô mai, mứt', 'trai cay say, hoa qua say, nho kho, o mai, mut, dried fruit', 'ngot', 'NNN', 'Đường đã cô đặc.', 's', 6],

  ['Rau xanh các loại', 'rau, rau xanh, rau cai, rau muong, cai, rau ma, rau ngot', 'rau', 'YYY', 'Ưu tiên rau sạch, rõ nguồn gốc. Ăn sống; không quen thì hấp sơ còn giòn.', 'c'],
  ['Bông cải xanh', 'bong cai, sup lo, broccoli', 'rau', 'YYY', '', 'c'],
  ['Bắp cải, xà lách', 'bap cai, xa lach, cabbage, lettuce, salad', 'rau', 'YYY', '', 'c'],
  ['Dưa leo', 'dua leo, dua chuot, cucumber', 'rau', 'YYY', '', 'c'],
  ['Cần tây, măng tây', 'can tay, mang tay, celery, asparagus', 'rau', 'YYY', '', 'c'],
  ['Đậu que', 'dau que, dau cove, green bean', 'rau', 'YYY', 'Ăn cả vỏ như rau, khác với nhóm “đậu đỗ” (hạt đậu) phải ngừng.', 'c'],
  ['Mướp đắng (khổ qua)', 'muop dang, kho qua, bitter melon', 'rau', 'YYY', '', 'c'],
  ['Bí ngòi, bí xanh, bí đỏ', 'bi ngoi, bi xanh, bi dao, bi do, zucchini, pumpkin', 'rau', 'YYY', '', 's'],
  ['Cà rốt, củ cải, củ dền', 'ca rot, cu cai, cu den, carrot, radish, beetroot', 'rau', 'YYY', '', 's'],
  ['Cà chua', 'ca chua, tomato', 'rau', 'YYY', '', 's'],
  ['Ớt chuông', 'ot chuong, bell pepper, ot ngot', 'rau', 'YYY', 'Là rau, không cay; khác với ớt cay trong nhóm gia vị.', 's'],
  ['Hành, tỏi, gừng', 'hanh, toi, gung, hanh tay, hanh la, garlic, ginger, onion', 'rau', 'YYY', 'Tài liệu chỉ ngừng hai gia vị là tiêu và ớt.', 's'],

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

  ['Dầu mè ép lạnh', 'dau me, dau vung, sesame oil', 'dauep', 'YYY', 'Rưới nguội lên rau, không đun nóng.', 'c'],
  ['Dầu sacha inchi ép lạnh', 'sacha inchi, dau sacha', 'dauep', 'YYY', 'Giàu omega-3. Rưới nguội, không đun nóng.', 'c'],
  ['Dầu ô liu ép lạnh (extra virgin)', 'dau oliu, dau o liu, olive oil', 'dauep', 'YYY', 'Thuộc nhóm “dầu thực vật ép lạnh chất lượng tốt”; dùng nguội.', 's'],

  ['Nước trắng', 'nuoc, nuoc loc, nuoc trang, nuoc am, water', 'nuoc', 'YYY', 'Ngày giảm ăn 1,5–2 lít; ngày nhịn khoảng 2–3 lít, chia nhiều lần.', 'c'],
  ['Nước hầm xương gà', 'nuoc ham, nuoc ham ga, nuoc ham xuong, bone broth, nuoc dung', 'nuoc', 'YYN', 'Sáng và trưa ngày giảm ăn: uống, trộn sốt, salad hoặc cho vào sinh tố. Bữa tối không dùng. Khi nhịn: chỉ khi cần hỗ trợ khẩn cấp.', 'c'],
  ['Sinh tố (smoothie)', 'sinh to, smoothie', 'nuoc', 'YY?', 'Xay từ rau và trái cây được phép, không đường, không sữa. Bữa tối không cho hạt.', 'c'],

  ['Cà phê', 'ca phe, cafe, coffee', 'uong', 'NNN', 'Nếu đang uống nhiều, nên giảm dần từ tuần chuẩn bị cho đỡ đau đầu.', 'c'],
  ['Trà các loại', 'tra, che, tra sua, tra thao moc, tra gung, tea', 'uong', 'NNN', 'Ngoại lệ duy nhất: trà xanh khi tụt huyết áp nặng.', 'c'],
  ['Trà xanh', 'tra xanh, che xanh, green tea', 'uong', 'NNN', 'Không uống thường ngày. Chỉ dùng khi tụt huyết áp nặng (Hộp hỗ trợ).', 'c'],
  ['Nước ép trái cây', 'nuoc ep, nuoc trai cay, nuoc cam, juice', 'uong', 'NNN', 'Kể cả nước ép tươi. Ăn nguyên quả thay vì ép.', 'c', 3],
  ['Nước dừa', 'nuoc dua, coconut water', 'uong', 'NNN', 'Ngọt như nước trái cây.', 's', 3],
  ['Soda, nước ngọt đóng chai', 'soda, nuoc ngot, coca, pepsi, nuoc co ga, tra chai', 'uong', 'NNN', '', 'c', 6],
  ['Rượu, bia', 'ruou, bia, beer, wine, con, do uong co con', 'uong', 'NNN', '', 'c', 6],

  ['Sữa (bò, dê, cừu)', 'sua, sua bo, sua de, sua tuoi, milk', 'sua', 'NNN', '', 'c'],
  ['Sữa chua', 'sua chua, yogurt, yaourt', 'sua', 'NNN', '', 'c', 4],
  ['Phô mai', 'pho mai, cheese', 'sua', 'NNN', '', 'c'],
  ['Kem', 'kem, ice cream, whipping cream', 'sua', 'NNN', '', 'c', 6],
  ['Bơ (butter)', 'bo, butter, bo dong vat, bo lat', 'sua', 'NNN', 'Bơ làm từ sữa. Quả bơ (avocado) là chuyện khác: gõ “quả bơ”.', 'c'],
  ['Siro, sữa đặc', 'siro, sua dac', 'duong', 'NNN', 'Đường và sữa.', 's'],

  ['Thịt (heo, bò, gà…)', 'thit, thit heo, thit lon, thit bo, thit ga, pork, beef, chicken, xuc xich, cha', 'dam', 'NNN', 'Nước hầm gà là ngoại lệ được phép trong bữa sáng, trưa ngày giảm ăn.', 'c', 5],
  ['Cá', 'ca, fish, ca hoi, salmon', 'dam', 'NNN', '', 'c'],
  ['Tôm, cua, mực, hải sản', 'tom, cua, muc, hai san, oc, ngheu, seafood', 'dam', 'NNN', '', 'c'],
  ['Trứng', 'trung, egg, trung ga, trung vit', 'dam', 'NNN', '', 'c'],
  ['Nước mắm, mắm', 'nuoc mam, mam, fish sauce', 'dam', 'NNN', 'Làm từ cá.', 's'],

  ['Nấm các loại', 'nam, mushroom, nam rom, nam huong', 'khac', 'NNN', '', 'c'],
  ['Rau mầm, giá đỗ', 'rau mam, gia, gia do, sprout', 'khac', 'NNN', 'Giá đỗ cũng là một loại rau mầm.', 'c'],
  ['Đồ chiên rán, xào', 'chien, ran, xao, do chien, fried', 'khac', 'NNN', 'Chất béo đun nóng phải ngừng; chỉ dùng dầu ép lạnh rưới nguội.', 'c', 6],
  ['Mỡ heo, mỡ động vật', 'mo, mo heo, mo lon, lard', 'khac', 'NNN', '', 'c', 6],
  ['Dầu ăn đun nóng', 'dau an, dau chien, dau dau nanh, dau huong duong', 'khac', 'NNN', 'Dầu dùng để chiên, xào. Chỉ dùng dầu ép lạnh rưới nguội.', 'c', 6],
  ['Sô cô la', 'so co la, socola, chocolate, cacao', 'khac', 'NNN', '', 'c', 6],

  ['Ngô (bắp)', 'ngo, bap, corn', 'tinhbot', 'NNN', '', 'c'],
  ['Bánh mì trắng', 'banh mi, banh mi trang, bread, banh bao', 'tinhbot', 'NNN', 'Làm từ bột mì trắng tinh.', 'c'],
  ['Mì ống, mì Ý, pizza', 'mi ong, mi y, spaghetti, pasta, pizza, nui', 'tinhbot', 'NNN', 'Làm từ bột mì trắng tinh.', 'c'],
  ['Mì gói', 'mi goi, mi tom, mi an lien, instant noodle', 'tinhbot', 'NNN', 'Bột mì trắng, thường đã chiên.', 's', 6],
  ['Bánh quy, bánh ngọt', 'banh quy, banh ngot, banh kem, cookie, cake, snack', 'tinhbot', 'NNN', 'Bột mì trắng và đường.', 's', 6],

  ['Lạc (đậu phộng)', 'lac, dau phong, peanut', 'dau', 'NNN', 'Thuộc họ đậu, không phải hạt khô.', 'c'],
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

  ['Muối', 'muoi, salt, muoi bien', 'nuoc', '???', 'Tài liệu không cấm muối; muối biển còn có trong Hộp hỗ trợ (ngậm chút xíu khi tụt huyết áp). Nên nêm nhạt.', 'q']
];
NA.POPULAR = ['cà phê', 'chuối', 'trứng', 'đậu hũ', 'cơm', 'khoai lang', 'sữa chua', 'nước hầm'];

/* ---------- Tuần chuẩn bị ---------- */
NA.PREP = [
  { g: 'Tâm trí', items: [
    { id: 'why', t: 'Tự hỏi: Vì sao mình quyết định thực hiện thử thách này?', s: 'ct_chuanbi' },
    { id: 'mean', t: 'Ý nghĩa của quyết định nhịn ăn ở thời điểm này là gì?', s: 'ct_chuanbi' },
    { id: 'read', t: 'Đọc phần lý thuyết: insulin, tự thực, nhai kỹ (Phần 5–7)', s: 'ct_lythuyet' }
  ] },
  { g: 'Gia đình và công việc', items: [
    { id: 'tell', t: 'Báo kế hoạch cho gia đình, bạn bè, đồng nghiệp ở gần', s: 'ct_chuanbi' },
    { id: 'cook', t: 'Nhờ người nấu thay nếu bạn là người đứng bếp, để mùi thức ăn không “trêu ngươi”', s: 'ct_chuanbi' },
    { id: 'meal', t: 'Sắp xếp để giờ ăn không phải chống cằm ngồi nhìn mọi người ăn', s: 'ct_chuanbi' },
    { id: 'work', t: 'Thu xếp công việc để không quá tải', s: 'ct_chuanbi' },
    { id: 'fun', t: 'Chuẩn bị việc nhẹ nhàng yêu thích: sách, phim hay, “thức ăn tinh thần”', s: 'ct_chuanbi' }
  ] },
  { g: 'Đồ cần có', items: [
    { id: 'veg', t: 'Rau củ quả tươi, dầu ép lạnh, hột hạt cho ngày giảm ăn', must: 1, s: 'ct_chuanbi' },
    { id: 'broth', t: 'Nước hầm xương và thịt gà (xem cách nấu bên cạnh)', s: 'ct_chuanbi' },
    { id: 'mg', t: 'Magie: viên nén, dạng nước (magnésium marin) hoặc bột magie bisglycinate', s: 'ct_chuanbi' },
    { id: 'tea', t: 'Trà xanh, để dùng khi tụt huyết áp nặng', s: 'ct_chuanbi' },
    { id: 'salt', t: 'Muối biển, ngậm chút xíu nếu tụt huyết áp mà không dùng được trà xanh', s: 'ct_chuanbi' },
    { id: 'mint', t: 'Tinh dầu bạc hà, khi khó chịu, đau đầu', s: 'ct_chuanbi' },
    { id: 'kit', t: 'Bộ dụng cụ thụt tháo đại tràng và vitamin C dạng bột: chỉ dùng theo hướng dẫn trực tiếp của người hướng dẫn', s: 'ct_chuanbi' }
  ] },
  { g: 'Gợi ý thêm (không có trong tài liệu)', extra: 1, items: [
    { id: 'taper', t: 'Giảm dần cà phê, đường, rượu bia trong tuần này để đỡ đau đầu khi ngừng hẳn' },
    { id: 'doc', t: 'Đang dùng thuốc hoặc có bệnh mạn tính: hỏi bác sĩ trước khi nhịn', s: 'buchinger2013,grajower2019' }
  ] }
];

NA.BROTH = {
  ing: ['Xương và thịt gà', 'Hành tây', 'Cà rốt', 'Củ cải', 'Cần tây', 'Giấm táo'],
  steps: [
    'Rửa sạch xương, chần qua nước sôi rồi đổ nước đầu.',
    'Cho xương, thịt, rau củ và 1–2 thìa giấm táo vào nồi, đổ ngập nước.',
    'Đun sôi rồi hạ lửa thật nhỏ, ninh chậm 6–8 tiếng.',
    'Lọc lấy nước, để nguội, cất tủ lạnh. Nấu trước Ngày 1 một ngày.'
  ],
  use: 'Dùng trong bữa sáng và trưa của ngày giảm ăn, và khi cần hỗ trợ khẩn cấp lúc đang nhịn. Bữa tối Ngày 1 không dùng.'
};

/* Kiểm tra an toàn: stop = không nên tự nhịn; adj = cần bác sĩ hoặc người hướng dẫn theo sát */
NA.SAFETY = [
  { g: 'Theo tài liệu của chương trình', items: [
    { id: 'preg', lv: 'stop', t: 'Đang mang thai hoặc cho con bú', s: 'ct_lythuyet,buchinger2013' },
    { id: 'u18', lv: 'stop', t: 'Dưới 18 tuổi', s: 'ct_lythuyet' },
    { id: 'thin', lv: 'stop', t: 'Suy dinh dưỡng, quá gầy, hoặc đang sụt cân không rõ lý do', s: 'ct_lythuyet,refeed' },
    { id: 'neuro', lv: 'stop', t: 'Bệnh thoái hoá thần kinh, hoặc đang điều trị ung thư', s: 'ct_lythuyet' }
  ] },
  { g: 'Bổ sung từ hướng dẫn y khoa', items: [
    { id: 'dm', lv: 'stop', t: 'Tiểu đường type 1, hoặc đang tiêm insulin, uống thuốc hạ đường huyết', s: 'grajower2019' },
    { id: 'ed', lv: 'stop', t: 'Đang hoặc từng bị rối loạn ăn uống (chán ăn, ăn vô độ)', s: 'buchinger2013' },
    { id: 'organ', lv: 'adj', t: 'Bệnh gan, thận, tim; gout; cường giáp', s: 'buchinger2013' },
    { id: 'meds', lv: 'adj', t: 'Đang dùng thuốc hằng ngày (huyết áp, lợi tiểu, chống đông, thuốc phải uống cùng bữa ăn…)', s: 'buchinger2013' },
    { id: 'lowbp', lv: 'adj', t: 'Huyết áp thấp, hay chóng mặt hoặc từng ngất', s: 'ct_chuanbi' },
    { id: 'old', lv: 'adj', t: 'Trên 70 tuổi, hoặc thể trạng yếu', s: 'buchinger2013' },
    { id: 'long', lv: 'adj', t: 'Định nhịn hơn 3 ngày, hoặc lần đầu nhịn', s: 'buchinger2013' }
  ] }
];

/* ---------- Hộp hỗ trợ khi khó chịu. c: 1 = theo chương trình ---------- */
NA.TOOLBOX = [
  { id: 'dau-dau', n: 'Đau đầu', ico: 'alert', tips: [
    { t: 'Tinh dầu bạc hà: xoa nhẹ thái dương, gáy, hoặc hít', c: 1 },
    { t: 'Magie theo liều trên bao bì', c: 1 },
    { t: 'Uống thêm nước, nghỉ ở nơi thoáng mát' }
  ], flag: 'Đau đầu dữ dội, kèm nôn, lú lẫn, nói khó hoặc yếu tay chân: dừng nhịn, đi khám ngay.' },
  { id: 'chong-mat', n: 'Chóng mặt, tụt huyết áp', ico: 'drop', tips: [
    { t: 'Ngồi hoặc nằm xuống ngay; đứng dậy thật từ từ' },
    { t: 'Trà xanh khi tụt huyết áp nặng', c: 1 },
    { t: 'Ngậm chút xíu muối biển nếu không dùng được trà xanh', c: 1 },
    { t: 'Báo người hướng dẫn' }
  ], flag: 'Ngất, hoặc chóng mặt tới mức không đứng nổi: dừng nhịn, gọi người thân và đi khám.' },
  { id: 'chuot-rut', n: 'Chuột rút, mỏi cơ', ico: 'pulse', tips: [
    { t: 'Magie', c: 1 },
    { t: 'Giãn cơ, xoa bóp nhẹ vùng bị rút' },
    { t: 'Uống đủ nước' }
  ] },
  { id: 'mat-ngu', n: 'Mất ngủ', ico: 'moon', tips: [
    { t: 'Magie buổi tối', c: 1 },
    { t: 'Tắm nước ấm, tránh màn hình trước khi ngủ' },
    { t: 'Thở chậm, ghi vài dòng nhật ký' }
  ] },
  { id: 'doi', n: 'Đói cồn cào, mệt lả', ico: 'bowl', tips: [
    { t: 'Uống nước ấm, chờ 15–20 phút, cơn đói thường qua' },
    { t: 'Ra khỏi bếp, làm việc nhẹ nhàng mình thích', c: 1 },
    { t: 'Nước hầm gà khi cần hỗ trợ khẩn cấp', c: 1 }
  ], flag: 'Run tay, vã mồ hôi lạnh, tim đập nhanh, lú lẫn: dừng nhịn, ăn uống ngay (nước hầm, trái cây) và báo người hướng dẫn. Không đỡ sau 15 phút: đi khám.' },
  { id: 'buon-non', n: 'Buồn nôn, khó chịu', ico: 'leaf', tips: [
    { t: 'Tinh dầu bạc hà', c: 1 },
    { t: 'Nhấp nước ấm từng ngụm nhỏ, nằm nghỉ' }
  ], flag: 'Nôn liên tục, không uống được nước, đau bụng dữ dội: dừng nhịn, đi khám.' },
  { id: 'lanh', n: 'Lạnh người', ico: 'sun', tips: [
    { t: 'Mặc ấm, đắp chăn, chườm túi nước ấm' },
    { t: 'Vận động nhẹ cho ấm người' }
  ] },
  { id: 'hoi-tho', n: 'Hơi thở có mùi, lưỡi trắng', ico: 'info', tips: [
    { t: 'Hay gặp khi cơ thể chuyển sang dùng ketone' },
    { t: 'Chải lưỡi, súc miệng, uống đủ nước' }
  ] },
  { id: 'tam-ly', n: 'Cáu bẳn, thèm ăn dữ dội', ico: 'heart', tips: [
    { t: 'Đọc lại câu trả lời “Vì sao mình nhịn?”', c: 1 },
    { t: 'Tránh giờ cơm, mùi đồ ăn; đọc sách, xem phim nhẹ', c: 1 },
    { t: 'Nhắn người hướng dẫn hoặc bạn cùng nhịn' }
  ] }
];

NA.REDFLAGS = [
  'Ngất, hoặc chóng mặt tới mức không đứng nổi',
  'Đau ngực, tim đập rất nhanh hoặc loạn nhịp, khó thở',
  'Lú lẫn, nói khó, yếu hoặc tê một bên người',
  'Nôn liên tục, không uống được nước; đau bụng dữ dội',
  'Run, vã mồ hôi lạnh, mệt lả không đỡ khi nghỉ',
  'Tiểu rất ít, nước tiểu sẫm màu kéo dài'
];

/* ---------- Ăn lại ---------- */
NA.LADDER = [
  { s: 1, n: 'Bậc 1', t: 'Rau củ nấu chín mềm, súp rau, táo hấp, trái cây ít ngọt', ico: 'pot' },
  { s: 2, n: 'Bậc 2', t: 'Thêm khoai, cơm, cháo, yến mạch; rau sống; hạt; dầu ép lạnh', ico: 'grain' },
  { s: 3, n: 'Bậc 3', t: 'Thêm các loại đậu, đậu hũ; nấm, rau mầm', ico: 'bean' },
  { s: 4, n: 'Bậc 4', t: 'Thêm trứng, cá, sữa chua; tiêu, ớt', ico: 'fish' },
  { s: 5, n: 'Bậc 5', t: 'Thêm thịt, sữa, phô mai; cà phê, trà; ngô, bánh mì', ico: 'milk' },
  { s: 6, n: 'Sau cùng', t: 'Đường, mật ong, sô cô la, đồ chiên rán, rượu bia: càng muộn, càng ít càng tốt', ico: 'sugar' }
];

NA.REFEED = {
  first: { t: 'Bữa phá nhịn', d: 'Một quả táo hấp hoặc nướng chín, hoặc một bát nhỏ súp rau nấu nhừ. Ăn trong khoảng 20 phút, nhai đến khi thức ăn thành nước.' },
  /* thực đơn theo bậc của ngày ăn lại */
  menus: {
    1: { sang: 'Táo hấp hoặc súp rau nấu nhừ, ăn ít', trua: 'Súp rau, rau củ hấp mềm (cà rốt, bí, khoai tây); khoảng nửa khẩu phần quen', toi: 'Súp rau hoặc rau củ hấp; vài lát trái cây ít ngọt nếu muốn' },
    2: { sang: 'Cháo trắng hoặc yến mạch nấu mềm, trái cây ít ngọt', trua: 'Cơm (gạo lứt hoặc trắng), rau củ hấp, salad nhỏ, dầu ép lạnh', toi: 'Rau củ, súp, một ít khoai; hạt nếu thấy ổn' },
    3: { sang: 'Yến mạch hoặc khoai lang, trái cây, hạt', trua: 'Cơm, rau củ, đậu hũ hoặc một ít đậu', toi: 'Rau củ, súp; có thể thêm nấm' },
    4: { sang: 'Bữa sáng nhẹ quen thuộc, chưa có thịt và sữa', trua: 'Cơm, rau, cá hoặc trứng', toi: 'Rau củ, súp, một ít cá hoặc trứng' }
  },
  rules: [
    { ico: 'clock', t: 'Ăn ít, ăn chậm', d: 'Mỗi bữa khoảng 20 phút, nhai thật kỹ.' },
    { ico: 'bowl', t: 'Dừng khi vừa đủ no', d: 'Dạ dày đã nhỏ lại; ăn nhiều dễ đầy bụng, khó chịu.' },
    { ico: 'list', t: 'Thêm từng nhóm một', d: 'Theo các bậc bên dưới, để ý cơ thể phản ứng ra sao.' },
    { ico: 'pot', t: 'Ưu tiên nấu chín mềm', d: 'Những ngày đầu, hệ tiêu hoá cần được “đánh thức” từ từ.' }
  ],
  keep: [
    { t: 'Không ăn vặt giữa các bữa', s: 'ct_lythuyet' },
    { t: 'Nhai kỹ, ăn trong chánh niệm', s: 'ct_lythuyet' },
    { t: 'Nhiều rau củ, ít đồ ngọt và đồ chiên', s: 'ct_lythuyet' },
    { t: 'Nghỉ tiêu hoá định kỳ: nhịn định kỳ hiệu quả hơn nhịn một lần', s: 'ct_lythuyet' }
  ]
};

/* ---------- Biểu đồ: ba nguồn năng lượng (minh hoạ theo tài liệu, không phải số đo) ---------- */
NA.FUELS = [
  { id: 'f1', n: 'Đường từ bữa ăn', a: 0, b: 0, c: 3, d: 6, note: 'Glucose vừa ăn vào, dùng ngay; phần dư được cất đi.' },
  { id: 'f2', n: 'Glycogen trong gan', a: 2, b: 5, c: 16, d: 30, note: 'Nguồn thứ nhất: nuôi cơ thể khoảng 12–24 giờ, nhanh cạn hơn nếu vận động mạnh.' },
  { id: 'f3', n: 'Mỡ: axit béo, tân tạo đường', a: 10, b: 26, c: 999, d: 999, note: 'Nguồn thứ hai: mỡ dưới da và quanh nội tạng; gan tạo đường mới từ glycerol và axit amin.' },
  { id: 'f4', n: 'Thể ketone', a: 30, b: 72, c: 999, d: 999, note: 'Nguồn thứ ba: từ ngày thứ 2–3, gan làm ketone từ axit béo; não dần dùng ketone.' }
];

/* ---------- Biểu đồ insulin trong một ngày (minh hoạ) ---------- */
NA.INSULIN = [
  { id: 'a', n: 'Ba bữa chính và ăn vặt', meals: [[7, 1], [10, .55], [12, 1], [15.5, .6], [18.5, 1], [21.5, .5]] },
  { id: 'b', n: 'Chỉ ba bữa chính', meals: [[7, 1], [12, 1], [18.5, 1]] }
];
NA.INSULIN_EVENTS = { 7: 'bữa sáng', 10: 'ăn vặt', 12: 'bữa trưa', 15.5: 'ăn vặt', 18.5: 'bữa tối', 21.5: 'ăn khuya' };

NA.CYCLE = [
  { t: 'Ăn thường xuyên, nhiều đồ có chỉ số đường huyết cao' },
  { t: 'Đường huyết tăng' },
  { t: 'Insulin tăng' },
  { t: 'Cất thành mỡ, không đốt mỡ dự trữ' },
  { t: 'Kháng insulin, kháng leptin: ăn rồi vẫn thấy đói, thèm ngọt, thèm mặn' }
];

/* ---------- Tự thực: hỏi đáp ---------- */
NA.QA = [
  { q: 'Tự thực là gì?', a: 'Là cách tế bào tự “dọn nhà”: gói các thành phần cũ, hỏng (protein, bào quan) lại, phân huỷ rồi tái chế thành nguyên liệu mới. Hãy hình dung cơ thể là một thành phố và tự thực là đội vệ sinh đi qua từng con đường, dọn dẹp và làm mới.', s: 'ct_lythuyet,nobel2016' },
  { q: 'Ai tìm ra?', a: 'Nhà hoá sinh người Bỉ Christian de Duve đặt tên “autophagy” năm 1963. Nhà khoa học Nhật Yoshinori Ohsumi làm rõ cơ chế qua thí nghiệm trên nấm men và nhận giải Nobel Y học năm 2016.', s: 'ct_lythuyet,nobel2016' },
  { q: 'Vì sao tự thực quan trọng với sức khoẻ?', a: 'Khi thiếu thức ăn, tự thực cung cấp nhanh năng lượng và nguyên liệu để thay mới các thành phần tế bào; nó cũng giúp loại bỏ vi khuẩn, virus đã vào trong tế bào. Rối loạn tự thực có liên quan tới bệnh Parkinson, tiểu đường type 2 và nhiều bệnh tuổi già.', s: 'nobel2016' },
  { q: 'Làm sao để kích hoạt?', a: 'Tín hiệu mạnh nhất là thiếu chất dinh dưỡng. Khi không có thức ăn, con đường AMPK bật và tự thực tăng; khi có thức ăn, con đường mTOR bật để xây dựng, tăng trưởng. Nhịn ăn và giảm calo là hai cách mạnh nhất không dùng thuốc; vận động cường độ cao, ngủ đủ cũng hỗ trợ.', s: 'ct_lythuyet,bagherniya2018' },
  { q: 'Nhịn bao lâu thì tự thực bắt đầu?', a: 'Chưa có con số chắc chắn ở người. Tự thực luôn diễn ra ở mức nền và tăng lên khi nhịn kéo dài; phần lớn số liệu về thời điểm đến từ tế bào và động vật, vì rất khó đo tự thực trong cơ thể người.', s: 'bagherniya2018,decabo2019' },
  { q: 'Tự thực có giúp giảm viêm, tăng miễn dịch không?', a: 'Ở mức tế bào: tự thực dọn protein và bào quan hỏng trước khi chúng kích hoạt phản ứng viêm, điều hoà các “thể gây viêm” (inflammasome), và tham gia cả miễn dịch bẩm sinh lẫn miễn dịch thích ứng. Ở người, lợi ích lâm sàng cụ thể vẫn đang được nghiên cứu.', s: 'ct_lythuyet,bagherniya2018' },
  { q: 'Tự thực và phát triển có đối nghịch nhau?', a: 'Hai quá trình không chạy hết công suất cùng lúc, và cơ thể cần cả hai, như nghỉ và hoạt động. Ngay cả để phát triển cơ bắp cũng cần đủ tự thực cho mô tái tạo. Điều quan trọng là cân bằng giữa lúc nhịn và lúc ăn, giữa dọn dẹp và hoạt động.', s: 'ct_lythuyet' }
];

/* ---------- Lợi ích: mức bằng chứng ---------- */
NA.EV = {
  strong: 'Đo được ở người',
  mid: 'Bằng chứng vừa',
  weak: 'Chủ yếu ở động vật',
  trad: 'Kinh nghiệm'
};
NA.BENEFITS = [
  { t: 'Giảm cân, giảm vòng bụng', d: 'Giảm cả mỡ nội tạng quanh bụng, loại mỡ được xem là không tốt cho sức khoẻ.', ev: 'strong', s: 'buchinger2019,ct_lythuyet' },
  { t: 'Giảm huyết áp', d: 'Trong nghiên cứu 1.422 người, huyết áp tâm thu trung bình giảm khoảng 11 mmHg.', ev: 'strong', s: 'buchinger2019' },
  { t: 'Đường huyết, độ nhạy insulin', d: 'Cho insulin thời gian hạ xuống; cải thiện độ nhạy insulin. Người đang dùng thuốc tiểu đường phải có bác sĩ chỉnh thuốc.', ev: 'mid', s: 'decabo2019,grajower2019,ct_insulin' },
  { t: 'Bệnh thấp khớp, viêm', d: 'Nhóm bệnh có bằng chứng tốt nhất cho liệu pháp nhịn ăn theo hướng dẫn chuyên gia năm 2013.', ev: 'mid', s: 'buchinger2013' },
  { t: 'Năng lượng, tinh thần, cảm giác dễ chịu', d: 'Người nhịn tự đánh giá thể chất và cảm xúc tốt hơn sau đợt nhịn.', ev: 'mid', s: 'buchinger2019' },
  { t: 'Cholesterol, mỡ máu', d: 'Kết quả có cải thiện nhưng chưa đồng nhất giữa các nghiên cứu.', ev: 'mid', s: 'decabo2019' },
  { t: 'Não bộ, phòng Alzheimer', d: 'Dữ liệu chủ yếu ở động vật; chưa có thử nghiệm đủ lớn ở người.', ev: 'weak', s: 'decabo2019' },
  { t: 'Phòng chống ung thư', d: 'Dữ liệu chủ yếu ở động vật; ở người mới là nghiên cứu ban đầu. Không thay thế điều trị.', ev: 'weak', s: 'decabo2019' },
  { t: 'Tự thực, trẻ hoá tế bào', d: 'Rõ ở tế bào và động vật; khó đo trực tiếp ở người.', ev: 'weak', s: 'bagherniya2018,nobel2016' },
  { t: 'Đào thải độc tố', d: 'Cách nói của tài liệu: cơ thể dành năng lượng tiêu hoá cho việc dọn dẹp. Y học chưa có cách đo “độc tố” này.', ev: 'trad', s: 'ct_lythuyet' },
  { t: 'Da hồng hào, giác quan nhạy, đường ruột nhuận', d: 'Nhiều người kể lại sau đợt nhịn; chưa có nghiên cứu riêng.', ev: 'trad', s: 'ct_lythuyet' },
  { t: 'Lấy lại cảm giác đói và no thật', d: 'Nhịn định kỳ giúp phân biệt đói thật với ăn vì thói quen, buồn chán, đến giờ.', ev: 'trad', s: 'ct_lythuyet' }
];

/* ---------- Lịch sử ---------- */
NA.ERAS = { tien: 'Tiền sử', co: 'Cổ đại', trung: 'Trung cổ', hd: 'Hiện đại', tg: 'Tôn giáo', kh: 'Khoa học' };
NA.HISTORY = [
  { e: 'tien', y: '−5 triệu năm', t: 'Săn bắt, hái lượm', d: 'Thức ăn lúc có lúc không, phụ thuộc thời tiết; không có khái niệm giờ ăn. Mùa hè ăn nhiều, tích mỡ cho mùa đông và mùa xuân khan hiếm. Cơ chế dự trữ mỡ để dùng khi cần được ghi vào gen: ta được “lập trình” để nhịn theo từng giai đoạn.' },
  { e: 'co', y: 'Hy Lạp cổ đại', t: 'Nhịn khi ốm, nhịn để thanh lọc', d: 'Người Hy Lạp nhịn khi bị ốm; vận động viên ngưng ăn để chuẩn bị cơ thể trước khi tập cho Thế vận hội.' },
  { e: 'co', y: 'Thế kỷ 6 TCN', t: 'Pythagore', d: 'Giai thoại kể ông nhịn 40 ngày, và đòi học trò nhịn ăn trước khi được nhận vào trường.' },
  { e: 'co', y: 'Khoảng 460–370 TCN', t: 'Hippocrate', d: 'Người được xem là cha đẻ của y học; câu được lưu truyền: “Thà tự chăm sóc bản thân khi đau ốm bằng việc nhịn ăn, còn hơn là chạy theo thuốc thang.”' },
  { e: 'trung', y: 'Thế kỷ 11', t: 'Avicenne (Ibn Sina)', d: 'Thầy thuốc, triết gia Ba Tư, kê đơn ba tuần nhịn ăn cho bệnh nhân.' },
  { e: 'trung', y: 'Thế kỷ 16', t: 'Paracelse', d: 'Bác sĩ Thuỵ Sĩ: “Nhịn ăn là phương thuốc hữu hiệu nhất, đó chính là vị thầy thuốc bên trong chúng ta.” Đạo Kitô lan rộng cũng làm nhịn ăn được biết đến rộng rãi.' },
  { e: 'hd', y: 'Thế kỷ 18–19', t: 'Benjamin Franklin, Mark Twain', d: 'Franklin: “Trong tất cả, thuốc tốt nhất là nhịn ăn và nghỉ ngơi.” Twain: với phần lớn bệnh tật, nhịn ăn có lợi hơn cả thuốc tốt nhất hay thầy thuốc giỏi nhất.' },
  { e: 'hd', y: 'Đầu thế kỷ 20', t: 'Những công bố khoa học đầu tiên', d: 'Ở Pháp, bác sĩ Guillaume Guelpa hướng dẫn nhịn ăn cho bệnh nhân động kinh; bác sĩ Paul Carton cũng kê đơn nhịn ăn. Từ thập niên 1960, thực hành này giảm dần ở nhiều nước.' },
  { e: 'hd', y: 'Thế kỷ 20', t: 'Otto Buchinger (Đức)', d: 'Tác giả cuốn “Nhịn ăn chữa bệnh”, lập phòng khám nhịn ăn bên hồ Constance. Nay do cháu ngoại Leonard Wilhelmi điều hành và là một chuẩn mực của thực hành nhịn ăn.' },
  { e: 'hd', y: 'Thế kỷ 20', t: 'Nga và Thuỵ Sĩ', d: 'Bác sĩ tâm thần Yuri Nikolaev nghiên cứu nhịn ăn trong tâm thần học rồi mở rộng sang lĩnh vực khác. Ở Thuỵ Sĩ, bác sĩ Edouard Bertholet viết “Tìm lại sức khoẻ thông qua nhịn ăn” và đào tạo đồng nghiệp.' },
  { e: 'tg', y: 'Ít nhất 2.000 năm', t: 'Ba tôn giáo độc thần', d: 'Lễ Yom Kippur của đạo Do Thái, Mùa Chay của Kitô giáo, tháng Ramadan của Hồi giáo: nhịn để khổ hạnh, thanh lọc tâm hồn.' },
  { e: 'tg', y: 'Ấn Độ giáo', t: 'Nuôi dưỡng tâm', d: 'Nhịn giúp làm chủ ham muốn. Gandhi: “Nhịn ăn là để nhìn rõ thế giới nội tâm, như đôi mắt để nhìn thế giới bên ngoài.”' },
  { e: 'tg', y: 'Phật giáo', t: 'Điều độ, cân bằng', d: 'Nhịn ăn để giữ điều độ, cân bằng, thoát khỏi cám dỗ trần gian.' },
  { e: 'kh', y: '1963', t: 'Christian de Duve đặt tên “autophagy”', d: 'Từ tiếng Hy Lạp: tự (auto) và ăn (phagein).' },
  { e: 'kh', y: '2016', t: 'Nobel cho Yoshinori Ohsumi', d: 'Giải Nobel Y học cho công trình làm rõ cơ chế tự thực.' },
  { e: 'kh', y: '2019', t: 'Nghiên cứu 1.422 người', d: 'Phòng khám Buchinger Wilhelmi theo dõi người nhịn 4–21 ngày: giảm cân, vòng bụng, huyết áp; dưới 1% gặp tác dụng phụ.' },
  { e: 'hd', y: '50–70 năm gần đây', t: 'Thời của tủ lạnh và siêu thị', d: 'Đồ ăn có sẵn ngay lập tức. Ta ăn ba bữa, thêm bữa xế, ăn vặt, có khi ăn đêm; nhịn chỉ còn là lúc ngủ.' }
];

NA.WHY_EAT = ['Ăn theo thói quen', 'Ăn vì buồn chán', 'Ăn vì đến giờ ăn', 'Ăn để lấp khoảng trống', 'Ăn vì buồn phiền', 'Ăn vì sợ lát nữa sẽ đói', 'Ăn cho sạch đĩa'];

/* Lời nhắc trong lúc ăn chậm (đồng hồ 20 phút) */
NA.SLOW = [
  'Đặt đũa xuống giữa các miếng.',
  'Miếng này có vị gì? Kết cấu ra sao?',
  'Nhai tới khi thức ăn nhão, thành nước rồi mới nuốt.',
  'Bạn đang no khoảng mấy phần?',
  'Đói thật, hay chỉ còn thèm?',
  'Hít thở chậm một hơi trước miếng tiếp theo.'
];
