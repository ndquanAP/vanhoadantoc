import { useState, useEffect, useRef } from 'react';
import TipTapEditor from '../components/TipTapEditor';
import './css/Admin.css';

const API_URL = 'http://localhost:3001/api';

const CONTENT_TYPES = [
    { id: 'all', label: 'Tất cả', icon: '📋' },
    { id: 'news', label: 'Tin Tức', icon: '📰' },
    { id: 'event', label: 'Sự Kiện', icon: '📅' },
    { id: 'policy', label: 'Chính Sách', icon: '📜' },
    { id: 'ethnic', label: 'Dân Tộc', icon: '👥' },
    { id: 'religious', label: 'Tôn Giáo', icon: '🕌' },
    { id: 'location', label: 'Địa Điểm', icon: '📍' },
    { id: 'site', label: 'Di Tích', icon: '🏛️' },
];

export default function Admin() {
    const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
    const [activeType, setActiveType] = useState('all');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');

    // Form state
    const [formTitle, setFormTitle] = useState('');
    const [formType, setFormType] = useState('news');
    const [formImgCover, setFormImgCover] = useState('');
    const [formMetadata, setFormMetadata] = useState({ category: '', location: '' });
    const [formContent, setFormContent] = useState({ type: 'doc', content: [{ type: 'paragraph' }] });
    const [uploadingCover, setUploadingCover] = useState(false);

    const coverInputRef = useRef(null);

    // Auth header
    const authHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    // Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginForm),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Đăng nhập thất bại');
            localStorage.setItem('adminToken', data.access_token);
            setToken(data.access_token);
        } catch (err) {
            setLoginError(err.message);
        }
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setToken('');
    };

    // Fetch items
    const fetchItems = async () => {
        setLoading(true);
        try {
            const typeParam = activeType !== 'all' ? `?type=${activeType}` : '';
            const res = await fetch(`${API_URL}/content${typeParam}`);
            const data = await res.json();
            setItems(data.items || []);
        } catch (err) {
            console.error('Fetch error:', err);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (token) fetchItems();
    }, [activeType, token]);

    // Upload cover image
    const handleCoverUpload = async (e) => {
        const file = e.target.files?.[0];
        console.log('[Upload Debug] File selected:', file);
        console.log('[Upload Debug] Token exists:', !!token);
        console.log('[Upload Debug] API_URL:', API_URL);
        if (!file) return;

        setUploadingCover(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            console.log('[Upload Debug] FormData created, calling:', `${API_URL}/uploads`);

            const res = await fetch(`${API_URL}/uploads`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });
            console.log('[Upload Debug] Response status:', res.status, res.statusText);

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ message: 'Upload failed' }));
                console.error('[Upload Debug] Error response:', errorData);
                throw new Error(errorData.message || 'Upload failed');
            }
            const data = await res.json();
            console.log('[Upload Debug] Success data:', data);
            const imageUrl = data.url.startsWith('http') ? data.url : `${API_URL.replace('/api', '')}${data.url}`;
            setFormImgCover(imageUrl);
        } catch (err) {
            console.error('[Upload Debug] Catch error:', err);
            alert(err.message || 'Failed to upload cover image');
        }
        setUploadingCover(false);
        e.target.value = '';
    };

    // Create/Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editItem ? 'PATCH' : 'POST';
        const url = editItem ? `${API_URL}/content/${editItem.id}` : `${API_URL}/content`;

        try {
            const res = await fetch(url, {
                method,
                headers: authHeaders,
                body: JSON.stringify({
                    title: formTitle || null,
                    type: formType,
                    imgCover: formImgCover || null,
                    metadata: (formType === 'site' || formType === 'policy') ? formMetadata : null,
                    content: formContent,
                }),
            });
            if (!res.ok) throw new Error('Lưu thất bại');
            setShowModal(false);
            setEditItem(null);
            resetForm();
            fetchItems();
        } catch (err) {
            alert(err.message);
        }
    };

    // Delete
    const handleDelete = async (id) => {
        if (!confirm('Bạn có chắc muốn xóa nội dung này?')) return;
        try {
            await fetch(`${API_URL}/content/${id}`, {
                method: 'DELETE',
                headers: authHeaders,
            });
            fetchItems();
        } catch (err) {
            alert('Xóa thất bại');
        }
    };

    // Reset form
    const resetForm = () => {
        setFormTitle('');
        setFormType('news');
        setFormImgCover('');
        setFormMetadata({ category: '', location: '' });
        setFormContent({ type: 'doc', content: [{ type: 'paragraph' }] });
    };

    // Open edit modal
    const openEdit = (item) => {
        setEditItem(item);
        setFormTitle(item.title || '');
        setFormType(item.type);
        setFormImgCover(item.imgCover || '');
        setFormMetadata(item.metadata || { category: '', location: '' });
        setFormContent(item.content || { type: 'doc', content: [{ type: 'paragraph' }] });
        setShowModal(true);
    };

    // Open create modal
    const openCreate = () => {
        setEditItem(null);
        resetForm();
        setShowModal(true);
    };

    // Login Screen
    if (!token) {
        return (
            <div className="admin-login-wrapper">
                <form className="admin-login-form" onSubmit={handleLogin}>
                    <div className="admin-login-header">
                        <h1>Quản Trị Nội Dung</h1>
                        <p>Đăng nhập để quản lý hệ thống</p>
                    </div>
                    {loginError && <div className="admin-error">{loginError}</div>}
                    <div className="admin-form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                            placeholder="admin@example.com"
                            required
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="admin-btn admin-btn-primary">
                        Đăng Nhập
                    </button>
                </form>
            </div>
        );
    }

    // Dashboard
    return (
        <div className="admin-layout">
            {/* Header */}
            <header className="admin-header">
                <h1>📝 Content Management</h1>
                <button onClick={handleLogout} className="admin-btn admin-btn-outline">
                    Đăng Xuất
                </button>
            </header>

            {/* Sidebar */}
            <aside className="admin-sidebar">
                {CONTENT_TYPES.slice(1).map((type) => (
                    <button
                        key={type.id}
                        className={`admin-tab ${activeType === type.id ? 'active' : ''}`}
                        onClick={() => setActiveType(type.id)}
                    >
                        <span className="admin-tab-icon">{type.icon}</span>
                        {type.label}
                    </button>
                ))}
            </aside>

            {/* Content */}
            <main className="admin-content">
                <div className="admin-toolbar">
                    <h2>
                        {CONTENT_TYPES.find((t) => t.id === activeType)?.label || 'Tất cả nội dung'}
                    </h2>
                    <button onClick={openCreate} className="admin-btn admin-btn-accent">
                        + Thêm Mới
                    </button>
                </div>

                {/* Type Filter Pills */}
                <div className="admin-type-filters">
                    {CONTENT_TYPES.map((type) => (
                        <button
                            key={type.id}
                            className={`admin-type-pill ${activeType === type.id ? 'active' : ''}`}
                            onClick={() => setActiveType(type.id)}
                        >
                            {type.icon} {type.label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="admin-loading">Đang tải...</div>
                ) : items.length === 0 ? (
                    <div className="admin-empty">
                        <div className="admin-empty-icon">📭</div>
                        <p>Chưa có nội dung nào</p>
                    </div>
                ) : (
                    <div className="admin-content-grid">
                        {items.map((item) => (
                            <div key={item.id} className="admin-content-card">
                                {item.imgCover && (
                                    <div className="admin-card-cover">
                                        <img src={item.imgCover} alt="" />
                                    </div>
                                )}
                                <div className="admin-card-body">
                                    <div className="admin-card-header">
                                        <span className={`admin-card-type ${item.type}`}>
                                            {CONTENT_TYPES.find((t) => t.id === item.type)?.label || item.type}
                                        </span>
                                        <span className="admin-card-date">
                                            {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                                        </span>
                                    </div>
                                    <h3 className="admin-card-title">
                                        {item.title || 'Untitled'}
                                    </h3>
                                    <div className="admin-card-actions">
                                        <button
                                            onClick={() => openEdit(item)}
                                            className="admin-btn admin-btn-sm admin-btn-outline"
                                        >
                                            ✏️ Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="admin-btn admin-btn-sm admin-btn-danger"
                                        >
                                            🗑️ Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Modal - only closes via X button */}
            {showModal && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h3>{editItem ? 'Chỉnh Sửa Nội Dung' : 'Thêm Nội Dung Mới'}</h3>
                            <button onClick={() => setShowModal(false)} className="admin-modal-close">
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-modal-body">
                            {/* Title */}
                            <div className="admin-form-group">
                                <label>Tiêu đề</label>
                                <input
                                    type="text"
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                    placeholder="Nhập tiêu đề..."
                                />
                            </div>

                            {/* Type Selection */}
                            <div className="admin-form-group">
                                <label>Loại nội dung</label>
                                <div className="admin-type-selection">
                                    {CONTENT_TYPES.slice(1).map((type) => (
                                        <button
                                            key={type.id}
                                            type="button"
                                            className={`admin-type-option ${formType === type.id ? 'selected' : ''}`}
                                            onClick={() => setFormType(type.id)}
                                        >
                                            {type.icon}<br />{type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Cover Image */}
                            <div className="admin-form-group">
                                <label>Ảnh bìa</label>
                                <div className="admin-cover-upload">
                                    {formImgCover ? (
                                        <div className="admin-cover-preview">
                                            <img src={formImgCover} alt="Cover" />
                                            <button
                                                type="button"
                                                className="admin-cover-remove"
                                                onClick={() => setFormImgCover('')}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            className="admin-cover-button"
                                            onClick={() => coverInputRef.current?.click()}
                                            disabled={uploadingCover}
                                        >
                                            {uploadingCover ? 'Đang tải...' : '📷 Chọn ảnh bìa'}
                                        </button>
                                    )}
                                    <input
                                        ref={coverInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCoverUpload}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>

                            {/* Site-specific metadata fields */}
                            {formType === 'site' && (
                                <>
                                    <div className="admin-form-group">
                                        <label>Phân loại di tích</label>
                                        <select
                                            value={formMetadata.category}
                                            onChange={(e) => setFormMetadata({ ...formMetadata, category: e.target.value })}
                                            className="admin-select"
                                        >
                                            <option value="">-- Chọn phân loại --</option>
                                            <option value="Cấp Quốc Gia">Cấp Quốc Gia</option>
                                            <option value="Cấp Tỉnh">Cấp Tỉnh</option>
                                        </select>
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Địa điểm</label>
                                        <input
                                            type="text"
                                            value={formMetadata.location}
                                            onChange={(e) => setFormMetadata({ ...formMetadata, location: e.target.value })}
                                            placeholder="Nhập địa điểm di tích..."
                                        />
                                    </div>
                                </>
                            )}

                            {/* Policy-specific metadata fields */}
                            {formType === 'policy' && (
                                <div className="admin-form-group">
                                    <label>Phân loại chính sách</label>
                                    <select
                                        value={formMetadata.category}
                                        onChange={(e) => setFormMetadata({ ...formMetadata, category: e.target.value })}
                                        className="admin-select"
                                    >
                                        <option value="">-- Chọn phân loại --</option>
                                        <option value="bao-ton-di-san">Bảo tồn di sản</option>
                                        <option value="ho-tro-dan-toc">Hỗ trợ dân tộc thiểu số</option>
                                    </select>
                                </div>
                            )}

                            {/* TipTap Editor */}
                            <div className="admin-form-group">
                                <label>Nội dung</label>
                                <TipTapEditor
                                    content={formContent}
                                    onChange={setFormContent}
                                />
                            </div>

                            <div className="admin-modal-footer">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="admin-btn admin-btn-outline"
                                >
                                    Hủy
                                </button>
                                <button type="submit" className="admin-btn admin-btn-primary">
                                    {editItem ? 'Cập Nhật' : 'Tạo Mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
