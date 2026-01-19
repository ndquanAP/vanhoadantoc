import tempImg from '../assets/imagesAssets/thumb_660_34aa3113-a4a7-4b55-a0d9-9d7e619dc457.jpg';

// Mock data for policy categories
const categories = [
    { id: 'chinh-sach', label: 'CHÍNH SÁCH', count: 24 },
    { id: 'bao-ton-di-san', label: 'BẢO TỒN DI SẢN', count: 18 },
    { id: 'ho-tro-dan-toc', label: 'HỖ TRỢ DÂN TỘC THIỂU SỐ', count: 12 },
];

// Mock data for policy articles
const policyArticles = [
    {
        id: 1,
        date: '16/12/2025',
        isNew: true,
        title: 'Chính sách hỗ trợ bảo tồn và phát huy giá trị di tích và di sản văn hóa phi vật thể',
        excerpt: 'Ngày 12/12/2025, tại vòng chung kết cuộc thi Food Innovation and Development 2225 (FID 2025) diễn ra ở Trường Đại học Công Thương TP. Hồ Chí Minh (HUIT)...',
    },
    {
        id: 2,
        date: '16/12/2025',
        isNew: true,
        title: 'Chính sách hỗ trợ bảo tồn và phát huy giá trị di tích và di sản văn hóa phi vật thể',
        excerpt: 'Ngày 12/12/2025, tại vòng chung kết cuộc thi Food Innovation and Development 2225 (FID 2025) diễn ra ở Trường Đại học Công Thương TP. Hồ Chí Minh (HUIT)...',
    },
    {
        id: 3,
        date: '16/12/2025',
        isNew: false,
        title: 'Chính sách hỗ trợ bảo tồn và phát huy giá trị di tích và di sản văn hóa phi vật thể',
        excerpt: 'Ngày 12/12/2025, tại vòng chung kết cuộc thi Food Innovation and Development 2225 (FID 2025) diễn ra ở Trường Đại học Công Thương TP. Hồ Chí Minh (HUIT)...',
    },
    {
        id: 4,
        date: '16/12/2025',
        isNew: false,
        title: 'Chính sách hỗ trợ bảo tồn và phát huy giá trị di tích và di sản văn hóa phi vật thể',
        excerpt: 'Ngày 12/12/2025, tại vòng chung kết cuộc thi Food Innovation and Development 2225 (FID 2025) diễn ra ở Trường Đại học Công Thương TP. Hồ Chí Minh (HUIT)...',
    },
    {
        id: 5,
        date: '16/12/2025',
        isNew: false,
        title: 'Chính sách hỗ trợ bảo tồn và phát huy giá trị di tích và di sản văn hóa phi vật thể',
        excerpt: 'Ngày 12/12/2025, tại vòng chung kết cuộc thi Food Innovation and Development 2225 (FID 2025) diễn ra ở Trường Đại học Công Thương TP. Hồ Chí Minh (HUIT)...',
    },
    {
        id: 6,
        date: '16/12/2025',
        isNew: false,
        title: 'Chính sách hỗ trợ bảo tồn và phát huy giá trị di tích và di sản văn hóa phi vật thể',
        excerpt: 'Ngày 12/12/2025, tại vòng chung kết cuộc thi Food Innovation and Development 2225 (FID 2025) diễn ra ở Trường Đại học Công Thương TP. Hồ Chí Minh (HUIT)...',
    },
];

import { useState } from 'react';

export default function ChinhSach() {
    const [activeCategory, setActiveCategory] = useState('chinh-sach');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 4;

    return (
        <div className="container">
            <div className="policy-layout">
                {/* Sidebar */}
                <aside className="policy-sidebar">
                    {/* Search */}
                    <div className="policy-search">
                        <svg className="policy-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input type="text" placeholder="Tìm kiếm..." className="policy-search-input" />
                    </div>

                    {/* Category Tabs */}
                    <nav className="policy-tabs">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`policy-tab ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="policy-content">
                    {/* Header */}
                    <div className="policy-header">
                        <div className="policy-header-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14,2 14,8 20,8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10,9 9,9 8,9" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="policy-title">CHÍNH SÁCH BẢO TỒN DI SẢN</h1>
                            <p className="policy-subtitle">Cập nhật thông tin mới nhất.</p>
                        </div>
                    </div>

                    {/* Article List */}
                    <div className="policy-articles">
                        {policyArticles.map((article) => (
                            <a href={`/chinh-sach/${article.id}`} key={article.id} className="policy-article">
                                <div className="policy-article-image">
                                    <img src={tempImg} alt={article.title} />
                                </div>
                                <div className="policy-article-content">
                                    <div className="policy-article-meta">
                                        <span className="policy-article-date">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                <line x1="8" y1="2" x2="8" y2="6" />
                                                <line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                            {article.date}
                                        </span>
                                        {article.isNew && <span className="policy-article-new">New</span>}
                                    </div>
                                    <h3 className="policy-article-title">{article.title}</h3>
                                    <p className="policy-article-excerpt">{article.excerpt}</p>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="policy-pagination">
                        <button 
                            className="policy-page-btn" 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        >
                            &lt;
                        </button>
                        {[1, 2, 3, 4].map((page) => (
                            <button
                                key={page}
                                className={`policy-page-btn ${currentPage === page ? 'active' : ''}`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}
                        <span className="policy-page-dots">...</span>
                        <button 
                            className="policy-page-btn"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        >
                            &gt;
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
