import { useState, useEffect, useRef } from 'react';
import TipTapEditor from '../components/TipTapEditor';
import './css/Admin.css';

const API_URL = 'http://localhost:3001/api';

const CONTENT_TYPES = [
    { id: 'all', label: 'Tất cả', icon: '📋' },
    { id: 'ethnic', label: 'Dân Tộc', icon: '👥' },
    { id: 'religious', label: 'Tôn Giáo', icon: '🕌' },
    { id: 'site', label: 'Di Tích', icon: '🏛️' },
    { id: 'news', label: 'Văn Hóa', icon: '📰' },
    { id: 'policy', label: 'Chính Sách', icon: '📜' },
    { id: 'event', label: 'Sự Kiện', icon: '📅' },
    { id: 'users', label: 'Người Dùng', icon: '👤' },
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
    const [formEmail, setFormEmail] = useState('');
    const [formPassword, setFormPassword] = useState('');
    const [formRole, setFormRole] = useState('manager');
    const [formName, setFormName] = useState('');
    
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
            let url = '';
            if (activeType === 'users') {
                url = `${API_URL}/users`;
            } else {
                const typeParam = activeType !== 'all' ? `?type=${activeType}` : '';
                url = `${API_URL}/content${typeParam}`;
            }

            const res = await fetch(url, {
                headers: activeType === 'users' ? authHeaders : {},
            });
            
            if (activeType === 'users') {
                const data = await res.json();
                setItems(data || []);
            } else {
                const data = await res.json();
                setItems(data.items || []);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setItems([]);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editItem ? 'PATCH' : 'POST';
        let url;
        
        if (activeType === 'users') {
            url = editItem ? `${API_URL}/users/${editItem.id}` : `${API_URL}/users`;
        } else {
            url = editItem ? `${API_URL}/content/${editItem.id}` : `${API_URL}/content`;
        }

        try {
            let body;
            
            if (activeType === 'users') {
                // User payload
                body = {
                    email: formEmail,
                    name: formName,
                    role: formRole,
                };
                // Only include password if creating new user or if password field has value (for update)
                if (!editItem || formPassword) {
                    body.password = formPassword;
                }
            } else {
                // Content payload
                body = {
                    title: formTitle || null,
                    type: formType,
                    imgCover: formImgCover || null,
                    metadata: (formType === 'site' || formType === 'policy') ? formMetadata : null,
                    content: formContent,
                };
            }

            const res = await fetch(url, {
                method,
                headers: authHeaders,
                body: JSON.stringify(body),
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
            const url = activeType === 'users' ? `${API_URL}/users/${id}` : `${API_URL}/content/${id}`;
            await fetch(url, {
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
        setFormType(activeType === 'users' ? 'users' : 'news'); // Reset to news if not in users mode, but keep users if in users mode? Actually best to reset based on activeType
        setFormImgCover('');
        setFormMetadata({ category: '', location: '' });
        setFormContent({ type: 'doc', content: [{ type: 'paragraph' }] });

        // User form reset
        setFormEmail('');
        setFormPassword('');
        setFormName('');
        setFormRole('manager');
    };

    // Open edit modal
    const openEdit = (item) => {
        setEditItem(item);
        setFormTitle(item.title || '');
        setFormType(item.type || 'news'); // item.type might be undefined for users
        setFormImgCover(item.imgCover || '');
        setFormMetadata(item.metadata || { category: '', location: '' });
        setFormContent(item.content || { type: 'doc', content: [{ type: 'paragraph' }] });
        
        // Sets user fields
        if (activeType === 'users') {
            setFormEmail(item.email || '');
            setFormName(item.name || '');
            setFormRole(item.role || 'manager');
            setFormPassword(''); // Don't show password
        }
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
                {CONTENT_TYPES.map((type) => (
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
                                {activeType !== 'users' && item.imgCover && (
                                    <div className="admin-card-cover">
                                        <img src={item.imgCover} alt="" />
                                    </div>
                                )}
                                <div className="admin-card-body">
                                    {activeType === 'users' ? (
                                        // User Card
                                        <>
                                            <div className="admin-card-header">
                                                <span className={`admin-card-type user`}>
                                                    {item.role === 'admin' ? '👮 Admin' : '👤 Manager'}
                                                </span>
                                                <span className="admin-card-date">
                                                    {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                                                </span>
                                            </div>
                                            <h3 className="admin-card-title">{item.name}</h3>
                                            <p className="admin-card-subtitle">{item.email}</p>
                                        </>
                                    ) : (
                                        // Content Card
                                        <>
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
                                        </>
                                    )}
                                    
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


                            {/* User Form Fields (only when in Users mode) */}
                            {activeType === 'users' ? (
                                <div className="admin-user-form">
                                    <div className="admin-form-group">
                                        <label>Tên người dùng</label>
                                        <input
                                            type="text"
                                            value={formName}
                                            onChange={(e) => setFormName(e.target.value)}
                                            placeholder="Nhập tên..."
                                            required
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            value={formEmail}
                                            onChange={(e) => setFormEmail(e.target.value)}
                                            placeholder="email@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Mật khẩu {editItem && '(Để trống nếu không đổi)'}</label>
                                        <input
                                            type="password"
                                            value={formPassword}
                                            onChange={(e) => setFormPassword(e.target.value)}
                                            placeholder="••••••••"
                                            required={!editItem}
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Vai trò</label>
                                        <select
                                            value={formRole}
                                            onChange={(e) => setFormRole(e.target.value)}
                                            className="admin-select"
                                        >
                                            <option value="manager">Manager</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Content Form Fields */}
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
                                            {CONTENT_TYPES.filter(t => t.id !== 'all' && t.id !== 'users').map((type) => (
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
                                </>
                            )}

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
