import { StarRateRounded } from "@mui/icons-material";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

import React from "react";
import { TUserReview } from "../../Types";

interface TCardRateProps {
  data: TUserReview;
}

const CardRate: React.FC<TCardRateProps> = ({ data }) => {
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
    <div className="bg-white p-3 h-64 overflow-y-auto border rounded-3xl">
      <div className="flex">
        <div className="w-20 h-20 bg-white rounded-full mr-4">
          <img src={data.img} className="w-20 h-20 rounded-full" alt="" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p>
            {data.gender === "female"
              ? `Chị ${data.username}`
              : `Anh ${data.username}`}
          </p>
          {handleRating(data.rateStar)}
        </div>
      </div>
      <p className="font-normal mt-2 text-justify">{data.cmt}</p>
    </div>
  );
};

export default CardRate;
