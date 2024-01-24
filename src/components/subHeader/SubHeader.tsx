import { ArrowRightTwoTone } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import monsterCoffee from "../../assets/icon/logo-sidebar.webp";
import { Breadcrumbs, Typography } from "@mui/material";

interface SubHeaderProps {
  heading: string;
  productName?: string;
  custom?: string;
}

const SubHeader = ({ heading, productName, custom }: SubHeaderProps) => {
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
      case "alert":
        return "";
      case "":
        return path;

      default:
        return path;
    }
  });
  return (
    <>
      <Link
        to={"/"}
        className="uppercase font-bold text-5xl text-center  bg-black text-primary lg:pt-12 pt-4 block"
      >
        <img
          src={monsterCoffee}
          alt=""
          className="text-primary mx-auto lg:w-96 w-64  px-6 lg:py-4 py-0 rounded-lg border border-primary hover:border-white hover:bg-primary duration-200"
        />
      </Link>
      <div className="pt-6 pb-10 text-center text-white uppercase text-4xl bg-black font-bold ">
        <h3 className="xl:text-4xl text-2xl bg-black">{heading}</h3>
      </div>
      <div className="xl:text-start xl:mx-auto font-bold py-3 bg-primary-100 border">
        <span className="xl:text-base text-xs text-black normal-case  border  py-1 px-4 rounded xl:w-3/5 mx-auto block">
          <Link to="/" className="hover:opacity-60 uppercase">
            Trang chủ
          </Link>
          {" / "}
          <p className="inline-block uppercase ">{custom || heading}</p>
          {matches.splice(2).map((item, i) => {
            if (item === "") {
              return "";
            }
            return (
              <span key={i} className="uppercase">
                {" / "} {productName ? productName : item}
              </span>
            );
          })}
        </span>
      </div>
    </>
  );
};

export default SubHeader;
