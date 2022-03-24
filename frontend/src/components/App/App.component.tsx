import './App.style.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import NotFound from '../NotFound';
import Notification from '../Notification';
import { ToastQueueProvider } from '../Toast';
import { AdType, Path } from '../../constants';
import HeaderComponent from '../Header';
import Loader from '../Loader';

const Login = React.lazy(() => import('../Login'));
const HomePage = React.lazy(() => import('../HomePage'));
const Property = React.lazy(() => import('../Property'));
const Register = React.lazy(() => import('../Register'));
const SearchResults = React.lazy(() => import('../SearchResults'));
const Wishlist = React.lazy(() => import('../Wishlist'));

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
