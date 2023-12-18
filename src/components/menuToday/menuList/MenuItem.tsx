import React from "react";
import { TProduct } from "../../../Types";

interface TMenuItemProps {
  data: TProduct;
}

const MenuItem: React.FC<TMenuItemProps> = ({ data }) => {
  return (
    <div className="flex bg-blur mb-4 p-2 w-1/2 -mx-4 bg-transparent">
      <img
        className="cursor-pointer rounded-full w-24 h-24 mr-4"
        src={data.img}
        alt=""
      />
      <div className="w-full">
        <div className="primary flex justify-between text-xl font-bold items-center">
          <h3 className="cursor-pointer ml-4 uppercase productName relative hover:opacity-60">
            {data.productName}
          </h3>
          {!data.inStock ? (
            <p className="">Liên hệ</p>
          ) : (
            <p className="">{data.price}.000đ</p>
          )}
        </div>
        <p className="w-full bg-primary h-px mt-1"></p>
        <div className="text-black flex justify-between items-center mt-2"></div>
        <p className="text-base font-normal text-justify">{data.desc}</p>
      </div>
    </div>
  );
};

export default MenuItem;
