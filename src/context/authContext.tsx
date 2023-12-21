import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface ProviderAuthContextProps {
  children: ReactNode;
}

interface AuthValue {
  isLoggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthValue | null>(null);
const ProviderAuthContext = ({ children }: ProviderAuthContextProps) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const auth: AuthValue = {
    isLoggedIn,
    setLoggedIn,
    showCart,
    setShowCart,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
export default ProviderAuthContext;
