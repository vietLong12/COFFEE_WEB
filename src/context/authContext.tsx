import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Account, ProductCart, UserTransfer } from "../Types";
import data from "../data/data";

interface ProviderAuthContextProps {
  children: ReactNode;
}

interface AuthValue {
  isLoggedIn: boolean;
  setLoggedIn: any;
  showCart: boolean;
  setShowCart: any;
  cart: ProductCart[] | null;
  setCart: any;
  userData: UserTransfer | null;
  setUserData: any;
}

export const AuthContext = createContext<AuthValue | null>(null);

const ProviderAuthContext = ({ children }: ProviderAuthContextProps) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserTransfer | null>(null);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cart, setCart] = useState<any>([data[1], data[2]]);
  const auth: AuthValue = {
    isLoggedIn,
    setLoggedIn,
    showCart,
    setShowCart,
    cart,
    setCart,
    userData,
    setUserData,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
export default ProviderAuthContext;
