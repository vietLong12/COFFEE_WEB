import Heading from "../common/Heading";
import "./openTime.css";
import img from "../../assets/icon/img-nguoi-van-chuyen.webp";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
const OpeningTime = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const handlOrderNow = () => {
    if (auth?.isLoggedIn) {
      navigate("/order");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="bg-image pt-32">
      <div className="lg:w-3/5 mx-auto flex justify-center">
        <div className="bg-inner font-bold ">
          <div className="mt-6 tracking-tighter">
            <Heading
              href="#"
              title="thời gian hoạt động"
              className="lg:text-3xl text-xl "
            />
          </div>
          <p className="font-normal mt-14 text-lg lg:text-start text-center">
            Monster Coffee là quán cà phê với những hương vị cà phê thơm ngon
            đặc trưng kết hợp với không gian tuyệt đẹp, âm nhạc phong phú tạo
            lên phong cách sang đẹp, lịch sự, gần gũi. Phong cách riêng biệt chỉ
            Monster mới có.
          </p>

          <div className="grid grid-cols-2 gap-4 text-center text-2xl text-white mt-6 mb-4 xl:mb-10">
            <div className="col-span-1">
              <h4 className="mb-2">Thứ 2 - Thứ 6 hàng tuần</h4>
              <p className="text-xl">7am - 11am</p>
              <p className="text-xl">11am - 10pm</p>
            </div>
            <div className="col-span-1">
              <h4 className="mb-2">Thứ 7 - Chủ nhật hàng tuần</h4>
              <p className="text-xl">8am - 11am</p>
              <p className="text-xl">11am - 9pm</p>
            </div>
          </div>
          <div className="flex justify-center xl:mt-10 xl:mb-10">
            <img src={img} alt="" width={120} />
            <div className="ml-6 text-white flex justify-center flex-col">
              <p className="text-2xl mb-2">Hotline đặt hàng</p>
              <a
                href="tel:+4733378901"
                className="text-4xl tracking-wide hotline duration-200 block"
              >
                19006750
              </a>
            </div>
          </div>
          <div className="text-center mt-4 lg:block hidden">
            <button
              className="border-2 px-8 py-1 xl:text-white text-primary xl:bg-transparent bg-white uppercase text-xl rounded-xl hover:text-black hover:border-black duration-200"
              onClick={handlOrderNow}
            >
              Đặt hàng ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningTime;
