import { Route, Routes } from "react-router-dom";
import "./App.css";
import { baseLayout } from "./layout/base";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BackToTop from "./components/common/BackToTop";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        {baseLayout.map((route, index) => (
          <Route
            key={index}
            Component={route.element}
            path={route.path}
          ></Route>
        ))}
      </Routes>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
