import { register } from "swiper/element";
import Home from "../pages/Home";
import DetailProduct from "../pages/detail-product/DetailProduct";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Introduction from "../pages/introduction";
import News from "../pages/News";
import Contact from "../pages/Contact";
import MenuPage from "../pages/menu/MenuPage";
import Order from "../pages/Order";
import TransactionNotification from "../pages/TransactionNotification";

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
  {
    path: "/detail-product/:slug",
    element: DetailProduct,
  },
  {
    path: "gioi-thieu",
    element: Introduction,
  },
  {
    path: "tin-tuc",
    element: News,
  },
  {
    path: "lien-he",
    element: Contact,
  },
  {
    path: "menu",
    element: MenuPage,
  },
  {
    path: "order",
    element: Order,
  },
  {
    path: "order/alert",
    element: TransactionNotification,
  },
];
