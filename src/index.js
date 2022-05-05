import React, { useState, createContext } from "react";
import { render } from "react-dom";
import "./index.css";
import "bulma/css/bulma.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./states/store";

export const UserContext = createContext();

const Root = () => {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <React.StrictMode>
        <UserContext.Provider value={{ user, setUser }}>
          <Provider store={store}>
           
            <App />
          
            </Provider>
        </UserContext.Provider>
      </React.StrictMode>
    </BrowserRouter>
  );
};

export default render(<Root />, document.getElementById("root"));
