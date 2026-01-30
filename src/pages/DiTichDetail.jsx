import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./css/DiTichDetail.css";

import heroBg from '../assets/imagesAssets/ditich/herobg.png';
import scrollBg from '../assets/imagesAssets/ditich/scroll.png';
import footerImg from '../assets/imagesAssets/ditich/footer.png';
import lucGiacImg from '../assets/imagesAssets/ditich/LucGiac.png';
import dinhHoaImg from '../assets/imagesAssets/ditich/DinhHoa.png';

// Data for relic details - sections 3.1.1 to 3.2.4
const RELIC_DETAILS = {
    1: {
        id: 1,
        name: 'ĐỀN ĐUỔM',
        category: 'Cấp Quốc Gia',
        location: 'Xã Động Đạt, huyện Phú Lương, tỉnh Thái Nguyên',
        image: lucGiacImg,
        yearEstablished: 'Phò mã Đô úy Dương Tự Minh',
        recognitionDate: 'Mùng 6 tháng Giêng',
        area: 'Năm 1993',
        openingHours: 'Cách TP Thái Nguyên 25km',
        history: `Đền Đuổm nằm dưới chân núi Đuổm, thuộc xã Động Đạt, huyện Phú Lương, tỉnh Thái Nguyên, cách trung tâm thành phố Thái Nguyên khoảng 25km về phía Bắc. Đây là di tích lịch sử - văn hóa tiêu biểu của vùng Việt Bắc, được xếp hạng Di tích lịch sử cấp Quốc gia vào năm 1993.

Đền là nơi thờ tự Phò mã Đô úy Dương Tự Minh (còn được tôn xưng là Thánh Đuổm) – một vị anh hùng dân tộc người Tày đã có công lao to lớn trong việc trấn giữ biên cương phía Bắc thời nhà Lý.

Dương Tự Minh là một thủ lĩnh bản địa xuất sắc, người duy nhất trong lịch sử phong kiến Việt Nam hai lần được các vua Lý (Lý Nhân Tông và Lý Anh Tông) gả công chúa (Diên Bình và Hồng Liên) và phong chức Phò mã Đô úy. Ông có công dẹp loạn giữ yên bờ cõi, phát triển kinh tế và nông nghiệp tại vùng phủ Phú Lương xưa.`,
        architecture: `Kiến trúc Đền Đuổm là sự kết hợp hài hòa giữa bàn tay con người và vẻ đẹp kỳ vĩ của thiên nhiên. Ngôi đền được xây dựng theo tam cấp dựa vào vách núi đá vôi dựng đứng: Đền Hạ, Đền Trung và Đền Thượng.

Các hạng mục công trình mang đậm nét cổ kính với mái ngói vảy rồng, các cột gỗ lím và hệ thống hoành phi, câu đối sơn son thếp vàng.

Nhìn từ xa, ngôi đền ẩn hiện dưới tán cây cổ thụ hàng trăm năm tuổi, tạo nên không gian uy nghiêm và tĩnh mịch. Đền ẩn mình dưới vách núi Đuổm, dưới các tán cây cổ thụ, bên những tảng đá lớn hình voi phục, hình đầu rồng.`,
        culturalValue: `Hằng năm, vào ngày mùng 6 tháng Giêng âm lịch, lễ hội Đền Đuổm được tổ chức long trọng để tưởng nhớ công đức của Đức Thánh Đuổm.

Lễ hội bao gồm các nghi thức trang trọng như: lễ rước đất, rước nước, dâng hương; cùng các trò chơi dân gian đặc sắc như tung còn, đẩy gậy, chọi gà và hội thi làm bánh chưng, bánh giầy.

Đây là điểm hẹn du lịch tâm linh quan trọng nhất của tỉnh Thái Nguyên mỗi dịp Tết đến Xuân về. Với tấm lòng trung quân ái quốc, Dương Tự Minh được nhân dân tôn kính là vị thần tối cao, biểu tượng của sự đoàn kết giữa các dân tộc miền núi và triều đại trung ương.`,
        gallery: [lucGiacImg, lucGiacImg, lucGiacImg, lucGiacImg],
        relatedRelics: [2, 3, 5]
    },
    2: {
        id: 2,
        name: 'XƯỞNG QUÂN GIỚI - NƠI CHẾ TẠO BAZOKA',
        category: 'Cấp Quốc Gia',
        location: 'Xã Trần Yên, huyện Võ Nhai, tỉnh Thái Nguyên',
        image: dinhHoaImg,
        yearEstablished: 'GS. Viện sĩ Trần Đại Nghĩa',
        recognitionDate: 'Ngày 3/3/1947',
        area: 'Di tích Quốc gia',
        openingHours: 'Huyện Võ Nhai',
        history: `Di tích địa điểm Xưởng Quân giới (Xưởng 1 - Giang Tiên) nằm tại xã Trần Yên (trước đây thuộc xã Tràng Xá), huyện Võ Nhai, tỉnh Thái Nguyên. Đây là nơi ghi dấu sự kiện lịch sử trọng đại: Quân và dân ta đã nghiên cứu và sản xuất thành công súng Bazooka vào đầu năm 1947.

Vào cuối năm 1946, khi thực dân Pháp đưa xe tăng và thiết giáp vào chiến trường Việt Nam, đòi hỏi phải có vũ khí hạng nặng để đánh chặn. Dưới sự chỉ đạo trực tiếp của Giáo sư, Viện sĩ Trần Đại Nghĩa (Cục trưởng Cục Quân giới lúc bấy giờ), nhóm cán bộ tại xưởng quân giới đóng tại Trần Yên đã nghiên cứu dựa trên những quả đạn Bazooka hỏng thu được của địch.

Ngày 3/3/1947, tại đây, quả đạn Bazooka đầu tiên đã bắn trúng mục tiêu, đánh dấu một bước ngoặt về kỹ thuật quân sự, giúp quân đội ta có khả năng tiêu diệt xe tăng địch ngay từ những ngày đầu kháng chiến.`,
        architecture: `Hiện nay, di tích đã được đầu tư tôn tạo với các hạng mục chính bao gồm: Bia đá kỷ niệm hình mũi tên vươn cao, biểu tượng cho sức mạnh của đạn phản lực, và khu vực nhà trưng bày.

Không gian xung quanh di tích vẫn giữ được nét hoang sơ của vùng núi rừng chiến khu xưa, nơi các lán trại quân giới từng ẩn mình dưới tán rừng già để tránh sự phát hiện của máy bay địch.

Đây là địa chỉ đỏ giáo dục truyền thống cách mạng cho thế hệ trẻ và cán bộ chiến sĩ quân đội.`,
        culturalValue: `Việc chế tạo thành công súng Bazooka tại Xưởng quân giới Trần Yên có ý nghĩa chiến lược cực kỳ quan trọng. Nó đã bẻ gãy ưu thế về xe tăng của quân Pháp, đặc biệt là trong chiến dịch Việt Bắc Thu - Đông 1947.

Thành tựu này khẳng định trí tuệ Việt Nam, khả năng ứng dụng khoa học hiện đại vào điều kiện thực tế của chiến trường, biến những thứ tưởng chừng như không thể thành vũ khí lợi hại để bảo vệ độc lập dân tộc.

Di tích này không chỉ là niềm tự hào của ngành Quân giới Việt Nam mà còn là biểu tượng cho tinh thần sáng tạo, "tự lực cánh sinh" trong hoàn cảnh kháng chiến chống Pháp vô cùng gian khổ.`,
        gallery: [dinhHoaImg, dinhHoaImg, dinhHoaImg, dinhHoaImg],
        relatedRelics: [1, 3, 4]
    },
    3: {
        id: 3,
        name: 'NƠI THÀNH LẬP SƯ ĐOÀN 308',
        category: 'Cấp Quốc Gia',
        location: 'Tổ dân phố Dương Tự Minh, thị trấn Đu, huyện Phú Lương, tỉnh Thái Nguyên',
        image: lucGiacImg,
        yearEstablished: 'Đại đoàn 308 - Quân Tiên Phong',
        recognitionDate: 'Ngày 28/8/1949',
        area: 'Di tích Quốc gia',
        openingHours: 'Thị trấn Đu, Phú Lương',
        history: `Di tích tọa lạc trên một quả đồi cao tại tổ dân phố Dương Tự Minh, thị trấn Đu, huyện Phú Lương, tỉnh Thái Nguyên. Tại chính nơi này, ngày 28/8/1949, Đại đoàn 308 (nay là Sư đoàn 308) – Đại đoàn chủ lực đầu tiên của Quân đội nhân dân Việt Nam đã chính thức được thành lập.

Sự ra đời của Đại đoàn 308 là mốc son chói lọi, đánh dấu bước phát triển vượt bậc của quân đội ta từ những đơn vị nhỏ lẻ lên thành những binh đoàn chủ lực, có khả năng tác chiến hiệp đồng quy mô lớn, đủ sức đương đầu với quân đội chuyên nghiệp của thực dân Pháp.

Trong buổi lễ thành lập trang nghiêm vào mùa thu năm 1949, dưới sự chứng kiến của Đại tướng Tổng tư lệnh Võ Nguyên Giáp và đồng chí Trần Đăng Ninh (đại diện Chính phủ), Đại tướng đã đọc bản Nhật lệnh giao nhiệm vụ cho Đại đoàn.`,
        architecture: `Khu di tích được xây dựng khang trang trên một khuôn viên rộng, bao quanh bởi những hàng cây xanh mát, tạo không gian uy nghiêm và tĩnh mịch.

Nhà bia di tích được xây dựng kiên cố, ghi lại tóm tắt lịch sử thành lập và những chiến công hiển hách của Sư đoàn qua hai cuộc kháng chiến. Hệ thống sân lễ và bia kỷ niệm là nơi tổ chức các buổi dâng hương, giáo dục truyền thống cho cán bộ, chiến sĩ Sư đoàn 308 mỗi khi về thăm "cội nguồn" và cho nhân dân địa phương.

Hiện nay, di tích đã có hệ thống mã QR để du khách có thể quét và đọc tư liệu lịch sử một cách nhanh chóng, sinh động.`,
        culturalValue: `Danh hiệu "Quân Tiên Phong" bắt nguồn từ bản Nhật lệnh với lời căn dặn: "Đại đoàn có nhiệm vụ cùng với các binh đoàn chủ lực khác đi tiên phong trên con đường tiêu diệt sinh lực địch, trên con đường chính quy hóa..."

Sau khi thành lập, Sư đoàn 308 đã tham gia hầu hết các chiến dịch lớn: Chiến dịch Biên giới (1950), Hòa Bình (1951), Tây Bắc (1952) và đặc biệt là Chiến dịch Điện Biên Phủ (1954). Sư đoàn vinh dự là đơn vị đầu tiên tiến về tiếp quản Hà Nội vào ngày 10/10/1954.

Trong kháng chiến chống Mỹ, Sư đoàn tham gia Chiến dịch Đường 9 - Nam Lào, chiến dịch Quảng Trị và là lực lượng dự bị chiến lược quan trọng trong Chiến dịch Hồ Chí Minh.`,
        gallery: [lucGiacImg, lucGiacImg, lucGiacImg, lucGiacImg],
        relatedRelics: [1, 2, 4]
    },
    4: {
        id: 4,
        name: 'ĐỀN QUAN NÚI ĐÁ XÔ',
        category: 'Cấp Tỉnh',
        location: 'Xã Phấn Mễ, huyện Phú Lương, tỉnh Thái Nguyên',
        image: dinhHoaImg,
        yearEstablished: 'Quan Lớn Tuần Tranh',
        recognitionDate: 'Theo Tín ngưỡng thờ Mẫu',
        area: 'Di tích cấp tỉnh',
        openingHours: 'Xã Phấn Mễ, Phú Lương',
        history: `Đền Quan Núi Đá Xô tọa lạc tại xã Phấn Mễ, huyện Phú Lương, tỉnh Thái Nguyên. Ngôi đền nằm ở một vị trí địa lý đặc biệt, tọa lạc ngay dưới chân và trong lòng các hang động của dãy núi Đá Xô – một quần thể núi đá vôi có hình thù kỳ vĩ, hiểm trở.

Sự kết hợp giữa kiến trúc nhân tạo và hang động tự nhiên tạo nên một không gian linh thiêng, thâm nghiêm, tách biệt với sự ồn ào của thế giới bên ngoài.

Đền Quan Núi Đá Xô là nơi thờ tự Quan Lớn Tuần Tranh (một vị quan lớn trong hàng Ngũ vị Tôn ông của Tín ngưỡng thờ Mẫu Tam phủ) cùng các vị thần linh, thánh mẫu trong hệ thống tín ngưỡng dân gian Việt Nam.`,
        architecture: `Điểm độc đáo nhất của Đền Quan Núi Đá Xô chính là hệ thống hang động tự nhiên. Đền không chỉ gồm các cung thờ bên ngoài mà phần lớn các ban thờ được đặt sâu trong lòng hang đá.

Những khối nhũ đá tự nhiên trải qua hàng triệu năm đã tạo nên những hình thù giống như rồng chầu, hổ phục, lọng che... tăng thêm vẻ huyền bí cho điện thờ.

Ngôi đền sở hữu thế "tọa sơn", từ cửa đền nhìn ra là không gian bao la của đồng ruộng và dòng sông Cầu uốn lượn, tạo nên một bức tranh sơn thủy hữu tình, mang lại cảm giác bình an cho du khách thập phương.`,
        culturalValue: `Theo huyền tích, Quan Lớn Tuần Tranh là người có công trong việc dẹp loạn, giữ yên vùng sông nước và biên ải. Ông được nhân dân tôn kính bởi sự uy nghiêm nhưng vô cùng nhân từ, luôn che chở cho người dân khỏi tai ương, dịch bệnh.

Ngoài thờ các vị thánh trong hệ thống đạo Mẫu, đền còn gắn liền với tục thờ các vị sơn thần, thần sông, thần núi của người dân địa phương, thể hiện sự giao thoa văn hóa đặc sắc giữa miền xuôi và miền ngược.

Đền Quan Núi Đá Xô không chỉ là nơi sinh hoạt văn hóa tâm linh của nhân dân trong vùng mà còn là điểm đến quan trọng trong tuyến du lịch tâm linh dọc quốc lộ 3 (thông với Đền Đuổm).`,
        gallery: [dinhHoaImg, dinhHoaImg, dinhHoaImg, dinhHoaImg],
        relatedRelics: [1, 5, 6]
    },
    5: {
        id: 5,
        name: 'ĐÌNH ĐẨU',
        category: 'Cấp Tỉnh',
        location: 'Xóm Đẩu, xã Động Đạt, huyện Phú Lương, tỉnh Thái Nguyên',
        image: lucGiacImg,
        yearEstablished: 'Phò mã Đô úy Dương Tự Minh',
        recognitionDate: 'Mùng 6 tháng Giêng',
        area: 'Di tích cấp tỉnh',
        openingHours: 'Xã Động Đạt, Phú Lương',
        history: `Đình Đẩu tọa lạc tại xóm Đẩu, xã Động Đạt, huyện Phú Lương, tỉnh Thái Nguyên. Đây là một công trình kiến trúc nghệ thuật và di tích lịch sử văn hóa cấp tỉnh, có mối liên kết chặt chẽ với cụm di tích Đền Đuổm.

Trong tâm thức của người dân địa phương, Đình Đẩu không chỉ là nơi sinh hoạt cộng đồng mà còn là "vệ tinh" văn hóa quan trọng thờ phụng vị anh hùng dân tộc có công với vùng đất Phú Lương.

Bên cạnh giá trị tín ngưỡng, Đình Đẩu còn là một "địa chỉ đỏ" trong thời kỳ kháng chiến chống thực dân Pháp. Với địa thế thuận lợi của vùng chiến khu Việt Bắc, ngôi đình từng là nơi hội họp, dừng chân và là trạm trung chuyển lương thực, vũ khí của các đơn vị bộ đội, dân quân du kích.`,
        architecture: `Đình Đẩu mang nét kiến trúc truyền thống của đình làng Việt Nam với hệ thống cột gỗ lim chắc chắn và mái lợp ngói vảy rồng.

Mặc dù đã trải qua những thăng trầm của thời gian và chiến tranh, ngôi đình vẫn giữ được vẻ cổ kính, thâm nghiêm.

Không gian xung quanh đình được bao bọc bởi cây cối xanh mát, tạo nên bức tranh làng quê yên bình của vùng đất Việt Bắc.`,
        culturalValue: `Đình Đẩu là nơi thờ phụng Phò mã Đô úy Dương Tự Minh (Đức Thánh Đuổm) – vị thủ lĩnh tài ba của người Tày thời nhà Lý. Việc thờ tự ông tại đây thể hiện sự lan tỏa sức ảnh hưởng và lòng tôn kính sâu sắc của nhân dân đối với người đã có công dẹp loạn, giữ yên biên cương và dạy dân cách làm ăn.

Vào các dịp lễ tiết, nhân dân xóm Đẩu và các vùng lân cận thường tập trung tại đình để thực hiện các nghi thức tế lễ, cầu mong mùa màng bội thu và cuộc sống bình an.

Hằng năm, lễ hội tại Đình Đẩu thường được tổ chức gắn liền với các hoạt động của lễ hội Đền Đuổm (mùng 6 tháng Giêng), tạo nên một không gian văn hóa cộng đồng đặc sắc, thắt chặt tình đoàn kết giữa các dân tộc anh em trên địa bàn.`,
        gallery: [lucGiacImg, lucGiacImg, lucGiacImg, lucGiacImg],
        relatedRelics: [1, 6, 7]
    },
    6: {
        id: 6,
        name: 'ĐỀN TRÌNH',
        category: 'Cấp Tỉnh',
        location: 'Xã Động Đạt, huyện Phú Lương, tỉnh Thái Nguyên',
        image: dinhHoaImg,
        yearEstablished: 'Các vị thần canh cửa',
        recognitionDate: 'Mùng 6 tháng Giêng',
        area: 'Di tích cấp tỉnh',
        openingHours: 'Xã Động Đạt, Phú Lương',
        history: `Đền Trình (thường được gọi là Đền Trình Phú Lương) nằm trong quần thể các di tích gắn liền với danh thắng núi Đuổm, xã Động Đạt, huyện Phú Lương, tỉnh Thái Nguyên.

Đúng như tên gọi, đây là nơi du khách và các tín đồ dừng chân đầu tiên để làm lễ "trình báo" với các vị thần linh trước khi vào hành lễ tại Đền Đuổm (Đền chính). Việc này thể hiện nét đẹp trong văn hóa ứng xử của người Việt: "Đi thưa, về trình", thể hiện sự tôn trọng tôn ty trật tự trong thế giới tâm linh.

Trong mối liên kết với Đức Thánh Đuổm Dương Tự Minh, Đền Trình được coi là nơi tiếp đón, kiểm soát và dẫn dắt các tâm nguyện của con dân trước khi được đệ trình lên vị thủ lĩnh tối cao.`,
        architecture: `Dù có quy mô nhỏ hơn so với Đền Hạ hay Đền Thượng, Đền Trình vẫn sở hữu nét kiến trúc truyền thống với mái đao cong, lợp ngói mũi hài và hệ thống cửa bức bàn cổ kính.

Đền thường tọa lạc ở vị trí thoáng đãng ngay lối vào quần thể di tích, bao quanh là các cây cổ thụ hoặc không gian vườn tượng, tạo cảm giác nhẹ nhàng, tĩnh tâm cho du khách sau một chặng đường di chuyển trước khi bắt đầu hành trình leo núi dâng hương.

Không gian kiến trúc hài hòa với thiên nhiên, tạo nên vẻ đẹp thanh tịnh đặc trưng của các công trình tín ngưỡng vùng Việt Bắc.`,
        culturalValue: `Đền Trình là nơi thờ phụng các vị quan canh cửa, các vị thần bộ tướng hoặc thần Đương niên hành khiển – những vị thần có nhiệm vụ bảo vệ, canh giữ sự bình yên cho khu vực di tích chính.

Người dân tin rằng, lễ trình có thành tâm thì việc cầu nguyện tại đền chính mới được linh ứng.

Đền Trình không chỉ là điểm dừng chân tâm linh mà còn là nơi lưu giữ những giá trị văn hóa phi vật thể qua các nghi thức tế lễ đầu xuân. Trong lễ hội Đền Đuổm (mùng 6 tháng Giêng), Đền Trình là nơi khởi đầu cho các đoàn rước, tạo nên một không khí lễ hội trang nghiêm và rực rỡ sắc màu.`,
        gallery: [dinhHoaImg, dinhHoaImg, dinhHoaImg, dinhHoaImg],
        relatedRelics: [1, 5, 7]
    },
    7: {
        id: 7,
        name: 'ĐỀN KHUÂN',
        category: 'Cấp Tỉnh',
        location: 'Xóm Khuân, xã Phục Linh, huyện Đại Từ, tỉnh Thái Nguyên',
        image: lucGiacImg,
        yearEstablished: 'Phò mã Đô úy Dương Tự Minh',
        recognitionDate: 'Sau lễ hội Đền Đuổm',
        area: 'Di tích cấp tỉnh',
        openingHours: 'Xã Phục Linh, Đại Từ',
        history: `Đền Khuân tọa lạc tại xóm Khuân, xã Phục Linh, huyện Đại Từ (giáp ranh với huyện Phú Lương), tỉnh Thái Nguyên. Đền nằm trong vùng đất cổ, nơi có địa hình đồi núi nhấp nhô và những cánh đồng xanh mướt.

Đây là một trong những ngôi đền quan trọng trong hệ thống các di tích thờ phụng Đức Thánh Đuổm dọc theo lưu vực sông Cầu và các vùng lân cận chiến khu Việt Bắc.

Điểm đặc biệt của Đền Khuân là gắn liền với những truyền thuyết địa phương về việc Dương Tự Minh dừng chân nghỉ ngơi hoặc huấn luyện binh sĩ tại đây trong quá trình tuần thú phương Bắc. Việc lập đền thờ tại xóm Khuân khẳng định tầm ảnh hưởng sâu rộng của ông không chỉ ở trung tâm phủ Phú Lương xưa mà còn lan tỏa sang các vùng lân cận như Đại Từ.`,
        architecture: `Đền Khuân mang đặc trưng của kiến trúc đền làng miền núi với quy mô vừa phải, tạo cảm giác gần gũi và ấm cúng.

Đền được xây dựng theo kiểu chữ Đinh hoặc chữ Nhất truyền thống, mái lợp ngói vảy rồng, các cột gỗ được kê trên chân tảng đá vững chãi.

Đền thường nằm dưới những tán cây cổ thụ, bên cạnh là dòng suối hoặc nguồn nước tự nhiên, tạo nên một không gian phong thủy hữu tình, đúng với quan niệm "linh khí tụ hội" của người dân địa phương.`,
        culturalValue: `Cũng như nhiều ngôi đền trong vùng, nhân vật thờ tự chính tại Đền Khuân là Phò mã Đô úy Dương Tự Minh. 

Đền Khuân là nơi diễn ra các hoạt động văn hóa tâm linh quan trọng của cư dân xóm Khuân và xã Phục Linh. Hằng năm, người dân thường tổ chức lễ dâng hương vào dịp đầu xuân (thường là sau lễ hội Đền Đuổm) để cầu mong sức khỏe, bình an cho bản làng.

Ngôi đền là sợi dây gắn kết cộng đồng các dân tộc Tày, Nùng, Kinh trong vùng, là nơi lưu giữ những câu chuyện kể về lòng yêu nước và ý chí tự lực tự cường của cha ông.`,
        gallery: [lucGiacImg, lucGiacImg, lucGiacImg, lucGiacImg],
        relatedRelics: [1, 5, 6]
    }
};

