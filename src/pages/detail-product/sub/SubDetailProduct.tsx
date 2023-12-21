import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import WarningIcon from "@mui/icons-material/Warning";
import {
  FiberSmartRecord,
  FiberSmartRecordRounded,
  ThumbUpAlt,
} from "@mui/icons-material";
import { Rating } from "@mui/material";
import React, { useState } from "react";

interface ProductComment {
  id: string;
  name: string;
  email: string;
  comment: string;
  vote: number;
  useful: number;
}

interface SubDetailProductProps {
  desc: string;
  rateList: {
    listComment: ProductComment[];
  };
}

const ProductDesc = ({ desc }: Partial<SubDetailProductProps>) => {
  return <p>{desc}</p>;
};

const ProductReview = ({ rateList }: Partial<SubDetailProductProps>) => {
  const listVote = rateList?.listComment.map((item) => item.vote);
  let rate = 1;
  if (listVote) {
    rate = listVote?.reduce((acc, item) => acc + item, 0) / listVote?.length;
    rate = parseFloat(rate.toFixed(1));
  }

  const quantityRate = listVote?.length;
  return (
    <div>
      <div className="flex pt-10 mt-6 pb-6 bg-yellow-50 border">
        <div className="text-center px-10 ">
          <p className="text-4xl text-orange-400 font-semibold">{rate}/5</p>
          <Rating
            name="half-rating-read"
            value={rate}
            precision={0.5}
            readOnly
          />
          <p>({quantityRate} đánh giá)</p>
          <button className="text-white p-2 py-1 rounded-sm bg-orange-400">
            Gửi đánh giá của bạn
          </button>
        </div>
        <div className="text-sm">
          <button className="border border-primary mr-4 px-2 rounded-md py-1 ">
            Tất cả
          </button>
          <button className="border border-primary mr-4 px-2 rounded-md py-1 ">
            5 điểm(2)
          </button>
          <button className="border border-primary mr-4 px-2 rounded-md py-1 ">
            4 điểm(0)
          </button>
          <button className="border border-primary mr-4 px-2 rounded-md py-1 ">
            3 điểm(0)
          </button>
          <button className="border border-primary mr-4 px-2 rounded-md py-1 ">
            2 điểm(0)
          </button>
          <button className="border border-primary mr-4 px-2 rounded-md py-1 ">
            1 điểm(0)
          </button>
          <button className="border border-primary mr-4 px-2 rounded-md py-1 ">
            Có hình ảnh(0)
          </button>
        </div>
      </div>
      <div>
        <ul className="px-6 py-4  border xl:max-h-screen lg:h-80 overflow-y-auto">
          {rateList?.listComment.map((comment, index) => {
            return (
              <li className="mb-6" key={index}>
                <div className="flex items-center">
                  {comment.name}{" "}
                  <Rating
                    size="small"
                    name="half-rating-read"
                    value={comment.vote}
                    precision={0.5}
                    readOnly
                    className="ml-4"
                  />
                </div>
                <p>{comment.comment}</p>
                <div className="flex items-center mb-2">
                  <div className="cursor-pointer hover-primary duration-200 mr-2">
                    <ThumbUpAlt sx={{ fontSize: "14px", marginRight: "4px" }} />
                    {comment.useful} Hữu ích
                  </div>
                  <FiberManualRecordIcon
                    sx={{ fontSize: "10px", marginRight: "0.5rem" }}
                  />
                  <div
                    className="cursor-pointer hover-primary duration-200 mr-2 text-yellow-500"
                    onClick={() =>
                      confirm(
                        "Bạn có chắc chắn muốn báo cáo đánh giá này là một sai phạm?"
                      )
                    }
                  >
                    <WarningIcon sx={{ fontSize: "14px" }} /> Cảnh báo sai phạm
                  </div>
                  <FiberManualRecordIcon
                    sx={{ fontSize: "10px", marginRight: "0.5rem" }}
                  />
                  <p className="mr-2">15:36 </p>
                  <p>19/12/2023</p>
                </div>
                <hr />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const SubDetailProduct = ({ desc, rateList }: SubDetailProductProps) => {
  const [isDesc, setShowDesc] = useState(false);

  return (
    <>
      <div className="flex font-bold text-xl border-b-2">
        <div
          className={`border  mr-2 px-8 py-4 rounded-t-3xl hover:bg-primary hover:text-white cursor-pointer duration-200 ${
            isDesc ? "text-white bg-primary" : "primary"
          }`}
          onClick={() => setShowDesc(true)}
        >
          Mô tả sản phẩm
        </div>
        <div
          className={`border px-8 py-4 rounded-t-3xl hover:bg-primary hover:text-white cursor-pointer duration-200 ${
            !isDesc ? "text-white bg-primary" : "primary"
          }`}
          onClick={() => setShowDesc(false)}
        >
          Đánh giá
        </div>
      </div>
      <div>
        {isDesc ? (
          <ProductDesc desc={desc} />
        ) : (
          <ProductReview rateList={rateList} />
        )}
      </div>
    </>
  );
};

export default SubDetailProduct;
