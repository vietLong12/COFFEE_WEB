import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/authContext";
import { ProductService } from "../../../../service/ProductService";
import { ProductResponse } from "../../../../Types/ResponseType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducer";
import {
  ProductPayload,
  changeQuantity,
} from "../../../../redux/action/AddProductToCart";
import Swal from "sweetalert2";

const Cart = ({}) => {
  const auth = useContext(AuthContext);
  const [cartData, setCartData] = useState<ProductPayload[]>([]);
  let cart = useSelector((store: RootState) => store.cart);
  console.log("cart: ", cart);

  const isLoggedIn = auth?.isLoggedIn;
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [items, setItems] = useState<any>([]);
  const [listProduct, setListProduct] = useState([]);
  const handleOrder = () => {
    if (isLoggedIn) {
      navigate("/order");
      auth?.setShowCart(false);
    } else {
      Swal.fire({ title: "Vui lòng đăng nhập trước khi đặt hàng!" });
      auth?.setShowCart(false);
      navigate("/login");
    }
  };

  const handleChangeQuantity = (
    _id: string,
    quantity: number,
    size: string
  ) => {
    dispatch(changeQuantity({ _id, quantity, size }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      // Xử lí khi đã đăng nhập
    } else {
      setCartData(cart);
    }
  }, []);

  useEffect(() => {
    setCartData(cart);
  }, [cart]);
  return (
    <div className="p-3">
      <div className="mb-32">
        {cartData.length > 0 ? (
          cartData.map((item, index: number) => {
            return (
              <div
                key={index}
                className="flex justify-between border-b mb-4 pb-2"
              >
                <div className="">
                  <p className="font-bold text-lg">
                    {item?.productName} -{" "}
                    <span className="uppercase">{item?.size}</span>
                  </p>
                  <p className="text-sm">{item?.note}</p>
                  <button className="flex items-center primary mt-4">
                    <span className="text-xs mr-1">x</span> Xóa
                  </button>
                </div>
                <div className="">
                  <div className="flex">
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        handleChangeQuantity(item?._id, -1, item?.size)
                      }
                    >
                      -
                    </div>
                    <input
                      type="text"
                      disabled
                      value={item?.quantity}
                      className="outline-none w-10 h-6 rounded-md text-center"
                    />
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        handleChangeQuantity(item?._id, 1, item?.size)
                      }
                    >
                      +
                    </div>
                  </div>
                  <p>{item?.total}.000đ</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>Bạn chưa chọn món</p>
        )}
      </div>
      {cartData?.length > 0 ? (
        <>
          <div className="flex justify-between px-4 border-y mb-2 py-3">
            Tổng cộng:{" "}
            <span className="text-lg font-bold primary">
              {cartData?.reduce((accumulator: any, currentValue: any) => {
                return accumulator + currentValue.total;
              }, 0)}
              .000đ
            </span>
          </div>
          <button
            onClick={handleOrder}
            className="uppercase w-full py-2 text-center bg-red-600 text-white font-bold"
          >
            đặt hàng
          </button>
        </>
      ) : (
        <button
          disabled
          className="uppercase w-full py-2 text-center bg-gray-400 text-white font-bold "
          onClick={() => handleOrder()}
        >
          đặt hàng
        </button>
      )}
    </div>
  );
};

export default Cart;
