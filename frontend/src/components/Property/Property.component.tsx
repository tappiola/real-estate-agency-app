import {Property as PropertyType} from '../../types';
import React, {useEffect, useRef} from "react";
import ToggleWishlist from "../ToggleWishlist";
import MultiPreview from "../MultiPreview";
import {getFullTitle, sortByKey} from "../../util";
import './Property.style.scss';

const Property: React.FC<{property: PropertyType, isInWishlist: boolean}> = ({property, isInWishlist}) => {
    const descRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (descRef.current) {
            descRef.current.innerHTML = property.title;
        }
    }, [descRef.current, descRef]);

    return (
        <div className="Property-Container">
            <MultiPreview images={sortByKey(property.images, 'position')}/>
            <h1>{getFullTitle(property)}</h1>
            <div className='Property-Description' ref={descRef}>{property.title}</div>
            <ToggleWishlist property={property} inWishlist={isInWishlist}/>
        </div>
    );
}

export default Property;