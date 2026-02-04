import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import VanHoa from './pages/VanHoa';
import ChinhSach from './pages/ChinhSach';
import ContentDetail from './pages/ContentDetail';
import ContentList from './pages/ContentList';
import Admin from './pages/Admin';
import EditorDemo from './pages/EditorDemo';

import DanToc from './pages/DanToc';
import TonGiao from './pages/TonGiao';
import DiTich from './pages/DiTich';
import DiTichDetail from './pages/DiTichDetail';

function App() {
    return (
        <BrowserRouter basename="/dantoctongiao">
            <Routes>
                {/* Admin route - no layout wrapper */}
                <Route path="/admin" element={<Admin />} />
                
                {/* Editor Demo - Novel.sh prototype */}
                <Route path="/editor-demo" element={<EditorDemo />} />
                
                {/* Public routes with MainLayout */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Navigate to="/dan-toc" replace />} />
                    <Route path="dan-toc" element={<DanToc />} />
                    <Route path="ton-giao" element={<TonGiao />} />
                    <Route path="di-tich" element={<DiTich />} />
                    <Route path="di-tich/:id" element={<DiTichDetail />} />
                    <Route path="van-hoa" element={<VanHoa />} />
                    <Route path="van-hoa/tin-tuc" element={<ContentList type="news" />} />
                    <Route path="van-hoa/su-kien" element={<ContentList type="event" />} />
                    <Route path="van-hoa/tin-tuc/:id" element={<ContentDetail />} />
                    <Route path="van-hoa/su-kien/:id" element={<ContentDetail />} />
                    <Route path="chinh-sach" element={<ChinhSach />} />
                    <Route path="chinh-sach/:id" element={<ContentDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
