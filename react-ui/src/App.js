import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/index.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Root from "./components/Root";
import ChangeName from "./components/ChangeName";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./components/Dashboard";
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
        <Route
          path="/home"
          element={<ProtectedRoute component={Dashboard} />}
        />
        <Route path="/changepassword/*" element={<ChangePassword />} />
        <Route
          path="/dashboard/"
          element={<ProtectedRoute component={Dashboard} />}
        />
        <Route path="/usersOneDay/" element={<UsersOneDay />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
