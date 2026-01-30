import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import "./css/TonGiao.css";

import phatGiaoImg from '../assets/imagesAssets/ton-giao/phat_giao.png';
import kitoGiaoImg from '../assets/imagesAssets/ton-giao/kito_giao.png';
import congGiaoImg from '../assets/imagesAssets/ton-giao/cong_giao.png';

import headerBg from '../assets/imagesAssets/ton-giao/half_top.png';
import bottomBg from '../assets/imagesAssets/ton-giao/half_bottom.png';

import textTonGiao from '../assets/imagesAssets/ton-giao/text_ton_giao.png';


const RELIGION_DATA = [
  {
    id: 'phat-giao',
    name: 'PHẬT GIÁO',
    // image: '/path-to-buddha.png', 
    image: phatGiaoImg, // Replace with your actual asset path

  },
  {
    id: 'kito-giao',
    name: 'KITÔ GIÁO',
    image: kitoGiaoImg,
  },
  {
    id: 'cong-giao',
    name: 'CÔNG GIÁO',
    image: congGiaoImg,
  }
];

export default function TonGiao() {

  const [selectedReligion, setSelectedReligion] = useState(null);
  useEffect(() => { document.body.classList.add("no-padding"); return () => { document.body.classList.remove("no-padding"); }; }, []);


  if (selectedReligion) {
    return (

      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-4xl">
          <div className="min-h-screen bg-[#F9F7F2] animate-fadeIn font-sans pb-20"
            style={{
              marginTop: '100px'
            }}
          >
            {/* 1. Minimalist Top Nav */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <button
                onClick={() => setSelectedReligion(null)}
                className="group flex items-center text-[#a63d24] font-medium transition-all hover:gap-2"
              >
                <span className="mr-2">←</span> Danh sách tôn giáo
              </button>
              <span className="text-gray-400 text-sm tracking-widest uppercase">Thông tin chi tiết</span>
            </nav>

            <div className="max-w-4xl mx-auto mt-12 px-6">
              {/* 2. Hero Header Section */}
              <header className="text-center mb-16">
                <div className="inline-block px-3 py-1 mb-4 border border-[#a63d24] text-[#a63d24] text-xs tracking-widest uppercase rounded-full">
                  Tôn giáo & Tín ngưỡng
                </div>
                <h1 className="text-5xl md:text-6xl font-serif text-[#2D2D2D] mb-6">
                  {selectedReligion.name}
                </h1>
                <div className="w-24 h-1 bg-[#a63d24] mx-auto"></div>
              </header>

              {/* 3. Main Content Card */}
              <article className="bg-white p-8 md:p-16 shadow-[0_10px_50px_rgba(0,0,0,0.04)] rounded-2xl">

                <h2 className="text-2xl font-semibold text-[#a63d24] mb-8 border-b border-gray-100 pb-4">
                  {selectedReligion.title || "Tổng quan về tôn giáo"}
                </h2>

                {/* Body Text */}
                <div
                  className="text-gray-700 text-lg leading-[1.8] text-justify space-y-6 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-[#a63d24]"
                  dangerouslySetInnerHTML={{
                    __html: selectedReligion.description ||
                      "Việt Nam là một quốc gia đa tôn giáo với sự chung sống hòa bình giữa Phật giáo, Công giáo, Tin lành, Cao đài, và các tín ngưỡng dân gian đặc sắc. <br/><br/> Mỗi tôn giáo mang một nét đẹp riêng, góp phần tạo nên bản sắc văn hóa đa dạng, nhân văn và đầy tính cộng đồng."
                  }}
                />

                {/* Accent Box */}
                <section className="mt-12 p-8 bg-[#FDFBF7] border-l-4 border-[#D4AF37] relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-[#a68d4b] font-bold text-sm tracking-tighter uppercase mb-2">Giá trị cốt lõi</h4>
                    <p className="italic text-gray-600 leading-relaxed">
                      {selectedReligion.extraInfo || "Những giáo lý tốt đời đẹp đạo luôn hướng con người tới cái thiện, sự bao dung và tinh thần đoàn kết dân tộc."}
                    </p>
                  </div>
                  {/* Subtle Background Watermark Icon */}
                  <div className="absolute -right-4 -bottom-4 opacity-5 text-8xl font-serif">🕊️</div>
                </section>

                {/* Image Grid with Caption */}
                <div className="mt-12 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                      <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform">
                        {selectedReligion.gallery?.[0] ? <img src={selectedReligion.gallery[0]} className="w-full h-full object-cover" /> : "Hình ảnh minh họa 1"}
                      </div>
                    </div>
                    <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                      <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform">
                        {selectedReligion.gallery?.[1] ? <img src={selectedReligion.gallery[1]} className="w-full h-full object-cover" /> : "Hình ảnh minh họa 2"}
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-400 italic">Kiến trúc và hoạt động tôn giáo đặc trưng tại địa phương</p>
                </div>
              </article>

              {/* 4. Simple Footer Footer */}
              <footer className="mt-20 text-center border-t border-gray-200 pt-10">
                <p className="text-gray-500 text-sm">© 2024 Bản đồ Văn hóa Tôn giáo Thái Nguyên</p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- GRID VIEW (Original) ---
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden font-sans ">

      {/* 1. BACKGROUND LAYERS */}
      <div className="absolute inset-0 z-0">
        {/* Top Red Section */}
        <div className="h-[45vh] bg-[#a63d24] w-full relative"
          style={{
            backgroundImage: `url(${headerBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >

        </div>

        {/* Bottom White/Wheat Section */}
        <div className="h-[55vh] bg-white w-full relative"
          style={{
            backgroundImage: `url(${bottomBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >

        </div>

      </div>

      <div className="relative z-10 flex flex-col items-center pt-10"
        style={{
          marginTop: '100px'
        }}
      >
        <div
          className="w-full max-w-[250px] aspect-[4/1] bg-contain bg-center bg-no-repeat mx-auto"
          style={{
            backgroundImage: `url(${textTonGiao})`,
            marginBottom: '50px'
          }}
        ></div>

        {/* Religion Cards Grid */}
        <div className="flex flex-wrap justify-center gap-30 px-4 max-w-7xl">
          {RELIGION_DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedReligion(item)}
              className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-4"
            >
              <div className="relative w-64 h-90 rounded-t-lg overflow-hidden">
                <div className="text-center py-4">
                  <span className="text-[#a68d4b] font-bold text-xl tracking-widest uppercase">{item.name}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center mt-12">
                  <img src={item.image} alt={item.name} />
                </div>
              </div>
              <div className="mt-4 w-32 h-2 bg-black/5 rounded-[100%] blur-md group-hover:scale-150 transition-all"></div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}