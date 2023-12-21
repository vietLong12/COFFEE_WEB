import { useEffect, useState } from "react";
import SubHeader from "../../components/subHeader/SubHeader";
import Heading from "../../components/common/Heading";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import { Pagination } from "@mui/material";
import { ProductCart, TProduct } from "../../Types";
import data from "../../data/data";
import PopUp from "../../components/common/PopUp";
interface Category {
  _id: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: 0;
}

interface MyObject {
  coffee: string;
  tea: string;
  cake: string;
  [key: string]: string; // Thêm chỉ số cho kiểu 'string'
}
const MenuPage = () => {
  const objCategory: MyObject = {
    coffee: "Cà phê",
    tea: "Trà",
    cake: "Bánh ngọt",
  };
  const cart: any = useSelector((store: RootState) => store.cart);
  const listCategory: Category[] = [
    { _id: "1", category: "coffee" },
    { _id: "2", category: "tea" },
    { _id: "3", category: "cake" },
  ];
  const [category, setCategory] = useState("coffee");
  const [showDetail, setShowDetail] = useState(false);
  const [itemSelected, setItemSelected] = useState<TProduct>();
  console.log("category: ", category);
  const [dataMenu, setData] = useState<TProduct[]>([]);
  console.log("data: ", dataMenu);

  useEffect(() => {
    const dataFilter = data.filter((item) => item.category === category);
    setData(dataFilter);
  }, [category]);

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

      <div className="bg-primary-100 py-12">
        <div className="laptop-small:w-3/5 laptop-small:px-0 px-20 sm:px-6 mx-auto">
          <div className="xl:grid grid-cols-10 gap-4">
            <div className="col-span-2  ">
              <div className="bg-white rounded-xl py-4 px-6">
                <ul className="text-xl ml-4 uppercase font-bold">
                  {listCategory.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={`${
                          category === item.category
                            ? "text-primary before:bg-primary "
                            : ""
                        } list-style relative mb-6 text-black hover:text-primary  cursor-pointer hover:before:bg-primary`}
                        onClick={() => setCategory(item.category)}
                      >
                        <p>{objCategory[item.category]}</p>
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

            <div className="col-span-5 border bg-white">
              <div>
                {dataMenu.map((item, index) => (
                  <div
                    className={`grid grid-cols-4 px-4 py-6 border-black ${
                      index + 1 == dataMenu.length ? "border-0" : "border-b"
                    }`}
                  >
                    <div className="flex justify-center items-center">
                      <img src={item.img} alt="" width={80} />
                    </div>
                    <div className="col-span-2">
                      <p className="font-bold text-lg">{item.productName}</p>
                      <p className="line-clamp-3 text-sm">{item.desc}</p>
                    </div>
                    <div className="flex justify-between ml-6">
                      <p className="font-bold text-lg">
                        {item.inStock ? item.price + ".000đ" : "Liên hệ"}
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
                <div className="flex justify-center mb-4">
                  <Pagination
                    showFirstButton
                    onChange={(e) => console.log({ ...e.target })}
                    showLastButton
                    count={5}
                  />
                </div>
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
                              <button className="bg-primary w-5 h-5 flex justify-center items-center rounded-md text-white">
                                -
                              </button>
                              <input
                                type="text"
                                className="w-10 text-center"
                                value={1}
                                disabled
                              />
                              <button className="bg-primary w-5 h-5 flex justify-center items-center rounded-md text-white">
                                +
                              </button>
                            </div>
                            <div className="fl">{item.price}.000₫</div>
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
                      (acc: number, item: ProductCart) => acc + item.price,
                      0
                    )}
                    .000đ
                  </span>
                </div>
                <div className="px-6 py-4">
                  <button className="bg-red-700 py-3 px-4 rounded-md text-white w-full uppercase font-bold hover:opacity-60 duration-200">
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
