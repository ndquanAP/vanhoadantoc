import { useState, useEffect } from 'react';
import "./css/DanToc.css";

import frameDT from '../assets/imagesAssets/dan-toc/frame.png';
import danToc_1_img from '../assets/imagesAssets/dan-toc/dantoc_1.png';
import danToc_2_img from '../assets/imagesAssets/dan-toc/dantoc_2.png';


import backgroundDT from '../assets/imagesAssets/dan-toc/bg_dantoc.png';
import bgTextSelectDT from '../assets/imagesAssets/dan-toc/bg_text_select.png';


import infoTop from '../assets/imagesAssets/dan-toc/info_top.png';
import infoBottom from '../assets/imagesAssets/dan-toc/info_bottom.png';

import infoAvaBG from '../assets/imagesAssets/dan-toc/info_avatar_bg.png';

import tayThaiHeader from '../assets/imagesAssets/dan-toc/tay-thai/info_header.png';
import tayThaiAva from '../assets/imagesAssets/dan-toc/tay-thai/avatar.png';

import tayThaiImg1 from '../assets/imagesAssets/dan-toc/tay-thai/highlight_1.png';
import tayThaiImg2 from '../assets/imagesAssets/dan-toc/tay-thai/highlight_2.png';
import tayThaiImg3 from '../assets/imagesAssets/dan-toc/tay-thai/highlight_3.png';






// const ETHNIC_DATA = [
//     { id: 'dao', name: 'DAO', color: '#1a4332' },
//     { id: 'tay-thai', name: 'TÀY THÁI', color: '#1a4332', isFull: true },
//     { id: 'kinh', name: 'KINH', color: '#1a4332' },
//     { id: 'nung', name: 'NÙNG', color: '#1a4332' },
//     { id: 'san-diu', name: 'SÁN DÌU', color: '#1a4332' },
//     { id: 'san-chay', name: 'SÁN CHAY', color: '#1a4332' },
//     { id: 'hmong', name: 'H’MÔNG', color: '#1a4332' },
//     { id: 'hoa', name: 'HOA', color: '#1a4332' },
// ];


