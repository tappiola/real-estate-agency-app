import './App.style.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { AdType, Path } from '../../constants';
import HeaderComponent from '../Header';

const App : React.FC<{ isAuthorized: boolean }> = ({ isAuthorized }) => (
  <ToastQueueProvider>
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <main>
          <Routes>
            <Route path={Path.HomePage} element={<HomePage />} />
            {!isAuthorized && <Route path={Path.Register} element={<Register />} />}
            {!isAuthorized && <Route path={Path.Login} element={<Login />} />}
            <Route path={Path.Wishlist} element={<Wishlist />} />
            <Route path={Path.PropertiesToRent} element={<SearchResults adType={AdType.Rent} />} />
            <Route path={Path.PropertiesForSale} element={<SearchResults adType={AdType.Sale} />} />
            <Route path={`${Path.Property}/:id`} element={<Property />} />
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
