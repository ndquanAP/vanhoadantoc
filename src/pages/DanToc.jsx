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






const ETHNIC_DATA = [
    { id: 'dao', name: 'DAO', color: '#1a4332' },
    { id: 'tay-thai', name: 'TÀY THÁI', color: '#1a4332', isFull: true },
    { id: 'kinh', name: 'KINH', color: '#1a4332' },
    { id: 'nung', name: 'NÙNG', color: '#1a4332' },
    { id: 'san-diu', name: 'SÁN DÌU', color: '#1a4332' },
    { id: 'san-chay', name: 'SÁN CHAY', color: '#1a4332' },
    { id: 'hmong', name: 'H’MÔNG', color: '#1a4332' },
    { id: 'hoa', name: 'HOA', color: '#1a4332' },
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
                    >
                        ← Quay lại
                    </button>
                    {/* <h1 className="text-4xl font-serif tracking-widest uppercase border-b border-white/50 pb-2">
                        DÂN TỘC {selectedEthnic.name}
                    </h1> */}

                    <img src={tayThaiHeader} className="mx-auto w-125"></img>

                    {/* Circular Placeholder for Illustration */}


                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-40 h-40 rounded-full z-30 bg-gray-200">

                        {/* Background Image - Thêm rounded-full và overflow-hidden riêng cho nền nếu cần */}
                        <img
                            src={infoAvaBG}
                            alt="Background"
                            className="absolute inset-0 w-full h-full object-cover rounded-full scale-150"
                        />

                        {/* Foreground Avatar - Phóng to và hiển thị đè lên trên */}
                        <img
                            src={tayThaiAva}
                            alt="Avatar"
                            className="absolute inset-0 w-full h-full object-contain z-40 transform scale-175"
                        />
                        {/* Tăng scale-150 lên scale-175 hoặc hơn nếu bạn muốn nó to nữa */}
                    </div>




                </div>

                {/* Content Section */}


                <div className='dantoc-container  relative z-10'
                >
                    <div className="max-w-5xl mx-auto px-6 mt-24 text-center"
                        style={{
                            paddingTop: '150px'
                        }}
                    >
                        <p className="mb-8 text-justify">
                            Người {selectedEthnic.name} là một trong những dân tộc thiểu số có số dân
                            đông nhất ở Việt Nam, sinh sống tập trung tại các tỉnh vùng Đông Bắc
                            , trong đó Thái Nguyên là một địa bàn quan trọng. Cộng đồng người {selectedEthnic.name} gắn bó lâu đời với núi rừng, sông suối và
                            nền nông nghiệp lúa nước truyền thống. Qua nhiều thế hệ, họ đã hình thành nên một bản sắc văn hóa đặc trưng,
                            thể hiện rõ trong kiến trúc nhà sàn, trang phục chàm, tín ngưỡng dân gian và các loại hình nghệ thuật truyền thống.
                            Những giá trị ấy tạo nên một không gian văn hóa mộc mạc, bền bỉ và giàu bản sắc giữa vùng núi rừng Đông Bắc.
                        </p>

                        {/* Photo Gallery Grid */}
                        {/* Thay đổi grid-cols-3 thành grid-cols-5 */}


                        <div className="flex flex-wrap gap-2 my-8" style={{ marginTop: '30px' }}>

                            {/* Ảnh 1: Tự động co giãn theo tỉ lệ ảnh gốc */}
                            <div className="h-48 flex-grow">
                                <img
                                    src={tayThaiImg1}
                                    className="h-full w-full object-contain  rounded"
                                    alt="Hoạt động 1"
                                />
                            </div>

                            {/* Ảnh 2: Tự động co giãn theo tỉ lệ ảnh gốc */}
                            <div className="h-48 flex-grow">
                                <img
                                    src={tayThaiImg2}
                                    className="h-full w-full object-contain  rounded"
                                    alt="Hoạt động 2"
                                />
                            </div>

                            {/* Ảnh 3: Dòng riêng bên dưới */}
                            <div className="w-full flex justify-center mt-2">
                                <div className="h-64 w-full max-w-4xl">
                                    <img
                                        src={tayThaiImg3}
                                        className="h-full w-full object-contain rounded"
                                        alt="Toàn cảnh"
                                    />
                                </div>
                            </div>
                        </div>




                        {/* Sub-heading Decoration Section */}
                        <div className="relative mt-24 mb-20 px-4" style={{ marginTop: '50px' }}>
                            {/* The Decorative Border Box */}
                            <div className="border border-[#b34026] p-8 md:p-12 pt-16 relative w-[500px] max-w-[90%]"
                                style={{
                                    margin: '0 auto'
                                }}
                            >


                                {/* The Label: "Bản sắc văn hóa" - Tăng diện tích phần trong suốt */}
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

                                {/* Large Stylized Title - Giữ text-center, không để class màu */}
                                <h3 className="text-xl md:text-2xl  mb-8 text-center tracking-wide"
                                    style={{
                                        marginTop: '10px',
                                        color: '#A30C0C'
                                    }}
                                >
                                    giữa núi rừng Tây Bắc
                                </h3>


                                {/* The Text Content: Removed mx-auto and text-center (default is left) */}
                                <div className="flex flex-col items-center w-full">

                                    {/* THE TEXT BOX: Resize bằng max-w và giữ text-justify */}
                                    <div className="max-w w-full">
                                        <p className="leading-relaxed text-sm md:text-base text-justify"
                                            style={{
                                                padding: '20px'
                                            }}
                                        >
                                            Người {selectedEthnic.name} có nhiều kinh nghiệm đắp phai, đào mương, dựng cọn,
                                            bắc máng lấy nước làm ruộng. Lúa nước là nguồn lương thực chính,
                                            đặc biệt là lúa nếp. Người Thái cũng làm mương để trồng lúa, hoa màu và nhiều thứ cây khác.
                                            Từng gia đình chăn nuôi gia súc, gia cầm, đan lát, dệt vải, một số nơi làm đồ gốm...
                                            Sản phẩm nổi tiếng của người Thái là vải thổ cẩm, với những văn hoá độc đáo,
                                            màu sắc tươi hài hoà, bền đẹp.
                                        </p>
                                    </div>

                                </div>


                            </div>
                        </div>


                        {/* Third section */}

                        <p className="mb-8 text-justify"
                            style={{
                                marginTop: '50px',
                            }}
                        >
                            Người {selectedEthnic.name} sinh sống tập trung tại các huyện miền núi và
                            trung du của tỉnh Thái Nguyên, thường quần tụ thành từng bản làng nằm ven suối,
                            chân núi hoặc thung lũng thấp. Mỗi bản có từ vài chục đến hàng trăm nóc nhà, gắn bó chặt chẽ trong sinh hoạt cộng đồng. Người {selectedEthnic.name} truyền
                            thống ở nhà sàn làm bằng gỗ, mái lợp lá cọ hoặc ngói âm dương. Nhà thường quay mặt ra cánh đồng hoặc dòng nước, vừa thuận tiện cho
                            sản xuất nông nghiệp, vừa mang ý nghĩa phong thuỷ. Không gian nhà được phân chia rõ ràng giữa nơi sinh hoạt, tiếp khách và thờ cúng tổ tiên.
                            <br /><br />
                            Người {selectedEthnic.name} quan niệm con người sau khi mất sẽ tiếp tục sang một thế giới khác. Vì vậy, lễ tang được tổ chức trang trọng như một nghi lễ tiễn
                            đưa người đã khuất về với tổ tiên.
                            <br /><br />
                            Đồng bào {selectedEthnic.name} thờ cúng tổ tiên, thần núi, thần sông và các lực lượng siêu nhiên gắn với bản mường. Các dòng họ có những quy định,
                            kiêng kỵ riêng nhằm giữ gìn sự hài hoà trong cộng đồng. Trong năm, người {selectedEthnic.name} tổ chức nhiều lễ nghi nông nghiệp như lễ cầu mùa, lễ xuống đồng,
                            thể hiện ước mong mùa màng gối hoà, mùa màng bội thu.
                            <br /><br />
                        </p>


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
                                src={danToc_1_img}
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