const ETHNIC_DATA = [
    {
        id: 'tay-thai',
        name: 'TÀY THÁI',
        headerImg: tayThaiHeader, // The "DÂN TỘC TÀY THÁI" text image
        cardAvatar: danToc_1_img,
        avatar: tayThaiAva,
        // description: "",
        description: "Trên địa bàn xã hiện có trên 5 nghìn người, sinh sống rải rác tại 74 xóm trên địa bàn xã.  <br/> <br/> Người Tày là cư dân nông nghiệp có truyền thống làm ruộng nước, từ lâu đời đã biết thâm canh và áp dụng rộng rãi các biện pháp thủy lợi như đào mương, bắc máng, đắp phai, làm cọn lấy nước ruộng. Ngoài lúa nước, người Tày còn trồng lúa khô, hoa màu, cây ăn quả... chăn nuối phát triển với nhiều loại gia súc, gia cầm, phổ biến là cách nuôi chăn thả rông.  <br/> <br/> Các nghề thủ công gia đình được chú ý. Nổi tiếng nhất là nghề dệt thổ cẩm với nhiều loại hoa văn đẹp và độc đáo  <br/> <br/> Nhắc đến người Tày không thể không nhắc đến những ngôi nhà sàn truyền thống vốn là biểu tượng cho sự tinh tế trong kiến trúc dân gian. Dù hiện nay quá trình hiện đại hóa đang diễn ra mạnh mẽ, nhưng vẫn còn hiện hữu những mái nhà sàn lợp lá cọ hoặc ngói âm dương vẫn được gìn giữ như một báu vật của dòng họ. Ngôi nhà truyền thống của người Tày là nhà sàn làm theo kiểu vì kèo 4, 5, 6 hoặc 7 hàng cột, nhà có 2 hoặc 4 mái, xung quanh nhà thưng ván gỗ hoặc che bằng liếp nứa.  <br/> <br/> Nhà sàn của người Tày không chỉ là không gian sinh hoạt mà còn là nơi chứa đựng các giá trị tâm linh, với cách bài trí bàn thờ tổ tiên và bếp lửa trung tâm mang đậm những quy tắc ứng xử tôn nghiêm. Lối sống của người Tày trọng sự chân thành, mộc mạc nhưng lại vô cùng tinh tế trong cách đối nhân xử thế, điều này được phản ánh rõ nét qua các phong tục tập quán và sự hiếu khách đặc trưng của đồng bào vùng cao.",
        gallery: [tayThaiImg1, tayThaiImg2, tayThaiImg3],
        subTitle: "giữa núi rừng Tây Bắc",
        subContent: "Trước kia, người Tày ăn cơm (xôi) gạo nếp là chính và hầu như gia đình nào cũng có chõ đồ xôi. Trong các ngày tết, ngày lễ thường làm nhiều loại bánh như bánh chưng, bánh dày, bánh gai, bánh dợm, bánh gio, bánh trôi, bánh khảo...",
        footerContent: "Linh hồn trong đời sống tinh thần của người Tày chính là nghệ thuật Hát Then và đàn Tính. Đây không chỉ là một loại hình văn nghệ dân gian mà đã được UNESCO vinh danh là Di sản văn hóa phi vật thể đại diện của nhân loại. Tại Phú Lương, tiếng đàn Tính cùng những lời Then cổ vẫn vang vọng trong các nghi lễ cầu an, giải hạn hay những đêm hội giao duyên. Hát Then là sự kết hợp nhuần nhuyễn giữa âm nhạc, vũ đạo và các nghi thức tâm linh, thể hiện khát vọng của con người về một cuộc sống bình an, mưa thuận gió hòa, sức sống bền bỉ của Then trong đời sống đương đại, thông qua các câu lạc bộ nghệ thuật tại trên địa bàn, là minh chứng cho ý thức tự tôn dân tộc và nỗ lực bảo tồn di sản của cộng đồng người Tày trước những biến động của thời gian. Ngoài ra người Tày còn có loại hình nghệ thuật múa bát đã được Bộ Văn hóa, Thể thao và Du lịch công nhận là di sản văn hóa phi vật thể cấp Quốc gia. <br/> <br/> Gắn liền với các chu kỳ sản xuất nông nghiệp, Lễ hội Lồng Tồng (hay còn gọi là Lễ hội xuống đồng) của người Tày là sự kiện văn hóa lớn nhất và có sức lan tỏa mạnh mẽ nhất tại Thái Nguyên. Lễ hội không chỉ là không gian tâm linh mà còn là nơi trình diễn những nét tinh túy nhất của văn hóa Tày, từ các trò chơi dân gian như tung còn, đẩy gậy đến những sản vật ẩm thực độc đáo như bánh chưng đen, cơm lam, xôi ngũ sắc. Lễ hội đã trở thành một thương hiệu du lịch văn hóa đặc sắc, góp phần quảng bá hình ảnh con người Thái Nguyên đến với bạn bè trong và ngoài nước."
   
    },
    {
        id: 'dao',
        name: 'DAO',
        headerImg: tayThaiHeader,
        cardAvatar: danToc_1_img,
        avatar: tayThaiAva,
        description: "Với dân số gần 1000 người, dân tộc Dao sinh sống tập trung chủ yếu tại các xóm phía Bắc của xã Phú Lương. <br/><br/> Linh hồn trong đời sống văn hóa của người Dao chính là Lễ Cấp sắc, một nghi lễ quan trọng nhất trong cuộc đời của mỗi người đàn ông Dao. Đây không chỉ là nghi thức tôn giáo mà còn là một \"bản hiến pháp\" về đạo đức, đánh dấu sự trưởng thành và công nhận của cộng đồng cũng như tổ tiên đối với người được cấp sắc. Trong không gian trang nghiêm của những ngôi nhà trình tường hay nhà sàn, dưới sự điều hành của các thầy cúng, người thụ lễ sẽ được giáo huấn về lòng hiếu thảo, sự trung thực và trách nhiệm với dòng họ. Di sản văn hóa phi vật thể quốc gia này chính là sợi dây liên kết vô hình nhưng cực kỳ bền chặt, giữ cho cộng đồng người Dao luôn đoàn kết và duy trì được những chuẩn mực đạo đức truyền thống giữa sự biến đổi không ngừng của xã hội hiện đại.",
        gallery: [tayThaiImg1, tayThaiImg2, tayThaiImg3],
        subTitle: "Nét đẹp vùng cao",
        subContent: "Song hành với những nghi lễ tâm linh là nghệ thuật thêu thùa bằng tay tinh xảo, một niềm tự hào của phụ nữ Dao. Khác với kỹ thuật thêu của các dân tộc khác, phụ nữ Dao thêu từ mặt trái của tấm vải và không cần khung thêu, họ tính toán các họa tiết dựa trên việc đếm từng sợi chỉ. Những họa tiết hình học, hình cây thông, hình con chim hay biểu tượng của mặt trời trên khăn đội đầu và tà áo không chỉ là trang trí mà còn là những \"ký tự\" kể về lịch sử di cư và thế giới quan của tộc người. Màu sắc trên trang phục đồng bào người Dao đã tạo nên một điểm nhấn mỹ thuật rực rỡ giữa màu xanh của núi rừng trung du.",
        footerContent: "Nhắc đến người Dao xã Phú Lương, không thể không nhắc đến điệu múa chuông - múa rùa, được Bộ Văn hóa, Thể thao và Du lịch đưa vào danh mục di sản văn hóa phi vật thể, đây là điệu múa mang đậm tính tín ngưỡng và sử thi của dân tộc Dao, thường biểu diễn trong lễ Tết nhảy, lễ cấp sắc. Múa chuông dùng chuông nhỏ, còn múa rùa (pẻo tộ) tái hiện cảnh săn bắt, thể hiện sự hòa hợp âm dương, sức mạnh cộng đồng và sự biết ơn tổ tiên. "
    },
    {
        id: 'kinh',
        name: 'KINH',
        headerImg: tayThaiHeader,
        cardAvatar: danToc_1_img,
        avatar: tayThaiAva,
        description: "Tổng số trên 24 nghìn người. sinh sống trên địa bàn 74 xóm trên địa bàn xã Phú Lương. Đại bộ phận người Kinh sinh sống thành từng làng, xóm, tập trung tại các xóm thuộc thị trấn Giang Tiên (trước sắp xếp). Người Kinh có rất nhiều dòng họ, có những họ rất phổ biến như Nguyễn, Trần, Lê, Phạm… dường như địa phương nào cũng có. Mỗi tộc họ, thường có nhà thờ tổ riêng, họ lại chia ra làm nhiều chi phái và mỗi chi phái lại bao gồm nhiều nhánh. Anh em họ hàng, kể cả họ nội và họ ngoại đều yêu thương giúp đỡ lẫn nhau. <br/><br/> Nền nông nghiệp trồng trọt và chăn nuôi của người Kinh, áp dụng khoa học kỹ thuật, đạt năng suất cao. Nền công nghiệp phát triển hiện đại, ứng dụng khoa học - kỹ thuật, công nghệ cao. Gồm các ngành như: điện, điện tử, công nghệ thông tin và viễn thông, dệt may, da giày, xây dựng, chế biến thực phẩm... <br/><br/> Trong gia đình người Kinh, người chồng (người cha) là chủ. Con cái lấy họ theo cha và họ hàng phía cha là “họ nội”, còn phía mẹ là “họ ngoại”. Con trai đầu có trách nhiệm tổ chức thờ phụng cha mẹ, ông bà đã khuất. <br/><br/> Hôn nhân theo chế độ một vợ một chồng, việc cưới xin phải trải qua nhiều nghi thức: Dạm ngõ, hỏi, cưới, lại mặt và trước đó phải qua đăng ký kết hôn thì đôi trai gái chính thứctrowr thành cặp vợ chồng. <br/><br/> Văn học dân gian với nhiều thể loại phong phú: Truyện cổ tích, ca dao, dân ca, tục ngữ... phản ánh toàn bộ mọi mặt cuộc sống của dân tộc, văn học viết cũng đã đạt được những thành tựu to lớn ở giai đoạn Lý - Trần và đặc biệt từ thế kỷ XV về sau với các cây bút thiên tài như Nguyễn Trãi, Nguyễn bÌnh Khiêm, Hồ Xuân Hương... Các môn nghệ thuật như mỹ thuật, âm nhạc, sân khấu ...phát triển cao,được chuyên nghiệp hóa.",
        gallery: [tayThaiImg1, tayThaiImg2, tayThaiImg3],
        subTitle: "Cội nguồn văn hóa",
        subContent: "Người kinh thường ở nhà trệt. Trong khuôn viên thường được bố trí liên hoàn nhà - sân - vườn - ao. Ngôi nhà chính thường có kết cấu 3 gian hoặc 5 gian, gian giữa là trang trọng nhất, đặt bàn thờ tổ tiên, những gian bên là nơi nghỉ ngơi, sinh hoạt của các thành viên trong gia đình, nơi cất trữ lương thực, của cải của gia đình.",
        footerContent: "Người Kinh ăn cơm gạo tẻ là chính, cơm gạo nếp (xôi) chỉ gặp trong những ngày lễ tết. Trong bữa cơm hàng ngày thường có cơm, món mặn (thịt, cá, trứng), món xào (rau, củ, quả) và món canh. Đặc biệt người Kinh rất ưa dùng các loại mắm (mắm tôm, cá, tép, cáy...) và các loại dưa (cải, hành, cà, kiểu)."
    },
    {
        id: 'nung',
        name: 'NÙNG',
        headerImg: tayThaiHeader,
        cardAvatar: danToc_1_img,
        avatar: tayThaiAva,
        description: "Trong bức tranh đa sắc tộc của xã Phú Lương, dân tộc Nùng hiện lên với một vẻ đẹp mộc mạc, bền bỉ và giàu lòng nhân ái với dân số hiện có gần 5000 người, sinh sống rải rác tại các xóm trên địa bàn xã. <br/><br/> Nét đặc trưng dễ nhận diện nhất của người Nùng chính là sắc chàm truyền thống bao phủ trên trang phục hằng ngày. Nghệ thuật nhuộm chàm của người Nùng không chỉ là một nghề thủ công mà đã nâng tầm thành một biểu tượng của sự kiên nhẫn và lòng tự tôn dân tộc. Những bộ trang phục của phụ nữ Nùng thường không thêu thùa cầu kỳ như người Mông hay người Dao, nhưng lại đạt đến độ tinh tế cao trong những đường cắt may, cách bố trí khuy bấm bạc và sự phối hợp giữa vải chàm với những mảng lụa màu nhỏ ở cổ áo. Sắc chàm trầm mặc ấy không chỉ phản ánh mối quan hệ mật thiết của con người với thiên nhiên mà còn tượng trưng cho sự chung thủy, bền gan vững chí của người dân vùng cao trước những khắc nghiệt của thời gian. <br/><br/> Về đời sống tinh thần, người Nùng sở hữu một \"báu vật\" nghệ thuật vô giá chính là hát Sli. Đây là một hình thức dân ca đối đáp nam nữ, thường được trình diễn theo lối bè hai thanh thoát và uyển chuyển. Khác với hát Then cần có nhạc cụ đi kèm, hát Sli hoàn toàn dựa vào sự phối hợp nhịp nhàng của âm giọng, tạo nên những giai điệu khỏe khoắn nhưng không kém phần sâu lắng. Hát Sli đã được Bộ Văn hóa, Thể thao và Du lịch công nhận là Di sản văn hóa phi vật thể quốc gia, trở thành sợi dây kết nối cộng đồng và là điểm nhấn thu hút du khách trong các hành trình khám phá văn hóa bản địa.",
        gallery: [tayThaiImg1, tayThaiImg2, tayThaiImg3],
        subTitle: "Sắc màu chàm đặc trưng",
        subContent: "Người Nùng phần lớn là ở nhà sàn, một số ở nhà đất làm theo kiểu trình tường hoặc xây bằng gạch mộc. Mặt bằng sinh hịat trong nhà chia làm hai phần: một phần dành cho phụ nữ sinh hoạt, một phần dành cho nam giới sinh hoạt. <br/><br/> Người Nùng còn có kiểu nhà đặc biệt gọi là nhà phòng thủ để phòng chống trộm cướp. Trên tường còn đục nhiều lỗ châu mai, có nhà còn để lô cốt chiến đấu.",
        footerContent: "Trước đây người Nùng chủ yếu ăn ngô là chính. Ngô được xay thành bột để nấu cháo đặc như bánh đúc. Thức ăn thường được chế biến bằng cách rán, xào, nấu, ít khi luộc. Nhiều người kiêng ăn thịt trâu, bò, chó. Món ăn độc đáo của người Nùng là khâu nhục. Tục mời nhau uống rượu chéo chén có lịch sử từ lâu đời, nay đã thành tập quán của đồng bào."
    },
    {
        id: 'san-diu',
        name: 'SÁN DÌU',
        headerImg: tayThaiHeader,
        cardAvatar: danToc_1_img,
        avatar: tayThaiAva,
        description: "Trong sự đa dạng của cộng đồng các dân tộc tại Thái Nguyên, dân tộc Sán Dìu hiện lên với một bản sắc vô cùng độc đáo, vừa mang nét mộc mạc của cư dân nông nghiệp, vừa ẩn chứa chiều sâu của một kho tàng văn nghệ dân gian phong phú. Với dân số khoảng 44.000 người, chiếm tỉ lệ đáng kể trong cơ cấu dân cư của tỉnh, người Sán Dìu định cư tập trung chủ yếu ở các vùng chân núi và thung lũng thuộc các huyện Đại Từ, Đồng Hỷ, Phú Lương và thành phố Phổ Yên. Khác với các dân tộc thiểu số khác thường chọn lối sống nhà sàn trên cao, người Sán Dìu từ bao đời nay đã gắn bó với những ngôi nhà trệt (nhà đất), phản ánh một triết lý sống vững chãi, gần gũi với đất đai và phù hợp với đặc thù canh tác vườn đồi vùng trung du.<br/><br/>Đặc điểm sinh hoạt của người Sán Dìu tại Thái Nguyên ghi dấu ấn đậm nét bởi sự cần cù và khéo léo trong việc khai thác địa hình đồi núi. Họ là những bậc thầy trong việc quy hoạch vườn đồi, kết hợp chăn nuôi gia súc quy mô lớn với trồng cây ăn quả và cây công nghiệp. Trong trang phục truyền thống, phụ nữ Sán Dìu mang một vẻ đẹp khỏe khoắn nhưng không kém phần duyên dáng với chiếc váy xẻ bốn tà màu chàm, thắt lưng màu xanh hoặc hồng nổi bật và đặc biệt là đôi xà cạp trắng quấn chân – một chi tiết trang phục vừa mang tính thẩm mỹ, vừa giúp bảo vệ người phụ nữ trong quá trình lao động trên nương rẫy. Sự giản dị trong trang phục chính là biểu hiện của một lối sống chân phương, coi trọng thực chất và sự bền bỉ của cộng đồng người Sán Dìu qua bao thế hệ.<br/><br/>Linh hồn rực rỡ nhất trong đời sống tinh thần của người Sán Dìu tại Thái Nguyên chính là làn điệu Soọng Cô. Đây là loại hình hát giao duyên đối đáp nam nữ, một di sản văn hóa phi vật thể quốc gia đã được vinh danh và bảo tồn mạnh mẽ tại địa phương. Soọng Cô không chỉ đơn thuần là những câu hát trữ tình về tình yêu đôi lứa mà còn là nhịp cầu kết nối cộng đồng, là nơi gửi gắm những chiêm nghiệm về cuộc đời, ca ngợi lao động sản xuất và tình yêu quê hương đất nước. Những đêm hát Soọng Cô vang lên dưới bóng núi Tam Đảo không chỉ là một hình thức giải trí mà còn là một \"trường học\" văn hóa, nơi thế hệ cha anh truyền dạy cho con cháu những chuẩn mực đạo đức và niềm tự hào về nguồn cội. Hiện nay, các câu lạc bộ Soọng Cô tại các xã như Nam Hòa (Đồng Hỷ) hay Bình Thuận (Đại Từ) vẫn đang hoạt động sôi nổi, trở thành những điểm sáng trong phong trào bảo tồn di sản văn hóa dân tộc của tỉnh",
        gallery: [tayThaiImg1, tayThaiImg2, tayThaiImg3],
        subTitle: "Văn hóa làng bản",
        subContent: "Bên cạnh nghệ thuật ca hát, người Sán Dìu tại Thái Nguyên còn duy trì những phong tục tập quán đặc sắc trong cưới hỏi và các nghi lễ thờ cúng. Lễ cưới của người Sán Dìu là một sự kiện cộng đồng lớn với nhiều nghi thức độc đáo, thể hiện sự trọng thị đối với dòng họ và tình làng nghĩa xóm. Trong tín ngưỡng dân gian, họ cũng có những nghi lễ \"cấp sắc\" (gọi là Lễ Đại Phan) mang đậm dấu ấn của đạo giáo kết hợp với thờ cúng tổ tiên, nhằm giáo dục con người về lòng nhân ái và sự trung thực. Ẩm thực của người Sán Dìu cũng mang phong vị riêng với các món cháo loãng hay các món ăn chế biến từ nông sản địa phương, phản ánh một nền văn hóa ẩm thực bình dị nhưng tinh tế, luôn gắn liền với chu kỳ sản xuất nông nghiệp.",
        footerContent: "Trong xu thế hội nhập, cộng đồng người Sán Dìu ở Thái Nguyên đã có những bước tiến dài trong việc phát triển kinh tế, trở thành những chủ thể năng động trong phong trào xây dựng nông thôn mới. Việc kết hợp giữa canh tác chè đặc sản với phát triển du lịch cộng đồng đang mở ra những triển vọng mới cho đồng bào Sán Dìu dưới chân núi Tam Đảo. Những nếp nhà truyền thống, những làn điệu Soọng Cô sâu lắng đang dần trở thành những \"địa chỉ đỏ\" thu hút du khách đến trải nghiệm và khám phá. Sự đóng góp của người Sán Dìu vào bức tranh văn hóa chung của tỉnh không chỉ nằm ở những giá trị vật thể mà còn ở tinh thần đoàn kết, ý thức tự tôn và khát khao giữ gìn hồn cốt dân tộc giữa nhịp sống hiện đại."
    },
    {
        id: 'san-chay',
        name: 'SÁN CHAY',
        headerImg: tayThaiHeader,
        cardAvatar: danToc_1_img,
        avatar: tayThaiAva,
        description: "Nếu ví bức tranh văn hóa Thái Nguyên là một bản hòa ca thì dân tộc Sán Chay chính là những nhịp điệu rộn ràng, mạnh mẽ và tràn đầy hơi thở của núi rừng. Với dân số khoảng 40.000 người, cư trú chủ yếu tại các huyện Phú Lương, Đồng Hỷ và Phú Bình, người Sán Chay tại Thái Nguyên bao gồm hai nhóm địa phương chính là Cao Lan và Sán Chí. Dù có những khác biệt nhất định về ngôn ngữ và trang phục, nhưng cả hai nhóm đều thống nhất trong một ý thức cộng đồng bền chặt, cùng nhau giữ gìn những giá trị văn hóa phi vật thể quý báu đã được vinh danh ở cấp quốc gia. Người Sán Chay thường chọn cư trú ở vùng đồi núi thấp, nơi họ có thể kết hợp nhuần nhuyễn giữa canh tác lúa nước tại thung lũng và trồng cây ăn quả, cây công nghiệp trên các triền đồi, tạo nên một phương thức sinh kế thích ứng hoàn hảo với địa hình trung du. <br/><br/> Linh hồn và biểu tượng rực rỡ nhất của người Sán Chay tại Thái Nguyên chính là múa Tắc Xình, hay còn gọi là múa Cầu mùa. Đây không chỉ là một điệu múa dân gian thuần túy mà là một nghi lễ tâm linh quan trọng, phản ánh sâu sắc nhân sinh quan và khát vọng của con người về một sự hòa hợp giữa thiên địa và nhân sinh. Điệu múa Tắc Xình lấy âm thanh của tiếng gõ tre làm chủ đạo, với nhịp điệu \"tắc, tắc, xình\" mô phỏng những động tác phát nương, cuốc đất, gieo hạt và săn bắn. Tại huyện Phú Lương, nơi điệu múa này được bảo tồn nguyên bản nhất, Tắc Xình đã trở thành Di sản văn hóa phi vật thể quốc gia, không chỉ xuất hiện trong các dịp lễ tết mà còn là niềm tự hào của cộng đồng trong các hoạt động giao lưu văn hóa quốc tế. Mỗi nhịp bước của những chàng trai, cô gái Sán Chay trong điệu múa là một lời tạ ơn gửi đến tổ tiên, cầu mong cho mùa màng tươi tốt, bản làng bình yên và vạn vật sinh sôi.",
        gallery: [tayThaiImg1, tayThaiImg2, tayThaiImg3],
        subTitle: "Vũ điệu Tắc Xình",
        subContent: "Song hành cùng vũ điệu mạnh mẽ là những lời hát Sình ca đầy chất trữ tình, một kho tàng văn thơ dân gian đồ sộ của nhóm Cao Lan nói riêng và người Sán Chay nói chung. Hát Sình ca là hình thức hát đối đáp giữa nam và nữ, diễn ra trong nhiều bối cảnh khác nhau, từ việc đi hội, chúc tết cho đến những buổi lao động trên nương rẫy. Những câu hát không chỉ là lời tỏ tình đôi lứa mà còn ẩn chứa những bài học đạo đức, kinh nghiệm sản xuất và sự tri ân nguồn cội. Tại các xã như Tức Tranh hay Phấn Mễ (Phú Luong), các câu lạc bộ Sình ca vẫn duy trì hoạt động đều đặn, nơi các nghệ nhân lão thành truyền dạy cho thế hệ trẻ từng con chữ, từng làn điệu, để hơi thở của ngàn xưa không bị mai một trước sự lấn át của đời sống hiện đại.",
        footerContent: "Trang phục của người Sán Chay ở Thái Nguyên mang một vẻ đẹp giản dị nhưng chứa đựng sự tinh tế trong kỹ thuật cắt may. Phụ nữ Sán Chay thường mặc áo dài ngang bắp chân, thắt lưng lụa xanh hoặc hồng, tạo nên một diện mạo thanh thoát giữa sắc xanh của đồi chè và núi rừng. Điểm nhấn đặc biệt chính là những hoa văn thêu thủ công trên khăn đội đầu và tà áo, phản ánh thế giới quan đa dạng về cỏ cây, hoa lá và các biểu tượng tâm linh. Trong sinh hoạt hằng ngày, người Sán Chay còn nổi tiếng với kho tàng ẩm thực phong phú, từ những món ăn dân dã như bánh chưng dài, xôi lá cẩm cho đến nghệ thuật chế biến các sản vật từ núi rừng, thể hiện sự khéo léo và trân trọng nguồn thực phẩm mà thiên nhiên ban tặng."
    },
    {
        id: 'hmong',
        name: 'H’MÔNG',
        headerImg: tayThaiHeader,
        cardAvatar: danToc_1_img,
        avatar: tayThaiAva,
        description: "Với dân số trên 300 người, sinh sống tập trung tại xóm Đồng Tâm xã Phú Lương và rải rác tại một số xóm trên địa bàn xã. <br/><br/> Sự hiện diện của người Mông đã tạo dựng nên một không gian văn hoá biệt lập nhưng đầy sức hút, nơi những giá trị truyền thống được gìn giữ gần như nguyên vẹn qua nhiều thế kỷ. <br/><br/> Kiến trúc nhà ở của người Mông thường là nhà trệt, tường trình bằng đất nện dày để giữ ấm trong mùa đông và mát mẻ trong mùa hè, một kỹ thuật kiến trúc bản địa tinh xảo. Trong không gian nhà ở, bếp lửa luôn đỏ rực không chỉ để sưởi ấm hay nấu nướng mà còn là trung tâm của các nghi lễ gia đình. Sự hiếu khách của người Mông cũng là một nét văn hoá đặc trưng, khách đến nhà luôn được mời chén rượu ngô thơm nồng và những món ăn truyền thống như thắng cố hay mèn mén, thể hiện sự chân thành và tình cảm nồng hậu của đồng bào vùng cao.",
        gallery: [tayThaiImg1, tayThaiImg2, tayThaiImg3],
        subTitle: "Bản tình ca trên đỉnh núi",
        subContent: "Điểm nhấn thị giác mạnh mẽ nhất khi nhắc đến người Mông chính là nghệ thuật tạo hình trên trang phục truyền thống. Phụ nữ Mông tại Thái Nguyên vẫn giữ thói quen tự tay dệt vải, nhuộm chàm và thêu thùa những bộ váy áo rực rỡ. Kỹ thuật vẽ sáp ong trên vải lanh (Batik) của người Mông là một kho tàng mỹ thuật dân gian vô giá, đòi hỏi sự kiên nhẫn và đôi bàn tay cực kỳ khéo léo. Những hoạ tiết hình học đối xứng, hình hoa văn vảy rồng hay những biểu tượng thiên nhiên trên tà áo không chỉ là trang trí mà còn là ngôn ngữ biểu tượng kể về lịch sử di cư và niềm tự hào của tộc người. Mỗi bộ trang phục không chỉ là quần áo, mà là một tác phẩm nghệ thuật sống động, phản ánh sức sống mãnh liệt và tâm hồn yêu cái đẹp của người Mông giữa màu xám của đá và màu xanh của rừng.",
        footerContent: "Nếu trang phục là vẻ đẹp hữu hình thì tiếng khèn chính là linh hồn vô hình gắn kết cộng đồng người Mông. Tiếng khèn Mông không chỉ là nhạc cụ trong các buổi giao lưu văn nghệ mà còn là phương tiện kết nối cõi nhân gian với thế giới tâm linh. Nghệ thuật múa khèn của đàn ông Mông với những bước nhảy mạnh mẽ, những vòng quay điêu luyện thể hiện tinh thần thượng võ và sự khoẻ khoắn của những người con núi rừng. Trong các lễ hội trong năm của người Mông nhằm tạ ơn thần linh và cầu phúc, tiếng khèn vang vọng khắp các sườn núi như lời tự sự của dòng họ, lời mời gọi bạn bè và lời thề nguyền chung thủy của đôi lứa. Nghệ thuật trình diễn khèn mông được Bộ Văn hóa, Thể thao và Du lịch xếp hạng di sản văn hoá phi vật thể quốc gia."
    },
    {
        id: 'hoa',
        name: 'HOA',
        headerImg: tayThaiHeader,
        cardAvatar: danToc_1_img,
        avatar: tayThaiAva,
        description: "Với dân số khoảng 749.466 người, cộng đồng người Hoa sinh sống trải dài khắp Việt Nam, tập trung đông nhất tại các đô thị lớn như TP. Hồ Chí Minh (khu vực Chợ Lớn) và các tỉnh miền Tây. Sự hiện diện của người Hoa đã tạo nên những khu phố cổ sầm uất, nơi các giá trị truyền thống được gìn giữ qua hàng thế kỷ, hòa quyện giữa hơi thở hiện đại và chiều sâu văn hóa cổ xưa. <br/><br/> Kiến trúc đặc trưng nhất là những ngôi nhà phố liền kề kết hợp kinh doanh và các Hội quán (như Hội quán Phúc Kiến, Quảng Đông). Nhà thường được xây theo kiểu \"hình ống\", lợp ngói âm dương với các trang trí phù điêu bằng gốm sứ tinh xảo trên mái nhà. Trong không gian sống, bàn thờ tổ tiên và các vị thần (Quan Công, Thiên Hậu) luôn được đặt ở vị trí trang trọng nhất, thắp nén hương trầm nghi ngút để cầu mong sự bình an và thịnh vượng. Sự hiếu khách của người Hoa thể hiện qua văn hóa thưởng trà và những bữa cơm gia đình sum vầy, nơi những món ẩm thực tinh tế như sủi cảo, vịt quay luôn được trân trọng mời khách.",
        gallery: [tayThaiImg1, tayThaiImg2, tayThaiImg3],
        subTitle: "Giao thoa bản sắc",
        subContent: "Điểm nhấn thị giác đặc sắc nhất chính là bộ sườn xám (Cheongsam) và áo Thượng Hải. Phụ nữ Hoa thường diện những bộ sườn xám ôm sát cơ thể với những đường cắt may tinh tế, thêu họa tiết mẫu đơn hoặc rồng phượng bằng chỉ vàng. Kỹ thuật thêu tay trên lụa đòi hỏi sự tỉ mỉ và thẩm mỹ cao, tạo nên vẻ đẹp thanh cao nhưng không kém phần sang trọng. Mỗi bộ trang phục không chỉ là quần áo, mà còn là biểu tượng của sự gia đạo êm ấm và lòng tự hào về nguồn cội, thường được diện trong những dịp trọng đại như cưới hỏi, lễ Tết.",
        footerContent: "Nếu kiến trúc là vẻ đẹp hữu hình thì nghệ thuật múa Lân - Sư - Rồng chính là linh hồn gắn kết cộng đồng người Hoa. Tiếng trống hội rộn rã phối hợp cùng những động tác võ thuật uyển chuyển, mạnh mẽ không chỉ là một hình thức giải trí mà còn là nghi thức cầu may, xua đuổi điềm xấu. Trong các lễ hội lớn như Tết Nguyên Tiêu, những màn biểu diễn điêu luyện trên mai hoa thung mang theo niềm tin mãnh liệt về sự thăng tiến và phát đạt. Nghệ thuật lân sư rồng và Lễ hội Nguyên Tiêu của người Hoa ở Quận 5 đã được Bộ Văn hóa, Thể thao và Du lịch công nhận là Di sản văn hóa phi vật thể quốc gia"
    }
    // Add others here (Kinh, Nung, etc.)
];

