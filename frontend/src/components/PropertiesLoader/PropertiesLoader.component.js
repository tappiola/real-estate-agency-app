import ContentLoader from "react-content-loader";
import React from "react";
import './PropertiesLoader.style.scss';

const PropertiesLoader = () => {
    return <div className='Properties-List'>
        {[...Array(5)].map(() =>   <div className="Loader-Container">  <ContentLoader
            speed={2}
            width={800}
            height={315}
            viewBox="0 0 800 315"
            backgroundColor="#f3f3f3"
            foregroundColor="#b3b3b3"
        >
            <rect x="510" y="15" rx="7" ry="7" width="105" height="24" />
            <rect x="510" y="55" rx="7" ry="7" width="68" height="24" />
            <rect x="0" y="0" rx="0" ry="0" width="495" height="315" />
            <rect x="510" y="95" rx="7" ry="7" width="280" height="20" />
            <rect x="510" y="131" rx="7" ry="7" width="280" height="20" />
        </ContentLoader></div>)}
    </div>
}

export default PropertiesLoader;