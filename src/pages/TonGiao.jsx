import { useEffect } from "react";
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
  useEffect(() => { document.body.classList.add("no-padding"); return () => { document.body.classList.remove("no-padding"); }; }, []);

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
                  <img src={item.image} />
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