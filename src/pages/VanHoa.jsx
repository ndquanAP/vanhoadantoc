import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import frameImg from '../assets/imagesAssets/khungslide.png';
import arrowImg from '../assets/imagesAssets/nextbackbtn.png';
import tempImg from '../assets/imagesAssets/thumb_660_34aa3113-a4a7-4b55-a0d9-9d7e619dc457.jpg';

const API_URL = 'http://localhost:3001/api';

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

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

// Helper function to extract text excerpt from TipTap content
function getExcerptFromContent(content, maxLength = 150) {
    if (!content || !content.content) return '';
    let text = '';
    for (const node of content.content) {
        if (node.type === 'paragraph' && node.content) {
            for (const child of node.content) {
                if (child.type === 'text') {
                    text += child.text + ' ';
                }
            }
        }
        if (text.length > maxLength) break;
    }
    return text.trim().substring(0, maxLength) + (text.length > maxLength ? '...' : '');
}

export default function VanHoa() {
    const swiperRef = useRef(null);
    const [newsItems, setNewsItems] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch news and events from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [newsRes, eventsRes] = await Promise.all([
                    fetch(`${API_URL}/content?type=news&limit=10`),
                    fetch(`${API_URL}/content?type=event&limit=10`)
                ]);

                if (!newsRes.ok || !eventsRes.ok) {
                    throw new Error('Failed to fetch content');
                }

                const newsData = await newsRes.json();
                const eventsData = await eventsRes.json();

                setNewsItems(newsData.items || []);
                setEvents(eventsData.items || []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching content:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Use first 3 events for hero slider
    const heroSlides = events.slice(0, 3);

    return (
        <div className="container">
            {/* Hero Slider Section with Custom Navigation & Frame */}
            <section className="relative mt-8 mb-12">
                <div className="slider-container">
                    {/* Previous Button (Flex 1) */}
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="slider-btn"
                        aria-label="Previous Slide"
                    >
                        <img src={arrowImg} alt="Previous" className="w-full h-auto object-contain transform rotate-180" />
                    </button>

                    {/* Slider Frame Wrapper (Flex 10) */}
                    <div className="slider-frame relative w-full">
                        {/* Swiper Content (Z-5) */}
                        <div className="slider-content-wrapper">
                            <Swiper
                                onBeforeInit={(swiper) => {
                                    swiperRef.current = swiper;
                                }}
                                modules={[Pagination, Autoplay]}
                                spaceBetween={0}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                loop={heroSlides.length > 1}
                                className="h-full w-full"
                            >
                                {heroSlides.length > 0 ? heroSlides.map((slide) => (
                                    <SwiperSlide key={slide.id}>
                                        <Link to={`/van-hoa/su-kien/${slide.id}`} className="hero-slide h-full block">
                                            <img 
                                                src={slide.imgCover || getFirstImageFromContent(slide.content) || tempImg} 
                                                alt={slide.title} 
                                                className="w-full h-full object-cover" 
                                            />
                                            <div className="hero-overlay">
                                                <h2 className="hero-title">{slide.title}</h2>
                                                <p className="hero-subtitle">{formatDate(slide.createdAt)}</p>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                )) : (
                                    <SwiperSlide>
                                        <div className="hero-slide h-full">
                                            <img src={tempImg} alt="Loading" className="w-full h-full object-cover" />
                                            <div className="hero-overlay">
                                                <h2 className="hero-title">{loading ? 'Đang tải...' : 'Chưa có sự kiện'}</h2>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </div>

                        {/* Frame Image (Z-20) - Relative to set height */}
                        <img
                            src={frameImg}
                            alt="Slider Frame"
                            className="slider-frame-img"
                        />
                    </div>

                    {/* Next Button (Flex 1) */}
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="slider-btn"
                        aria-label="Next Slide"
                    >
                        <img src={arrowImg} alt="Next" className="w-full h-auto object-contain" />
                    </button>
                </div>
            </section>

            {/* Content Grid: News (col-9) + Events (col-3) */}
            <div className="content-grid">
                {/* Main Content - TIN TỨC */}
                <section className="main-content">
                    <div className="section-header">
                        <h2 className="section-title">Văn hóa</h2>
                        <Link to="/van-hoa/tin-tuc" className="section-see-all">Xem tất cả</Link>
                    </div>

                    {loading ? (
                        <div className="loading-message">Đang tải văn hóa...</div>
                    ) : error ? (
                        <div className="error-message">Lỗi: {error}</div>
                    ) : newsItems.length === 0 ? (
                        <div className="empty-message">Chưa có tin tức văn hóa</div>
                    ) : (
                        newsItems.map((item) => (
                            <Link to={`/van-hoa/tin-tuc/${item.id}`} key={item.id} className="news-card">
                                <div className="news-card-image">
                                    <img 
                                        src={item.imgCover || getFirstImageFromContent(item.content) || tempImg} 
                                        alt={item.title} 
                                    />
                                </div>
                                <div className="news-card-content">
                                    <span className="news-card-date">
                                        {formatDate(item.createdAt)}
                                    </span>
                                    <h3 className="news-card-title">{item.title}</h3>
                                    <p className="news-card-excerpt">{getExcerptFromContent(item.content)}</p>
                                    <span className="news-card-readmore">Đọc thêm</span>
                                </div>
                            </Link>
                        ))
                    )}
                </section>

                {/* Sidebar - SỰ KIỆN */}
                <aside className="sidebar">
                    <div className="section-header">
                        <h2 className="section-title">Sự Kiện</h2>
                        <Link to="/van-hoa/su-kien" className="section-see-all">Xem tất cả</Link>
                    </div>

                    {loading ? (
                        <div className="loading-message">Đang tải sự kiện...</div>
                    ) : error ? (
                        <div className="error-message">Lỗi: {error}</div>
                    ) : events.length === 0 ? (
                        <div className="empty-message">Chưa có sự kiện</div>
                    ) : (
                        events.map((event) => (
                            <Link to={`/van-hoa/su-kien/${event.id}`} key={event.id} className="event-card">
                                <div className="event-card-image">
                                    <img 
                                        src={event.imgCover || getFirstImageFromContent(event.content) || tempImg} 
                                        alt={event.title} 
                                    />
                                    <div className="event-card-date">{formatDate(event.createdAt)}</div>
                                </div>
                                <div className="event-card-content">
                                    <h4 className="event-card-title">{event.title}</h4>
                                    <div className="event-card-tag">{event.metadata?.tag || 'Sự kiện'}</div>
                                </div>
                            </Link>
                        ))
                    )}
                </aside>
            </div>
        </div>
    );
}
