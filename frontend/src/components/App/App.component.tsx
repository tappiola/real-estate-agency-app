import './App.style.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import React from 'react';
import Register from '../Register';
import Login from '../Login';
import HomePage from '../HomePage';
import Wishlist from '../Wishlist';
import SearchResults from '../SearchResults';
import Property from '../Property';
import NotFound from '../NotFound';
import Notification from '../Notification';
import { ToastQueueProvider } from '../Toast';
import { AdType } from '../../constants';
import HeaderComponent from '../Header';

const App : React.FC<{ isAuthorized: boolean }> = ({ isAuthorized }) => (
  <ToastQueueProvider>
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <main>
          <Routes>
            <Route path="/" element={<ParallaxProvider><HomePage /></ParallaxProvider>} />
            {!isAuthorized && <Route path="/register" element={<Register />} />}
            {!isAuthorized && <Route path="/login" element={<Login />} />}
            <Route path="/favorites" element={<Wishlist />} />
            <Route path="/rent" element={<SearchResults adType={AdType.Rent} />} />
            <Route path="/sale" element={<SearchResults adType={AdType.Sale} />} />
            <Route path="/property/:id" element={<Property />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
    <div id="fullscreen-gallery" />
    <Notification />
  </ToastQueueProvider>
);

export default App;
