import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import Search from "./pages/search";
import DropDown from "./pages/dropdown";
import "./App.css";

function App() {
  return (
    <div className={"App w-screen h-screen"}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<SignIn />} />
          <Route exact path="/registration" element={<SignUp />} />
          <Route exact path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
