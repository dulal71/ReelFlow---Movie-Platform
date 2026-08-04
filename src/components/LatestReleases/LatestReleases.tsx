import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/navigation'
import SectionHeader from '../SectionHeader/SectionHeader'
import MovieCard from './MovieCard'
import { LATEST_RELEASES } from '../../data/latestReleases'

function LatestReleases() {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const handleBeforeInit = (swiper: SwiperClass) => {
    swiper.params.navigation = {
      ...swiper.params.navigation,
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    }
  }

  return (
    <section className="bg-[#121212] py-14 sm:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
        <SectionHeader title="Latest Releases" onViewAll={() => {}} />

        <div className="relative mt-10">
          <Swiper
            modules={[Navigation, Autoplay, Keyboard]}
            onBeforeInit={handleBeforeInit}
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 5, spaceBetween: 24 },
            }}
            loop
            speed={700}
            keyboard={{ enabled: true, onlyInViewport: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          >
            {LATEST_RELEASES.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* custom navigation arrows (outside slider) */}
          <button
            ref={prevRef}
            type="button"
            aria-label="Previous releases"
            className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-red-600 border border-white/10 text-white items-center justify-center transition-colors z-10 cursor-pointer"
          >
            <FaChevronLeft />
          </button>
          <button
            ref={nextRef}
            type="button"
            aria-label="Next releases"
            className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-red-600 border border-white/10 text-white items-center justify-center transition-colors z-10 cursor-pointer"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}

export default LatestReleases
