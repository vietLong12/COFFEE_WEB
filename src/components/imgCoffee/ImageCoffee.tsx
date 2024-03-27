import Heading from "../common/Heading";
import img1 from "../../assets/img/img-hinh-anh-1 (1).webp";
import img2 from "../../assets/img/img-hinh-anh-2.webp";
import img3 from "../../assets/img/img-hinh-anh-3.webp";
import img4 from "../../assets/img/img-hinh-anh-4.webp";

const ImageCoffee = () => {
  return (
    <div>
      <div className="font-bold tracking-tighter">
        <Heading
          title="Hình ảnh monster quán"
          href="/tin-tuc"
          className="lg:text-2xl text-xl"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="lg:grid grid-cols-3 text-center gap-4  lg:mt-20 mt-10 justify-between">
          <a href="#" className="block col-span-2 mb-2 lg:mb-0  ">
            <img src={img1} className="w-full h-full" alt="" />
          </a>
          <a href="#" className="hidden col-span-1 lg:block ">
            <img src={img2} className="w-full h-full" alt="" />
          </a>
        </div>
        <div className="lg:grid grid-cols-3 gap-4 text-center mt-4 lg:mb-0 mb-4">
          <a href="#" className="hidden col-span-1 lg:block  ">
            <img src={img3} className="w-full h-full" alt="" />
          </a>
          <a href="#" className="block col-span-2">
            <img src={img4} className="w-full h-full" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageCoffee;
