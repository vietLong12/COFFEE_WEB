// @ts-nocheck
import { Close, Menu } from "@mui/icons-material";
import { useContext, useState } from "react";
import NavBarList from "./navbarList/NavBarList";
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <div
        className="absolute top-16 right-0  flex justify-end primary py-2 xl:w-auto
       xl:bg-transparent items-center"
      >
        <div
          onClick={handleOpen}
          className=" cursor-pointer flex items-center  px-2"
        >
          <span className="mr-4 uppercase font-bold text-2xl xl:block hidden">
            Monster Coffee
          </span>
          <div className="xl:bg-transparent bg-black xl:text-primary text-white rounded">
            <Menu className="" sx={{ fontSize: "36px" }} />
          </div>
        </div>
      </div>

      {open ? <NavBarList handleOpen={handleOpen} /> : ""}
    </>
  );
};

export default NavBar;
