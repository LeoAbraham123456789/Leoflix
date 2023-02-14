import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Router } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { MovieContextProvider } from "./context/movieContext/MovieContext";
import { ListContextProvider } from "./context/listContext/ListContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <MovieContextProvider>
          <ListContextProvider>
            <App />
          </ListContextProvider>
        </MovieContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
