import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/index.css";

import Header from "./components/Header";
import Home from "./components/Home";
import Root from "./components/Root";
import ChangeName from "./components/ChangeName";

import Login from "./components/Login";
import Logout from "./components/Logout";
import UseMgmtAPI from "./components/UseMgmtAPI";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Profile from "./components/Profile";
import UserDashboard from "./components/UserDashboard";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/changename" element={<ChangeName />} />
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/logout/*" element={<Logout />} />
        <Route path="/usemgmtapi/*" element={<UseMgmtAPI />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/userdashboard/" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
