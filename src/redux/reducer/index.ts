import { combineReducers } from "redux";
import showCart from "./showCart";
import cart from "./cart";
import account from "./account";
import login from "./login";

const rootReducer = combineReducers({
  showCart: showCart,
  cart: cart,
  account: account,
  login: login,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
