import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducer";
import { ProductCart } from "../../../../Types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context/authContext";

const Cart = ({}) => {
  const auth = useContext(AuthContext);
  const cart: ProductCart[] = useSelector((store: RootState) => store.cart);
  const isLoggedIn = auth?.isLoggedIn;
  let navigate = useNavigate();

  const handleOrder = () => {
    if (isLoggedIn) {
      navigate("/order");
      auth?.setShowCart(false);
    } else {
      auth?.setShowCart(false);
      navigate("/order");
    }
  };

  return (
    <div className="p-3">
      <div className="mb-32">
        {cart.length > 0 ? (
          cart.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between border-b mb-4 pb-2"
              >
                <div className="">
                  <p className="font-bold text-lg">
                    {item.productName} -{" "}
                    <span className="uppercase">{item.size}</span>
                  </p>
                  <p className="text-sm">{item.note}</p>
                  <button className="flex items-center primary mt-4">
                    <span className="text-xs mr-1">x</span> Xóa
                  </button>
                </div>
                <div className="">
                  <div className="flex">
                    <div>-</div>
                    <input
                      type="text"
                      disabled
                      value={item.quantity}
                      className="outline-none w-10 h-6 rounded-md text-center"
                    />
                    <div>+</div>
                  </div>
                  <p>{item.total}.000đ</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>Bạn chưa chọn món</p>
        )}
      </div>
      {cart.length > 0 ? (
        <>
          <div className="flex justify-between px-4 border-y mb-2 py-3">
            Tổng cộng:{" "}
            <span className="text-lg font-bold primary">
              {cart.reduce((accumulator, currentValue) => {
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
