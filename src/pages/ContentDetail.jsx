import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import TipTapContentRenderer from '../components/TipTapContentRenderer';
import './css/ContentDetail.css';

import tempImg from '../assets/imagesAssets/thumb_660_34aa3113-a4a7-4b55-a0d9-9d7e619dc457.jpg';

const API_URL = 'http://localhost:3001/api';

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
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

// Get back link based on content type
function getBackLink(pathname) {
    if (pathname.includes('/van-hoa/tin-tuc')) {
        return { path: '/van-hoa', label: 'Văn Hoá' };
    } else if (pathname.includes('/van-hoa/su-kien')) {
        return { path: '/van-hoa', label: 'Văn Hoá' };
    } else if (pathname.includes('/chinh-sach')) {
        return { path: '/chinh-sach', label: 'Chính Sách' };
    }
    return { path: '/', label: 'Trang chủ' };
}

// Get type label based on content type
function getTypeLabel(type) {
    switch (type) {
        case 'news': return 'Tin Tức';
        case 'event': return 'Sự Kiện';
        case 'policy': return 'Chính Sách';
        default: return 'Bài viết';
    }
}

export default function ContentDetail() {
    const { id } = useParams();
    const location = useLocation();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const backLink = getBackLink(location.pathname);

    // Fetch content by ID
    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/content/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Không tìm thấy nội dung');
                return res.json();
            })
            .then(data => {
                setContent(data);
                setLoading(false);
                window.scrollTo(0, 0);
            })
            .catch(err => {
                console.error('Error fetching content:', err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="content-detail-page">
                <div className="content-detail-container">
                    <Link to={backLink.path} className="content-detail-back">
                        ← Trở về {backLink.label}
                    </Link>
                    <div className="content-detail-loading">Đang tải...</div>
                </div>
            </div>
        );
    }

    if (error || !content) {
        return (
            <div className="content-detail-page">
                <div className="content-detail-container">
                    <Link to={backLink.path} className="content-detail-back">
                        ← Trở về {backLink.label}
                    </Link>
                    <div className="content-detail-error">
                        <h2>Lỗi</h2>
                        <p>{error || 'Không tìm thấy nội dung'}</p>
                    </div>
                </div>
            </div>
        );
    }

    const image = content.imgCover || getFirstImageFromContent(content.content) || tempImg;

    return (
        <div className="content-detail-page">
            <div className="content-detail-container">
                {/* Back Link */}
                <Link to={backLink.path} className="content-detail-back">
                    ← Trở về {backLink.label}
                </Link>

                {/* Header */}
                <header className="content-detail-header">
                    <div className="content-detail-meta">
                        <span className="content-detail-type">{getTypeLabel(content.type)}</span>
                        <span className="content-detail-date">{formatDate(content.createdAt)}</span>
                    </div>
                    <h1 className="content-detail-title">{content.title}</h1>
                </header>

                {/* Cover Image */}
                {image && (
                    <div className="content-detail-cover">
                        <img src={image} alt={content.title} />
                    </div>
                )}

                {/* Content Body */}
                <main className="content-detail-body">
                    <div className="content-detail-text">
                        <TipTapContentRenderer content={content.content} />
                    </div>
                </main>
            </div>
        </div>
    );
}
