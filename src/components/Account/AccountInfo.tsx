import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const AccountInfo = () => {
  const auth = useContext(AuthContext);
  const user = auth?.userData;
  const addressDefalt = auth?.userData?.address.filter(
    (address) => address.defaultAddress === true
  )[0];
  return (
    <div>
      <h2 className="text-2xl uppercase">thông tin tài khoản</h2>
      <div className="font-bold mt-4">
        <div className="mb-2">
          Họ tên: <span className="font-normal">{user?.username}</span>
        </div>
        <div className="mb-2">
          Email: <span className="font-normal">{user?.email}</span>
        </div>
        <div className="mb-2">
          Điện thoại: <span className="font-normal">{user?.phone}</span>
        </div>
        <div className="mb-2">
          Địa chỉ:{" "}
          <span className="font-normal">
            {addressDefalt?.homeAddress}, {addressDefalt?.ward?.name + ", "}
            {addressDefalt?.district?.name + ", "},{" "}
            {addressDefalt?.city?.name + "."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
