import { Route, Routes } from "react-router-dom";
import "./App.css";
import { baseLayout } from "./layout/base";

function App() {
  return (
    <Routes>
      {baseLayout.map((route, index) => (
        <Route key={+index} Component={route.element} path={route.path}></Route>
      ))}
    </Routes>
  );
}

export default App;
