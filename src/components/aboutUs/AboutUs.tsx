import imgAboutUs from "../../assets/bg/img-about-us.webp";
const AboutUs = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:mt-60 mt-20 container mx-auto items-center ">
      <div className="img-aboutUs w-3/5 relative z-30 lg:mb-0 mb-11">
        <img src={imgAboutUs} alt="" />
      </div>
      <div className="lg:ml-14 ml-0  relative w-full lg:w-2/5">
        <div className="flex justify-center ">
          <span className="lg:block relative uppercase about-us font-bold font-sans text-xl lg:text-4xl tracking-tighter">
            Về chúng tôi
          </span>
        </div>
        <p className="text-lg text-justify mt-14">
          Monster Coffee là quán cà phê với những hương vị cà phê thơm ngon đặc
          trưng kết hợp với không gian tuyệt đẹp, âm nhạc phong phú tạo lên
          phong cách sang đẹp, lịch sự, gần gũi. Phong cách riêng biệt chỉ
          Monster mới có.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
