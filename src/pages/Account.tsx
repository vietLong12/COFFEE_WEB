import React, { useContext } from "react";
import SubHeader from "../components/subHeader/SubHeader";
import { AuthContext } from "../context/authContext";
import { Link, NavLink, Outlet, Route, Routes } from "react-router-dom";

const ChildrenComponent = () => {
  return (
    <>
      <h1>aaaa</h1>
    </>
  );
};

const Account = () => {
  const auth = useContext(AuthContext);
  const username = auth?.userData?.username;
  const address = auth?.userData?.address;

  return (
    <>
      <SubHeader heading="Trang khách hàng" />
      <div className="lg:w-3/5 grid xl:grid-cols-12 mx-auto py-12 xl:px-0 px-4">
        <div className="xl:col-span-3 ">
          <h2 className="mb-2 uppercase text-2xl">Trang tài khoản</h2>
          <p className="font-semibold">
            Xin chào,{" "}
            <span className="text-red-600 font-bold">{username}!</span>
          </p>
          <ul className="mt-4">
            <li className="mb-3">
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "text-white" : isActive ? "text-red-500" : ""
                }
                to="/account/"
              >
                Thông tin tài khoản
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "text-white" : isActive ? "text-red-500" : ""
                }
                to="/account/don-hang"
              >
                Đơn hàng của bạn
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "text-white" : isActive ? "text-red-500" : ""
                }
                to="/account/doi-mat-khau"
              >
                Đổi mật khẩu
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "text-white" : isActive ? "text-red-500" : ""
                }
                to="/account/so-dia-chi"
              >
                Sổ địa chỉ ({address?.length})
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="xl:col-span-9 overflow-hidden">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
