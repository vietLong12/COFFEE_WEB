import { Link } from "react-router-dom";
import deliveryMan from "../../../assets/icon/delivery-man.webp";
import logo from "../../../assets/icon/logo.webp";
import s from "../Header.module.css";

const HomePageLogo = () => {
  return (
    <div className={`hidden lg:block absolute top-0 left-0 ${s.bgLogo}`}>
      <div className="flex items-center justify-start mt-3 ms-4">
        <img src={deliveryMan} alt="" className="mr-2 ml-3" />
        <div>
          <p className="text-xs">Gọi ngay</p>
          <a
            href="tel:+19006750"
            className="text-xl font-bold primary hover:opacity-70 leading-5"
          >
            19006750
          </a>
        </div>
      </div>
      <Link to="/" className="flex justify-center w-220px">
        <img src={logo} alt="" />
      </Link>
    </div>
  );
};

export default HomePageLogo;
