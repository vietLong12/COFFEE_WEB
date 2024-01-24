import { useContext, useEffect, useState } from "react";
import SubHeader from "../../components/subHeader/SubHeader";
import Heading from "../../components/common/Heading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import { Pagination } from "@mui/material";
import PopUp from "../../components/common/PopUp";
import { ProductResponse } from "../../Types/ResponseType";
import { ProductService } from "../../service/ProductService";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { changeQuantity } from "../../redux/action/AddProductToCart";
import { AuthContext } from "../../context/authContext";
import Swal from "sweetalert2";

const MenuPage = () => {
  const cart: any = useSelector((store: RootState) => store.cart);
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const [listCategory, setListCategory] = useState<any>([]);
  const [selectedPage, setSelectedPage] = useState<any>(1);
  const [totalPages, setTotalPages] = useState<any>(10);
  const [category, setCategory] = useState({
    category: "cà phê",
    categoryId: "",
  });
  const [showDetail, setShowDetail] = useState(false);
  const [itemSelected, setItemSelected] = useState<ProductResponse>();
  const [dataMenu, setData] = useState<any[]>([]);

  const handleChangePage = (
    //@ts-ignore
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSelectedPage(value);
  };

  const handleOrder = () => {
    if (auth?.isLoggedIn) {
    } else {
      Swal.fire({
        icon: "warning",
        title: "Thông báo!",
        text: "Bạn cần đăng nhập để đặt hàng",
      });
    }
  };

  useEffect(() => {
    setSelectedPage(1);
  }, [category]);

  useEffect(() => {
    const fetchData = async () => {
      const dataFilter = await ProductService.getListProduct({
        limit: "6",
        keyword: category.categoryId,
        page: selectedPage,
      });
      setData(dataFilter.products);
      setTotalPages(dataFilter.pagination.totalPages);
    };
    fetchData();
  }, [category, selectedPage]);

  useEffect(() => {
    ProductService.getListCategory().then((res) => setListCategory(res.data));
  }, []);
  return (
    <div>
      <SubHeader heading="Menu" />

      <div className="xl:grid grid-cols-2 xl:w-3/5 px-6 xl:px-0 mx-auto mt-8 gap-8 pb-8">
        <img
          src="https://bizweb.dktcdn.net/100/451/095/themes/894906/assets/img-page-menu.jpg?1701916321147"
          alt=""
        />
        <div className="flex flex-col justify-center xl:items-start items-center">
          <div className="w-fit mb-12 mt-10 ">
            <Heading href="/" title="mã giảm giá" className="font-bold" />
          </div>
          <div className="text-xl">
            Nhập <span className="font-bold">"YEUMONSTER"</span> gảm{" "}
            <span className="font-bold">10k</span>, đơn tối thiểu{" "}
            <span className="font-bold">80k</span>
          </div>
          <div className="text-xl">
            Nhập <span className="font-bold">"YEUMONSTER2"</span> giảm{" "}
            <span className="font-bold">20k</span>, đơn tối thiểu{" "}
            <span className="font-bold">150k</span>
          </div>
          <div className="text-xl">
            Nhập <span className="font-bold">"FREESHIP"</span>: Freeship tới
            3km, đơn tối thiểu <span className="font-bold">100k</span>
          </div>
        </div>
      </div>

      <div className="bg-primary-100 lg:py-12 py-0">
        <div className="xl:px-20 px-4 sm:px-6 mx-auto w-full xl:w-4/5">
          <div className="xl:grid grid-cols-10 gap-4">
            <div className="col-span-2 xl:mb-0 mb-4">
              <div className="bg-white rounded-xl py-4 px-6">
                <ul className="text-xl ml-4 uppercase font-bold">
                  {listCategory.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={`${
                          category.category === item.category
                            ? "text-primary before:bg-primary "
                            : ""
                        } list-style relative mb-6 text-black hover:text-primary  cursor-pointer hover:before:bg-primary`}
                        onClick={() =>
                          setCategory({
                            category: item.category,
                            categoryId: item._id,
                          })
                        }
                      >
                        <p>{item.category}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="border mt-6 p-2 rounded-xl border-dotted border-black lg:block hidden">
                <p className="italic text-sm font-bold">Lưu ý</p>
                <ul className="italic text-xs ml-6 mt-2 ">
                  <li className="list-style relative before:w-2 before:h-2 before:top-2 before:-left-4 mb-4">
                    Sau khi đặt hàng sẽ có nhân viên liên hệ cho nhân viên xác
                    nhận đơn hàng
                  </li>
                  <li className="list-style relative before:w-2 before:h-2 before:top-2 before:-left-4 mb-4">
                    Tùy vào số lượng đơn hàng mà thời gian chuẩn bị sẽ khác nhau
                  </li>
                  <li className="list-style relative before:w-2 before:h-2 before:top-2 before:-left-4">
                    Quý khách vui lòng kiểm tra sản phẩm trước khi nhận hàng
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-span-5">
              <div className="xl:block grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2  gap-8 lg:p-4 xl:p-0 lg:mb-10">
                {dataMenu.map((item, index) => (
                  <div
                    key={index}
                    className={`xl:grid grid-cols-4 px-4 py-6 border-b lg:border mb-2 rounded-md shadow-sm bg-white`}
                  >
                    <div className="flex justify-center items-center">
                      {(
                        <img
                          src={item.img}
                          alt=""
                          className="h-32 sm:w-auto xl:w-32"
                        />
                      ) || <Skeleton />}
                    </div>
                    <div className="col-span-2 mb-2 xl:ps-4 lg:block flex flex-col items-center lg:mt-0 mt-4">
                      <Link
                        className="font-bold text-lg line-clamp-1"
                        to={"/detail-product/" + item._id}
                      >
                        {item.productName || <Skeleton />}
                      </Link>
                      <p className="line-clamp-3">{item.desc}</p>
                    </div>
                    <div className="flex justify-between xl:ml-0 lg:px-0 px-4">
                      <p
                        className="font-bold text-lg text-primary
                      "
                      >
                        {item.inStock
                          ? item.sizes[0].price + ".000đ"
                          : "Liên hệ"}
                      </p>
                      {item.inStock ? (
                        <button
                          className="rounded-md bg-primary w-6 h-6 text-white"
                          onClick={() => {
                            setShowDetail(true);
                            setItemSelected(item);
                          }}
                        >
                          +
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center pb-4 ">
                <Pagination
                  size="small"
                  count={totalPages}
                  page={selectedPage}
                  onChange={handleChangePage}
                />
              </div>
              {showDetail ? (
                <PopUp item={itemSelected} setShowDetail={setShowDetail} />
              ) : (
                ""
              )}
            </div>

            <div className="col-span-3 border bg-white sticky top-0 h-fit hidden xl:block">
              <div className="uppercase list-style font-bold text-xl relative ml-12 mt-4 mb-4">
                chi tiết đơn hàng
              </div>
              <hr className="border-gray-800" />
              <div>
                <ul className="p-4 overflow-y-auto h-96">
                  {cart.map((item: any, index: number) => {
                    return (
                      <>
                        <li key={index} className="grid grid-cols-3">
                          <div className="col-span-2">
                            <p className="font-bold text-lg uppercase">
                              {item.productName} - {item.size}
                            </p>
                            <p className="text-green-500 text-xs">
                              {item.note}
                            </p>
                            <button className="text-yellow-600 text-sm py-2">
                              x Xoá
                            </button>
                          </div>
                          <div className="flex  flex-col items-end">
                            <div className="flex justify">
                              <button
                                className="bg-primary w-5 h-5 flex justify-center items-center rounded-md text-white"
                                onClick={() =>
                                  dispatch(
                                    changeQuantity({
                                      _id: item._id,
                                      quantity: -1,
                                      size: item.size,
                                    })
                                  )
                                }
                              >
                                -
                              </button>
                              <input
                                type="text"
                                className="w-10 text-center"
                                value={item.quantity}
                                disabled
                              />
                              <button
                                className="bg-primary w-5 h-5 flex justify-center items-center rounded-md text-white"
                                onClick={() =>
                                  dispatch(
                                    changeQuantity({
                                      _id: item._id,
                                      quantity: 1,
                                      size: item.size,
                                    })
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                            <div className="fl">{item.total}.000₫</div>
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>

                <div className="border-y border-gray-800 py-4 flex justify-between p-6">
                  <p>Tổng cộng: </p>
                  <span className="font-bold text-xl text-red-700">
                    {cart.reduce(
                      (acc: number, item: ProductCart) => acc + item.total,
                      0
                    )}
                    .000đ
                  </span>
                </div>
                <div className="px-6 py-4">
                  <button
                    className="bg-red-700 py-3 px-4 rounded-md text-white w-full uppercase font-bold hover:opacity-60 duration-200"
                    onClick={handleOrder}
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
