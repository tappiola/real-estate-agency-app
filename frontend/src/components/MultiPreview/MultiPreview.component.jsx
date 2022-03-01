import {useState} from "react";
import './MultiPreview.style.scss';

const MultiPreview = ({images = []}) => {
    const [firstImageIndex, setFirstImageIndex] = useState(0);

    console.log(images);
    return <div className="MultiPreview">
        <img className='PreviewImage1' key={images[firstImageIndex].id} src={images[firstImageIndex].link} alt={'photo' + images[firstImageIndex].id}/>
        <img className='PreviewImage2' key={images[(firstImageIndex + 1) % images.length].id} src={images[(firstImageIndex + 1) % images.length].link} alt={'photo' + images[(firstImageIndex + 1) % images.length].id}/>
        <img className='PreviewImage3' key={images[(firstImageIndex + 2) % images.length].id} src={images[(firstImageIndex + 2) % images.length].link} alt={'photo' + images[(firstImageIndex + 2) % images.length].id}/>
    </div>
}

export default MultiPreview;