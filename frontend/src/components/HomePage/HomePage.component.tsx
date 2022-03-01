import React from 'react';
import CitiesSelect from "../BaseSearchForm";
import ContactUs from "../ContactUs";
import './Header.style.scss';
import {useParallax} from "react-scroll-parallax";

function HomePage() {
    const parallax = useParallax({
        speed: -10,
    });

    return (
        <div className="HomePage">
            <div className='TopBanner'/>
            <CitiesSelect/>
            <div className='MidBanner' ref={parallax.ref  as React.RefObject<HTMLDivElement>}/>
            <div className="HomePage-Bottom">
                <svg className="PuddleShape" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#308291" d="M35.1,-28.5C48.1,-22.2,62.9,-11.1,66,3.1C69.1,17.3,60.4,34.5,47.5,50C34.5,65.5,17.3,79.3,1.9,77.3C-13.4,75.4,-26.7,57.8,-37.6,42.2C-48.6,26.7,-57,13.4,-58.1,-1C-59.1,-15.5,-52.8,-30.9,-41.8,-37.2C-30.9,-43.5,-15.5,-40.6,-2.2,-38.4C11.1,-36.2,22.2,-34.7,35.1,-28.5Z" transform="translate(100 100)" />
                </svg>
                <ContactUs/>
                <div className='Banner3' ref={parallax.ref  as React.RefObject<HTMLDivElement>}/>
            </div>
        </div>
    );
}

export default HomePage;
