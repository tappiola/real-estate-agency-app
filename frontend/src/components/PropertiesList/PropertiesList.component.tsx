  import React, {RefObject} from "react";
  import './PropertiesList.style.scss';
  import PropertyCardContainer from "../PropertyCard";
  import PropertiesLoader from "../PropertiesLoader/PropertiesLoader.component";
  import {Property} from "../../types";
  import {Carousel, CarouselItem} from "../Carousel";

  const PropertiesList: React.FC<{properties: Property[], isLoading: boolean, listRef: RefObject<HTMLDivElement>, scrollListener: () => void, changeListener: (index: number) => void, isMobile: boolean, activeProperty: number, searchKey: string}>
      = ({properties, isLoading, listRef, scrollListener, changeListener, isMobile, activeProperty, searchKey}) => {

    if(isLoading){
      return <PropertiesLoader/>
    }

    if(!properties.length){
      return null;
    }

    if (isMobile){
      return <div className='Properties-List' ref={listRef}>
        <Carousel key={searchKey} width="100vw" height="50vw" autoplay={false} showIndicators={false} changeHandler={changeListener} initialIndex={activeProperty}>
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