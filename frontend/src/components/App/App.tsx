import React, {useEffect} from 'react';
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
import {AdType} from "../../constants";
import HeaderComponent from "../Header";
import { refreshTokenIfExpired } from '../../redux/User';
import {useAppSelector} from "../../redux/store";
import { ParallaxProvider } from 'react-scroll-parallax';

const App = () => {
    // @ts-ignore
    useEffect(() => refreshTokenIfExpired(), []);

    const { isAuthorized } = useAppSelector(({ user }) => user);

  return (
      <ToastQueueProvider>
            <div className="App">
                <BrowserRouter>
                    <HeaderComponent/>
                    <main>
                    <Routes>
                            <Route path="/" element={<ParallaxProvider><HomePage /></ParallaxProvider>}/>
                            <Route path="/register" element={<Register />}/>
                            {!isAuthorized && <Route path="/login" element={<Login />}/>}
                            <Route path="/favorites" element={<Wishlist />}/>
                            <Route path="/rent" element={<SearchResults adType={AdType.Rent}/>}/>
                            <Route path="/sale" element={<SearchResults adType={AdType.Sale}/>}/>
                            <Route path="/property/:id" element={<Property />}/>
                            <Route path="*" element={<NotFound/>} />
                    </Routes>
                    </main>
                </BrowserRouter>

            </div>
          <Notification />
      </ToastQueueProvider>
  );
}

export default App;
