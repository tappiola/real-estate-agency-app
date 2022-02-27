import React from 'react';
import CitiesSelect from "../BaseSearchForm";
import ContactUs from "../ContactUs";
import './Header.style.scss';

function App() {
    return (
        <>
            <div className='TopBanner'></div>
            <CitiesSelect/>
            <ContactUs/>
        </>
    );
}

export default App;
