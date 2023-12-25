import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import checked from "../assets/icon/yes.png";
import data from "../data/data";
import { AddressService } from "../service/AddressService";
import { CheckCircle, Print } from "@mui/icons-material";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

const TransactionNotification = () => {
  const ref = useRef<HTMLDivElement>();

  const orderInfo = {
    id: "1020",
    email: "longnv229@gmail.com",
    username: "Nguyễn Việt Long",
    freightCost: 40,
    paymentMethod: "cod",
    transferMethod: "delivery",
    orders: [
      {
        productId: data[0].id,
        size: "m",
        price: 49,
        quantity: 4,
        note: "Day la ghi chu",
      },
      {
        productId: data[2].id,
        size: "l",
        price: 34,
        quantity: 2,
        note: "Day la ghi chu",
      },
    ],
    address: {
      detailAddress: "Số 148 Nguyễn Trãi",
      cityCode: 1,
      districtCode: 2,
      wardCode: 88,
    },
  };

  const [address, setAddress] = useState("");

  const getAddress = async (
    cityCode: number,
    districtCode: number,
    wardCode: number
  ) => {
    const citis = await AddressService.getListCity();
    const city = citis.filter((item: any) => item.code === cityCode);
    const district = city[0].districts?.filter(
      (item: any) => item.code === districtCode
    );
    const ward = district[0].wards?.filter(
      (item: any) => item.code === wardCode
    );
    setAddress(ward[0].name + ", " + district[0].name + ", " + city[0].name);
  };

  useEffect(() => {
    getAddress(
      orderInfo.address.cityCode,
      orderInfo.address.districtCode,
      orderInfo.address.wardCode
    );
  }, []);

  const getProductById = (productId: string) => {
    return data.filter((item) => item.id.toString() == productId)[0];
  };

  const PrintComponent = () => {
    return (
      <div className="bg-zinc-50 p-6" ref={ref}>
        <h6 className="font-bold">
          Đơn hàng de in #{orderInfo.id} (
          {orderInfo.orders.reduce((prev, cur) => prev + cur.quantity, 0)})
        </h6>
        <ul className="mt-4 border-t pt-4">
          {orderInfo.orders.map((item, index) => {
            return (
              <li
                className="flex items-center mb-4 border-b pb-4 w-full justify-between"
                key={index}
              >
                <div className="relative mr-5">
                  <img
                    src={getProductById(item.productId.toString()).img}
                    alt=""
                    width={50}
                  />
                  <span className="bg-blue-600 w-5 h-5 justify-center flex items-center absolute -top-2 left-9 text-white text-xs rounded-full">
                    {item.quantity}
                  </span>
                </div>
                <div className="w-2/4">
                  <p className="font-semibold">
                    {getProductById(item.productId.toString()).productName}
                  </p>
                  <p className="text-sm uppercase">{item.size}</p>
                  <p className="text-sm ">Ghi chú: {item.note}</p>
                </div>
                <div className="text-sm">{item.price}.000đ</div>
              </li>
            );
          })}
        </ul>
        <div className="pb-4 border-b pt-2">
          <div className="flex justify-between mb-2">
            Tạm tính{" "}
            <span>
              {orderInfo.orders.reduce(
                (acc, cur) => acc + cur.price * cur.quantity,
                0
              ) + ".000đ"}
            </span>
          </div>
          <div className="flex justify-between">
            Phí vận chuyển <span>{orderInfo.freightCost}.000đ</span>
          </div>
        </div>
        <div className="py-4">
          <div className="flex justify-between text-xl px-4 items-center">
            Tổng cộng{" "}
            <span className="font-bold text-2xl">
              {" "}
              {orderInfo.orders.reduce(
                (acc, cur) => acc + cur.price * cur.quantity,
                orderInfo.freightCost
              ) + ".000đ"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-50">
      <Link
        ref={ref}
        to={"/"}
        className="block mx-auto w-3/5 text-blue-600 text-3xl mb-4 font-semibold hover:text-blue-900"
      >
        Monster Coffee
      </Link>
      <div className="grid grid-cols-12 w-3/5 mx-auto gap-8">
        <div className="col-span-7 ">
          <div className="flex items-center mb-6">
            <div>
              <CheckCircle sx={{ fontSize: "100px" }} color="success" />
            </div>
            <div>
              <p className="font-bold mb-2">Cảm ơn bạn đã đặt hàng</p>
              <p>
                Một email xác nhận đã được gửi tới{" "}
                <span className="font-medium text-lg">{orderInfo.email}</span>.
              </p>
              <p> Xin vui lòng kiểm tra email của bạn</p>
            </div>
          </div>
          <div className="grid grid-cols-2 border p-6">
            <div>
              <div className="min-h-140px">
                <p className="font-semibold text-xl mb-2">Thông tin mua hàng</p>
                <p>{orderInfo.username}</p>
                <p>{orderInfo.email}</p>
              </div>
              <div className="">
                <p className="font-semibold text-xl mb-2">
                  Phương thức thanh toán
                </p>
                <p>
                  {orderInfo.paymentMethod === "cod"
                    ? "Thanh toán khi giao hàng (COD)"
                    : ""}
                </p>
              </div>
            </div>
            <div>
              <div className="min-h-140px">
                <p className="font-semibold text-xl mb-2">Địa chỉ nhận hàng</p>
                <p>{orderInfo.address.detailAddress}</p>
                <p>{address}</p>
              </div>
              <div className="">
                <p className="font-semibold text-xl mb-2">
                  Phương thức vận chuyển
                </p>
                <p>
                  {orderInfo.transferMethod === "delivery"
                    ? "Giao hàng tận nơi "
                    : ""}
                </p>
              </div>{" "}
            </div>
          </div>
        </div>
        <div className="col-span-5 ">
          <div className="bg-zinc-50 p-6">
            <h6 className="font-bold">
              Đơn hàng #{orderInfo.id} (
              {orderInfo.orders.reduce((prev, cur) => prev + cur.quantity, 0)})
            </h6>
            <ul className="mt-4 border-t pt-4">
              {orderInfo.orders.map((item, index) => {
                return (
                  <li
                    className="flex items-center mb-4 border-b pb-4 w-full justify-between"
                    key={index}
                  >
                    <div className="relative mr-5">
                      <img
                        src={getProductById(item.productId.toString()).img}
                        alt=""
                        width={50}
                      />
                      <span className="bg-blue-600 w-5 h-5 justify-center flex items-center absolute -top-2 left-9 text-white text-xs rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="w-2/4">
                      <p className="font-semibold">
                        {getProductById(item.productId.toString()).productName}
                      </p>
                      <p className="text-sm uppercase">{item.size}</p>
                      <p className="text-sm ">Ghi chú: {item.note}</p>
                    </div>
                    <div className="text-sm">{item.price}.000đ</div>
                  </li>
                );
              })}
            </ul>
            <div className="pb-4 border-b pt-2">
              <div className="flex justify-between mb-2">
                Tạm tính{" "}
                <span>
                  {orderInfo.orders.reduce(
                    (acc, cur) => acc + cur.price * cur.quantity,
                    0
                  ) + ".000đ"}
                </span>
              </div>
              <div className="flex justify-between">
                Phí vận chuyển <span>{orderInfo.freightCost}.000đ</span>
              </div>
            </div>
            <div className="py-4">
              <div className="flex justify-between text-xl px-4 items-center">
                Tổng cộng{" "}
                <span className="font-bold text-2xl">
                  {" "}
                  {orderInfo.orders.reduce(
                    (acc, cur) => acc + cur.price * cur.quantity,
                    orderInfo.freightCost
                  ) + ".000đ"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-600 text-white rounded-md py-3 px-4 text-xl mr-6 hover:bg-blue-900 duration-200">
          Tiếp tục mua hàng
        </button>
        <ReactToPrint
          bodyClass="print-agreement"
          content={() => <PrintComponent />}
          trigger={() => (
            <button className="text-blue-600 hover:text-blue-900 text-2xl font-bold">
              <Print fontSize="large" />
              In
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default TransactionNotification;
