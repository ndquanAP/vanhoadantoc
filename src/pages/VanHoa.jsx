import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import frameImg from '../assets/imagesAssets/khungslide.png';
import arrowImg from '../assets/imagesAssets/nextbackbtn.png';

// Mock data for the hero slider
const heroSlides = [
    {
        id: 1,
        image: '/images/festival-banner.jpg',
        title: 'Hùng Đồng Khai Hội',
        date: '28-29/05/2022',
        location: 'Huyện Đồng Văn, Hà Giang',
        sponsors: ['Huế', 'Mobifone', 'Fisher', 'Coca-Cola', 'Viettel'],
    },
    {
        id: 2,
        image: '/images/culture-event.jpg',
        title: 'Lễ Hội Văn Hóa Dân Tộc',
        date: '15-20/06/2025',
        location: 'Thái Nguyên',
    },
];

// Mock data for news items (TIN TỨC)
const newsItems = [
    {
        id: 1,
        date: '16/12/2025',
        title: 'Lễ hội văn hoá dân tộc tỉnh Thái Nguyên chính thức khai mạc',
        excerpt: 'Ngày 05/12/2025, bộ Văn hoá Thể Thao và du lịch tỉnh Thái Nguyên đã tham dự chương trình giới thiệu Nền tảng xuất khẩu khác trực tuyến Golive Vietnam, và Cục Thương mại điện tử...',
        image: '/images/news-1.jpg',
    },
    {
        id: 2,
        date: '16/12/2025',
        title: 'Recap Sự kiện: Sắc màu thổ cẩm',
        excerpt: 'Ngày 05/12/2025, bộ Văn hoá Thể Thao và du lịch tỉnh Thái Nguyên đã tham dự chương trình giới thiệu Nền tảng xuất khẩu khác trực tuyến Golive Vietnam...',
        image: '/images/news-2.jpg',
    },
    {
        id: 3,
        date: '16/12/2025',
        title: 'Recap Sự kiện: Sắc màu thổ cẩm',
        excerpt: 'Ngày 05/12/2025, bộ Văn hoá Thể Thao và du lịch tỉnh Thái Nguyên đã tham dự chương trình giới thiệu Nền tảng xuất khẩu khác trực tuyến...',
        image: '/images/news-3.jpg',
    },
    {
        id: 4,
        date: '16/12/2025',
        title: 'Recap Sự kiện: Sắc màu thổ cẩm',
        excerpt: 'Ngày 05/12/2025, bộ Văn hoá Thể Thao và du lịch tỉnh Thái Nguyên đã tham dự chương trình giới thiệu Nền tảng xuất khẩu...',
        image: '/images/news-4.jpg',
    },
];

// Mock data for events (SỰ KIỆN)
const events = [
    {
        id: 1,
        date: '09/12/2025',
        title: 'Lễ hội "Cung đường văn hoá"',
        description: 'Lễ giải cho Hộ Kinh doanh và LG trinh lớn doanh nghiệp',
        tag: 'Văn hoá',
        image: '/images/event-1.jpg',
    },
    {
        id: 2,
        date: '24/11/2025',
        title: 'Lễ hội "Cung đường văn hoá"',
        tag: 'Thông báo',
        image: '/images/event-2.jpg',
    },
    {
        id: 3,
        date: '24/11/2025',
        title: 'Lễ hội "Cung đường văn hoá"',
        tag: 'Thông báo',
        image: '/images/event-3.jpg',
    },
    {
        id: 4,
        date: '24/11/2025',
        title: 'Lễ hội "Cung đường văn hoá"',
        tag: 'Thông báo',
        image: '/images/event-4.jpg',
    },
];

export default function VanHoa() {
    const swiperRef = useRef(null);
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
                                loop
                                className="h-full w-full"
                            >
                                {heroSlides.map((slide) => (
                                    <SwiperSlide key={slide.id}>
                                        <div className="hero-slide h-full">
                                            {/* Placeholder gradient for images */}
                                            <div
                                                className="w-full h-full"
                                                style={{
                                                    background: 'linear-gradient(135deg, #1a5d3a 0%, #2d8a56 50%, #c9a227 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <div className="text-center text-white p-8">
                                                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2" style={{ fontFamily: 'serif' }}>
                                                        {slide.title}
                                                    </div>
                                                    <div className="text-xl opacity-90">{slide.date}</div>
                                                </div>
                                            </div>
                                            <div className="hero-content">
                                                <p className="text-sm text-gray-600 mb-1">Địa điểm</p>
                                                <p className="font-medium text-gray-800">{slide.location || 'Việt Nam'}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
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
                        <h2 className="section-title">Tin Tức</h2>
                    </div>

                    {newsItems.map((item) => (
                        <a href={`/van-hoa/tin-tuc/${item.id}`} key={item.id} className="news-card">
                            <div className="news-card-image">
                                <div
                                    className="w-full h-full"
                                    style={{
                                        background: `linear-gradient(135deg, #1a5d3a 0%, #2d8a56 100%)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <span className="text-white text-xs">Ảnh</span>
                                </div>
                            </div>
                            <div className="news-card-content">
                                <span className="news-card-date">
                                    📅 {item.date}
                                </span>
                                <h3 className="news-card-title">{item.title}</h3>
                                <p className="news-card-excerpt">{item.excerpt}</p>
                            </div>
                        </a>
                    ))}
                </section>

                {/* Sidebar - SỰ KIỆN */}
                <aside className="sidebar">
                    <div className="section-header">
                        <h2 className="section-title">Sự Kiện</h2>
                    </div>

                    {events.map((event) => (
                        <a href={`/van-hoa/su-kien/${event.id}`} key={event.id} className="event-card">
                            <div className="event-card-image">
                                <div
                                    className="w-full h-full"
                                    style={{
                                        background: `linear-gradient(135deg, #c9a227 0%, #e5c85c 100%)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <span className="text-white text-xs">🎭</span>
                                </div>
                            </div>
                            <div className="event-card-content">
                                <div className="event-card-date">{event.date}</div>
                                <h4 className="event-card-title">{event.title}</h4>
                                <div className="event-card-tag">{event.tag}</div>
                            </div>
                        </a>
                    ))}
                </aside>
            </div>
        </div>
    );
}
