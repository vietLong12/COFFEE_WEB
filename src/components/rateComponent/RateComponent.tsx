import "./rate.css";
import Heading from "../common/Heading";
import { dataUserReview } from "../../data/data";
import { Swiper, SwiperSlide } from "swiper/react";
import CardRate from "./CardRate";
import { useState } from "react";

const RateComponent = () => {
  const dataProps = dataUserReview;
  const [checkCursor, setCheckCursor] = useState(true);
  const [screenWidth, setScreenWidth] = useState(screen.width);

  return (
    <div className="font-bold tracking-tighter pt-60 bg-rate -mt-40 pb-4">
      <Heading title="ĐÁNH GIÁ KHÁCH HÀNG" href="/danh-gia-khach-hang"/>
      <Swiper
        spaceBetween={screenWidth > 1024 ? 16 : 4}
        slidesPerView={screenWidth > 1024 ? 3 : 1}
        initialSlide={3}
        freeMode={true}
        onSlideChangeTransitionEnd={(swiper) => swiper.slideToLoop(2)}
        className={`p-14 mt-8 select-none flex w-full lg:w-3/5 ${
          checkCursor ? "cursor-grab" : "cursor-grabbing"
        }`}
        onResize={() => setScreenWidth(screen.width)}
        onSliderMove={() => setCheckCursor(false)}
        onSlideChangeTransitionStart={(e) =>
          e.activeIndex === 1 ? setCheckCursor(true) : ""
        }
      >
        <SwiperSlide></SwiperSlide>

        {dataProps.map((item, index) => (
          <SwiperSlide key={index}>
            <CardRate data={{ ...item, id: item.id.toString() }} />
          </SwiperSlide>
        ))}

        <SwiperSlide></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default RateComponent;
