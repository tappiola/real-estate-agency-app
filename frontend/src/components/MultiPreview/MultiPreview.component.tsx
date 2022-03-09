import React from 'react';
import './MultiPreview.style.scss';
import ChevronIcon from '../ChevronIcon';
import { Direction } from '../ChevronIcon/ChevronIcon.config';
import { Image } from '../../types';
import { IMAGE_PLACEHOLDER } from '../../constants';

const MultiPreview: React.FC<{
    firstImage: Image,
    secondImage: Image,
    thirdImage: Image,
    scrollBack: () => void,
    scrollForward: () => void
}> = ({
    firstImage, secondImage, thirdImage, scrollBack, scrollForward
}) => (
  <div className="Preview-Container">
    <div onClick={scrollBack}>
      <ChevronIcon direction={Direction.Left} />
    </div>
    <div className="Preview-Images">
      <img className="Preview-Image1" src={firstImage?.link || IMAGE_PLACEHOLDER} alt="photo1" />
      <img className="Preview-Image2" src={secondImage?.link || IMAGE_PLACEHOLDER} alt="photo2" />
      <img className="Preview-Image3" src={thirdImage?.link || IMAGE_PLACEHOLDER} alt="photo3" />
    </div>
    <div onClick={scrollForward}>
      <ChevronIcon />
    </div>
  </div>
);

export default MultiPreview;
