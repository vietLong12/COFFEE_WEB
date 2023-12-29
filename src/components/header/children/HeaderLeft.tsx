import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import HomePageLogo from "./HomePageLogo";
import { useContext, useState } from "react";
import "animate.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer";
import { showCartAction } from "../../../redux/action/showCart";
import Cart from "./Cart/Cart";
import AccountTopBar from "../../common/AccountTopBar";
import NavBar from "../../menu/NavBar";
import { AuthContext } from "../../../context/authContext";

const HeaderLeft = () => {
  const auth = useContext(AuthContext);
  const cart = useSelector((store: RootState) => store.cart);
  const isLoggedIn = auth?.isLoggedIn;

  const [showSearchInput, setShowSearchInput] = useState(false);
  const showCart = auth?.showCart;
  const [showAccount, setShowAccount] = useState(false);
  const [valueInputSearch, setValueInputSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
    showAccount ? setShowAccount(false) : "";
  };

  const handleAccount = () => {
    setShowAccount(!showAccount);
    showSearchInput ? setShowSearchInput(false) : "";
  };

  const handleSearchProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValueInputSearch("");
    setShowSearchInput(false);
  };

  const handleCart = () => {
    auth?.setShowCart(!auth.showCart);
  };
  const handleSearch = () => {
    navigate("/search?q=" + valueInputSearch);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="xl:w-3/5 mx-auto flex xl:justify-end justify-between items-center py-3 relative">
      <NavBar />
      <HomePageLogo />
      <Link to={"/"} className="xl:hidden text-white font-bold text-sm block ">
        MONSTER <br /> COFFEE
      </Link>
      {/* Search icon */}
      <div className="relative group" onClick={handleSearchInput}>
        <SearchIcon
          sx={{ fontSize: "40px", color: "white", cursor: "pointer" }}
        />

        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white absolute top-12 right-0 p-2 hidden items-center animate__animated animate__bounceIn group-hover:flex before:absolute before:-top-4 before:right-0 before:w-20 before:h-4"
          style={{ animationDuration: ".5s" }}
        >
          <form action="" onSubmit={(e) => handleSearchProduct(e)}>
            <input
              type="text"
              className="focus:outline-none px-2 text-sm"
              placeholder="Tìm kiếm sản phẩm"
              onKeyDown={(event) => handleKeyDown(event)}
              onChange={(e) => setValueInputSearch(e.target.value)}
            />
            <div
              className="absolute top-0 right-0 flex justify-center items-center h-full p-1 cursor-pointer"
              onClick={handleSearch}
            >
              <SearchIcon />
            </div>
          </form>
        </div>
      </div>

      {/* Cart Icon */}
      <div className="relative" onClick={handleCart}>
        <ShoppingCartIcon
          sx={{
            fontSize: "40px",
            color: "white",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        />
        <span className="absolute top-0 right-0 rounded-full text-white bg-primary flex items-center justify-center w-5 h-5 text-xs font-semibold">
          {cart.reduce(
            (accumulator: number, currentValue: { quantity: number }) => {
              return accumulator + currentValue.quantity;
            },
            0
          )}
        </span>

        {showCart ? (
          <div className="bg-black bg-opacity-40 fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center  z-20">
            <div
              className="bg-white lg:w-1/5 absolute top-0 right-0 animate__animated animate__slideInRight h-full"
              style={{ animationDuration: "0.5s" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Cart />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* User icon */}
      {!isLoggedIn ? (
        <div className="relative group" onClick={handleAccount}>
          {" "}
          <PersonIcon
            sx={{
              fontSize: "40px",
              color: "white",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          />
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white absolute xl:top-12 xl:left-4 top-12 right-0 p-2 hidden items-center animate__animated animate__bounceIn  w-32 group-hover:flex before:absolute before:-top-4 before:left-0 before:w-20 before:h-4 "
          >
            <ul>
              <li>
                <Link to="/login">Đăng nhập</Link>
              </li>
              <li>
                <Link to="/register">Đăng ký</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <AccountTopBar />
      )}
    </div>
  );
};

export default HeaderLeft;
