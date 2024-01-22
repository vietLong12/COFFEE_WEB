// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import SubHeader from "../components/subHeader/SubHeader";
import { AuthContext } from "../context/authContext";
import { Link, NavLink, Outlet, Route, Routes } from "react-router-dom";
import { AccountService } from "../service/AccountService";

const Account = () => {
  const auth = useContext(AuthContext);
  const username = auth?.userData?.username;

  const [account, setAccount] = useState<any>();
  const addressLength = auth?.userData?.address.length || 0;
  const [show, setShow] = useState<any>(false);

  useEffect(() => {
    AccountService.getAccountById(auth?.userData?._id).then((res) => {
      setAccount(res.data);
    });
  }, []);

  return (
    <>
      <SubHeader heading="Trang khách hàng" />
      <div className="lg:w-3/5 grid xl:grid-cols-12 mx-auto py-12 xl:px-0 px-4 min-h-400px">
        <div className="xl:col-span-3 ">
          <h2 className="mb-2 uppercase text-2xl">Trang tài khoản</h2>
          <p className="font-semibold">
            Xin chào,{" "}
            <span className="text-red-600 font-bold">{username}!</span>
          </p>
          <ul className="mt-4">
            <li
              className="cursor-pointer select-none "
              onClick={() => setShow(!show)}
            >
              <span className="hover:text-primary">Thông tin cá nhân</span>{" "}
              <span
                className={`text-xs ml-2 ${
                  !show ? "" : "-rotate-90"
                }  inline-block`}
              >
                {"<"}
              </span>
              <ul
                className={`ml-6 ${
                  show ? "" : "hidden"
                } animate__animated  animate__slideInLeft list-disc`}
              >
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending ? "text-white" : isActive ? "text-red-500" : ""
                    }
                    to="/account/"
                  >
                    Thông tin chung
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending ? "text-white" : isActive ? "text-red-500" : ""
                    }
                    to="/account/doi-mat-khau"
                  >
                    Đổi mật khẩu
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending ? "text-white" : isActive ? "text-red-500" : ""
                    }
                    to="/account/so-dia-chi"
                  >
                    Sổ địa chỉ ({addressLength})
                  </NavLink>
                </li>
              </ul>
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
