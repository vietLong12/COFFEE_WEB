import {
    Call,
  Email,
  Facebook,
  Instagram,
  Telegram,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import logoFooter from "../../../assets/logo/logo-footer.webp";

const FooterInfo = () => {
  return (
    <>
      <div className="flex uppercase text-white w-3/5 mx-auto mt-10">
        <div className="py-6 w-46p mr-10">
          <img src={logoFooter} alt="" className="mb-8" />
          <p className="normal-case mb-5">
            Monster Coffee mong rằng chúng tôi luôn mang đến cho khách hàng
            những trải nghiệm tốt nhất, tạo ra những khoảnh khắc khó quên khi
            đến với Monster.
          </p>
          <div className="flex justify-between w-1/2">
            <a href="https://twitter.com/?lang=vi" target="_blank">
              <Twitter
                fontSize="large"
                className="hover:opacity-60"
                sx={{ color: "#c19977" }}
              />
            </a>
            <a href="https://fb.com" target="_blank">
              <Facebook
                fontSize="large"
                className="hover:opacity-60"
                sx={{ color: "#c19977" }}
              />
            </a>
            <a href="https://instagram.com" target="_blank">
              <Instagram
                fontSize="large"
                className="hover:opacity-60"
                sx={{ color: "#c19977" }}
              />
            </a>
            <a href="https://web.telegram.org/" target="_blank">
              <Telegram
                fontSize="large"
                className="hover:opacity-60"
                sx={{ color: "#c19977" }}
              />
            </a>
            <a href="https://youtube.com/" target="_blank">
              <YouTube
                fontSize="large"
                className="hover:opacity-60"
                sx={{ color: "#c19977" }}
              />
            </a>
          </div>
        </div>

        <div className="w-54p relative mt-6 normal-case
        ">
          <div className="text-base">
            <h6 className="uppercase primary text-2xl font-semibold mb-4">
              Hệ thống cửa hàng
            </h6>
            <div className="flex items-center mb-2">
              <LocationOnIcon fontSize="small" sx={{ color: "#c19977", marginRight: "6px" }} />
              CN1: Tầng 6 toà nhà Ladeco, 266 Đội Cấn, phường Liễu Giai, Hà Nội,
              Việt Nam
            </div>
            <div className="flex items-center">
              <LocationOnIcon fontSize="small" sx={{ color: "#c19977", marginRight: "6px" }} />
              CN2: Toà nhà Lữ Gia, 70 Lữ Gia, phường 15, quận 11, TP. HCM, Việt
              Nam
            </div>
          </div>

          <div className="text-base">
            <h6 className="uppercase primary text-2xl font-semibold mb-4 mt-10">Liên hệ</h6>
            <div className="flex items-center mb-2">
              <Call fontSize="small" sx={{ color: "#c19977", marginRight: "6px" }} />
              Hotline đặt hàng: <a href="" className="ml-2">19006750</a>
            </div>
            <div className="flex items-center">
              <Email fontSize="small" sx={{ color: "#c19977", marginRight: "6px" }} />
              Email: <a href="" className="ml-2">support@monster.vn</a>
            </div>
            <div className="flex items-center">
              <Email fontSize="small" sx={{ color: "transparent", marginRight: "6px" }} />
              Thứ 2 - Thứ 6: 7am - 10pm
            </div>
            <div className="flex items-center">
              <Email fontSize="small" sx={{ color: "transparent", marginRight: "6px" }} />
              Thứ 7 - Chủ nhật: 8am - 9pm
            </div>
          </div>
        </div>
      </div>
      <span className="w-full border-b border-primary block"></span>
    </>
  );
};

export default FooterInfo;
