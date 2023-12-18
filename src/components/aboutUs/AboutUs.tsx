import imgAboutUs from "../../assets/bg/img-about-us.webp";
const AboutUs = () => {
  return (
    <div className="flex mt-60 container mx-auto items-center ">
      <div className="img-aboutUs w-3/5 relative z-30">
        <img src={imgAboutUs} alt="" />
      </div>
      <div className="ml-14 about-us relative w-2/5">
        <span className="uppercase font-bold font-sans  text-4xl tracking-tighter block">
          Về chúng tôi
        </span>
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
