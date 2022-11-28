import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Home} from './pages/Home';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';

function App() {

return (
    <div>
    <BrowserRouter>
        <Routes>
            <Route exact path="/" exact element={<Home />}/>
            <Route exact path="/login" exact element={<SignIn />}/>
            <Route exact path="/registration" exact element={<SignUp/>}/>
        </Routes>
    </BrowserRouter>
    </div>
);

}

export default App;

