  import React, {RefObject} from "react";
  import './PropertiesList.style.scss';
  import PropertyCardContainer from "../PropertyCard";
  import PropertiesLoader from "../PropertiesLoader/PropertiesLoader.component";
  import {Property} from "../../types";
  import {Carousel, CarouselItem} from "../Carousel";

  const PropertiesList: React.FC<{properties: Property[], isLoading: boolean, listRef: RefObject<HTMLDivElement>, scrollListener: () => void, changeListener: (index: number) => void, isMobile: boolean}>
      = ({properties, isLoading, listRef, scrollListener, changeListener, isMobile}) => {

    if(isLoading){
      return <PropertiesLoader/>
    }

    if(!properties.length){
      return null;
    }

    if (isMobile){
      return <div className='Properties-List' ref={listRef}>
        <Carousel width="100vw" height="50vw" autoplay={false} showIndicators={false} changeHandler={changeListener}>
        { properties.map((property, index) =>(
            <CarouselItem key={index}>
              <PropertyCardContainer
                property={property}
                index={index}
            />
        </CarouselItem>))}
        </Carousel>
      </div>
    }

    return <div className='Properties-List' ref={listRef} onScroll={scrollListener}>
      { properties.map((property, index) => <PropertyCardContainer
          key={index}
          property={property}
          index={index}
      />)}
        </div>
  }

  export default PropertiesList;