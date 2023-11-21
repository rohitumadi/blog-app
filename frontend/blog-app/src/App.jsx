import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "reactstrap";
import Base from "./components/Base";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Services from "./pages/Services";
import UserDashboard from "./pages/user-routes/UserDashboard";
import Privateroute from "./components/Privateroute";
import ProfileInfo from "./pages/user-routes/UserInfo";
import UserInfo from "./pages/user-routes/UserInfo";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import UserProvider from "./context/UserProvider";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/posts/:postId" element={<PostPage />} />
            <Route path="/user" element={<Privateroute />}>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="user-info" element={<UserInfo />} />
            </Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
