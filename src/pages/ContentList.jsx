
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/ContentDetail.css'; // Reusing some basic layout styles
import tempImg from '../assets/imagesAssets/thumb_660_34aa3113-a4a7-4b55-a0d9-9d7e619dc457.jpg';

const API_URL = 'http://localhost:3001/api';

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
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

export default function ContentList({ type }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    // Determine type if not passed prop (fallback)
    const contentType = type || (location.pathname.includes('su-kien') ? 'event' : 'news');
    const title = contentType === 'event' ? 'Sự Kiện' : 'Tin Tức';
    const backLink = '/van-hoa';

    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/content?type=${contentType}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch content');
                return res.json();
            })
            .then(data => {
                setItems(data.items || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching content:', err);
                setError(err.message);
                setLoading(false);
            });
    }, [contentType]);

    return (
        <div className="content-detail-page">
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Back Link */}
                <Link to={backLink} className="content-detail-back">
                    ← Trở về Văn Hoá
                </Link>

                <header className="content-detail-header" style={{ borderBottom: '2px solid #ddd', paddingBottom: '20px', marginBottom: '40px' }}>
                    <h1 className="content-detail-title">{title}</h1>
                </header>

                {loading ? (
                    <div className="loading-message" style={{ textAlign: 'center', padding: '40px' }}>Đang tải...</div>
                ) : error ? (
                    <div className="error-message" style={{ textAlign: 'center', color: 'red' }}>Lỗi: {error}</div>
                ) : items.length === 0 ? (
                    <div className="empty-message" style={{ textAlign: 'center' }}>Chưa có bài viết nào.</div>
                ) : (
                    <div className="content-list-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                        {items.map((item) => (
                            <Link 
                                to={`/van-hoa/${contentType === 'event' ? 'su-kien' : 'tin-tuc'}/${item.id}`} 
                                key={item.id} 
                                className={contentType === 'event' ? "event-card" : "news-card"}
                                style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', color: 'inherit' }}
                            >
                                <div className={contentType === 'event' ? "event-card-image" : "news-card-image"} style={{ width: '100%', height: '200px' }}>
                                    <img 
                                        src={item.imgCover || getFirstImageFromContent(item.content) || tempImg} 
                                        alt={item.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    {contentType === 'event' && (
                                        <div className="event-card-date">{formatDate(item.createdAt)}</div>
                                    )}
                                </div>
                                <div className={contentType === 'event' ? "event-card-content" : "news-card-content"} style={{ flex: 1, padding: '15px' }}>
                                    {contentType !== 'event' && (
                                        <span className="news-card-date" style={{ marginBottom: '10px', display: 'inline-block' }}>
                                            {formatDate(item.createdAt)}
                                        </span>
                                    )}
                                    <h3 className={contentType === 'event' ? "event-card-title" : "news-card-title"} style={{ fontSize: '18px', marginBottom: '10px' }}>
                                        {item.title}
                                    </h3>
                                    {contentType === 'event' ? (
                                        <div className="event-card-tag">{item.metadata?.tag || 'Sự kiện'}</div>
                                    ) : (
                                        <>
                                            <p className="news-card-excerpt" style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                                                {getExcerptFromContent(item.content)}
                                            </p>
                                            <span className="news-card-readmore">Đọc thêm</span>
                                        </>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
