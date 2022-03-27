import './App.style.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import NotFound from '../components/NotFound';
import Notification from '../components/Notification';
import { ToastQueueProvider } from '../components/Toast';
import { AdType, Path } from '../constants';
import HeaderComponent from '../components/Header';
import Loader from '../components/Loader';

const Login = React.lazy(() => import('../pages/Login'));
const HomePage = React.lazy(() => import('../pages/HomePage'));
const Property = React.lazy(() => import('../pages/Property'));
const Register = React.lazy(() => import('../pages/Register'));
const SearchResults = React.lazy(() => import('../pages/SearchResults'));
const Wishlist = React.lazy(() => import('../pages/Wishlist'));

const App : React.FC<{ isAuthorized: boolean }> = ({ isAuthorized }) => (
  <ToastQueueProvider>
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <main>
          <Suspense fallback={<Loader />}>
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
          </Suspense>
        </main>
      </BrowserRouter>
    </div>
    <div id="fullscreen-gallery" />
    <Notification />
  </ToastQueueProvider>
);

export default App;
