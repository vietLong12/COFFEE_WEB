import { ArrowRightTwoTone } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

interface SubHeaderProps {
  heading: string;
  productName?: string;
}

const SubHeader = ({ heading, productName }: SubHeaderProps) => {
  let matches = useLocation().pathname.split("/");
  matches = matches.map((path) => {
    switch (path) {
      case "login":
        return "Đăng nhập";
      case "register":
        return "Đăng ký";
      case "detail-product":
        return "Chi tiết sản phẩm";
      case "so-dia-chi":
        return "Sổ địa chỉ";
      case "doi-mat-khau":
        return "Đổi mật khẩu";
      case "don-hang":
        return "Đơn hàng của tôi";
      case "":
        return path;
      default:
        return path;
    }
  });
  return (
    <div className="pt-20 pb-16 text-center text-white uppercase text-4xl primary font-bold bg-black">
      <h3 className="xl:text-3xl text-2xl">{heading}</h3>
      <div>
        <span className="xl:text-base text-xs text-white normal-case">
          <Link to="/" className="hover:opacity-60 uppercase">
            Trang chủ
          </Link>{" "}
          <ArrowRightTwoTone />{" "}
          <p className="inline-block uppercase">{heading}</p>
          {matches.splice(2).map((item, i) => {
            if (item === "") {
              return "";
            }
            return (
              <span key={i} className="uppercase">
                <ArrowRightTwoTone /> {productName ? productName : item}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
};

export default SubHeader;
