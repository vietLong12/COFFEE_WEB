import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import SubHeader from "../components/subHeader/SubHeader";
import data from "../data/data";
import notfound from "/clipart1533013.png";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { slugify } from "../utilities";
import { AddRounded, StarRateRounded } from "@mui/icons-material";
import PopUp from "../components/common/PopUp";
import { ProductService } from "../service/ProductService";
import { ProductResponse } from "../Types/ResponseType";
import { Pagination } from "@mui/material";

const SearchPage = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [productSelected, setProductSelected] = useState<ProductResponse>();
  const [changePage, setChangePage] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalDocuments: 1,
    totalPages: 1,
  });
  let location = useLocation();
  const searchParams = new URLSearchParams(location.search)
    .get("q")
    ?.toLowerCase();
  console.log("searchParams: ", searchParams);
  const [listFilter, setListFilter] = useState<ProductResponse[]>([]);

  console.log("listFilter: ", listFilter);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setChangePage(!changePage);
    setPagination({ ...pagination, currentPage: value });
  };
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
  useEffect(() => {
    const fetchData = async () => {
      const productList = await ProductService.getListProduct({
        depth: "3",
        keyword: searchParams,
        limit: "6",
        page: pagination.currentPage.toString(),
      });
      if (productList) {
        setListFilter(productList.products);
        setPagination(productList.pagination);
      }

      console.log("productList: ", productList);
    };
    fetchData();
  }, [changePage, searchParams]);
  return (
    <div>
      <SubHeader heading="tìm kiếm" />
      <div className="xl:w-3/5 mx-auto xl:px-0 px-2 pb-10">
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
              Có {pagination.totalDocuments} kết quả phù hợp với từ khoá: "
              {searchParams}"
            </p>
            <ul className="xl:grid xl:grid-cols-2 gap-4">
              {listFilter.map((item, i) => (
                <li key={i} className="flex bg-blur mb-4 p-2">
                  <img
                    className="mr-4 cursor-pointer"
                    src={item.img}
                    alt=""
                    width={80}
                    height={80}
                  />
                  <div className="w-full h-fit">
                    <div className="primary flex justify-between text-xl font-bold items-center">
                      <Link
                        to={"/detail-product/" + item._id}
                        className="cursor-pointer ml-4 uppercase productName relative hover:text-black
                     "
                      >
                        {item.productName}
                      </Link>
                      {!item.inStock ? (
                        <p className="">Liên hệ</p>
                      ) : (
                        <p className="">{item.sizes[0].price}.000đ</p>
                      )}
                    </div>
                    <p className="w-full bg-primary h-px mt-"></p>
                    <div className="text-black flex justify-between items-center mt-2">
                      {handleRating(5)}
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
        <div className="flex justify-center mt-4">
          <Pagination
            size="large"
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