// Get all relics for related section
const ALL_RELICS = [
    { id: 1, name: 'ĐỀN ĐUỔM', image: lucGiacImg },
    { id: 2, name: 'XƯỞNG QUÂN GIỚI - NƠI CHẾ TẠO BAZOKA', image: dinhHoaImg },
    { id: 3, name: 'NƠI THÀNH LẬP SƯ ĐOÀN 308', image: lucGiacImg },
    { id: 4, name: 'ĐỀN QUAN NÚI ĐÁ XÔ', image: dinhHoaImg },
    { id: 5, name: 'ĐÌNH ĐẨU', image: lucGiacImg },
    { id: 6, name: 'ĐỀN TRÌNH', image: dinhHoaImg },
    { id: 7, name: 'ĐỀN KHUÂN', image: lucGiacImg },
];

export default function DiTichDetail() {
    const { id } = useParams();
    const [relic, setRelic] = useState(null);

    useEffect(() => {
        document.body.classList.add("no-padding");
        return () => {
            document.body.classList.remove("no-padding");
        };
    }, []);

    useEffect(() => {
        // Get relic data by ID
        const relicId = parseInt(id);
        const relicData = RELIC_DETAILS[relicId] || RELIC_DETAILS[1];
        setRelic(relicData);
        
        // Scroll to top on page load
        window.scrollTo(0, 0);
    }, [id]);

    if (!relic) {
        return <div className="ditich-detail-loading">Đang tải...</div>;
    }

    const relatedRelics = relic.relatedRelics
        .map(relicId => ALL_RELICS.find(r => r.id === relicId))
        .filter(Boolean)
        .slice(0, 3);

    return (
        <div className="ditich-detail-page">
            {/* HERO SECTION */}
            <section 
                className="ditich-detail-hero"
                style={{ backgroundImage: `url(${heroBg})` }}
            >
                <div className="ditich-detail-hero-content">
                    {/* Left - Info */}
                    <div className="ditich-detail-hero-info">
                        <Link to="/di-tich" className="ditich-detail-back-link">
                            ← Trở về Di Tích
                        </Link>
                        
                        <span className="ditich-detail-category">{relic.category}</span>
                        
                        <h1 className="ditich-detail-title">{relic.name}</h1>
                        
                        <div className="ditich-detail-location">
                            <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            <span>{relic.location}</span>
                        </div>
                    </div>
                    {/* Right - Featured Image */}
                    <div className="ditich-detail-hero-image">
                        <div className="ditich-detail-image-frame">
                            <img src={relic.image} alt={relic.name} />
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <section className="ditich-detail-content">
                <div className="ditich-detail-content-wrapper">
                    {/* Sidebar - Quick Info */}
                    <aside className="ditich-detail-sidebar">
                        <div className="ditich-detail-info-card">
                            <h3 className="ditich-detail-info-title">Thông Tin</h3>
                            
                            <div className="ditich-detail-info-item">
                                <span className="info-label">Thờ</span>
                                <span className="info-value">{relic.yearEstablished}</span>
                            </div>
                            
                            <div className="ditich-detail-info-item">
                                <span className="info-label">Lễ hội</span>
                                <span className="info-value">{relic.recognitionDate}</span>
                            </div>
                            
                            <div className="ditich-detail-info-item">
                                <span className="info-label">Công nhận</span>
                                <span className="info-value">{relic.area}</span>
                            </div>
                            
                            <div className="ditich-detail-info-item">
                                <span className="info-label">Địa điểm</span>
                                <span className="info-value">{relic.openingHours}</span>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="ditich-detail-main">
                        <article className="ditich-detail-section">
                            <h2 className="ditich-detail-section-title">
                                <span className="section-accent"></span>
                                Lịch Sử
                            </h2>
                            <div className="ditich-detail-text">
                                {relic.history.split('\n\n').map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        </article>

                        <article className="ditich-detail-section">
                            <h2 className="ditich-detail-section-title">
                                <span className="section-accent"></span>
                                Kiến Trúc
                            </h2>
                            <div className="ditich-detail-text">
                                {relic.architecture.split('\n\n').map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        </article>

                        <article className="ditich-detail-section">
                            <h2 className="ditich-detail-section-title">
                                <span className="section-accent"></span>
                                Giá Trị Văn Hóa
                            </h2>
                            <div className="ditich-detail-text">
                                {relic.culturalValue.split('\n\n').map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        </article>
                    </main>
                </div>
            </section>

            {/* IMAGE GALLERY SECTION */}
            <section className="ditich-detail-gallery">
                <h2 className="ditich-detail-gallery-title">Hình Ảnh</h2>
                <div className="ditich-detail-gallery-track">
                    {relic.gallery.map((img, index) => (
                        <div key={index} className="ditich-detail-gallery-item">
                            <div className="ditich-detail-gallery-frame">
                                <img src={img} alt={`${relic.name} - Hình ${index + 1}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* RELATED RELICS SECTION */}
            <section className="ditich-detail-related">
                <h2 className="ditich-detail-related-title">Di Tích Liên Quan</h2>
                <div className="ditich-detail-related-grid">
                    {relatedRelics.map((relatedRelic) => (
                        <Link 
                            key={relatedRelic.id} 
                            to={`/di-tich/${relatedRelic.id}`}
                            className="ditich-detail-related-card"
                        >
                            <div className="ditich-detail-related-image">
                                <img src={relatedRelic.image} alt={relatedRelic.name} />
                            </div>
                            <h3 className="ditich-detail-related-name">{relatedRelic.name}</h3>
                        </Link>
                    ))}
                </div>
            </section>

            {/* FOOTER DECORATION */}
            <section className="ditich-detail-footer">
                <div className="ditich-detail-footer-image">
                    <img src={footerImg} alt="Vietnamese Temple Decoration" />
                </div>
            </section>
        </div>
    );
}
