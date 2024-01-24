import { redirect, useLocation, useNavigate } from "react-router-dom";
import SubHeader from "../../components/subHeader/SubHeader";
import { Rating } from "@mui/material";
import SubDetailProduct from "./sub/SubDetailProduct";
import ProductRelate from "./sub/ProductRelate";
import { useContext, useEffect, useState } from "react";
import { ProductResponse } from "../../Types/ResponseType";
import { ProductService } from "../../service/ProductService";
import ProductRatePopUp from "./sub/ProductRatePopUp";
import { OrderService } from "../../service/OrderService";
import { AccountService } from "../../service/AccountService";
import { AuthContext } from "../../context/authContext";
import Swal from "sweetalert2";
const DetailProduct = () => {
  const slug = useLocation();
  const auth = useContext(AuthContext);
  const productId = slug.pathname.split("/")[2];
  const [product, setProduct] = useState<ProductResponse>();
  const [price, setPrice] = useState("");
  const [vote, setVote] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [listComment, setListComment] = useState();
  console.log("listComment: ", listComment);
  const [sizeId, setSizeId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("Không có ghi chú");

  const navigate = useNavigate();
  const handleAddToCart = async () => {
    if (auth?.isLoggedIn) {
      try {
        const a = await AccountService.addProductToCart({
          accountId: auth?.userData?._id,
          productId: productId,
          sizeId: sizeId,
          quantity: quantity,
          note: note,
        });
        console.log(a);
        if (a.status === "success") {
          auth.setRender(!auth.render);
          Swal.fire({
            icon: "success",
            title: "Sản phẩm đã được thêm vào giỏ hàng của bạn",
          });
          setQuantity(1);
          setNote("Không có ghi chú");
        }
      } catch (error: any) {
        Swal.fire({ icon: "error", title: error.message });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Vui lòng đăng nhập để thêm vào giỏ hàng",
      });
      navigate("/login");
    }
  };
  const handleBuyNow = () => {
    handleAddToCart();
    if (auth?.isLoggedIn) {
      navigate("/order");
      auth.setRender(!auth.render);
    }
  };

  useEffect(() => {
    ProductService.getProductById(productId)
      .then((res) => {
        setProduct(res.product);
        setSizeId(res.product.sizes[0]._id);
        setPrice(res.product.sizes[0].price);
      })
      .catch((err) => {
        navigate("/");
      });
    ProductService.getListCommentById(productId).then((res: any) => {
      console.log(
        res.data.listComment.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
      setListComment(res.data);
    });
  }, [productId, showPopup]);

  return (
    <div className="">
      <SubHeader
        heading={"Chi tiết sản phẩm"}
        productName={product?.productName}
      />
      <div className="" style={{ backgroundColor: "#fcf3ec" }}>
        <div className="grid lg:grid-cols-2 gap-4 xl:w-3/5 mx-auto pt-14 px-6 xl:px-0">
          <div className="flex justify-center items-center">
            <img src={product?.img} alt="" className="mr-8" />
          </div>
          <div className="">
            <h2 className="uppercase text-3xl font-bold mb-2">
              {product?.productName}
            </h2>
            <Rating
              precision={0.5}
              name="read-only"
              value={vote || 0}
              readOnly
            />
            <p className="mt-2 mb-2">
              Giá:
              <span className="ml-2 text-4xl primary font-bold">
                {price}.000₫
              </span>
            </p>
            <div className="flex">
              <p className="mr-2">Size:</p>
              <div className="flex mb-2">
                {product?.sizes.map((size, index) => {
                  return (
                    <div key={index} className="ms-5 relative mr-4">
                      <input
                        type="radio"
                        className="input-popup hidden"
                        name="sizeDetail"
                        defaultChecked={index == 0 ? true : false}
                        id={`optionDetail${index + 1}`}
                        onClick={() => {
                          setSizeId(size._id);
                          setPrice(size.price);
                        }}
                      />
                      <label
                        className="uppercase text-xl ml-1  cursor-pointer"
                        htmlFor={`optionDetail${index + 1}`}
                      >
                        {size.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="flex items-center mt-1">
                <label htmlFor="note" className="block mb-1 mr-4">
                  Ghi chú:
                </label>
                <div className="input-detailt-product relative w-4/5 rounded-md outline-none">
                  <input
                    className="outline-none border border-primary rounded-md"
                    type="text"
                    id="note"
                    placeholder="Thêm ghi chú món này"
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex mt-4">
              <p className="mr-4">Số lượng:</p>
              <div className="flex items-center justify-center relative w-20 rounded-md border border-primary">
                <button
                  className="absolute top-0 left-0 border-e border-primary w-6 rounded-s-md"
                  onClick={() =>
                    setQuantity((prev) => (prev <= 1 ? prev : prev - 1))
                  }
                >
                  -
                </button>
                <input
                  type="text"
                  disabled
                  value={quantity}
                  className="w-full text-center"
                />
                <button
                  className="absolute top-0 right-0 border-primary border-s  w-6 rounded-e-md"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex text-xl font-bold mt-4">
              <button
                className="mr-4 text-black rounded-xl hover:text-white border bg-primary-same hover:bg-primary px-4 py-2"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </button>
              <button
                className="text-white rounded-xl hover:text-black bg-primary hover:bg-primary-same border px-4 py-2"
                onClick={handleBuyNow}
              >
                Đặt hàng ngay
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-lg border-primary border-dotted rounded-xl mt-4 border p-2">
                <p>
                  Nhập "<span className="font-bold">YEUMONSTER</span>"
                </p>
                <p>
                  Giảm <span className="font-bold">10k</span>, đơn tối thiểu{" "}
                  <span className="font-bold">80k</span>
                </p>
              </div>
              <div className="text-lg border-primary border-dotted rounded-xl mt-4 border p-2">
                <p>
                  Nhập "<span className="font-bold">FREESHIP</span>"
                </p>
                <p>
                  Freeship tới <span className="font-bold">3km</span>, đơn tối
                  thiểu <span className="font-bold">100k</span>
                </p>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>

      <div className="bg-white xl:w-3/5 mx-auto mt-8 xl:px-0 px-6">
        <SubDetailProduct
          desc={product?.desc}
          rateList={listComment}
          setShowPopup={setShowPopup}
          setVote={setVote}
        />
      </div>
      <div className="bg-white">
        <ProductRelate categoryId={product?.categoryId} />
      </div>
      {showPopup ? (
        <ProductRatePopUp
          productId={product?._id}
          setShowPopup={setShowPopup}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default DetailProduct;
