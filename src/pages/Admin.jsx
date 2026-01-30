import { useState, useEffect } from 'react';
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

// Extract plain text from TipTap JSON for preview
const getTextPreview = (content, maxLength = 150) => {
    if (!content || !content.content) return 'Chưa có nội dung';
    
    const extractText = (nodes) => {
        let text = '';
        for (const node of nodes) {
            if (node.type === 'text') {
                text += node.text;
            } else if (node.content) {
                text += extractText(node.content);
            }
            if (node.type === 'paragraph' || node.type === 'heading') {
                text += ' ';
            }
        }
        return text;
    };
    
    const text = extractText(content.content).trim();
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

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
    const [formType, setFormType] = useState('news');
    const [formContent, setFormContent] = useState({ type: 'doc', content: [{ type: 'paragraph' }] });

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
                    type: formType,
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
        setFormType('news');
        setFormContent({ type: 'doc', content: [{ type: 'paragraph' }] });
    };

    // Open edit modal
    const openEdit = (item) => {
        setEditItem(item);
        setFormType(item.type);
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
                                <div className="admin-card-header">
                                    <span className={`admin-card-type ${item.type}`}>
                                        {CONTENT_TYPES.find((t) => t.id === item.type)?.label || item.type}
                                    </span>
                                    <span className="admin-card-date">
                                        {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                                <p className="admin-card-preview">
                                    {getTextPreview(item.content)}
                                </p>
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
                        ))}
                    </div>
                )}
            </main>

            {/* Modal */}
            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{editItem ? 'Chỉnh Sửa Nội Dung' : 'Thêm Nội Dung Mới'}</h3>
                            <button onClick={() => setShowModal(false)} className="admin-modal-close">
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-modal-body">
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
