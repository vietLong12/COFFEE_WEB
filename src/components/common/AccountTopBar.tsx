import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { LoginService } from "../../service/LoginService";
import { useCookies } from "react-cookie";

const AccountTopBar = () => {
  const auth = useContext(AuthContext);
  // @ts-ignore
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);

  const handleLogout = async () => {
    if (auth?.userData?.email) {
      // @ts-ignore
      const logout = await LoginService.logoutAccount({
        email: auth?.userData?.email,
      });
    }
    auth?.setLoggedIn(false);
    removeCookies("token");
  };
  return (
    <div className="relative group ml-4">
      <img
        src={
          auth?.userData?.avatar === "https://bom.so/l6xbjc"
            ? "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
            : auth?.userData?.avatar
        }
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
            <Link to={"/"} onClick={handleLogout}>
              Đăng xuất
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountTopBar;
