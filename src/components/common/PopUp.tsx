import React, { useContext, useEffect, useState } from "react";
import { CloseOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../redux/action/AddProductToCart";
import { ProductResponse } from "../../Types/ResponseType";
import { AccountService } from "../../service/AccountService";
import { AuthContext } from "../../context/authContext";

interface TPopUpProps {
  item: ProductResponse | undefined;
  setShowDetail: (value: boolean) => void;
}
interface SizesState {
  name: string;
  price: number;
  _id: string;
}

const PopUp: React.FC<TPopUpProps> = ({ item, setShowDetail }) => {
  const auth = useContext(AuthContext);

  const [quantity, setQuantity] = useState(1);
  // @ts-ignore
  const [listSize, setListSize] = useState(item?.sizes);
  const [note, setNote] = useState("Không có ghi chú");
  const dispatch = useDispatch();
  const [sizes, setSizes] = useState<SizesState | null>(null);
  const [selectedSize, setSelectedSize] = useState(item?.sizes[0]._id);
  const [price, setPrice] = useState(item?.sizes[0].price);

  const handleSubmit = async () => {
    if (selectedSize) {
      if (auth?.isLoggedIn) {
        if (auth.userData?._id && item?._id) {
          const resp = await AccountService.addProductToCart({
            accountId: auth.userData?._id,
            productId: item?._id,
            sizeId: selectedSize,
            quantity: quantity,
            note: note,
          });
          if (resp.code === 200) {
            setShowDetail(false);
            auth.setRender(!auth.render);
          }
        }
      } else {
        // Xử lí khi chưa đăng nhập
        const payload: any = {
          _id: item?._id,
          note: note,
          productName: item?.productName,
          quantity: quantity,
          size: sizes?.name,
          total: sizes?.price || 1 * quantity,
        };
        dispatch(addProductToCart(payload));
        setShowDetail(false);
      }
    }
  };

  useEffect(() => {
    const size = item?.sizes.filter((size) => size._id === selectedSize)[0];
    if (size) setSizes(size);
  }, [selectedSize]);

  return (
    <div className="bg-black bg-opacity-50 fixed top-0 left-0 right-0 bottom-0 text-black  z-50">
      <div
        className="bg-white rounded-lg xl:w-1/3 xl:mx-auto mx-3 mt-20 p-5 relative animate__animated animate__backInDown"
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
                Giá: <span className="font-bold">{price}.000đ</span>
              </p>
            </div>
          </div>
          <hr />
          <div className="py-2">
            <p className="font-medium text-xl">Size:</p>
            <div className="xl:flex justify-between w-1/4 mt-2 ml-10">
              {listSize?.map((size, index) => {
                return (
                  <div key={index} className="relative">
                    <input
                      type="radio"
                      defaultChecked={size?._id == selectedSize ? true : false}
                      onClick={() => {
                        setSelectedSize(size._id);
                        setPrice(size.price);
                      }}
                      className="input-popup hidden"
                      name="size"
                      id={`option${index + 1}`}
                    />
                    <label
                      className="uppercase text-xl ml-1  cursor-pointer"
                      htmlFor={`option${index + 1}`}
                    >
                      {size.name}
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
          <div className="xl:flex block justify-around pt-4">
            <div className="flex items-center mb-8 xl:mb-0">
              <button
                className="rounded-md mr-1 p-0 w-6 h-6 bg-green-600 text-center text-xl inline-flex justify-center items-center text-white"
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
                className="rounded-md ml-1 p-0 w-6 h-6 bg-green-600 text-center text-xl inline-flex justify-center items-center text-white"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleSubmit()}
              className="bg-red-500 text-white px-3 py-1 text-lg rounded"
            >
              Thêm vào giỏ{" "}
              <span className="font-bold text-xl">
                {price ? price : 1 * quantity}.000đ
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
