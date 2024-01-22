import { useState } from "react";
import Swal from "sweetalert2";

const FooterHeading = () => {
  const [emailSubcriber, setEmailSubcriber] = useState<string>("");
  const handleSubcriber = () => {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailSubcriber)) {
      Swal.fire({
        icon: "success",
        title: "Đăng ký thành công",
        text: "Cảm ơn bạn đã đăng ký để nhận những khuyến mãi hấp dẫn từ Monster",
      });
    }
  };
  return (
    <>
      <div className="flex md:flex-row justify-center flex-col uppercase text-white w-full xl:w-3/5 mx-auto px-8 xl:px-0">
        <div className="py-6  mr-10">
          <h5 className="mb-2 font-bold xl:text-4xl text-xl ">
            đăng kí nhận khuyến mãi
          </h5>
          <p className="normal-case text-sm">
            Đừng bỏ lỡ những sản phẩm và chương trình khuyến mãi hấp dẫn
          </p>
        </div>

        <div className="flex w-54p items-center relative mb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Email của bạn"
              className="p-4 outline-none text-black w-full  rounded-lg"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmailSubcriber(e.target.value);
              }}
            />
            {/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailSubcriber) ||
            emailSubcriber == "" ? (
              " "
            ) : (
              <span className="text-sm text-red-500 normal-case absolute top-16 left-2">
                Email không hợp lệ!!
              </span>
            )}

            <button
              className="uppercase
         xl:text-xl lg:text-lg text-sm bg-primary px-2 h-full w-1/4 rounded-e-lg absolute top-0 right-0 hover:bg-white hover:text-primary duration-200"
              onClick={handleSubcriber}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
      <span className="w-full border-b border-primary block"></span>
    </>
  );
};

export default FooterHeading;
