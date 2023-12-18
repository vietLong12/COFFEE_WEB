import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login, logout } from "../../redux/action/account";

const AccountTopBar = () => {
  const [showInfoAccount, setShowInfoAccount] = useState(false);
  const dispatch = useDispatch()
  return (
    <div className="relative ml-4">
      <img
        src="https://bom.so/vAwaUU"
        className="rounded-full w-9 h-9 cursor-pointer"
        alt=""
        onClick={() => setShowInfoAccount(!showInfoAccount)}
      />

      {showInfoAccount ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className=" bg-white absolute top-12 right-0 p-2 flex items-center w-28 animate__animated animate__bounceIn"
          style={{ animationDuration: ".5s" }}
        >
          <ul>
            <li>
              <Link to="/information">Tài khoản</Link>
            </li>
            <li>
              <a href="javascript:void(0)" onClick={() => dispatch(logout())}  >Đăng xuất</a>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AccountTopBar;
