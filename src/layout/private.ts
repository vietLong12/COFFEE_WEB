import Home from "../pages/Home";
import DetailProduct from "../pages/detail-product/DetailProduct";
import Introduction from "../pages/Introduction";
import News from "../pages/News";
import Contact from "../pages/Contact";
import MenuPage from "../pages/menu/MenuPage";
import Order from "../pages/Order";
import TransactionNotification from "../pages/TransactionNotification";
import Account from "../pages/Account";
import NotFound from "../pages/NotFound";
import AccountInfo from "../components/Account/AccountInfo";
import MyOrder from "../components/Account/MyOrder";
import ChangPassword from "../components/Account/ChangPassword";
import MyAddress from "../components/Account/MyAddress";
import SearchPage from "../pages/SearchPage";
import DetailOrder from "../components/Account/DetailOrder";

interface TBaseLayout {
  path: string;
  element: React.FC;
  childRoute: any[];
}

export const privateLayout: TBaseLayout[] = [
  {
    path: "/",
    element: Home,
    childRoute: [],
  },

  {
    path: "/detail-product/:slug",
    element: DetailProduct,
    childRoute: [],
  },
  {
    path: "gioi-thieu",
    element: Introduction,
    childRoute: [],
  },
  {
    path: "tin-tuc",
    element: News,
    childRoute: [],
  },
  {
    path: "lien-he",
    element: Contact,
    childRoute: [],
  },
  {
    path: "menu",
    element: MenuPage,
    childRoute: [],
  },
  {
    path: "order",
    element: Order,
    childRoute: [],
  },
  {
    path: "order/alert",
    element: TransactionNotification,
    childRoute: [],
  },
  {
    path: "/search",
    element: SearchPage,
    childRoute: [],
  },
  {
    path: "/account",
    element: Account,
    childRoute: [
      { path: "", element: AccountInfo },
      { path: "don-hang", element: MyOrder },
      { path: "doi-mat-khau", element: ChangPassword },
      { path: "so-dia-chi", element: MyAddress },
      { path: "don-hang/:slug", element: DetailOrder },
    ],
  },
  {
    path: "*",
    element: NotFound,
    childRoute: [],
  },
];
