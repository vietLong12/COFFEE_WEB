import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ServiceItem from "./serviceChildren/ServiceItem";
import { dataService } from "../../data/data";
import { useEffect, useState } from "react";

const Service = () => {
  const data = dataService;
  const [screenWidth, setScreenWidth] = useState(screen.width);
  useEffect(() => {
    setScreenWidth(screen.width);
  }, [screenWidth]);
  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={screenWidth > 600 ? 3 : 1}
        initialSlide={2}
        freeMode={true}
        onResize={() => setScreenWidth(screen.width)}
        onSlideChangeTransitionEnd={(swiper) => swiper.slideToLoop(1)}
        className="bg-primary w-full h-auto p-14 rounded-3xl mt-24 select-none"
      >
        <SwiperSlide></SwiperSlide>

        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <ServiceItem desc={item.desc} img={item.img} title={item.title} />
          </SwiperSlide>
        ))}

        <SwiperSlide></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Service;
