import React, { useState } from "react";
import { ProductCart, TProduct } from "../../Types";
import { CloseOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../redux/action/AddProductToCart";

interface TPopUpProps {
  item: TProduct | undefined;
  setShowDetail: (value: boolean) => void;
}

const PopUp: React.FC<TPopUpProps> = ({ item, setShowDetail }) => {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("Không có ghi chú");

  const dispatch = useDispatch();

  const [size, setSize] = useState("");

  const handleSubmit = () => {
    if (item) {
      const productAddToCart: ProductCart = {
        itemId: item.id,
        productName: item.productName,
        category: item.category,
        price: item.price,
        note,
        size,
        quantity,
        total: quantity * item.price
      };
      dispatch(addProductToCart(productAddToCart));
      setShowDetail(false)
    }
  };

  return (
    <div className="bg-black bg-opacity-50 fixed top-0 left-0 right-0 bottom-0 text-black  ">
      <div
        className="bg-white rounded-lg w-1/3 mx-auto mt-20 p-5 relative animate__animated animate__backInDown"
        style={{ animationDuration: ".5s" }}
      >
        <div
          className="absolute top-2 right-4 text-2xl font-bold cursor-pointer"
          onClick={() => setShowDetail(false)}
        >
          <CloseOutlined fontSize="large" />
        </div>
        <div>
          <div className="text-black flex">
            <img src={item?.img} alt="" width={100} />
            <div className="text-xl ml-4 flex flex-col justify-center">
              <h6 className="font-bold ">{item?.productName}</h6>
              <p>
                Giá: <span className="font-bold">{item?.price}.000đ</span>
              </p>
            </div>
          </div>
          <hr />
          <div className="py-2">
            <p className="font-medium text-xl">Size:</p>
            <div className="flex justify-between w-1/4 mt-2 ml-10">
              {item?.size.map((size, index) => {
                return (
                  <div key={index} className="relative">
                    <input
                      type="radio"
                      onChange={() => setSize(size)}
                      className="input-popup hidden"
                      name="size"
                      id={`option${index + 1}`}
                    />
                    <label
                      className="uppercase text-xl ml-1  cursor-pointer"
                      htmlFor={`option${index + 1}`}
                    >
                      {size}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="note mb-8 mt-4">
            <input
              type="text"
              name=""
              onChange={(e) => setNote(e.target.value)}
              className="w-full border border-black py-2 px-2 outline-none rounded-md"
              id=""
              placeholder="Thêm ghi chú cho món này"
            />
          </div>
          <hr />
          <div className="flex justify-around pt-4">
            <div className="flex items-center">
              <button
                className="mr-1 p-0 w-6 h-6 bg-green-600 text-center text-xl inline-flex justify-center items-center text-white"
                onClick={() => (quantity <= 1 ? 1 : setQuantity(quantity - 1))}
              >
                -
              </button>
              <input
                type="text"
                disabled
                value={quantity < 1 ? 1 : quantity}
                className="outline-none w-10 border h-6 rounded-md text-center"
              />
              <button
                className="ml-1 p-0 w-6 h-6 bg-green-600 text-center text-xl inline-flex justify-center items-center text-white"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleSubmit()}
              className="bg-red-500 text-white px-3 py-1 text-lg"
            >
              Thêm vào giỏ{" "}
              <span className="font-bold text-xl">
                {item?.price ? item.price * quantity : ""}.000đ
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
