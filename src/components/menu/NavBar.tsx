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
          <div className="xl:bg-transparent bg-black text-primary  rounded border border-yellow-200 shadow-2xl hover:border-primary-same">
            <Menu
              className="hover:text-primary-same"
              sx={{
                fontSize: "50px",
                "@media screen and (max-width: 768px)": {
                  fontSize: "40px",
                },
                "@media screen and (max-width: 480px)": {
                  fontSize: "30px",
                },
              }}
            />
          </div>
        </div>
      </div>

      {open ? <NavBarList handleOpen={handleOpen} /> : ""}
    </>
  );
};

export default NavBar;
