// @ts-nocheck
import { useEffect, useState, forwardRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// @ts-ignore

import checked from "../assets/icon/yes.png";
// @ts-ignore

import data from "../data/data";
// @ts-ignore

import { AddressService } from "../service/AddressService";
import { CheckCircle, Print } from "@mui/icons-material";
import { useRef } from "react";
// @ts-ignore

import ReactToPrint, { useReactToPrint } from "react-to-print";
// @ts-ignore

import { OrderService } from "../service/OrderService";
import { ProductService } from "../service/ProductService";
import { AuthContext } from "../context/authContext";
import Swal from "sweetalert2";
import SubHeader from "../components/subHeader/SubHeader";

const PrintComponent = forwardRef((props: any, ref) => {
  const orderInfo = props.orderInfor;
  return (
    <div className="bg-zinc-50 p-6" ref={ref}>
      <h1 className="uppercase text-4xl text-center mb-6">Monster coffee</h1>
      <h6 className="font-bold">Đơn hàng #{orderInfo?.orderNumber}</h6>
      <br />
      <p>
        Tên khách hàng: <span>{orderInfo?.customer?.username}</span>
      </p>
      <p>
        Địa chỉ: <span>{orderInfo?.customer?.address}</span>
      </p>
      <ul className="mt-4 border-t pt-4">
        {orderInfo?.items?.map((item, index) => (
          <li
            className="flex items-center mb-4 border-b pb-4 w-full justify-between"
            key={index}
          >
            <div className="relative mr-5">
              <img src={item.img} alt="" width={50} />
              <span className="bg-blue-600 w-5 h-5 justify-center flex items-center absolute -top-2 left-9 text-white text-xs rounded-full">
                {item.quantity}
              </span>
            </div>
            <div className="w-2/4">
              <p className="font-semibold">{item.productName || ""}</p>
              <p className="text-sm uppercase">{item.size.name}</p>
            </div>
            <div className="text-sm">{item.size.price}.000đ</div>
          </li>
        ))}
      </ul>
      <div className="pb-4 border-b pt-2">
        <div className="flex justify-between mb-2">
          Tạm tính{" "}
          <span className="font-bold">{orderInfo?.totalAmount + ".000đ"}</span>
        </div>
        <div className="flex justify-between">
          Phí vận chuyển
          <span className="font-bold">{orderInfo?.freightCost}.000đ</span>
        </div>
      </div>
      <div className="py-4">
        <div className="flex justify-between text-xl px-4 items-center">
          Tổng cộng{" "}
          <span className="font-bold text-2xl">
            {orderInfo?.totalAmount + orderInfo?.freightCost + ".000đ"}
          </span>
        </div>
      </div>
    </div>
  );
});

const TransactionNotification = () => {
  const componentRef = useRef<HTMLDivElement | any>();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const auth = useContext(AuthContext);
  const order = auth?.orderInfor || "";
  const [orderInfo, setOrderInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.orderInfor) {
      // navigate("/");
      Swal.fire({
        title: "Vui lòng đặt hàng để đến được bước này",
        icon: "warning",
      });
    }
    const fetchData = async () => {
      let a = auth?.orderInfor;
      const temp = a?.items?.map(async (item) => {
        const product = await ProductService.getProductById(item.productId);
        const size = product.product.sizes.filter((s) => s._id === item.sizeId);
        return {
          productName: product.product.productName,
          size: size[0],
          quantity: item.quantity,
          img: item.img,
        };
      });
      if (temp) {
        const result = await Promise.all(temp);
        const dataReturn = { ...a, items: result };
        setOrderInfo(dataReturn);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <SubHeader heading="Đặt hàng thành công" custom="Thông báo" />
      <div className=" w-3/5 mx-auto gap-8">
        <div className="col-span-7">
          <div className="flex items-center mb-6 justify-center mt-8 border my-12 py-12 border-primary rounded">
            <div className="mr-4">
              <CheckCircle sx={{ fontSize: "120px" }} color="success" />
            </div>
            <div className="text-xl  py-2 ">
              <p className="font-bold mb-2 text-3xl text-primary my-8 ">
                Cảm ơn bạn đã đặt hàng
              </p>
              <p>
                Một email xác nhận đã được gửi tới
                <span className="font-medium text-lg">
                  {orderInfo?.customer?.email} longviet290@gmail.com
                </span>
              </p>
              <p> Xin vui lòng kiểm tra email của bạn</p>
            </div>
          </div>
          <div className="grid grid-cols-2 border p-6">
            <div>
              <div className="min-h-140px">
                <p className="font-semibold text-xl mb-2">Thông tin mua hàng</p>
                <p>{orderInfo?.customer?.username}</p>
                <p>{orderInfo?.customer?.email}</p>
              </div>
              <div className="">
                <p className="font-semibold text-xl mb-2">
                  Phương thức thanh toán
                </p>
                <p>
                  {orderInfo?.paymentMethod === "cod"
                    ? "Thanh toán khi giao hàng (COD)"
                    : ""}
                </p>
              </div>
            </div>
            <div>
              <div className="min-h-140px">
                <p className="font-semibold text-xl mb-2">Địa chỉ nhận hàng</p>
                <p>{orderInfo?.customer?.address}</p>
              </div>
              <div className="">
                <p className="font-semibold text-xl mb-2">
                  Phương thức vận chuyển
                </p>
                <p></p>
              </div>{" "}
            </div>
          </div>
        </div>
        <div className="w-full mt-6 rounded">
          <div className="bg-zinc-50 p-6">
            <h6 className="font-bold">Đơn hàng #{orderInfo?.orderNumber}</h6>
            <ul className="mt-4 border-t pt-4">
              {orderInfo?.items?.map((item: any, index: any) => {
                return (
                  <li
                    className="flex items-center mb-4 border-b pb-4 w-full justify-between"
                    key={index}
                  >
                    <div className="relative mr-5">
                      <img src={item.img} alt="" width={50} />
                      <span className="bg-blue-600 w-5 h-5 justify-center flex items-center absolute -top-2 left-9 text-white text-xs rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="w-2/4">
                      <p className="font-semibold">{item.productName}</p>
                      <p className="text-sm uppercase">{item.size.name}</p>
                    </div>
                    <div className="text-sm font-bold">
                      {item.size.price}.000đ
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="pb-4 border-b pt-2">
              <div className="flex justify-between mb-2">
                Tạm tính{" "}
                <span className="font-bold text-lg">
                  {orderInfo?.totalAmount + ".000đ"}
                </span>
              </div>
              <div className="flex justify-between">
                Phí vận chuyển{" "}
                <span className="font-bold text-lg">
                  {orderInfo?.freightCost}.000đ
                </span>
              </div>
            </div>
            <div className="py-4">
              <div className="flex justify-between text-xl px-4 items-center">
                Tổng cộng{" "}
                <span className="font-bold text-2xl">
                  {" "}
                  {orderInfo?.totalAmount + orderInfo?.freightCost + ".000đ"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-8 mt-6">
        <button
          className="bg-primary border border-primary text-white rounded-md py-3 px-4 text-xl mr-6 hover:bg-white hover:text-primary duration-200"
          onClick={() => navigate("/")}
        >
          Tiếp tục mua hàng
        </button>
        <button
          className="text-primary hover:text-white hover:bg-primary rounded-md text-2xl font-bold border duration-200 border-primary px-12"
          onClick={handlePrint}
        >
          <Print fontSize="large" />
          In
        </button>
        <div className="hidden">
          <PrintComponent ref={componentRef} orderInfor={orderInfo} />
        </div>
      </div>
    </div>
  );
};

export default TransactionNotification;
