import React from 'react';
import './App.style.scss';
import Register from "../Register";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../Login";
import HomePage from "../HomePage";
import Wishlist from '../Wishlist';
import SearchResults from "../SearchResults";
import Property from "../Property";
import NotFound from "../NotFound";
import Notification from '../Notification';
import {ToastQueueProvider} from '../Toast';

const App = () => {
  return (
      <ToastQueueProvider>
            <div className="App">
                <header className="Header"/>
                <main>
                <BrowserRouter>
                    <Routes>
                            <Route path="/" element={<HomePage />}/>
                            <Route path="/register" element={<Register />}/>
                            <Route path="/login" element={<Login />}/>
                            <Route path="/favorites" element={<Wishlist />}/>
                            <Route path="/search" element={<SearchResults />}/>
                            <Route path="/property/:id" element={<Property />}/>
                            <Route path="*" element={<NotFound/>} />
                    </Routes>
                </BrowserRouter>
                </main>
            </div>
          <Notification />
      </ToastQueueProvider>
  );
}

export default App;
