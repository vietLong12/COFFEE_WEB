import { useState } from "react";
import { AddRounded, StarRateRounded } from "@mui/icons-material";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import data from "../../data/data";
import { getRandomNumber } from "../../utilities";
import { TProduct } from "../../Types";
import PopUp from "../common/PopUp";

const Slider = () => {
  const arr = [
    data[getRandomNumber(23)],
    data[getRandomNumber(23)],
    data[getRandomNumber(23)],
    data[getRandomNumber(23)],
    data[getRandomNumber(23)],
  ];

  const [showDetail, setShowDetail] = useState(false);

  const [list, setList] = useState(arr);

  const handleAddToCart = (item: TProduct) => {
    setItemDetail(item);
    setShowDetail(true);
  };

  const [itemDetail, setItemDetail] = useState<TProduct>(
    data[getRandomNumber(23)]
  );

  const handleRating = (item: number) => {
    const stars = [];
    for (let i = 0; i < item; i++) {
      stars.push(<StarRateRounded key={i} color="warning" />);
    }
    for (let i = item; i < 5; i++) {
      stars.push(<StarOutlineRoundedIcon key={i} color="warning" />);
    }
    return <div>{stars}</div>;
  };
  return (
    <div className="text-white flex justify-between mt-40 h-auto">
      <div
        className="flex flex-col items-center mx-auto w-5/12 justify-center  text-2xl
         font-medium"
      >
        <p className="bg-white text-black hover-primary font-bold uppercase text-3xl px-4 py-2 cursor-pointer slider-left w-96 text-center mb-4 duration-200 relative">
          Deal hot trong ngày
        </p>
        <p>
          Mua <span className="font-bold">1 phần nước</span> bất kì
        </p>
        <p>
          Tặng ngay <span className="font-bold">1 phần bánh ngọt</span> trị giá
          30k
        </p>
        <p className="mt-6 font-medium text-2xl border-dashed border-2 rounded-xl border-primary px-4 py-2">
          Nhập <span className="font-bold">"TANGBANHNGOT"</span>
        </p>
        <button className="mt-8 bg-primary font-bold uppercase px-4 py-2 border border-primary rounded-lg text-2xl hover:bg-black hover:border-black duration-200">
          Đặt hàng ngay
        </button>
      </div>
      <ul className="w-6/12">
        {list.map((item, i) => {
          return (
            <li key={i} className="flex bg-blur mb-4 p-2">
              <img
                className="mr-4 cursor-pointer"
                src={item.img}
                alt=""
                width={80}
                height={80}
              />
              <div className="w-full">
                <div className="primary flex justify-between text-xl font-bold items-center">
                  <h3
                    className="cursor-pointer ml-4 uppercase productName relative hover:text-black
                  "
                  >
                    {item.productName}
                  </h3>
                  {!item.inStock ? (
                    <p className="">Liên hệ</p>
                  ) : (
                    <p className="">{item.price}.000đ</p>
                  )}
                </div>
                <p className="w-full bg-primary h-px mt-"></p>
                <div className="text-black flex justify-between items-center mt-2">
                  {handleRating(item.rating)}
                  {item.inStock ? (
                    <div
                      className="cursor-pointer"
                      onClick={() => handleAddToCart(item)}
                    >
                      <AddRounded />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {showDetail ? (
        <PopUp item={itemDetail} setShowDetail={setShowDetail} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Slider;
