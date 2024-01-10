import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Account, Cart, ProductCart, UserTransfer } from "../Types";
import data from "../data/data";

interface ProviderAuthContextProps {
  children: ReactNode;
}

interface AuthValue {
  isLoggedIn: boolean;
  setLoggedIn: any;
  showCart: boolean;
  setShowCart: any;
  cart: Cart | null;
  setCart: any;
  userData: UserTransfer | null;
  setUserData: any;
  listProduct: any;
  setListProduct: any;
}

export const AuthContext = createContext<AuthValue | null>(null);

const ProviderAuthContext = ({ children }: ProviderAuthContextProps) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [listProduct, setListProduct] = useState();
  const [userData, setUserData] = useState<UserTransfer | null>(null);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cart, setCart] = useState<Cart>({
    items: [],
  });
  const auth: AuthValue = {
    isLoggedIn,
    setLoggedIn,
    showCart,
    setShowCart,
    cart,
    setCart,
    userData,
    setUserData,
    listProduct,
    setListProduct,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
export default ProviderAuthContext;
