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
        description: "Người Tày là một trong những dân tộc thiểu số có số dân đông nhất ở Việt Nam...",
        gallery: [tayThaiImg1, tayThaiImg2, tayThaiImg3],
        subTitle: "giữa núi rừng Đông Bắc",
        subContent: "Người Thái có nhiều kinh nghiệm đắp phai, đào mương...",
        footerContent: "Người Tày sinh sống tập trung tại các huyện miền núi..."
        
    },
    {
        id: 'dao',
        name: 'DAO',
        headerImg: null,
        cardAvatar: danToc_1_img,
        avatar: null,
        description: "",
        gallery: [],
        subTitle: "Nét đẹp vùng cao",
        subContent: "",
        footerContent: ""
    },
    {
        id: 'kinh',
        name: 'KINH',
        headerImg: null,
        cardAvatar: danToc_1_img,
        avatar: null,
        description: "",
        gallery: [],
        subTitle: "Cội nguồn văn hóa",
        subContent: "",
        footerContent: ""
    },
    {
        id: 'nung',
        name: 'NÙNG',
        headerImg: null,
        cardAvatar: danToc_1_img,
        avatar: null,
        description: "",
        gallery: [],
        subTitle: "Sắc màu chàm đặc trưng",
        subContent: "",
        footerContent: ""
    },
    {
        id: 'san-diu',
        name: 'SÁN DÌU',
        headerImg: null,
        cardAvatar: danToc_1_img,
        avatar: null,
        description: "",
        gallery: [],
        subTitle: "Văn hóa làng bản",
        subContent: "",
        footerContent: ""
    },
    {
        id: 'san-chay',
        name: 'SÁN CHAY',
        headerImg: null,
        cardAvatar: danToc_1_img,
        avatar: null,
        description: "",
        gallery: [],
        subTitle: "Vũ điệu Tắc Xình",
        subContent: "",
        footerContent: ""
    },
    {
        id: 'hmong',
        name: 'H’MÔNG',
        headerImg: null,
        cardAvatar: danToc_1_img,
        avatar: null,
        description: "",
        gallery: [],
        subTitle: "Bản tình ca trên đỉnh núi",
        subContent: "",
        footerContent: ""
    },
    {
        id: 'hoa',
        name: 'HOA',
        headerImg: null,
        cardAvatar: danToc_1_img,
        avatar: null,
        description: "",
        gallery: [],
        subTitle: "Giao thoa bản sắc",
        subContent: "",
        footerContent: ""
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
                        <p className="mb-8 text-justify leading-relaxed">
                            {selectedEthnic.description}
                        </p>

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
                                    >
                                        {selectedEthnic.subContent}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* DYNAMIC FOOTER TEXT */}
                        <p
                            className="mb-20 text-justify leading-relaxed whitespace-pre-line"
                            style={{ marginTop: '50px' }}
                        >
                            {selectedEthnic.footerContent}
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
