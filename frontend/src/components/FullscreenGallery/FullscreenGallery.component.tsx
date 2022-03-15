import React from 'react';
import ReactDOM from 'react-dom';
import { Image } from '../../types';
import './FullscreenGallery.style.scss';

const FullscreenGallery: React.FC<{
    images: Image[],
    onGalleryClose: () => void
}> = ({
    images,
    onGalleryClose
}) => {
    if (!images.length) {
        return null;
    }

    return (
        ReactDOM.createPortal(
          <div
            className="FullscreenGallery"
            onClick={onGalleryClose}
            role="button"
            tabIndex={-1}
          >
            {images.map((image: Image) => (
              <img
                className="FullscreenGallery-Image"
                key={image.id}
                src={image.link}
                alt="property"
              />
            ))}
            <div className="FullscreenGallery-Close">
              <i className="fa fa-close" />
            </div>
          </div>,
          document.getElementById('fullscreen-gallery')!
        ));
};

export default FullscreenGallery;
