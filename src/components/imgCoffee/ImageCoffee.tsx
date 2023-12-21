import React from "react";
import Heading from "../common/Heading";
import img1 from "../../assets/img/img-hinh-anh-1 (1).webp";
import img2 from "../../assets/img/img-hinh-anh-2.webp";
import img3 from "../../assets/img/img-hinh-anh-3.webp";
import img4 from "../../assets/img/img-hinh-anh-4.webp";

const ImageCoffee = () => {
  return (
    <div>
      <div className="font-bold tracking-tighter">
        <Heading title="Hình ảnh monster quán" href="/hinh-anh-monster-coffee" />
      </div>
      <div>
        <div className="flex  flex-row text-center mt-20 justify-between">
          <a href="#" className="block basis-2/3">
            <img src={img1} className="max-w-none" alt="" />
          </a>
          <a href="#" className="block basis-1/3">
            <img src={img2} className="max-w-none" alt="" />
          </a>
        </div>
        <div className="flex justify-between mt-4">
          <a href="#" className="block basis-1/3 mr-4">
            <img src={img3} className="max-w-none" alt="" />
          </a>
          <a href="#" className="block basis-2/3">
            <img src={img4} className="max-w-none" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageCoffee;
