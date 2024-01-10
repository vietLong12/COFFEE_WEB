import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { AccountService } from "../../service/AccountService";

const AccountInfo = () => {
  const auth = useContext(AuthContext);
  const user = auth?.userData;
  console.log("user ac: ", user);
  const [userData, setUserData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const account = await AccountService.getAccountById(user?._id);
      setUserData(account.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl uppercase">thông tin tài khoản</h2>
      <div className="font-bold mt-4">
        <div className="mb-2">
          Họ tên: <span className="font-normal">{userData?.username}</span>
        </div>
        <div className="mb-2">
          Email: <span className="font-normal">{userData?.email}</span>
        </div>
        <div className="mb-2">
          Điện thoại: <span className="font-normal">{userData?.phone}</span>
        </div>
        {/* <div className="mb-2">
          Địa chỉ:{" "}
          <span className="font-normal">
            {userData?.address.homeAddress}, {addressDefalt?.ward?.name + ", "}
            {addressDefalt?.district?.name + ", "},{" "}
            {addressDefalt?.city?.name + "."}
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default AccountInfo;
