import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import Search from "./pages/search";
import AddRating from "./pages/addRating"
import DeleteMovie from "./pages/DeleteMovie";
import AddMovie from "./pages/AddMovie";
import DeleteUser from "./pages/DeleteUser";
import DeleteUserReview from "./pages/DeleteUserReview";
import "./App.css";

import {Home} from "./pages/Home";

function App() {
  return (
    <div className={"App w-screen h-screen"}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/add_rating" element={<AddRating />}/>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/login" element={<SignIn />} />
          <Route exact path="/registration" element={<SignUp />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/DeleteMovie" element={<DeleteMovie />} />
          <Route exact path="/AddMovie" element={<AddMovie />} />
          <Route exact path="/DeleteUser" element={<DeleteUser />} />
          <Route exact path="/DeleteUserReview" element={<DeleteUserReview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