export default function DanToc() {
    const [selectedEthnic, setSelectedEthnic] = useState(null);

    useEffect(() => { document.body.classList.add("no-padding"); return () => { document.body.classList.remove("no-padding"); }; }, []);


    // --- VIEW 2: DETAIL PAGE ---
    if (selectedEthnic) {
        return (

            <div className="min-h-screen bg-white font-sans text-gray-800 pb-10"
                style={{
                    backgroundImage: `url(${infoBottom})`,
                    backgroundSize: 'covert',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    fontFamily: "'Candara', 'Optima', 'Verdana', 'Tahoma', sans-serif",
                    color: '#410101'

                }}
            >
                {/* Header Banner */}
                <div className="relative h-84 bg-[#b34026] flex flex-col items-center justify-center text-white"
                    style={{
                        backgroundImage: `url(${infoTop})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <button
                        onClick={() => setSelectedEthnic(null)}
                        className="absolute bottom-4 left-4 bg-white/20 hover:bg-white/40 px-4 py-1 rounded-md text-sm"
                        style={{
                            padding: `5px`
                        }}
                    >
                        ← Quay lại
                    </button>
                    {/* <h1 className="text-4xl font-serif tracking-widest uppercase border-b border-white/50 pb-2">
                        DÂN TỘC {selectedEthnic.name}
                    </h1> */}

                    {/* DYNAMIC HEADER IMAGE - Restored to your exact original <img> tag */}
                    <img
                        src={selectedEthnic.headerImg}
                        className="mx-auto w-125"
                        alt={selectedEthnic.name}
                    />

                    {/* Circular Placeholder - Restored to your exact original structure */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-40 h-40 rounded-full z-30 bg-gray-200">

                        {/* Background Image - Restored scale-150 and removed opacity filters */}
                        <img
                            src={infoAvaBG}
                            alt="Background"
                            className="absolute inset-0 w-full h-full object-cover rounded-full scale-150"
                        />

                        {/* Foreground Avatar - Restored z-40 and scale-175 */}
                        <img
                            src={selectedEthnic.avatar} // Dynamic key mapping
                            alt="Avatar"
                            className="absolute inset-0 w-full h-full object-contain z-40 transform scale-175"
                        />
                    </div>




                </div>

                {/* CONTENT SECTION */}
                <div className="dantoc-container relative z-10">
                    <div
                        className="max-w-5xl mx-auto px-6 text-center"
                        style={{ paddingTop: '150px' }} // Added space for the floating avatar
                    >
                        {/* DYNAMIC DESCRIPTION */}
                        <p className="mb-8 text-justify leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: selectedEthnic.description }}
                        />

                        {/* DYNAMIC GALLERY - RESTORED FLEX BEHAVIOR */}
                        <div className="flex flex-wrap gap-2 my-8" style={{ marginTop: '30px' }}>
                            {/* Image 1 & 2 share a row */}
                            <div className="h-48 flex-grow">
                                <img
                                    src={selectedEthnic.gallery[0]}
                                    className="h-full w-full object-contain rounded"
                                    alt="1"
                                />
                            </div>
                            <div className="h-48 flex-grow">
                                <img
                                    src={selectedEthnic.gallery[1]}
                                    className="h-full w-full object-contain rounded"
                                    alt="2"
                                />
                            </div>

                            {/* Image 3 takes a full row below */}
                            <div className="w-full flex justify-center mt-2">
                                <div className="h-64 w-full max-w-4xl">
                                    <img
                                        src={selectedEthnic.gallery[2]}
                                        className="h-full w-full object-contain rounded"
                                        alt="3"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* DYNAMIC SUB-HEADING BOX - RESTORED DIMENSIONS & STYLING */}
                        <div className="relative mt-24 mb-20 px-4" style={{ marginTop: '50px' }}>
                            <div
                                className="border border-[#b34026] p-8 md:p-12 pt-16 relative w-[500px] max-w-[90%]"
                                style={{ margin: '0 auto' }}
                            >
                                {/* The Label */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                    bg-white/10 backdrop-blur-lg 
                                    px-16 py-4           
                                    rounded-full 
                                    border border-white/20 
                                    min-w-[225px]        
                                    flex items-center justify-center">
                                    <h3 className="text-sm md:text-base whitespace-nowrap tracking-widest font-bold"
                                        style={{ color: '#A30C0C' }}
                                    >
                                        Bản sắc văn hóa
                                    </h3>
                                </div>

                                {/* Dynamic Stylized Title */}
                                <h3
                                    className="text-xl md:text-2xl mb-8 text-center tracking-wide"
                                    style={{ marginTop: '10px', color: '#A30C0C' }}
                                >
                                    {selectedEthnic.subTitle}
                                </h3>

                                {/* Dynamic Box Content */}
                                <div className="flex flex-col items-center w-full">
                                    <p
                                        className="leading-relaxed text-sm md:text-base text-justify"
                                        style={{ padding: '10px' }}
                                        dangerouslySetInnerHTML={{ __html: selectedEthnic.subContent }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* DYNAMIC FOOTER TEXT */}
                        <p
                            className="mb-20 text-justify leading-relaxed whitespace-pre-line"
                            style={{ paddingTop: '50px', paddingBottom: '50px' }}
                            dangerouslySetInnerHTML={{ __html: selectedEthnic.footerContent }}
                        />
                    </div>
                </div>

            </div>
        );
    }

    // --- VIEW 1: SELECTION GRID ---
    return (
        <div className="min-h-screen bg-[#fdf5e6] p-8 flex flex-col items-center relative overflow-hidden"
            style={{
                backgroundImage: `url(${backgroundDT})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Background Decoration (Optional) */}
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                {/* You can put an SVG of a dragon/drum here */}
                <div className="text-[200px]"></div>
            </div>

            <header className="text-center mb-12 z-10"
                style={{
                    marginTop: '100px'
                }}
            >
                <img src={bgTextSelectDT} alt="CÁC DÂN TỘC trên địa bàn tỉnh Thái Nguyên" className="mx-auto w-125"></img>


            </header>

            {/* Grid of 8 Ethnicities */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 max-w-6xl w-full z-10">
                {ETHNIC_DATA.map((ethnic) => (
                    <div
                        key={ethnic.id}
                        className="group cursor-pointer flex flex-col items-center"
                        onClick={() => setSelectedEthnic(ethnic)}
                    >
                        {/* Card Container */}
                        {/* Reduced overall height relative to width (aspect-square instead of 4/5) to better accommodate the smaller frame and not crop the inner image */}
                        <div className="relative w-full aspect-square md:aspect-[4/5] rounded-t-3xl rounded-b-lg overflow-hidden border-4 border-transparent transition-all duration-300 
                            hover:scale-105 cursor-pointer flex items-center justify-center"
                        >

                            {/* 1. frameDT: Back to 3/4 size, moved DOWN using translate-y */}
                            <img
                                src={frameDT}
                                className="absolute w-3/4 h-3/4 object-contain transform translate-y-4 z-0"
                                alt="frame"
                            />

                            {/* 2. danToc_1_img: Positioned AFTER the frame to show OVER it */}
                            <img
                                src={ethnic.cardAvatar}
                                className="relative w-[85%] h-[85%] object-cover z-10"
                                alt={ethnic.name}
                            />

                            {/* Button/div for ethnic.name: increased padding (px-8 py-3) and min width (min-w-[160px]) */}
                            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 bg-yellow-50 px-10 h-[40px] 
                            flex items-center justify-center rounded-md border border-[#2B6841] min-w-[170px] text-center 
                            group-hover:bg-[#d19c4c] group-hover:text-white transition-colors">
                                <span className="font-bold text-[#1a4332] group-hover:text-white text-lg">
                                    {ethnic.name}
                                </span>
                            </div>

                        </div>
                    </div>
                ))}
            </div>




        </div>
    );
}
