import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./css/DiTich.css";

import heroBg from '../assets/imagesAssets/ditich/herobg.png';
import scrollBg from '../assets/imagesAssets/ditich/scroll.png';
import footerImg from '../assets/imagesAssets/ditich/footer.png';
import lucGiacImg from '../assets/imagesAssets/ditich/LucGiac.png';
import dinhHoaImg from '../assets/imagesAssets/ditich/DinhHoa.png';

// Data for relics - sections 3.1.1 to 3.2.4
const RELICS_DATA = [
    { id: 1, name: 'ĐỀN ĐUỔM', image: lucGiacImg },
    { id: 2, name: 'XƯỞNG QUÂN GIỚI', image: dinhHoaImg },
    { id: 3, name: 'SƯ ĐOÀN 308', image: lucGiacImg },
    { id: 4, name: 'ĐỀN NÚI ĐÁ XÔ', image: dinhHoaImg },
    { id: 5, name: 'ĐÌNH ĐẨU', image: lucGiacImg },
    { id: 6, name: 'ĐỀN TRÌNH', image: dinhHoaImg },
    { id: 7, name: 'ĐỀN KHUÂN', image: lucGiacImg },
];

const CAROUSEL_ITEMS = [
    { id: 1, name: 'ĐỀN ĐUỔM', image: lucGiacImg },
    { id: 2, name: 'XƯỞNG QUÂN GIỚI', image: dinhHoaImg },
    { id: 3, name: 'SƯ ĐOÀN 308', image: lucGiacImg },
    { id: 4, name: 'ĐỀN NÚI ĐÁ XÔ', image: dinhHoaImg },
    { id: 5, name: 'ĐÌNH ĐẨU', image: lucGiacImg },
];

export default function DiTich() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
    
    const totalPages = Math.ceil(RELICS_DATA.length / itemsPerPage);

    useEffect(() => {
        document.body.classList.add("no-padding");
        return () => {
            document.body.classList.remove("no-padding");
        };
    }, []);

    // Auto-scroll carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCarouselIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const paginatedRelics = RELICS_DATA.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
                                {CAROUSEL_ITEMS.map((item, index) => (
                                    <Link 
                                        key={item.id}
                                        to={`/di-tich/${item.id}`}
                                        className="ditich-carousel-card"
                                    >
                                        <div className="ditich-card-frame">
                                            {index % 2 === 0 && (
                                                <div className="ditich-card-title-bar top">
                                                    <span className="ditich-card-title">{item.name}</span>
                                                </div>
                                            )}
                                            <div className="ditich-card-image">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            {index % 2 !== 0 && (
                                                <div className="ditich-card-title-bar bottom">
                                                    <span className="ditich-card-title">{item.name}</span>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))}
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
                    {paginatedRelics.map((relic) => (
                        <Link key={relic.id} to={`/di-tich/${relic.id}`} className="ditich-grid-card">
                            <div className="ditich-grid-image">
                                <img src={relic.image} alt={relic.name} />
                            </div>
                            <h3 className="ditich-grid-title">{relic.name}</h3>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
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
