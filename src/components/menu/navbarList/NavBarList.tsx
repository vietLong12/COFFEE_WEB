import React from "react";
import logoMenu from "../../../assets/icon/logo-sidebar.webp";
import { Close } from "@mui/icons-material";
import ListItem from "../ListItem";

interface TNavBarListProps {
  handleOpen: () => void;
}

const NavBarList: React.FC<TNavBarListProps> = ({ handleOpen }) => {
  return (
    <div
      className="z-40 fixed top-0 left-0 right-0 bottom-0 bg-black-opacity flex justify-end"
      onClick={handleOpen}
    >
      <div
        className="lg:w-1/6 h-screen bg-white animate__animated animate__slideInRight"
        style={{ animationDuration: "0.5s" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary flex justify-between items-center h-16 ps-6">
          <img src={logoMenu} className="h-10" alt="" />
          <button className="text-white p-2" onClick={handleOpen}>
            <Close fontSize="medium" />
          </button>
        </div>

        <ul className="text-2xl font-bold px-4 py-2" onClick={handleOpen}>
          <ListItem title="Trang chủ" href="/" />
          <ListItem title="Giới thiệu" href="/gioi-thieu" />
          <ListItem title="Menu" href="/menu" />
          <ListItem title="Tin tức" href="tin-tuc" />
          <ListItem title="Liên hệ" href="lien-he" />
          <ListItem title="Live" href="live" />
        </ul>
      </div>
    </div>
  );
};

export default NavBarList;
