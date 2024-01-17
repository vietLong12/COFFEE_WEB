// @ts-nocheck
import "./style.css";
import MenuList from "./menuList/MenuList";
import Heading from "../common/Heading";
import { useNavigate } from "react-router-dom";
const MenuToday = () => {
  const navigate = useNavigate();
  return (
    <div className="menu-today">
      <div className="pt-96 font-bold text-white  tracking-tighter  relative menu-today-title">
        <Heading
          title="Menu hôm nay"
          className="xl:text-white text-black"
          href="/menu"
        />
        <MenuList />
        <div className="text-center">
          <button
            className="px-10 py-2 uppercase rounded-xl bg-black border mt-10 font-normal text-xl border-white primary-hover"
            onClick={() => navigate("/menu")}
          >
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuToday;
