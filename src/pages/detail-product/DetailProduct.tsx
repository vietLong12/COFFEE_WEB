import { useLocation } from "react-router-dom";
import SubHeader from "../../components/subHeader/SubHeader";
import data from "../../data/data";
import { Rating } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SubDetailProduct from "./sub/SubDetailProduct";
import ProductRelate from "./sub/ProductRelate";
const DetailProduct = () => {
  const slug = useLocation();
  const product = data[10];

  const listCommentProp = {
    listComment: [
      {
        id: "onbmxkdd",
        useful: 2,
        comment: "Do an ngon",
        email: "onbmxkdd@gmail.com",
        name: "Nguyen Viet Long",
        vote: 5,
      },
      {
        id: "axasdzxvdf",
        useful: 4,
        comment: "Do uong chat luong qua",
        email: "axasdzxvdf@gmail.com",
        name: "Nguyen Thi Huyen",
        vote: 4,
      },
      {
        id: "axasdzxvdf",
        useful: 10,
        comment: "Se ung ho them",
        email: "axasdzxvdf@gmail.com",
        name: "Nguyen Thi Huyen",
        vote: 1,
      },
      {
        id: "onbmxkdd",
        useful: 2,
        comment: "Do an ngon",
        email: "onbmxkdd@gmail.com",
        name: "Nguyen Viet Long",
        vote: 5,
      },
      {
        id: "axasdzxvdf",
        useful: 4,
        comment: "Do uong chat luong qua",
        email: "axasdzxvdf@gmail.com",
        name: "Nguyen Thi Huyen",
        vote: 4,
      },
      {
        id: "axasdzxvdf",
        useful: 10,
        comment: "Se ung ho them",
        email: "axasdzxvdf@gmail.com",
        name: "Nguyen Thi Huyen",
        vote: 1,
      },
      {
        id: "onbmxkdd",
        useful: 2,
        comment: "Do an ngon",
        email: "onbmxkdd@gmail.com",
        name: "Nguyen Viet Long",
        vote: 5,
      },
      {
        id: "axasdzxvdf",
        useful: 4,
        comment: "Do uong chat luong qua",
        email: "axasdzxvdf@gmail.com",
        name: "Nguyen Thi Huyen",
        vote: 4,
      },
      {
        id: "axasdzxvdf",
        useful: 10,
        comment: "Se ung ho them",
        email: "axasdzxvdf@gmail.com",
        name: "Nguyen Thi Huyen",
        vote: 1,
      },
      {
        id: "onbmxkdd",
        useful: 2,
        comment: "Do an ngon",
        email: "onbmxkdd@gmail.com",
        name: "Nguyen Viet Long",
        vote: 5,
      },
      {
        id: "axasdzxvdf",
        useful: 4,
        comment: "Do uong chat luong qua",
        email: "axasdzxvdf@gmail.com",
        name: "Nguyen Thi Huyen",
        vote: 4,
      },
      {
        id: "axasdzxvdf",
        useful: 10,
        comment: "Se ung ho them",
        email: "axasdzxvdf@gmail.com",
        name: "Nguyen Thi Huyen",
        vote: 1,
      },
      {
        id: "onbmxkdd",
        useful: 2,
        comment: "Do an ngon",
        email: "onbmxkdd@gmail.com",
        name: "Nguyen Viet Long",
        vote: 5,
      },
      {
        id: "axasdzxvdf",
        useful: 4,
        comment: "Do uong chat luong qua",
        email: "axasdzxvdf@gmail.com",
        name: "Nguyen Thi Huyen",
        vote: 4,
      },
      {
        id: "axasdzxvdf",
        useful: 10,
        comment: "Se ung ho them",
        email: "axasdzxvdf@gmail.com",
        name: "Nguyen Thi Huyen",
        vote: 1,
      },
    ],
  };

  return (
    <div className="">
      <SubHeader heading={"Chi tiết sản phẩm"} />
      <div className="" style={{ backgroundColor: "#fcf3ec" }}>
        <div className="grid lg:grid-cols-2 gap-4 xl:w-3/5 mx-auto pt-14 px-6 xl:px-0">
          <div className="flex justify-center items-center">
            <img src={product.img} alt="" className="mr-8" />
          </div>
          <div className="">
            <h2 className="uppercase text-3xl font-bold mb-2">
              {product.productName}
            </h2>
            <Rating name="read-only" value={product.rating} readOnly />
            <p>{product.desc}</p>
            <p className="mt-2 mb-2">
              Giá:{" "}
              <span className="ml-2 text-4xl primary font-bold">
                {product.price}.000₫
              </span>
            </p>
            <p>Size</p>
            <div className="flex mb-2">
              {product.size.map((size, index) => {
                return (
                  <div key={index} className="ms-5 relative mr-4">
                    <input
                      type="radio"
                      className="input-popup hidden"
                      name="sizeDetail"
                      id={`optionDetail${index + 1}`}
                    />
                    <label
                      className="uppercase text-xl ml-1  cursor-pointer"
                      htmlFor={`optionDetail${index + 1}`}
                    >
                      {size}
                    </label>
                  </div>
                );
              })}
            </div>
            <div>
              <div>
                <label htmlFor="note" className="block mb-1">
                  Ghi chú
                </label>
                <div className="input-detailt-product relative">
                  <input
                    className="outline-none"
                    type="text"
                    id="note"
                    placeholder="Thêm ghi chú món này"
                  />
                </div>
              </div>
            </div>
            <div className="flex mt-4">
              <p className="mr-4">Số lượng:</p>
              <div className="flex items-center justify-center relative w-20 rounded-md border border-primary">
                <button className="absolute top-0 left-0 border-e border-primary w-6 rounded-s-md">
                  -
                </button>
                <input
                  type="text"
                  disabled
                  value={1}
                  className="w-full text-center"
                />
                <button className="absolute top-0 right-0 border-primary border-s  w-6 rounded-e-md">
                  +
                </button>
              </div>
            </div>
            <div className="flex text-xl font-bold mt-4">
              <button className="mr-4 text-black rounded-xl hover:text-white border bg-primary-same hover:bg-primary px-4 py-2">
                Thêm vào giỏ hàng
              </button>
              <button className="text-white rounded-xl hover:text-black bg-primary hover:bg-primary-same border px-4 py-2">
                Đặt hàng ngay
              </button>
            </div>
            <div className="text-lg border-primary border-dotted w-1/2 rounded-xl mt-4 border border-black p-2">
              <p>
                Nhập "<span className="font-bold">YEUMONSTER</span>"
              </p>
              <p>
                Giảm <span className="font-bold">10k</span>, đơn tối thiểu{" "}
                <span className="font-bold">80k</span>
              </p>
            </div>
            <div className="text-lg border-primary border-dotted w-1/2 rounded-xl mt-4 border border-black p-2">
              <p>
                Nhập "<span className="font-bold">FREESHIP</span>"
              </p>
              <p>
                Freeship tới <span className="font-bold">3km</span>, đơn tối
                thiểu <span className="font-bold">100k</span>
              </p>
            </div>
            <hr />
          </div>
        </div>
      </div>

      <div className="bg-white xl:w-3/5 mx-auto mt-8 xl:px-0 px-6">
        <SubDetailProduct desc={product.desc} rateList={listCommentProp} />
      </div>
      <div className="bg-white">
        <ProductRelate category={product.category} />
      </div>
    </div>
  );
};

export default DetailProduct;
