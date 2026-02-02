import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./css/DiTichDetail.css";
import TipTapContentRenderer from '../components/TipTapContentRenderer';

import heroBg from '../assets/imagesAssets/ditich/herobg.png';
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

export default function DiTichDetail() {
    const { id } = useParams();
    const [relic, setRelic] = useState(null);
    const [relatedRelics, setRelatedRelics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.body.classList.add("no-padding");
        return () => {
            document.body.classList.remove("no-padding");
        };
    }, []);

    // Fetch relic by ID
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3001/api/content/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch relic');
                return res.json();
            })
            .then(data => {
                setRelic(data);
                setLoading(false);
                window.scrollTo(0, 0);
            })
            .catch(err => {
                console.error('Error fetching relic:', err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    // Fetch related relics (other site items)
    useEffect(() => {
        fetch('http://localhost:3001/api/content?type=site&limit=10')
            .then(res => res.json())
            .then(data => {
                // Filter out current relic and take up to 3
                const filtered = (data.items || [])
                    .filter(item => item.id !== parseInt(id))
                    .slice(0, 3);
                setRelatedRelics(filtered);
            })
            .catch(err => console.error('Error fetching related:', err));
    }, [id]);

    if (loading) {
        return (
            <div className="ditich-detail-page">
                <section className="ditich-detail-hero" style={{ backgroundImage: `url(${heroBg})` }}>
                    <div className="ditich-detail-hero-content">
                        <div className="ditich-detail-hero-info">
                            <Link to="/di-tich" className="ditich-detail-back-link">← Trở về Di Tích</Link>
                            <h1 className="ditich-detail-title">Đang tải...</h1>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    if (error || !relic) {
        return (
            <div className="ditich-detail-page">
                <section className="ditich-detail-hero" style={{ backgroundImage: `url(${heroBg})` }}>
                    <div className="ditich-detail-hero-content">
                        <div className="ditich-detail-hero-info">
                            <Link to="/di-tich" className="ditich-detail-back-link">← Trở về Di Tích</Link>
                            <h1 className="ditich-detail-title">Không tìm thấy di tích</h1>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // Extract metadata
    const metadata = relic.metadata || {};
    const category = metadata.category || 'Di tích';
    const location = metadata.location || '';
    const image = relic.imgCover || getFirstImageFromContent(relic.content) || lucGiacImg;

    return (
        <div className="ditich-detail-page">
            {/* HERO SECTION */}
            <section 
                className="ditich-detail-hero"
                style={{ backgroundImage: `url(${heroBg})` }}
            >
                <div className="ditich-detail-hero-content">
                    {/* Left - Info */}
                    <div className="ditich-detail-hero-info">
                        <Link to="/di-tich" className="ditich-detail-back-link">
                            ← Trở về Di Tích
                        </Link>
                        
                        <span className="ditich-detail-category">{category}</span>
                        
                        <h1 className="ditich-detail-title">{relic.title || 'Di tích'}</h1>
                        
                        {location && (
                            <div className="ditich-detail-location">
                                <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                                <span>{location}</span>
                            </div>
                        )}
                    </div>
                    {/* Right - Featured Image */}
                    <div className="ditich-detail-hero-image">
                        <div className="ditich-detail-image-frame">
                            <img src={image} alt={relic.title} />
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <section className="ditich-detail-content">
                <div className="ditich-detail-content-wrapper">
                    {/* Main Content - TipTap Rendered */}
                    <main className="ditich-detail-main" style={{ maxWidth: '100%' }}>
                        <div className="ditich-detail-text">
                            <TipTapContentRenderer content={relic.content} />
                        </div>
                    </main>
                </div>
            </section>

            {/* RELATED RELICS SECTION */}
            {relatedRelics.length > 0 && (
                <section className="ditich-detail-related">
                    <h2 className="ditich-detail-related-title">Di Tích Liên Quan</h2>
                    <div className="ditich-detail-related-grid">
                        {relatedRelics.map((relatedRelic) => {
                            const relatedImage = relatedRelic.imgCover || getFirstImageFromContent(relatedRelic.content) || lucGiacImg;
                            return (
                                <Link 
                                    key={relatedRelic.id} 
                                    to={`/di-tich/${relatedRelic.id}`}
                                    className="ditich-detail-related-card"
                                >
                                    <div className="ditich-detail-related-image">
                                        <img src={relatedImage} alt={relatedRelic.title} />
                                    </div>
                                    <h3 className="ditich-detail-related-name">{relatedRelic.title || 'Di tích'}</h3>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* FOOTER DECORATION */}
            <section className="ditich-detail-footer">
                <div className="ditich-detail-footer-image">
                    <img src={footerImg} alt="Vietnamese Temple Decoration" />
                </div>
            </section>
        </div>
    );
}
