import React from 'react';
import './App.style.scss';
import Register from "./Register";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login";
import HomePage from "./HomePage";
import Wishlist from './Wishlist';
import SearchResults from "./SearchResults";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                {/*<Route path="/">*/}
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/favorites" element={<Wishlist />}/>
                    {/*<Route path="/search&page=:page" element={<SearchResults />}/>*/}
                    <Route path="/search" element={<SearchResults />}/>
                    <Route path="*" element={<p>Not found</p>} />
                {/*</Route>*/}
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
