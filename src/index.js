import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from 'react-router-dom';
import "core-js";
import App from "./App";
import store from "./store";
import { AuthContextProvider } from "./contexts/authContext";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AuthContextProvider>
  </Provider>
);
