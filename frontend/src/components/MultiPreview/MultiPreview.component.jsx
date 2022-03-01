import {useState} from "react";
import './MultiPreview.style.scss';
import ChevronIcon from "../ChevronIcon";
import {Direction} from "../ChevronIcon/ChevronIcon.config";

const MultiPreview = ({images = []}) => {
    const [firstImageIndex, setFirstImageIndex] = useState(0);

    const scrollBack = () => setFirstImageIndex((images.length + firstImageIndex - 1) % images.length);

    const scrollForward = () => setFirstImageIndex((firstImageIndex + 1) % images.length);

    return <div className="Preview-Container">
        <div onClick={scrollBack}>
            <ChevronIcon direction={Direction.Left}/>
        </div>
        <div className="Preview-Images">
            <img className='Preview-Image1' key={images[firstImageIndex].id} src={images[firstImageIndex].link} alt={'photo' + images[firstImageIndex].id}/>
            <img className='Preview-Image2' key={images[(firstImageIndex + 1) % images.length].id} src={images[(firstImageIndex + 1) % images.length].link} alt={'photo' + images[(firstImageIndex + 1) % images.length].id}/>
            <img className='Preview-Image3' key={images[(firstImageIndex + 2) % images.length].id} src={images[(firstImageIndex + 2) % images.length].link} alt={'photo' + images[(firstImageIndex + 2) % images.length].id}/>
        </div>
        <div onClick={scrollForward}>
            <ChevronIcon/>
        </div>
    </div>
}

export default MultiPreview;