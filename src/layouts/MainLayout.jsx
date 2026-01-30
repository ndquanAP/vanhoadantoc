import { NavLink, Outlet } from 'react-router-dom';
import footerBg from '../assets/imagesAssets/backgroundfooter.png';

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

            {/* Footer */}
            <footer className="footer relative p-0 mt-12 w-full" style={{ padding: '0' }} >
                <img
                    src={footerBg}
                    alt="Footer Background"
                    className="w-full h-auto block"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container">
                        <div className="footer-content">
                            {/* <p className="text-white">© 2025 Văn Hoá Dân Tộc Việt Nam. Tất cả quyền được bảo lưu.</p> */}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
