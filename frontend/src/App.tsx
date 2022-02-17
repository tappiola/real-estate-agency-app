import React from 'react';
import './App.css';
import Register from "./Register";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login";
import HomePage from "./HomePage";
import Wishlist from './Wishlist';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/wishlist" element={<Wishlist />}/>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
