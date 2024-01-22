import React from "react";
// @ts-nocheck
import { Link } from "react-router-dom";
import { ProductResponse } from "../../../Types/ResponseType";

interface TMenuItemProps {
  data: ProductResponse;
}

const MenuItem: React.FC<TMenuItemProps> = ({ data }) => {
  return (
    <>
      {" "}
      <div className="flex items-center lg:bg-blur bg-neutral-500 mb-4 p-2  lg:w-1/2 lg:-mx-4 xl:bg-transparent  lg:rounded-none rounded-md">
        <img
          className="cursor-pointer rounded-full xl:w-24 w-10 h-10 xl:h-24 mr-4"
          src={data.img}
          alt=""
        />
        <div className="w-full">
          <div className="primary flex justify-between xl:text-xl text-base  font-bold items-center">
            <Link
              to={"/detail-product/" + data._id}
              className="cursor-pointer ml-4 uppercase productName relative hover:opacity-60"
            >
              {data.productName}
            </Link>
            {!data.inStock ? (
              <p className="">Liên hệ</p>
            ) : (
              <p className="">{data.sizes[0].price}.000đ</p>
            )}
          </div>
          <p className="w-full bg-primary h-px mt-1"></p>
          <div className="text-black flex justify-between items-center mt-2"></div>
          <p className="text-sm font-normal text-justify line-clamp-1">{data.desc}</p>
        </div>
      </div>
    </>
  );
};

export default MenuItem;
