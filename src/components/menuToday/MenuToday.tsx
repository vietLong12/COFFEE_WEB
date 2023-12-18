import React from "react";
import "./style.css";
import MenuList from "./menuList/MenuList";
import Heading from "../common/Heading";
const MenuToday = () => {
  return (
    <div className="menu-today">
      <div className="pt-96 font-bold text-white  tracking-tighter  relative menu-today-title">
        <Heading title="Menu hôm nay" />
        <MenuList />
        <div className="text-center">
          <button className="px-10 py-2 uppercase rounded-xl bg-black border mt-10 font-normal text-xl border-white primary-hover">
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuToday;
