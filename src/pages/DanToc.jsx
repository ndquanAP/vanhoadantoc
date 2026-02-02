import { useState, useEffect } from 'react';
import "./css/DanToc.css";
import TipTapContentRenderer from '../components/TipTapContentRenderer';

import frameDT from '../assets/imagesAssets/dan-toc/frame.png';
import danToc_1_img from '../assets/imagesAssets/dan-toc/dantoc_1.png';

import backgroundDT from '../assets/imagesAssets/dan-toc/bg_dantoc.png';
import bgTextSelectDT from '../assets/imagesAssets/dan-toc/bg_text_select.png';

import infoTop from '../assets/imagesAssets/dan-toc/info_top.png';
import infoBottom from '../assets/imagesAssets/dan-toc/info_bottom.png';

import infoAvaBG from '../assets/imagesAssets/dan-toc/info_avatar_bg.png';

// Fallback avatar image when no imgCover or content images are available
import tayThaiAva from '../assets/imagesAssets/dan-toc/tay-thai/avatar.png';



// Helper function to extract first image from TipTap content (fallback for thumbnail)
function getFirstImageFromContent(content) {
    if (!content || !content.content) return null;

    for (const node of content.content) {
        if (node.type === 'image' && node.attrs?.src) {
            return node.attrs.src;
        }
    }
    return null;
}

export default function DanToc() {
    const [selectedEthnic, setSelectedEthnic] = useState(null);
    const [ethnicGroups, setEthnicGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch ethnic content from API
    useEffect(() => {
        fetch('http://localhost:3001/api/content?type=ethnic&limit=50')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch ethnic content');
                return res.json();
            })
            .then(data => {
                setEthnicGroups(data.items || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching ethnic content:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => { document.body.classList.add("no-padding"); return () => { document.body.classList.remove("no-padding"); }; }, []);


    // --- VIEW 2: DETAIL PAGE ---
    if (selectedEthnic) {
        // Get thumbnail for avatar circle (use imgCover or first image from content)
        const avatarImage = selectedEthnic.imgCover || getFirstImageFromContent(selectedEthnic.content) || tayThaiAva;

        return (
            <div className="min-h-screen bg-white font-sans text-gray-800 pb-10"
                style={{
                    backgroundImage: `url(${infoBottom})`,
                    backgroundSize: 'cover',
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
                        style={{ padding: '5px' }}
                    >
                        ← Quay lại
                    </button>

                    {/* Title - using item.title from API */}
                    <h1 className="text-3xl md:text-4xl font-serif tracking-widest uppercase text-white text-center px-4"
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
                    >
                        {selectedEthnic.title}
                    </h1>

                    {/* Circular Avatar */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-40 h-40 rounded-full z-30 bg-gray-200 overflow-hidden">
                        {/* Background Image */}
                        <img
                            src={infoAvaBG}
                            alt="Background"
                            className="absolute inset-0 w-full h-full object-cover rounded-full scale-150"
                        />
                        {/* Foreground Avatar */}
                        <img
                            src={avatarImage}
                            alt={selectedEthnic.title}
                            className="absolute inset-0 w-full h-full object-cover z-40"
                        />
                    </div>
                </div>

                {/* CONTENT SECTION - Now uses TipTapContentRenderer */}
                <div className="dantoc-container relative z-10">
                    <div
                        className="max-w-5xl mx-auto px-6"
                        style={{ paddingTop: '120px' }}
                    >
                        {/* Render TipTap content */}
                        <TipTapContentRenderer content={selectedEthnic.content} />
                    </div>
                </div>
            </div>
        );
    }

    // --- VIEW 1: SELECTION GRID ---

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-[#fdf5e6] flex flex-col items-center justify-center"
                style={{
                    backgroundImage: `url(${backgroundDT})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="dantoc-loading">
                    <div className="dantoc-loading-spinner"></div>
                    <p className="dantoc-loading-text">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="min-h-screen bg-[#fdf5e6] flex flex-col items-center justify-center"
                style={{
                    backgroundImage: `url(${backgroundDT})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="text-center p-8">
                    <p className="text-red-600 text-lg mb-4">Không thể tải dữ liệu dân tộc</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-[#1a5d3a] text-white rounded hover:bg-[#0f3d26]"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    // Show empty state if no content
    if (ethnicGroups.length === 0) {
        return (
            <div className="min-h-screen bg-[#fdf5e6] flex flex-col items-center justify-center"
                style={{
                    backgroundImage: `url(${backgroundDT})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="text-center p-8">
                    <p className="text-[#1a5d3a] text-lg">Chưa có nội dung dân tộc nào được thêm vào.</p>
                </div>
            </div>
        );
    }

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
                <div className="text-[200px]"></div>
            </div>

            <header className="text-center mb-12 z-10" style={{ marginTop: '100px' }}>
                <img src={bgTextSelectDT} alt="CÁC DÂN TỘC trên địa bàn tỉnh Thái Nguyên" className="mx-auto w-125" />
            </header>

            {/* Grid of Ethnicities - now from API */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 max-w-6xl w-full z-10">
                {ethnicGroups.map((ethnic) => {
                    // Get thumbnail: prefer imgCover, fallback to first image in content
                    const thumbnailImage = ethnic.imgCover || getFirstImageFromContent(ethnic.content) || danToc_1_img;

                    return (
                        <div
                            key={ethnic.id}
                            className="group cursor-pointer flex flex-col items-center"
                            onClick={() => setSelectedEthnic(ethnic)}
                        >
                            {/* Card Container */}
                            <div className="relative w-full aspect-square md:aspect-[4/5] rounded-t-3xl rounded-b-lg overflow-hidden border-4 border-transparent transition-all duration-300
                                hover:scale-105 cursor-pointer flex items-center justify-center"
                            >
                                {/* Decorative frame */}
                                <img
                                    src={frameDT}
                                    className="absolute w-3/4 h-3/4 object-contain transform translate-y-4 z-0"
                                    alt="frame"
                                />

                                {/* Ethnic thumbnail image */}
                                <img
                                    src={thumbnailImage}
                                    className="relative w-[85%] h-[85%] object-cover z-10 rounded"
                                    alt={ethnic.title}
                                />

                                {/* Name label */}
                                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 bg-yellow-50 px-10 h-[40px]
                                    flex items-center justify-center rounded-md border border-[#2B6841] min-w-[170px] text-center
                                    group-hover:bg-[#d19c4c] group-hover:text-white transition-colors">
                                    <span className="font-bold text-[#1a4332] group-hover:text-white text-lg truncate max-w-[150px]">
                                        {ethnic.title}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
