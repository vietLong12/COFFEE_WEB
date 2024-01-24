// @ts-nocheck
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import WarningIcon from "@mui/icons-material/Warning";
import { ThumbUpAlt } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/authContext";

interface ProductComment {
  id: string;
  name: string;
  email: string;
  comment: string;
  vote: number;
  useful: number;
}

interface SubDetailProductProps {
  desc: any;
  rateList: any;
  setShowPopup: any;
}

const ProductDesc = ({ desc }: Partial<SubDetailProductProps>) => {
  return <p>{desc}</p>;
};

const ProductReview = ({
  rateList,
  setShowPopup,
  setVote,
}: Partial<SubDetailProductProps>) => {
  const auth = useContext(AuthContext);
  function formatDateTime(inputDateString: string) {
    const inputDate = new Date(inputDateString);

    const hours = inputDate.getHours().toString().padStart(2, "0");
    const minutes = inputDate.getMinutes().toString().padStart(2, "0");
    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = inputDate.getFullYear();

    const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`;

    return formattedDateTime;
  }
  const [rateListC, setRateListC] = useState(rateList);
  console.log("rateListC: ", rateListC);
  const [rate, setRate] = useState(1);
  const [vote1, setVote1] = useState(0);
  const [vote2, setVote2] = useState(0);
  const [vote3, setVote3] = useState(0);
  const [vote4, setVote4] = useState(0);
  const [vote5, setVote5] = useState(0);
  const [quantityRate, setVote6] = useState(0);
  const [voteFilter, setVoteFilter] = useState(0);

  useEffect(() => {
    if (voteFilter == 0) {
      setRateListC(rateList);
    } else {
      const data = rateList?.listComment;
      setRateListC({
        ...rateList,
        listComment: data?.filter((s) => s.vote == voteFilter),
      });
    }
    const listVote = rateList?.listComment.map((item) => item.vote);
    let rate = 1;
    if (listVote) {
      rate = listVote?.reduce((acc, item) => acc + item, 0) / listVote?.length;
      rate = parseFloat(rate.toFixed(1));
      setRate(rate);
      setVote(rate);
    }
    const vote5 = rateList?.listComment.filter((item) => item.vote == 5);
    const vote4 = rateList?.listComment.filter((item) => item.vote == 4);
    const vote3 = rateList?.listComment.filter((item) => item.vote == 3);
    const vote2 = rateList?.listComment.filter((item) => item.vote == 2);
    const vote1 = rateList?.listComment.filter((item) => item.vote == 1);
    setVote1(vote1);
    setVote2(vote2);
    setVote3(vote3);
    setVote4(vote4);
    setVote5(vote5);
    const quantityRate = rateList?.listComment.length;
    setVote(quantityRate);
  }, [rateList, voteFilter]);
  return (
    <div>
      <div className="flex pt-10 mt-6 pb-6 bg-yellow-50 border">
        <div className="text-center px-10 ">
          <p className="text-4xl text-orange-400 font-semibold">
            {rate ? `${rate}/5` : ""}
          </p>
          <Rating
            name="half-rating-read"
            value={rate}
            precision={0.5}
            readOnly
          />
          <p>({rateList?.listComment.length} đánh giá)</p>
          <button
            className="text-white p-2 py-1 rounded bg-orange-400"
            onClick={() => setShowPopup(true)}
          >
            Gửi đánh giá của bạn
          </button>
        </div>
        <div className="text-sm">
          <button
            className="border border-primary mr-4 px-2 rounded-md py-1 "
            onClick={() => setVoteFilter(0)}
          >
            Tất cả
          </button>
          <button
            className="border border-primary mr-4 px-2 rounded-md py-1 "
            onClick={() => setVoteFilter(5)}
          >
            5 điểm({vote5?.length})
          </button>
          <button
            className="border border-primary mr-4 px-2 rounded-md py-1 "
            onClick={() => setVoteFilter(4)}
          >
            4 điểm({vote4?.length})
          </button>
          <button
            className="border border-primary mr-4 px-2 rounded-md py-1 "
            onClick={() => setVoteFilter(3)}
          >
            3 điểm({vote3?.length})
          </button>
          <button
            className="border border-primary mr-4 px-2 rounded-md py-1 "
            onClick={() => setVoteFilter(2)}
          >
            2 điểm({vote2?.length})
          </button>
          <button
            className="border border-primary mr-4 px-2 rounded-md py-1 "
            onClick={() => setVoteFilter(1)}
          >
            1 điểm({vote1?.length})
          </button>
        </div>
      </div>
      <div>
        {rateListC?.listComment.length > 0 ? (
          <ul className="px-6 py-4  border xl:max-h-screen lg:h-80 overflow-y-auto">
            {rateListC?.listComment.map((comment, index) => {
              return (
                <li className="mb-6" key={index}>
                  <div className="grid xl:flex xl:items-center grid-cols-2">
                    <p className="font-bold">{comment.username} </p>
                    <Rating
                      size="small"
                      name="half-rating-read"
                      value={comment.vote}
                      precision={0.5}
                      readOnly
                      className="ml-4"
                    />
                    <span className="text-sm ml-4 text-orange-500 col-span-3">
                      {comment.isPurchased
                        ? "*Đã từng mua hàng tại Monster"
                        : ""}
                    </span>
                  </div>

                  <p className="md:py-2">
                    <span className="font-bold">Đánh giá:</span>{" "}
                    {comment.comment}
                  </p>
                  <div className="flex items-start md:items-center mb-2 flex-col md:flex-row">
                    <div className="cursor-pointer hover-primary duration-200 mr-2">
                      <ThumbUpAlt
                        sx={{ fontSize: "14px", marginRight: "4px" }}
                      />
                      {comment.useful} Hữu ích
                    </div>
                    <div className="md:inline-block hidden">
                      <FiberManualRecordIcon
                        sx={{ fontSize: "10px", marginRight: "0.5rem" }}
                      />
                    </div>
                    <div
                      className="cursor-pointer hover-primary duration-200 mr-2 text-yellow-500"
                      onClick={() =>
                        confirm(
                          "Bạn có chắc chắn muốn báo cáo đánh giá này là một sai phạm?"
                        )
                      }
                    >
                      <WarningIcon sx={{ fontSize: "14px" }} /> Cảnh báo sai
                      phạm
                    </div>
                    <div className="md:inline-block hidden">
                      <FiberManualRecordIcon
                        sx={{ fontSize: "10px", marginRight: "0.5rem" }}
                      />
                    </div>
                    <p className="mr-2">{formatDateTime(comment.createdAt)} </p>
                  </div>
                  <hr />
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="px-2 mt-2">Chưa có đánh giá...</p>
        )}
      </div>
      <br />
      <hr />
    </div>
  );
};

const SubDetailProduct = ({
  desc,
  rateList,
  setShowPopup,
  setVote,
}: SubDetailProductProps) => {
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
          <ProductReview
            rateList={rateList}
            setShowPopup={setShowPopup}
            setVote={setVote}
          />
        )}
      </div>
    </>
  );
};

export default SubDetailProduct;
