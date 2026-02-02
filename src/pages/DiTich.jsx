import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./css/DiTich.css";

import heroBg from '../assets/imagesAssets/ditich/herobg.png';
import scrollBg from '../assets/imagesAssets/ditich/scroll.png';
import footerImg from '../assets/imagesAssets/ditich/footer.png';
import lucGiacImg from '../assets/imagesAssets/ditich/LucGiac.png';

// Helper function to extract first image from TipTap content
function getFirstImageFromContent(content) {
    if (!content || !content.content) return null;
    for (const node of content.content) {
        if (node.type === 'image' && node.attrs?.src) {
            return node.attrs.src;
        }
    }
    return null;
}

export default function DiTich() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [relics, setRelics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch site content from API
    useEffect(() => {
        fetch('http://localhost:3001/api/content?type=site&limit=50')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch site content');
                return res.json();
            })
            .then(data => {
                setRelics(data.items || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching site content:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const totalPages = Math.ceil(relics.length / itemsPerPage);

    useEffect(() => {
        document.body.classList.add("no-padding");
        return () => {
            document.body.classList.remove("no-padding");
        };
    }, []);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const paginatedRelics = relics.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Use first 5 items for carousel
    const carouselItems = relics.slice(0, 5);

    // Loading state
    if (loading) {
        return (
            <div className="ditich-page">
                <section className="ditich-hero" style={{ backgroundImage: `url(${heroBg})` }}>
                    <div className="ditich-hero-content">
                        <div className="ditich-hero-left">
                            <h1 className="ditich-title">DI TÍCH<br/>LỊCH SỬ</h1>
                            <p className="ditich-subtitle">Đang tải dữ liệu...</p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="ditich-page">
                <section className="ditich-hero" style={{ backgroundImage: `url(${heroBg})` }}>
                    <div className="ditich-hero-content">
                        <div className="ditich-hero-left">
                            <h1 className="ditich-title">DI TÍCH<br/>LỊCH SỬ</h1>
                            <p className="ditich-subtitle" style={{ color: '#ffcccc' }}>
                                Không thể tải dữ liệu. <button onClick={() => window.location.reload()} style={{ color: 'white', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Thử lại</button>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // Empty state
    if (relics.length === 0) {
        return (
            <div className="ditich-page">
                <section className="ditich-hero" style={{ backgroundImage: `url(${heroBg})` }}>
                    <div className="ditich-hero-content">
                        <div className="ditich-hero-left">
                            <h1 className="ditich-title">DI TÍCH<br/>LỊCH SỬ</h1>
                            <p className="ditich-subtitle">Chưa có di tích nào được thêm vào.</p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="ditich-page">
            {/* HERO SECTION */}
            <section 
                className="ditich-hero"
                style={{ backgroundImage: `url(${heroBg})` }}
            >
                <div className="ditich-hero-content">
                    {/* Left Side Content */}
                    <div className="ditich-hero-left">
                        <h1 className="ditich-title">DI TÍCH<br/>LỊCH SỬ</h1>
                        <p className="ditich-subtitle">
                            "Hành trình tìm về những trang sử vàng và di sản Thủ đô Gió Ngàn."
                        </p>
                    </div>

                    {/* Right Side - Horizontal Scroll Carousel */}
                    <div className="ditich-carousel-container">
                        <div 
                            className="ditich-carousel-scroll"
                            style={{ backgroundImage: `url(${scrollBg})` }}
                        >
                            <div className="ditich-carousel-track">
                                {carouselItems.map((item, index) => {
                                    const image = item.imgCover || getFirstImageFromContent(item.content) || lucGiacImg;
                                    return (
                                        <Link 
                                            key={item.id}
                                            to={`/di-tich/${item.id}`}
                                            className="ditich-carousel-card"
                                        >
                                            <div className="ditich-card-frame">
                                                {index % 2 === 0 && (
                                                    <div className="ditich-card-title-bar top">
                                                        <span className="ditich-card-title">{item.title || 'Di tích'}</span>
                                                    </div>
                                                )}
                                                <div className="ditich-card-image">
                                                    <img src={image} alt={item.title} />
                                                </div>
                                                {index % 2 !== 0 && (
                                                    <div className="ditich-card-title-bar bottom">
                                                        <span className="ditich-card-title">{item.title || 'Di tích'}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Wave */}
                <div className="ditich-hero-wave"></div>
            </section>

            {/* MAIN CONTENT SECTION */}
            <section className="ditich-main-content">
                {/* Grid Layout */}
                <div className="ditich-grid">
                    {paginatedRelics.map((relic) => {
                        const image = relic.imgCover || getFirstImageFromContent(relic.content) || lucGiacImg;
                        return (
                            <Link key={relic.id} to={`/di-tich/${relic.id}`} className="ditich-grid-card">
                                <div className="ditich-grid-image">
                                    <img src={image} alt={relic.title} />
                                </div>
                                <h3 className="ditich-grid-title">{relic.title || 'Di tích'}</h3>
                            </Link>
                        );
                    })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="ditich-pagination">
                        <div className="ditich-pagination-left">
                        </div>

                        <div className="ditich-pagination-center">
                            <span className="ditich-goto-label">Đi đến trang</span>
                            <input
                                type="number"
                                min={1}
                                max={totalPages}
                                value={currentPage}
                                onChange={(e) => handlePageChange(Number(e.target.value))}
                                className="ditich-goto-input"
                            />
                        </div>

                        <div className="ditich-pagination-right">
                            <button 
                                className="ditich-page-btn nav"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                &lt;
                            </button>
                            
                            {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                const pageNum = i + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        className={`ditich-page-btn ${currentPage === pageNum ? 'active' : ''}`}
                                        onClick={() => handlePageChange(pageNum)}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            
                            <button 
                                className="ditich-page-btn nav"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                )}
            </section>

            {/* FOOTER DECORATION */}
            <section className="ditich-footer-decoration">
                <div className="ditich-footer-image">
                    <img src={footerImg} alt="Vietnamese Temple Decoration" />
                </div>
            </section>
        </div>
    );
}
