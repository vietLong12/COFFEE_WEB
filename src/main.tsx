import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducer/index.ts";
import ProviderAuthContext from "./context/authContext.tsx";

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ProviderAuthContext>
          <App />
        </ProviderAuthContext>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
