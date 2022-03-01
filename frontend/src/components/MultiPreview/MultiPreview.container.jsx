import {useState} from "react";
import './MultiPreview.style.scss';
import MultiPreview from "./MultiPreview.component";

const MultiPreviewContainer = ({images = []}) => {
    const [firstImageIndex, setFirstImageIndex] = useState(0);

    const scrollBack = () => setFirstImageIndex((images.length + firstImageIndex - 1) % images.length);

    const scrollForward = () => setFirstImageIndex((firstImageIndex + 1) % images.length);

    return <MultiPreview
        firstImage={images[firstImageIndex]}
        secondImage={images[(firstImageIndex + 1) % images.length]}
        thirdImage={images[(firstImageIndex + 2) % images.length]}
        scrollBack={scrollBack}
        scrollForward={scrollForward}
    />
}

export default MultiPreviewContainer;