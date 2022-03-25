import React from 'react';
import { ParallaxBanner, useParallax } from 'react-scroll-parallax';
import BaseSearchForm from '../../components/BaseSearchForm';
import ContactUs from '../../components/ContactUs';
import './HomePage.style.scss';
import GetInTouch from '../../components/GetInTouch';
import midBanner from './midBanner.png';
import bottomBanner from './bottomBanner.png';
import topBanner from './topBanner.png';
import Puddle from '../../components/Puddle';

const TopBanner: React.FC<{ isMobile: boolean }> = ({ isMobile }) => (
  <ParallaxBanner
    layers={[
        {
            image: topBanner,
            speed: -10
        }
    ]}
    style={{
        width: '100%',
        height: isMobile ? '600px' : '400px'
    }}
  />
);

const MiddleBanner: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
    const style = isMobile ? { width: '100%', order: 2 } : { flex: '1 0 63%', paddingTop: '120px' };

    return (
      <ParallaxBanner
        layers={[
            {
                image: midBanner,
                speed: -10
            }
        ]}
        style={{
            aspectRatio: '4 / 3',
            ...style
        }}
      />
    );
};

const BottomBanner: React.FC<{ isMobile: boolean }> = ({ isMobile }) => (
  <ParallaxBanner
    layers={[
        {
            image: bottomBanner,
            speed: -10
        }
    ]}
    style={{
        aspectRatio: '4 / 3',
        width: isMobile ? '100%' : '63%',
        marginLeft: 'auto'
    }}
  />
);

const HomePage : React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
    const parallax = useParallax({ speed: 7 });

    return (
      <div className="HomePage">
        <TopBanner isMobile={isMobile} />
        <BaseSearchForm />
        <div className="HomePage-Middle">
          <MiddleBanner isMobile={isMobile} />
          <div className="HomePage-AboutUs">
            <h1 className="HomePage-Title">We’re here for every move that you make</h1>
            {/* eslint-disable-next-line max-len */}
            <p className="HomePage-Description">For over 40 years, we’ve been the trusted agent of choice for customers looking for property advice and services within Sheffield, Manchester, Liverpool, Edinburgh and London. Your dedicated and personable teams have expert local knowledge, live within the community and are committed to helping you every step of the way along your property journey.</p>
            {/* eslint-disable-next-line max-len */}
            <p className="HomePage-Description">Looking to buy or to rent?  We&#39;re here to provide you with more information, answer any questions you may have or connect you with the right people to help with your needs. Use our general enquiry form or email to get in touch today.</p>
          </div>
        </div>
        <div className="HomePage-Bottom">
          <div ref={parallax.ref as React.RefObject<HTMLDivElement>}>
            <Puddle />
          </div>
          <ContactUs />
          <BottomBanner isMobile={isMobile} />
          <GetInTouch />
        </div>
      </div>
    );
};

export default HomePage;
