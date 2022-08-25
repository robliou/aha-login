import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/index.css";

import Header from "./components/Header";
import Root from "./components/Root";
import ChangeName from "./components/ChangeName";

import Login from "./components/Login";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Profile from "./components/Profile";
import UsersOneDay from "./components/UsersOneDay";
import ChangePassword from "./components/ChangePassword";

require("dotenv").config();

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/changename" element={<ChangeName />} />
        <Route path="/home" element={<ProtectedRoute component={Profile} />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/logout/*" element={<Logout />} />
        <Route path="/changepassword/*" element={<ChangePassword />} />
        <Route
          path="/profile/"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route path="/usersOneDay/" element={<UsersOneDay />} />
      </Routes>
    </Router>
  );
}

export default App;
