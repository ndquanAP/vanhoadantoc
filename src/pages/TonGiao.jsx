import { useState, useEffect } from "react";
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

// Reusing generic assets from DanToc for detail view consistency
import infoTop from '../assets/imagesAssets/dan-toc/info_top.png';
import infoBottom from '../assets/imagesAssets/dan-toc/info_bottom.png';
import infoAvaBG from '../assets/imagesAssets/dan-toc/info_avatar_bg.png';


const RELIGION_DATA = [
  {
    id: 'phat-giao',
    name: 'PHẬT GIÁO',
    image: phatGiaoImg,
    description: "Phật giáo du nhập vào nước ta từ rất sớm và nhanh chóng hòa nhập với tín ngưỡng bản địa, trở thành một phần quan trọng trong đời sống tâm linh của người Việt. Với triết lý từ bi, hỷ xả, Phật giáo đã góp phần định hình hệ giá trị đạo đức, lối sống hướng thiện và tinh thần khoan dung của dân tộc.",
  },
  {
    id: 'kito-giao',
    name: 'KITÔ GIÁO',
    image: kitoGiaoImg,
    description: "Kitô giáo (bao gồm Công giáo và Tin Lành) là một trong những tôn giáo lớn tại Việt Nam...",
  },
  {
    id: 'cong-giao',
    name: 'CÔNG GIÁO',
    image: congGiaoImg,
    description: "Công giáo Việt Nam là một bộ phận của Giáo hội Công giáo Hoàn vũ, dưới sự lãnh đạo tinh thần của Giáo hoàng...",
  }
];

export default function TonGiao() {
  const [selectedReligion, setSelectedReligion] = useState(null);

  useEffect(() => { document.body.classList.add("no-padding"); return () => { document.body.classList.remove("no-padding"); }; }, []);

  // --- VIEW 2: DETAIL PAGE ---
  if (selectedReligion) {
    return (
      <div className="min-h-screen bg-white font-sans text-gray-800 pb-10"
        style={{
          backgroundImage: `url(${infoBottom})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          fontFamily: "'Candara', 'Optima', 'Verdana', 'Tahoma', sans-serif",
          color: '#410101'
        }}
      >
        {/* Header Banner */}
        <div className="relative h-84 bg-[#b34026] flex flex-col items-center justify-center text-white"
          style={{
            backgroundImage: `url(${infoTop})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <button
            onClick={() => setSelectedReligion(null)}
            className="absolute bottom-4 left-4 bg-white/20 hover:bg-white/40 px-4 py-1 rounded-md text-sm cursor-pointer z-50 pointer-events-auto"
            style={{
              padding: `5px 15px`,
              border: '1px solid white'
            }}
          >
            ← Quay lại
          </button>

          {/* Title instead of specific header image if unavailable */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest uppercase mb-4 drop-shadow-md" 
              style={{ fontFamily: 'var(--font-sans)', textShadow: '0 2px 4px rgba(224, 228, 25, 0.3)', color: '#e6b432' }}>
            {selectedReligion.name}
          </h1>

          {/* Circular Placeholder for Illustration */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-40 h-40 rounded-full z-30 bg-gray-200">
            {/* Background Image */}
            <img
              src={infoAvaBG}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover rounded-full scale-150"
            />
            {/* Foreground Avatar */}
            <img
              src={selectedReligion.image}
              alt="Avatar"
              className="absolute inset-0 w-full h-full object-contain z-40 transform scale-125 rounded-full p-2"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className='dantoc-container relative z-10'>
          <div className="max-w-5xl mx-auto px-6 mt-24 text-center"
            style={{
              paddingTop: '150px'
            }}
          >
            <p className="mb-8 text-justify leading-loose text-lg">
               {selectedReligion.description || `Thông tin chi tiết về ${selectedReligion.name} đang được cập nhật. Nội dung sẽ bao gồm lịch sử hình thành, đặc điểm nổi bật, và những đóng góp của tôn giáo này đối với văn hóa và đời sống xã hội.`}
            </p>
            
            <p className="mb-8 text-justify leading-loose text-lg">
                Đây là mô tả chi tiết hơn về các hoạt động, nghi lễ và ý nghĩa của {selectedReligion.name} trong đời sống tinh thần của tín đồ. Sự hiện diện của tôn giáo này đã làm phong phú thêm bức tranh văn hóa đa dạng của cộng đồng.
            </p>

            {/* Photo Gallery Grid Placeholder */}
            {/* Since we don't have specific highlight images yet, we can hide this or show placeholders */}
            <div className="flex flex-wrap gap-4 justify-center my-12">
                <div className="w-full md:w-1/3 aspect-video bg-gray-200 rounded flex items-center justify-center text-gray-400">
                    Ảnh minh họa 1
                </div>
                <div className="w-full md:w-1/3 aspect-video bg-gray-200 rounded flex items-center justify-center text-gray-400">
                    Ảnh minh họa 2
                </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 1: SELECTION GRID (Main Page) ---
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

      {/* 2. CONTENT AREA */}
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
              className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-4"
              onClick={() => setSelectedReligion(item)}
            >
              {/* The "Shield/Cloud" Shape Container */}

              <div className="relative w-64 h-90 rounded-t-lg  overflow-hidden">

                {/* Header Text inside Card */}
                <div className="text-center py-4">
                  <span className="text-[#a68d4b] font-bold text-xl tracking-widest uppercase">
                    {item.name}
                  </span>
                </div>

                {/* Character Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center mt-12">
                  <img src={item.image} alt={item.name} />
                </div>

              </div>

              {/* Decorative "Base" Shadow/Reflection */}
              <div className="mt-4 w-32 h-2 bg-black/5 rounded-[100%] blur-md group-hover:scale-150 transition-all"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .container {
          padding: 0;
          margin: 0;
          max-width: 100% !important;
        }
      `}</style>
    </div>
  );
}