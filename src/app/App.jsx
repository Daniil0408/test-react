import MainPage from "../pages/MainPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import Updatetest from "../features/Edit";
import {Routes, Route} from "react-router-dom";
import React from 'react';

function App() {

    return (
        <>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/login' element={<SignInPage/>}/>
                <Route path='/registration' element={<SignUpPage/>}/>
                <Route path='/post/:idPost/:namePost/:titlePost/:descriptionPost/:persentagePost/:numberPost/:pricePost' element={<Updatetest/>}/>
            </Routes>
        </>
    )
}

export default App