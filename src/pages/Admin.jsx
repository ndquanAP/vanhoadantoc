import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api';

export default function Admin() {
    const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
    const [activeTab, setActiveTab] = useState('news');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');

    // Form state for create/edit
    const [formData, setFormData] = useState({});

    const tabs = [
        { id: 'news', label: 'Tin Tức', icon: '📰' },
        { id: 'events', label: 'Sự Kiện', icon: '📅' },
        { id: 'policies', label: 'Chính Sách', icon: '📋' },
    ];

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
            if (!res.ok) throw new Error(data.message || 'Login failed');
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
            const res = await fetch(`${API_URL}/${activeTab}`);
            const data = await res.json();
            setItems(data.items || data);
        } catch (err) {
            console.error('Fetch error:', err);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (token) fetchItems();
    }, [activeTab, token]);

    // Create/Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editItem ? 'PATCH' : 'POST';
        const url = editItem ? `${API_URL}/${activeTab}/${editItem.id}` : `${API_URL}/${activeTab}`;
        
        try {
            const res = await fetch(url, {
                method,
                headers: authHeaders,
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error('Failed to save');
            setShowModal(false);
            setEditItem(null);
            setFormData({});
            fetchItems();
        } catch (err) {
            alert(err.message);
        }
    };

    // Delete
    const handleDelete = async (id) => {
        if (!confirm('Bạn có chắc muốn xóa?')) return;
        try {
            await fetch(`${API_URL}/${activeTab}/${id}`, {
                method: 'DELETE',
                headers: authHeaders,
            });
            fetchItems();
        } catch (err) {
            alert('Delete failed');
        }
    };

    // Open edit modal
    const openEdit = (item) => {
        setEditItem(item);
        setFormData({ ...item });
        setShowModal(true);
    };

    // Open create modal
    const openCreate = () => {
        setEditItem(null);
        setFormData(getDefaultForm());
        setShowModal(true);
    };

    // Default form data based on active tab
    const getDefaultForm = () => {
        switch (activeTab) {
            case 'news': return { title: '', excerpt: '', content: '', image: '', isNew: true };
            case 'events': return { title: '', date: '', tag: '', image: '' };
            case 'policies': return { title: '', excerpt: '', content: '', category: 'CHÍNH SÁCH', image: '', isNew: true };
            default: return {};
        }
    };

    // Login form
    if (!token) {
        return (
            <div className="admin-login-wrapper">
                <form className="admin-login-form" onSubmit={handleLogin}>
                    <div className="admin-login-header">
                        <h1>Đăng Nhập Quản Trị</h1>
                        <p>Vui lòng đăng nhập để tiếp tục</p>
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

    // Main admin dashboard
    return (
        <div className="admin-layout">
            {/* Header */}
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} className="admin-btn admin-btn-outline">
                    Đăng Xuất
                </button>
            </header>

            {/* Sidebar */}
            <aside className="admin-sidebar">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className="admin-tab-icon">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </aside>

            {/* Content */}
            <main className="admin-content">
                <div className="admin-toolbar">
                    <h2>{tabs.find(t => t.id === activeTab)?.label}</h2>
                    <button onClick={openCreate} className="admin-btn admin-btn-primary">
                        + Thêm Mới
                    </button>
                </div>

                {loading ? (
                    <div className="admin-loading">Đang tải...</div>
                ) : (
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tiêu đề</th>
                                    <th>{activeTab === 'events' ? 'Ngày' : 'Ngày tạo'}</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td className="admin-cell-title">{item.title}</td>
                                        <td>{item.date || new Date(item.createdAt).toLocaleDateString('vi-VN')}</td>
                                        <td>
                                            <button onClick={() => openEdit(item)} className="admin-btn admin-btn-sm">
                                                Sửa
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="admin-btn admin-btn-sm admin-btn-danger">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {items.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="admin-empty">Chưa có dữ liệu</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>

            {/* Modal */}
            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{editItem ? 'Chỉnh Sửa' : 'Thêm Mới'}</h3>
                            <button onClick={() => setShowModal(false)} className="admin-modal-close">×</button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-modal-body">
                            <div className="admin-form-group">
                                <label>Tiêu đề</label>
                                <input
                                    type="text"
                                    value={formData.title || ''}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            {activeTab === 'events' ? (
                                <>
                                    <div className="admin-form-group">
                                        <label>Ngày</label>
                                        <input
                                            type="text"
                                            value={formData.date || ''}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            placeholder="dd/mm/yyyy"
                                            required
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Tag</label>
                                        <input
                                            type="text"
                                            value={formData.tag || ''}
                                            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                            required
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="admin-form-group">
                                        <label>Tóm tắt</label>
                                        <textarea
                                            value={formData.excerpt || ''}
                                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                            rows={2}
                                            required
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Nội dung</label>
                                        <textarea
                                            value={formData.content || ''}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            rows={4}
                                            required
                                        />
                                    </div>
                                    {activeTab === 'policies' && (
                                        <div className="admin-form-group">
                                            <label>Danh mục</label>
                                            <select
                                                value={formData.category || ''}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                <option value="CHÍNH SÁCH">CHÍNH SÁCH</option>
                                                <option value="BẢO TỒN DI SẢN">BẢO TỒN DI SẢN</option>
                                                <option value="HỖ TRỢ DÂN TỘC THIỂU SỐ">HỖ TRỢ DÂN TỘC THIỂU SỐ</option>
                                            </select>
                                        </div>
                                    )}
                                </>
                            )}

                            <div className="admin-form-group">
                                <label>URL Hình ảnh</label>
                                <input
                                    type="text"
                                    value={formData.image || ''}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="/uploads/image.jpg"
                                />
                            </div>

                            <div className="admin-modal-footer">
                                <button type="button" onClick={() => setShowModal(false)} className="admin-btn admin-btn-outline">
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
