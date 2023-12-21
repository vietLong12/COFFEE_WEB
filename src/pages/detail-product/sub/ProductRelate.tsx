import React, { useState } from "react";
import Heading from "../../../components/common/Heading";
import data from "../../../data/data";
import { getRandomNumber } from "../../../utilities";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import PopUp from "../../../components/common/PopUp";
import { TProduct } from "../../../Types";
interface ProductRelateProps {
  category: string;
}
const ProductRelate = ({ category }: ProductRelateProps) => {
  const [itemPopup, setItemPopup] = useState<TProduct>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const listProductRelate = data.filter(
    (product) => product.category === category
  );
  const dataRender = [];
  for (let i = 0; i < 4; i++) {
    dataRender.push(listProductRelate[i]);
  }
  console.log("dataRender: ", dataRender);

  return (
    <div className="mx-auto w-full xl:w-3/5 pt-28 pb-20 xl:px-0 px-6">
      <Heading
        title="ĐỒ UỐNG Cùng loại"
        className="font-bold"
        href="/do-uong-cung-loai"
      />
      <div>
        <ul className="grid lg:grid-cols-4 mt-10 gap-6">
          {dataRender.map((data, index) => {
            return (
              <li key={index} className="border rounded-b-lg">
                <div className="h-52 flex justify-center items-center px-2 ">
                  <img src={data.img} alt="" width={200} />
                </div>
                <div>
                  <div className="flex justify-between items-center bg-primary text-white hover:text-black cursor-pointer px-3 py-1 rounded-t-lg">
                    <Link
                      to={"/detail-product/" + data.id}
                      onClick={() => window.scrollTo({ top: 0 })}
                      className="uppercase font-bold text-lg line-clamp-1"
                    >
                      {data.productName}
                    </Link>
                    <Rating
                      size="small"
                      name="half-rating-read"
                      value={data.rating}
                      precision={0.5}
                      readOnly
                      className="ml-4"
                    />
                  </div>
                  <div className="flex justify-between font-bold text-lg items-center px-3 py- bg-primary-100 rounded-b-lg">
                    <p>{data.inStock ? data.price + ".000₫" : "Liên hệ"}</p>
                    {data.inStock ? (
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          setItemPopup(data);
                          setShowDetail(true);
                        }}
                      >
                        +
                      </button>
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
          <PopUp item={itemPopup} setShowDetail={setShowDetail} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductRelate;
