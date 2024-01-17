import React, { useContext, useEffect, useState } from "react";
import { ProductService } from "../../../service/ProductService";
import { Rating, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

const ProductRatePopUp = ({ productId, setShowPopup }: any) => {
  const auth = useContext(AuthContext);
  const [product, setProduct] = useState<any>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [rate, setRate] = React.useState<number | null>(1);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!auth?.isLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "Vui lòng đăng nhập để có thể đánh giá sản phẩm",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      if (name && email && content) {
        const reqBody = {
          comment: content,
          email: email,
          username: name,
          vote: rate,
          productId: productId,
        };
        console.log("reqBody: ", reqBody);
        const res = await ProductService.postComment(reqBody);
        console.log("res: ", res);
        setName("");
        setEmail("");
        setContent("");
      } else {
        Swal.fire({ icon: "error", title: "Vui lòng nhập đầy đủ thông tin" });
      }
    }
  };
  useEffect(() => {
    ProductService.getProductById(productId).then((res) =>
      setProduct(res.product)
    );
  }, [productId]);
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black-opacity z-50">
      <div className="bg-white mx-auto mt-56 max-w-2xl relative">
        <div className="py-6 px-2">
          <h3 className="text-center text-xl">Đánh giá sản phẩm</h3>
          <p className="font-bold text-center text-lg mt-2">
            {product?.productName}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center mt-2">
              <Typography component="legend" fontSize={16}>
                Đánh giá của bạn về sản phẩm:
              </Typography>
              <Rating
                name="simple-controlled"
                value={rate}
                //@ts-ignore
                onChange={(event, newValue) => {
                  setRate(newValue);
                }}
              />
            </div>
            <div className="w-11/12 mx-auto mt-6">
              <input
                type="text"
                value={name}
                className="w-full outline-none border  p-1 px-4 text-base rounded"
                placeholder="Nhập họ tên của bạn"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />
            <div className="w-11/12 mx-auto">
              <input
                className="w-full outline-none border  p-1 px-4 text-base rounded"
                placeholder="Nhập email của bạn"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <div className="w-11/12 mx-auto">
              <textarea
                className="w-full outline-none border  p-1 px-4 text-base rounded"
                value={content}
                rows={8}
                placeholder="Nhập nội dung đánh giá của bạn về sản phẩm này"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <br />
            <button
              type="submit"
              className="border bg-orange-400 text-white px-2 rounded py-1 mx-auto flex justify-center"
            >
              Gửi bình luận
            </button>
          </form>
        </div>
        <span
          className="absolute top-0 right-0 border p-2"
          onClick={() => setShowPopup(false)}
        >
          X
        </span>
      </div>
    </div>
  );
};

export default ProductRatePopUp;
