import Home from "./pages/home/Home";
import "./app.scss";
import Login from "./pages/login/Login";
import MovieList from "./pages/movieList/MovieList";
import NewProduct from "./pages/newProduct/NewProduct";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useMemo } from "react";
import { Navbar } from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import UserList from "./pages/userList/UserList";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "./context/authContext/AuthContext";
import { PrivateRoute } from "./utils/PrivateRoute";
import Product from "./pages/singleMovie/SingleMovie";
import ListList from "./pages/listList/ListList";
import List from "./pages/singleList/SingleList";
import NewList from "./pages/newList/NewList";

function App() {
  const { user } = useContext(AuthContext);
  // const path="";
  // const [display, setDisplay]=useState(false)
  var display = false;
  const location = useLocation();
  const path = location.pathname;
  display = path !== "/login" ? true : false;
  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
      {/* </Router>
      

      <Router> */}

      {/* {location = useLocation()}
      {  path = location.pathname}
    {path !== "/login" ? setDisplay(true) : setDisplay(false)}*/}
      
        
          {display && user && <Navbar />}

          <div className="container">
            {display && user && <Sidebar />}
            <Routes>
            <Route element={<PrivateRoute/>}>
              <Route path="/">
                <Route index element={<Home />} />

                <Route path="users">
                  <Route index element={<UserList />} />
                  {/* <Route path=":userId" element={<Single />} /> */}
                  {/* <Route
                    path="new"
                    element={<New inputs={userInputs} title="Add New User" />}
                  /> */}
                </Route>
                <Route path="movies">
                  <Route index element={<MovieList/>} />
                  {/* <Route path=":productId" element={<Single />} />
                  <Route
                    path="new"
                    element={
                      <New inputs={productInputs} title="Add New Product" />
                    }
                  /> */}
                  <Route path=":movieId" element={<Product/>}/>
                  <Route path="new" element={<NewProduct/>}/>
                </Route>
                <Route path="lists">
                  <Route index element={<ListList/>} />
                  <Route path=":listId" element={<List/>}/>
                  <Route path="new" element={<NewList/>}/>
                </Route>
              </Route>
              </Route>
            </Routes>
          </div>
      
    </div>
  );
}

export default App;
