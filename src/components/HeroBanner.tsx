'use client'
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import { CiBookmark } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";

interface Slide {
  img: string;
  genre: string;
  title: string;
  meta: string;
  desc: string;
}

const slides: Slide[] = [
  {
    img: "/HeroImages/hero-image-1.jpg",
    genre: "ACTION THRILLER",
    title: "Elephant Walk At Sunset",
    meta: "2hr 00mins • Action • 1 year",
    desc: "Streamlab is a long established fact that a reader will be distracted by the readable content of a page when Streamlab at its layout Streamlab.",
  },
  {
    img: "/HeroImages/hero-image-2.jpg",
    genre: "WAR DRAMA",
    title: "Silent Frontline",
    meta: "1hr 45mins • War • 2 years",
    desc: "A gripping tale of survival and courage set against the backdrop of a forgotten conflict.",
  },
  {
    img: "/HeroImages/hero-image-3.jpg",
    genre: "CRIME MYSTERY",
    title: "Midnight Highway",
    meta: "2hr 10mins • Crime • 6 months",
    desc: "A stolen car, a desperate driver, and a night that refuses to end.",
  },
  {
    img: "/HeroImages/hero-image-4.jpg",
    genre: "SPORT DRAMA",
    title: "One More Round",
    meta: "1hr 55mins • Sport • 1 year",
    desc: "An underdog fighter trains in the shadows, chasing one final shot at redemption.",
  },
  {
    img: "/HeroImages/hero-image-5.jpg",
    genre: "SCI-FI",
    title: "Beyond The Horizon",
    meta: "2hr 20mins • Sci-Fi • 3 months",
    desc: "A crew ventures into the unknown, where every discovery reshapes what they believed was real.",
  },
];

const HeroBanner= () => {
  const [current, setCurrent] = useState<number>(0);
  const [thumbSwiper, setThumbSwiper] = useState<SwiperClass | null>(null);

  const goToSlide = (index: number) => {
    setCurrent(index);
    thumbSwiper?.slideToLoop(index, 400);
  };

  const shift = (dir: number) => {
    goToSlide((current + dir + slides.length) % slides.length);
  };

  const slide = slides[current];

  return (
    <section
      className="relative w-full min-h-[480px] sm:min-h-[620px] h-[88vh] flex items-end sm:items-center bg-cover bg-center overflow-hidden transition-[background-image] duration-500 ease-in-out text-white"
      style={{ backgroundImage: `url(${slide.img})` }}
    >
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />
      {/* content */}
      <div className="relative z-10 px-5 sm:px-14 max-w-xl pb-44 sm:pb-0">
         
        <div className="text-red-600 tracking-widest font-bold text-xs sm:text-sm mb-2 sm:mb-3">
          {slide.genre}
        </div>
        <h1 className="text-3xl sm:text-6xl font-extrabold leading-tight mb-3 sm:mb-4">
          {slide.title}
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">{slide.meta}</div>
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-7">
          {slide.desc}
        </p>
        <div className="flex items-center flex-wrap gap-3 sm:gap-8">
          <button className= "flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 sm:px-6 sm:py-3 rounded-md text-sm transition-colors">
            Play Now <FaPlay />
          </button>
          <button className="flex items-center gap-1  text-white text-xs sm:text-sm bg-transparent hover:opacity-80 transition-opacity">
            Watch Later <CiBookmark />
          </button>
        </div>
      </div>

      {/* carousel */}
      <div className="absolute bottom-8 sm:bottom-10 left-4 right-4 sm:left-auto sm:right-14 z-20 flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => shift(-1)}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-base sm:text-lg shrink-0 transition-colors"
        >
          &#10094;
        </button>

        <div className="flex-1 min-w-0 sm:flex-none sm:w-[414px] lg:w-[706px]">
          <Swiper
            modules={[Autoplay]}
            onSwiper={setThumbSwiper}
            onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
            loop
            centeredSlides
            slidesPerView={2}
            spaceBetween={12}
            speed={400}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 12 },
              1024: { slidesPerView: 5, spaceBetween: 14 },
            }}
          >
            {slides.map((s, i) => (
              <SwiperSlide key={i}>
                <div
                  onClick={() => goToSlide(i)}
                  className={`h-[60px] sm:h-[70px] md:h-[90px] w-full rounded-md bg-cover bg-center cursor-pointer border-[3px] transition-all duration-300 ${
                    i === current
                      ? "border-red-600 opacity-100 -translate-y-1.5"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundImage: `url(${s.img})` }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          onClick={() => shift(1)}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-base sm:text-lg shrink-0 transition-colors"
        >
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
