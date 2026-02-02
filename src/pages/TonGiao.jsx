import { useState, useEffect } from "react";
import "./css/TonGiao.css";
import TipTapContentRenderer from '../components/TipTapContentRenderer';

import headerBg from '../assets/imagesAssets/ton-giao/half_top.png';
import bottomBg from '../assets/imagesAssets/ton-giao/half_bottom.png';
import textTonGiao from '../assets/imagesAssets/ton-giao/text_ton_giao.png';

// Fallback images
import phatGiaoImg from '../assets/imagesAssets/ton-giao/phat_giao.png';

// Reusing generic assets from DanToc for detail view consistency
import infoTop from '../assets/imagesAssets/dan-toc/info_top.png';
import infoBottom from '../assets/imagesAssets/dan-toc/info_bottom.png';
import infoAvaBG from '../assets/imagesAssets/dan-toc/info_avatar_bg.png';

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

export default function TonGiao() {
    const [selectedReligion, setSelectedReligion] = useState(null);
    const [religionGroups, setReligionGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch religious content from API
    useEffect(() => {
        fetch('http://localhost:3001/api/content?type=religious&limit=50')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch religious content');
                return res.json();
            })
            .then(data => {
                setReligionGroups(data.items || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching religious content:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => { document.body.classList.add("no-padding"); return () => { document.body.classList.remove("no-padding"); }; }, []);

    // --- VIEW 2: DETAIL PAGE ---
    if (selectedReligion) {
        // Get thumbnail for avatar circle (use imgCover or first image from content)
        const avatarImage = selectedReligion.imgCover || getFirstImageFromContent(selectedReligion.content) || phatGiaoImg;

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
                        onClick={() => setSelectedReligion(null)}
                        className="absolute bottom-4 left-4 bg-white/20 hover:bg-white/40 px-4 py-1 rounded-md text-sm cursor-pointer z-50 pointer-events-auto"
                        style={{
                            padding: `5px 15px`,
                            border: '1px solid white'
                        }}
                    >
                        ← Quay lại
                    </button>

                    {/* Title from API */}
                    <h1 className="uppercase mb-4" 
                        style={{ 
                            fontFamily: "'UTM Copperplate'",
                            fontWeight: 700,
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            lineHeight: '120%',
                            letterSpacing: '-0.04em',
                            textTransform: 'uppercase',
                            background: 'linear-gradient(180deg, #FFFFFF 0%, #E9A12C 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                        {selectedReligion.title || 'Tôn Giáo'}
                    </h1>

                    {/* Circular Placeholder for Illustration */}
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
                            alt={selectedReligion.title}
                            className="absolute inset-0 w-full h-full object-contain z-40"
                        />
                    </div>
                </div>

                {/* Content Section - Now uses TipTapContentRenderer */}
                <div className='dantoc-container relative z-10'>
                    <div className="max-w-5xl mx-auto px-6"
                        style={{ paddingTop: '120px' }}
                    >
                        {/* Render TipTap content from API */}
                        <TipTapContentRenderer content={selectedReligion.content} />
                    </div>
                </div>
            </div>
        );
    }

    // --- LOADING STATE ---
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col relative overflow-hidden font-sans">
                {/* Background Layers */}
                <div className="absolute inset-0 z-0">
                    <div className="h-[45vh] bg-[#a63d24] w-full"
                        style={{
                            backgroundImage: `url(${headerBg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    <div className="h-[55vh] bg-white w-full"
                        style={{
                            backgroundImage: `url(${bottomBg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                </div>
                {/* Loading Content */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p className="text-white text-lg">Đang tải dữ liệu...</p>
                    </div>
                </div>
            </div>
        );
    }

    // --- ERROR STATE ---
    if (error) {
        return (
            <div className="min-h-screen flex flex-col relative overflow-hidden font-sans">
                {/* Background Layers */}
                <div className="absolute inset-0 z-0">
                    <div className="h-[45vh] bg-[#a63d24] w-full"
                        style={{
                            backgroundImage: `url(${headerBg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    <div className="h-[55vh] bg-white w-full"
                        style={{
                            backgroundImage: `url(${bottomBg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                </div>
                {/* Error Content */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
                    <div className="text-center p-8 bg-white/90 rounded-lg shadow-lg">
                        <p className="text-red-600 text-lg mb-4">Không thể tải dữ liệu tôn giáo</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-[#a63d24] text-white rounded hover:bg-[#8b3420]"
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- EMPTY STATE ---
    if (religionGroups.length === 0) {
        return (
            <div className="min-h-screen flex flex-col relative overflow-hidden font-sans">
                {/* Background Layers */}
                <div className="absolute inset-0 z-0">
                    <div className="h-[45vh] bg-[#a63d24] w-full"
                        style={{
                            backgroundImage: `url(${headerBg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    <div className="h-[55vh] bg-white w-full"
                        style={{
                            backgroundImage: `url(${bottomBg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                </div>
                {/* Empty Content */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
                    <div className="text-center p-8">
                        <p className="text-white text-lg">Chưa có nội dung tôn giáo nào được thêm vào.</p>
                    </div>
                </div>
            </div>
        );
    }

    // --- VIEW 1: SELECTION GRID (Main Page) ---
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden font-sans ">

            {/* 1. BACKGROUND LAYERS */}
            <div className="absolute inset-0 z-0">
                {/* Top Red Section */}
                <div className="h-[45vh] bg-[#a63d24] w-full relative"
                    style={{
                        backgroundImage: `url(${headerBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                </div>

                {/* Bottom White/Wheat Section */}
                <div className="h-[55vh] bg-white w-full relative"
                    style={{
                        backgroundImage: `url(${bottomBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                </div>
            </div>

            {/* 2. CONTENT AREA */}
            <div className="relative z-10 flex flex-col items-center pt-10"
                style={{ marginTop: '100px' }}
            >
                <div
                    className="w-full max-w-[250px] aspect-[4/1] bg-contain bg-center bg-no-repeat mx-auto"
                    style={{
                        backgroundImage: `url(${textTonGiao})`,
                        marginBottom: '50px'
                    }}
                ></div>

                {/* Religion Cards Grid - Now from API */}
                <div className="flex flex-wrap justify-center gap-30 px-4 max-w-7xl">
                    {religionGroups.map((item) => {
                        // Get thumbnail: prefer imgCover, fallback to first image in content
                        const thumbnailImage = item.imgCover || getFirstImageFromContent(item.content) || phatGiaoImg;

                        return (
                            <div
                                key={item.id}
                                className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-4"
                                onClick={() => setSelectedReligion(item)}
                            >
                                {/* The "Shield/Cloud" Shape Container */}
                                <div className="relative w-64 h-90 rounded-t-lg overflow-hidden">

                                    {/* Header Text inside Card */}
                                    <div className="text-center py-4">
                                        <span className="text-[#a68d4b] font-bold text-xl tracking-widest uppercase">
                                            {item.title || 'Tôn Giáo'}
                                        </span>
                                    </div>

                                    {/* Character Image */}
                                    <div className="absolute inset-0 flex items-center justify-center mt-12">
                                        <img 
                                            src={thumbnailImage} 
                                            alt={item.title} 
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>

                                </div>

                                {/* Decorative "Base" Shadow/Reflection */}
                                <div className="mt-4 w-32 h-2 bg-black/5 rounded-[100%] blur-md group-hover:scale-150 transition-all"></div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                .container {
                    padding: 0;
                    margin: 0;
                    max-width: 100% !important;
                }
            `}</style>
        </div>
    );
}