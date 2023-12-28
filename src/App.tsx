import { Route, Routes } from "react-router-dom";
import "./App.css";
import { publicLayout } from "./layout/public";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BackToTop from "./components/common/BackToTop";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { privateLayout } from "./layout/private";

const AccountInfo = () => {
  return <h1>Account Info</h1>;
};

const MyOrder = () => {
  return <h1>Order Info</h1>;
};

const ChangePassword = () => {
  return <h1>Doi mat khau</h1>;
};

const MyAddress = () => {
  return <h1>So lien lac</h1>;
};

function App() {
  const auth = useContext(AuthContext);

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
