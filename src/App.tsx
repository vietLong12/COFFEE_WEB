import { Route, Routes } from "react-router-dom";
import "./App.css";
import { publicLayout } from "./layout/public";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BackToTop from "./components/common/BackToTop";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext";
import { privateLayout } from "./layout/private";
import { useCookies } from "react-cookie";
import { LoginService } from "./service/LoginService";

function App() {
  const auth = useContext(AuthContext);
  // @ts-ignore
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  useEffect(() => {
    if (cookies.token) {
      LoginService.loginAccountByToken(cookies.token).then((res) => {
        auth?.setLoggedIn(true);
        auth?.setUserData({
          username: res.account.username,
          email: res.account.email,
          phone: res.account.phone,
          _id: res.account._id,
          address: res.account.address,
          avatar: res.account.avatar,
        });
      });
    } else {
      auth?.setLoggedIn(false);
    }
  }, []);
  return (
    <div>
      <Header />
      <Routes>
        {!auth?.isLoggedIn
          ? publicLayout.map((route, index) => (
              <Route
                key={index}
                Component={route.element}
                path={route.path}
              ></Route>
            ))
          : privateLayout.map((route, index) => {
              return (
                <Route key={index} Component={route.element} path={route.path}>
                  {route.childRoute.map((child, index) => (
                    <Route
                      key={index}
                      path={child.path}
                      Component={child.element}
                    ></Route>
                  ))}
                </Route>
              );
            })}
      </Routes>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
