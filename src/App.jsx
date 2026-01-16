import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import VanHoa from './pages/VanHoa';

import DanToc from './pages/DanToc';
import TonGiao from './pages/TonGiao';


// Placeholder components for other pages
// function DanToc() {
//     return (
//         <div className="container" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
//             <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
//                 Các Dân Tộc
//             </h1>
//             <p style={{ color: 'var(--color-text-muted)' }}>Trang này đang được phát triển...</p>
//         </div>
//     );
// }

// function TonGiao() {
//     return (
//         <div className="container" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
//             <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
//                 Tôn Giáo
//             </h1>
//             <p style={{ color: 'var(--color-text-muted)' }}>Trang này đang được phát triển...</p>
//         </div>
//     );
// }

function DiTich() {
    return (
        <div className="container" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
            <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Di Tích
            </h1>
            <p style={{ color: 'var(--color-text-muted)' }}>Trang này đang được phát triển...</p>
        </div>
    );
}

function ChinhSach() {
    return (
        <div className="container" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
            <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Chính Sách
            </h1>
            <p style={{ color: 'var(--color-text-muted)' }}>Trang này đang được phát triển...</p>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Navigate to="/van-hoa" replace />} />
                    <Route path="dan-toc" element={<DanToc />} />
                    <Route path="ton-giao" element={<TonGiao />} />
                    <Route path="di-tich" element={<DiTich />} />
                    <Route path="van-hoa" element={<VanHoa />} />
                    <Route path="chinh-sach" element={<ChinhSach />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
