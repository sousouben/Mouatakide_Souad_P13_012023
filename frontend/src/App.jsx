import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import SignIn from "./pages/sign-in/SignIn";
import User from "./pages/user/User";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/profile" element={<User />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
