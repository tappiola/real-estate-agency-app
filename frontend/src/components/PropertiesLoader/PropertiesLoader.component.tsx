import './PropertiesLoader.style.scss';
import React from 'react';
import { PlaceholderBlock, PlaceholderText } from '../Placeholder';

const PropertiesLoader: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
    const loadersCount = isMobile ? 1 : 3;

    return (
      <>
        {[...Array(loadersCount)].map((_, i) => (
          <div className="PropertiesLoader-Container" key={i}>
            <PlaceholderBlock classes={['PropertiesLoader-Image']} />
            <div className="PropertiesLoader-Info">
              <PlaceholderText />
              <PlaceholderText />
              <PlaceholderText />
            </div>
          </div>
        ))}
      </>
    );
};

export default PropertiesLoader;
