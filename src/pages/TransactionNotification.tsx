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

const PrintComponent = forwardRef((props: any, ref) => {
  const orderInfo = props.orderInfor;
  const customer = props.customer;
  return (
    <div className="bg-zinc-50 p-6" ref={ref}>
      <h1 className="uppercase text-4xl text-center mb-6">Monster coffee</h1>
      <h6 className="font-bold">Đơn hàng #{customer?.orderNumber}</h6>
      <br />
      <p>
        Tên khách hàng: <span>{customer?.customer.username}</span>
      </p>
      <p>
        Địa chỉ: <span>{customer?.customer.address}</span>
      </p>
      <ul className="mt-4 border-t pt-4">
        {orderInfo?.map((item, index) => (
          <li
            className="flex items-center mb-4 border-b pb-4 w-full justify-between"
            key={index}
          >
            <div className="relative mr-5">
              <img src={item.product.img} alt="" width={50} />
              <span className="bg-blue-600 w-5 h-5 justify-center flex items-center absolute -top-2 left-9 text-white text-xs rounded-full">
                {item.quantity}
              </span>
            </div>
            <div className="w-2/4">
              <p className="font-semibold">{item.product.productName || ""}</p>
              <p className="text-sm uppercase">{item.size}</p>
            </div>
            <div className="text-sm">{item.price}.000đ</div>
          </li>
        ))}
      </ul>
      <div className="pb-4 border-b pt-2">
        <div className="flex justify-between mb-2">
          Tạm tính <span>{customer?.totalAmount + ".000đ"}</span>
        </div>
        <div className="flex justify-between">
          Phí vận chuyển <span>{customer?.freightCost}.000đ</span>
        </div>
      </div>
      <div className="py-4">
        <div className="flex justify-between text-xl px-4 items-center">
          Tổng cộng{" "}
          <span className="font-bold text-2xl">
            {customer?.totalAmount + customer?.freightCost + ".000đ"}
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
  const orderId = auth?.orderId || "";
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<any>();
  const [orderInfo, setOrderInfor] = useState<any>();
  useEffect(() => {
    if (orderId != "") {
      const fetchData = async () => {
        try {
          const orderRes = await OrderService.getOrderById(orderId);

          // Sử dụng Promise.all để đợi tất cả các promise giải quyết
          const order = await Promise.all(
            (orderRes.order.items = orderRes.order.items.map(
              async (item: any) => {
                const res = await ProductService.getProductById(item.productId);
                const fil = res.product.sizes.filter(
                  (s: any) => s._id === item.sizeId
                );
                return { ...item, product: res.product, size: fil[0].name };
              }
            ))
          );
          setCustomer(orderRes.order);
          setOrderInfor(order);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } else {
      Swal.fire({
        icon: "error",
        title: "Bạn chưa thanh toán không thể có hoá đơn",
      });
      navigate("/");
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-50">
      <Link
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
                <span className="font-medium text-lg">
                  {customer?.customer?.email}
                </span>
                .
              </p>
              <p> Xin vui lòng kiểm tra email của bạn</p>
            </div>
          </div>
          <div className="grid grid-cols-2 border p-6">
            <div>
              <div className="min-h-140px">
                <p className="font-semibold text-xl mb-2">Thông tin mua hàng</p>
                <p>{customer?.customer?.username}</p>
                <p>{customer?.customer?.email}</p>
              </div>
              <div className="">
                <p className="font-semibold text-xl mb-2">
                  Phương thức thanh toán
                </p>
                <p>
                  {customer?.paymentMethod === "cod"
                    ? "Thanh toán khi giao hàng (COD)"
                    : ""}
                </p>
              </div>
            </div>
            <div>
              <div className="min-h-140px">
                <p className="font-semibold text-xl mb-2">Địa chỉ nhận hàng</p>
                <p>{customer?.customer?.address}</p>
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
        <div className="col-span-5 ">
          <div className="bg-zinc-50 p-6">
            <h6 className="font-bold">Đơn hàng #{customer?.orderNumber} (</h6>
            <ul className="mt-4 border-t pt-4">
              {orderInfo?.map((item: any, index: any) => {
                return (
                  <li
                    className="flex items-center mb-4 border-b pb-4 w-full justify-between"
                    key={index}
                  >
                    <div className="relative mr-5">
                      <img src={item.product.img} alt="" width={50} />
                      <span className="bg-blue-600 w-5 h-5 justify-center flex items-center absolute -top-2 left-9 text-white text-xs rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="w-2/4">
                      <p className="font-semibold">
                        {item.product.productName || ""}
                      </p>
                      <p className="text-sm uppercase">{item.size}</p>
                    </div>
                    <div className="text-sm">{item.price}.000đ</div>
                  </li>
                );
              })}
            </ul>
            <div className="pb-4 border-b pt-2">
              <div className="flex justify-between mb-2">
                Tạm tính <span>{customer?.totalAmount + ".000đ"}</span>
              </div>
              <div className="flex justify-between">
                Phí vận chuyển <span>{customer?.freightCost}.000đ</span>
              </div>
            </div>
            <div className="py-4">
              <div className="flex justify-between text-xl px-4 items-center">
                Tổng cộng{" "}
                <span className="font-bold text-2xl">
                  {" "}
                  {customer?.totalAmount + customer?.freightCost + ".000đ"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-600 text-white rounded-md py-3 px-4 text-xl mr-6 hover:bg-blue-900 duration-200"
          onClick={() => navigate("/")}
        >
          Tiếp tục mua hàng
        </button>
        <button
          className="text-blue-600 hover:text-blue-900 text-2xl font-bold"
          onClick={handlePrint}
        >
          <Print fontSize="large" />
          In
        </button>
        <div className="hidden">
          <PrintComponent
            ref={componentRef}
            orderInfor={orderInfo}
            customer={customer}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionNotification;
