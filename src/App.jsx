import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import VanHoa from './pages/VanHoa';
import ChinhSach from './pages/ChinhSach';
import Admin from './pages/Admin';

import DanToc from './pages/DanToc';
import TonGiao from './pages/TonGiao';
import DiTich from './pages/DiTich';
import DiTichDetail from './pages/DiTichDetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Admin route - no layout wrapper */}
                <Route path="/admin" element={<Admin />} />
                
                {/* Public routes with MainLayout */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Navigate to="/van-hoa" replace />} />
                    <Route path="dan-toc" element={<DanToc />} />
                    <Route path="ton-giao" element={<TonGiao />} />
                    <Route path="di-tich" element={<DiTich />} />
                    <Route path="di-tich/:id" element={<DiTichDetail />} />
                    <Route path="van-hoa" element={<VanHoa />} />
                    <Route path="chinh-sach" element={<ChinhSach />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
