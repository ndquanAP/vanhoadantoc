import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import tempImg from '../assets/imagesAssets/thumb_660_34aa3113-a4a7-4b55-a0d9-9d7e619dc457.jpg';

const API_URL = 'http://localhost:3001/api';

// Policy category options
const categories = [
    { id: 'all', label: 'TẤT CẢ CHÍNH SÁCH' },
    { id: 'bao-ton-di-san', label: 'BẢO TỒN DI SẢN' },
    { id: 'ho-tro-dan-toc', label: 'HỖ TRỢ DÂN TỘC THIỂU SỐ' },
];

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

// Check if article is new (within last 7 days)
function isNewArticle(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = (now - date) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
}

export default function ChinhSach() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 6;

    // Fetch policies from API
    useEffect(() => {
        fetch(`${API_URL}/content?type=policy&limit=100`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch policies');
                return res.json();
            })
            .then(data => {
                setPolicies(data.items || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching policies:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Filter policies by category and search term
    const filteredPolicies = policies.filter(policy => {
        const matchesCategory = activeCategory === 'all' || 
            policy.metadata?.category === activeCategory;
        const matchesSearch = !searchTerm || 
            policy.title?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Pagination
    const totalPages = Math.ceil(filteredPolicies.length / itemsPerPage);
    const paginatedPolicies = filteredPolicies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, searchTerm]);

    // Get category counts
    const getCategoryCount = (categoryId) => {
        if (categoryId === 'all') return policies.length;
        return policies.filter(p => p.metadata?.category === categoryId).length;
    };

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
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm..." 
                            className="policy-search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
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
                                <span className="policy-tab-count">({getCategoryCount(cat.id)})</span>
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
                            <h1 className="policy-title">
                                {activeCategory === 'all' ? 'CHÍNH SÁCH' : 
                                 activeCategory === 'bao-ton-di-san' ? 'BẢO TỒN DI SẢN' : 
                                 'HỖ TRỢ DÂN TỘC THIỂU SỐ'}
                            </h1>
                            <p className="policy-subtitle">Cập nhật thông tin mới nhất.</p>
                        </div>
                    </div>

                    {/* Article List */}
                    <div className="policy-articles">
                        {loading ? (
                            <div className="loading-message">Đang tải chính sách...</div>
                        ) : error ? (
                            <div className="error-message">Lỗi: {error}</div>
                        ) : paginatedPolicies.length === 0 ? (
                            <div className="empty-message">Không tìm thấy chính sách nào</div>
                        ) : (
                            paginatedPolicies.map((article) => (
                                <Link to={`/chinh-sach/${article.id}`} key={article.id} className="policy-article">
                                    <div className="policy-article-image">
                                        <img 
                                            src={article.imgCover || getFirstImageFromContent(article.content) || tempImg} 
                                            alt={article.title} 
                                        />
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
                                                {formatDate(article.createdAt)}
                                            </span>
                                            {isNewArticle(article.createdAt) && <span className="policy-article-new">New</span>}
                                        </div>
                                        <h3 className="policy-article-title">{article.title}</h3>
                                        <p className="policy-article-excerpt">{getExcerptFromContent(article.content)}</p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="policy-pagination">
                            <button 
                                className="policy-page-btn" 
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            >
                                &lt;
                            </button>
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    className={`policy-page-btn ${currentPage === page ? 'active' : ''}`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            ))}
                            {totalPages > 5 && <span className="policy-page-dots">...</span>}
                            <button 
                                className="policy-page-btn"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            >
                                &gt;
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
