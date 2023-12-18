import { register } from "swiper/element";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

interface TBaseLayout {
  path: string;
  element: React.FC;
}

export const baseLayout: TBaseLayout[] = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/register",
    element: Register,
  },
  
];
