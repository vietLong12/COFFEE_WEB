import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { ProductCart } from "../Types";
import data from "../data/data";

interface ProviderAuthContextProps {
  children: ReactNode;
}

interface AuthValue {
  isLoggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  cart: ProductCart[] | null;
  setCart: Dispatch<SetStateAction<Partial<ProductCart[]>>> | null;
}

export const AuthContext = createContext<AuthValue | null>(null);
const ProviderAuthContext = ({ children }: ProviderAuthContextProps) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cart, setCart] = useState<any>([data[1],data[2]]);
  const auth: AuthValue = {
    isLoggedIn,
    setLoggedIn,
    showCart,
    setShowCart,
    cart,
    setCart,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
export default ProviderAuthContext;
