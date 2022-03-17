import { ParallaxBanner } from 'react-scroll-parallax';
import BaseSearchForm from '../BaseSearchForm';
import ContactUs from '../ContactUs';
import './HomePage.style.scss';
import GetInTouch from '../GetInTouch';
import midBanner from './midBanner.png';
import bottomBanner from './bottomBanner.png';
import topBanner from './topBanner.png';
import useIsMobile from '../IsMobile';

const HomePage = () => {
    const isMobile = useIsMobile();

    return (
      <div className="HomePage">
        <ParallaxBanner
          layers={[
              {
                  image: topBanner,
                  speed: -10
              }
          ]}
          style={{ width: '100%', height: isMobile ? '600px' : '400px' }}
        />
        <BaseSearchForm />
        <ParallaxBanner
          layers={[
              {
                  image: midBanner,
                  speed: -10
              }
          ]}
          style={{ aspectRatio: '4 / 3', width: isMobile ? '100%' : '63%', marginTop: '200px' }}
        />
        <div className="HomePage-Bottom">
          <svg className="PuddleShape" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#308291"
              d="M35.1,-28.5C48.1,-22.2,62.9,-11.1,66,3.1C69.1,17.3,60.4,34.5,47.5,50C34.5,65.5,17.3,79.3,1.9,77.3C-13.4,75.4,-26.7,57.8,-37.6,42.2C-48.6,26.7,-57,13.4,-58.1,-1C-59.1,-15.5,-52.8,-30.9,-41.8,-37.2C-30.9,-43.5,-15.5,-40.6,-2.2,-38.4C11.1,-36.2,22.2,-34.7,35.1,-28.5Z"
              transform="translate(100 100)"
            />
          </svg>
          <ContactUs />
          <ParallaxBanner
            layers={[
                {
                    image: bottomBanner,
                    speed: -10
                }
            ]}
            style={{ aspectRatio: '4 / 3', width: isMobile ? '100%' : '63%', marginLeft: 'auto' }}
          />
          <GetInTouch />
        </div>
      </div>
    );
};

export default HomePage;
