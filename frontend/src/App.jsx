import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
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
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
