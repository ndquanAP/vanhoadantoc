import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
    { path: '/dan-toc', label: 'Dân Tộc' },
    { path: '/ton-giao', label: 'Tôn Giáo' },
    { path: '/di-tich', label: 'Di Tích' },
    { path: '/van-hoa', label: 'Văn Hoá' },
    { path: '/chinh-sach', label: 'Chính Sách' },
];

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-pattern flex flex-col">
            {/* Header */}
            <header className="header">
                <div className="container">
                    <nav className="nav">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer - Vietnamese Ink-Wash Landscape */}
            <footer className="footer">
                {/* Decorative Mountain Layers */}
                <div className="footer-mountains">
                    <div className="footer-mist"></div>
                    <div className="footer-wheat-band"></div>
                    <div className="footer-mountain-layer-3"></div>
                    <div className="footer-mountain-layer-2"></div>
                    <div className="footer-mountain-layer-1"></div>
                </div>

                {/* Footer Content */}
                <div className="footer-content-section">
                    <div className="container">
                        <div className="footer-inner">
                            <span className="footer-brand">Văn Hoá Dân Tộc Việt Nam</span>
                            
                            <nav className="footer-nav">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className="footer-nav-link"
                                    >
                                        {item.label}
                                    </NavLink>
                                ))}
                            </nav>

                            <hr className="footer-divider" />

                            <p className="footer-copyright">
                                © 2025 Văn Hoá Dân Tộc Việt Nam. Tất cả quyền được bảo lưu.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

