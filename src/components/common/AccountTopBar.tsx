import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const AccountTopBar = () => {
  const auth = useContext(AuthContext);
  return (
    <div className="relative group ml-4">
      <img
        src="https://bom.so/vAwaUU"
        className="rounded-full w-9 h-9 cursor-pointer"
        alt=""
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white absolute top-12 right-0 p-2 hidden items-center w-28 animate__animated animate__bounceIn group-hover:flex before:absolute before:-top-4 before:right-0 before:w-20 before:h-4 "
        style={{ animationDuration: ".5s" }}
      >
        <ul>
          <li>
            <Link to="/account">Tài khoản</Link>
          </li>
          <li>
            <button onClick={() => auth?.setLoggedIn(false)}>Đăng xuất</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountTopBar;
