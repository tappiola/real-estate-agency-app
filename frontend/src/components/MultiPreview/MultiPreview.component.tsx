import React from "react";
import './MultiPreview.style.scss';
import ChevronIcon from "../ChevronIcon";
import {Direction} from "../ChevronIcon/ChevronIcon.config";
import {Image} from "../../types";

const MultiPreview: React.FC<{
    firstImage: Image,
    secondImage: Image,
    thirdImage: Image,
    scrollBack: () => void,
    scrollForward: () => void
}> = ({firstImage, secondImage, thirdImage, scrollBack, scrollForward }) => {

    return <div className="Preview-Container">
        <div onClick={scrollBack}>
            <ChevronIcon direction={Direction.Left}/>
        </div>
        <div className="Preview-Images">
            <img className='Preview-Image1' key={firstImage.id} src={firstImage.link} alt={'photo' + firstImage.id}/>
            <img className='Preview-Image2' key={secondImage.id} src={secondImage.link} alt={'photo' + secondImage.id}/>
            <img className='Preview-Image3' key={thirdImage.id} src={thirdImage.link} alt={'photo' + thirdImage.id}/>
        </div>
        <div onClick={scrollForward}>
            <ChevronIcon/>
        </div>
    </div>
}

export default MultiPreview;