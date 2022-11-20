import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import "./App.css"

function App() {

return (
    <div className={"App w-screen h-screen"}>
    <BrowserRouter>
        <Routes>
            <Route exact path="/login" exact element={<SignIn />} />
            <Route exact path="/registration" exact element={<SignUp/>} />
        </Routes>
    </BrowserRouter>
    </div>
);

}

export default App;

