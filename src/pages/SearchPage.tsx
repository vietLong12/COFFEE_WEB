import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import SubHeader from "../components/subHeader/SubHeader";
import data from "../data/data";
import notfound from "/clipart1533013.png";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { slugify } from "../utilities";
import { AddRounded, StarRateRounded } from "@mui/icons-material";
import PopUp from "../components/common/PopUp";

const SearchPage = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [productSelected, setProductSelected] = useState({});
  let location = useLocation();
  const searchParams = new URLSearchParams(location.search)
    .get("q")
    ?.toLowerCase();
  const listFilter = data.filter((value) =>
    value.productName.toLowerCase().includes(searchParams)
  );
  console.log("listFilter: ", listFilter);
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
    <div>
      <SubHeader heading="tìm kiếm" />
      <div className="w-3/5 mx-auto">
        {listFilter.length === 0 ? (
          <>
            <p className="pt-10 pb-20 text-center text-lg font-semibold">
              Không tìm thấy bất kỳ kết quả nào với từ khóa trên.
            </p>
            <div className="flex justify-center mb-20">
              <img
                src={notfound}
                alt="Sorry No Results Found@clipartmax.com"
              ></img>
            </div>
          </>
        ) : (
          <>
            <p className="py-10 pb-6 text-center text-xl font-semibold">
              Có {listFilter.length} kết quả phù hợp với từ khoá
            </p>
            <ul className="grid grid-cols-2 gap-4">
              {listFilter.map((item, i) => (
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
                      <Link
                        to={"/detail-product/" + slugify(item.productName)}
                        className="cursor-pointer ml-4 uppercase productName relative hover:text-black
                     "
                      >
                        {item.productName}
                      </Link>
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
                          onClick={() => {
                            setProductSelected(item);
                            setShowDetail(true);
                          }}
                        >
                          <AddRounded />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </li>
              ))}
              {showDetail ? (
                <PopUp setShowDetail={setShowDetail} item={productSelected} />
              ) : (
                ""
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
