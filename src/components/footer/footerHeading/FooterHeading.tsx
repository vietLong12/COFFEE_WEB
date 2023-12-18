const FooterHeading = () => {
  return (
    <>
      <div className="flex uppercase text-white w-3/5 mx-auto">
        <div className="py-6 w-46p mr-10">
          <h5 className="mb-2 font-bold text-4xl">đăng kí nhận khuyến mãi</h5>
          <p className="normal-case text-sm">
            Đừng bỏ lỡ những sản phẩm và chương trình khuyến mãi hấp dẫn
          </p>
        </div>

        <div className="flex w-54p items-center relative ">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Email của bạn"
              className="p-4 outline-none text-black w-full  rounded-lg"
            />
            <button
              className="uppercase
         text-2xl bg-primary px-2 h-full w-1/4 rounded-e-lg absolute top-0 right-0"
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
