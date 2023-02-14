import "./App.scss";
import Home from "./pages/Home/home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { FlareSharp } from "@mui/icons-material";
import { useContext } from "react";
import {AuthContext} from "./authContext/AuthContext"

function App() {
  const {user}=useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home /> : <Navigate to="/register" />}
        />
      </Routes>
      <Routes>
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
      </Routes>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
      {user && (
        <>
          <Routes>
            <Route path="/movies" element={<Home type="movie" />} />
          </Routes>
          <Routes>
            <Route path="/series" element={<Home type="series" />} />
          </Routes>
          <Routes>
            <Route path="/watch" element={<Watch />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
