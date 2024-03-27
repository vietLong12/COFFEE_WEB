import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/authContext";
import { ProductService } from "../../../../service/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducer";
import {
  ProductPayload,
  changeQuantity,
} from "../../../../redux/action/AddProductToCart";
import Swal from "sweetalert2";
import { AccountService } from "../../../../service/AccountService";

interface CartProps {
  render: any;
  setRender: any;
}

const Cart = ({ render, setRender }: CartProps) => {
  const auth = useContext(AuthContext);
  const accountId = auth?.userData?._id;
  const [cartData, setCartData] = useState<ProductPayload[]>([]);
  let cart = useSelector((store: RootState) => store.cart);
  const isLoggedIn = auth?.isLoggedIn;
  let navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleChangeQuantity = async (
    accountId: string | undefined,
    quantity: number,
    sizeId: string,
    productId: string,
    size: string
  ) => {
    if (!auth?.isLoggedIn) {
      dispatch(changeQuantity({ _id: productId, quantity, size }));
    } else {
      if (productId) {
        
        const account = await AccountService.addProductToCart({
          accountId: accountId ? accountId : "",
          quantity: quantity,
          sizeId: sizeId,
          productId: productId,
        });
      }
    }
    setRender(!render);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        if (accountId) {
          try {
            const accountResponse = await AccountService.getAccountById(
              accountId
            );
            const listCartRes = accountResponse.data.cart.items;
            const listCart = await Promise.all(
              listCartRes.map(async (item: any) => {
                const responseProduct = await ProductService.getProductById(
                  item.productId
                );
                const product = responseProduct.product;
                const size = product.sizes.find(
                  (s: any) => s._id === item.sizeId
                );

                const dataReturn = {
                  _id: product._id,
                  note: item.note,
                  productName: product.productName,
                  quantity: item.quantity,
                  size: size ? size.name : "N/A",
                  total: size.price * item.quantity,
                  sizeId: size._id,
                  img: product.img,
                };
                return dataReturn;
              })
            );

            setCartData(listCart);
            auth.setCart(listCart);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      } else {
        setCartData(cart);
      }
    };

    fetchData();
  }, [isLoggedIn, accountId, cart, render]);

  return (
    <div className="p-3">
      <div className="mb-32">
        {cartData.length > 0 ? (
          cartData.map((item: any, index: number) => {
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
                  <button
                    className="flex items-center primary mt-4"
                    onClick={() =>
                      handleChangeQuantity(
                        auth?.userData?._id,
                        item.quantity * -1,
                        item.sizeId,
                        item._id,
                        item.size
                      )
                    }
                  >
                    <span className="text-xs mr-1">x</span> Xóa
                  </button>
                </div>
                <div className="">
                  <div className="flex">
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        handleChangeQuantity(
                          auth?.userData?._id,
                          -1,
                          item.sizeId,
                          item._id,
                          item.size
                        )
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
                        handleChangeQuantity(
                          auth?.userData?._id,
                          1,
                          item.sizeId,
                          item._id,
                          item.size
                        )
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
            className="uppercase w-full py-2 text-center bg-red-600 text-white font-bold rounded-md"
          >
            đặt hàng
          </button>
        </>
      ) : (
        <button
          disabled
          className="uppercase w-full py-2 text-center bg-gray-400 text-white font-bold rounded-md"
          onClick={() => handleOrder()}
        >
          đặt hàng
        </button>
      )}
    </div>
  );
};

export default Cart;
