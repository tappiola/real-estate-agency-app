import './PropertiesLoader.style.scss';
import React from 'react';

const PropertiesLoader: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
    const loadersCount = isMobile ? 1 : 3;

    return (
      <>
        {[...Array(loadersCount)].map((_, i) => (
          <div className="PropertiesLoader-Container" key={i}>
            <div className="Placeholder PropertiesLoader-Image" />
            <div className="PropertiesLoader-Info">
              <div className="Placeholder Placeholder-Text" />
              <div className="Placeholder Placeholder-Text" />
              <div className="Placeholder Placeholder-Text" />
            </div>
          </div>
        ))}
      </>
    );
};

export default PropertiesLoader;
