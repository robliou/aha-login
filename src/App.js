import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/index.css";

import Header from "./components/Header";
import Home from "./components/Home";
import Root from "./components/Root";

import Login from "./components/Login";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/logout/*" element={<Logout />} />
        <Route path="/profile/*" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
