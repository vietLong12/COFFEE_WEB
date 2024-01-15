import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { AccountService } from "../../service/AccountService";

const ChangPassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [reNewPass, setReNewPass] = useState("");
  const auth = useContext(AuthContext);

  const [statusChangePassword, setStatusChangePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleChangePassword = async () => {
    if (!(reNewPass === newPass)) {
      setStatusChangePassword(true);
      setErrorMessage("Mật khẩu mới không khớp!");
    } else {
      const account = await AccountService.putAccount({
        user_id: auth?.userData?._id,
        password: oldPass,
        newPassword: newPass,
      });

      if (!account) {
        setErrorMessage("Mật khẩu sai!");
        setStatusChangePassword(true);
      } else {
        setErrorMessage("Đổi mật khẩu thành công!");
        setStatusChangePassword(true);
        setNewPass("");
        setOldPass("");
        setReNewPass("");
      }
      console.log("account: ", account);
    }
  };

  return (
    <div>
      {" "}
      <h2 className="text-2xl uppercase mb-4">Đổi mật khẩu</h2>
      <p
        className={`${statusChangePassword ? "text-red-600" : ""} text-sm mb-3`}
      >
        {statusChangePassword
          ? errorMessage
          : "Để đảm bảo tính bảo mật bạn vui lòng đặt lại mật khẩu với ít nhất 6 kí tự"}
      </p>
      <div>
        <div className="mb-3 flex flex-col">
          <label className="mb-1" htmlFor="password">
            Mật khẩu cũ *
          </label>
          <input
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            type="password"
            className="border bg-neutral-300 xl:w-2/5 w-full px-4 py-2 text-black outline-none"
            id="password"
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label className="mb-1" htmlFor="newPassword">
            Mật khẩu mới *
          </label>
          <input
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            type="password"
            className="border bg-neutral-300 xl:w-2/5 w-full px-4 py-2 text-black outline-none"
            id="newPassword"
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label className="mb-1" htmlFor="reNewPassword">
            Xác nhận lại mật khẩu *
          </label>
          <input
            onChange={(e) => setReNewPass(e.target.value)}
            type="password"
            value={reNewPass}
            className="border bg-neutral-300 xl:w-2/5 w-full px-4 py-2 text-black outline-none"
            id="reNewPassword"
          />
        </div>
        <button
          onClick={handleChangePassword}
          className="bg-primary text-white text-sm font-bold p-4 py-3 mt-3 hover:bg-white hover:text-primary border border-primary duration-200"
        >
          Đặt lại mật khẩu
        </button>
      </div>
    </div>
  );
};

export default ChangPassword;
