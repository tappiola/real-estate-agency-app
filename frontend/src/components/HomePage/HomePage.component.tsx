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
                <ContactUs/>
                <div className='Banner3' ref={parallax.ref  as React.RefObject<HTMLDivElement>}/>
            </div>
        </div>
    );
}

export default HomePage;
