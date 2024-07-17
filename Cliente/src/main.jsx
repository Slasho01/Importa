import React from "react";
import { Provider } from 'react-redux';
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import { ThemesProvider } from "./contexts/themeContext";
import App from "./App";
import store from './redux/store';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemesProvider>
          <HashRouter>
            <App />
          </HashRouter>
      </ThemesProvider>
    </Provider>
  </React.StrictMode>
);