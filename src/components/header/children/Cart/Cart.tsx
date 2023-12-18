import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducer";
import { ProductCart } from "../../../../Types";
import Swal from "sweetalert2";
import { redirect } from "react-router-dom";

const Cart = ({}) => {
  const cart: ProductCart[] = useSelector((store: RootState) => store.cart);
  const isLoggedIn: boolean = useSelector((store: RootState) => store.login);
  const handleOrder = () => {
    if(isLoggedIn){
      console.log(cart);
    } else {
      Swal.fire("Vui lòng đăng nhập trước khi đặt hàng")
      redirect("/login");
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
          <button onClick={handleOrder} className="uppercase w-full py-2 text-center bg-red-600 text-white font-bold">
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
