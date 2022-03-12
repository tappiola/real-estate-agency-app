import React, {
    ReactChild, RefObject, MouseEvent, TouchEventHandler
} from 'react';
import './Carousel.style.scss';
import clsx from 'clsx';

const CarouselComponent: React.FC<{
    handleTouchEnd: TouchEventHandler<HTMLDivElement>,
    handleTouchStart: TouchEventHandler<HTMLDivElement>,
    handleTouchMove: TouchEventHandler<HTMLDivElement>,
    toNextSlide: (e?: MouseEvent<HTMLDivElement>) => void,
    toPrevSlide: (e?: MouseEvent<HTMLDivElement>) => void,
    changeSlide: (index: number) => void,
    activeIndex: number,
    getLeftOffset: (slideIndex: number, moveBy?: number) => string,
    setIsMouseOver: (status: boolean) => void,
    getCarouselWidth: () => number,
    getIsSlideActive: (index: number) => boolean,
    getIsNextArrowDisabled: () => boolean,
    getIsPrevArrowDisabled: () => boolean,
    style: object,
    items: ReactChild[],
    carouselRef : RefObject<HTMLDivElement>,
    slidesRef: RefObject<HTMLDivElement>,
    showIndicators: boolean
}> = (
    {
        handleTouchEnd,
        handleTouchStart,
        handleTouchMove,
        toNextSlide,
        toPrevSlide,
        changeSlide,
        activeIndex,
        getLeftOffset,
        setIsMouseOver,
        getCarouselWidth,
        getIsSlideActive,
        getIsNextArrowDisabled,
        getIsPrevArrowDisabled,
        style,
        items,
        carouselRef,
        slidesRef,
        showIndicators
    }
) => {
    const renderCarouselIndicators = () => {
        if (!showIndicators) {
            return null;
        }

        return (
          <div className={clsx('Carousel-Nav', 'Carousel-Nav_Inner')}>
            { items.length > 1 && items.map((_, index) => (
              <span
                role="button"
                tabIndex={-1}
                className={clsx('Carousel-DotIcon', {
                // Make dot active immediately, including cases with infinite scroll and virtual slides
                    'Carousel-DotIcon_Active': getIsSlideActive(index)
                })}
                key={index}
                onClick={() => changeSlide(index)}
              >
                <i className="fa fa-circle" />
              </span>
            ))}
          </div>
        );
    };

    const renderPrevArrow = () => (
      <div
        onClick={toPrevSlide}
        role="button"
        tabIndex={0}
        className={clsx('Carousel-Arrow', 'Carousel-Arrow_InnerLeft', {
            'Carousel-Arrow_Disabled': getIsPrevArrowDisabled()
        })}
      >
        <i className="fa fa-angle-left" />
      </div>
    );

    const renderNextArrow = () => (
      <div
        onClick={toNextSlide}
        role="button"
        tabIndex={0}
        className={clsx('Carousel-Arrow', 'Carousel-Arrow_InnerRight', {
            'Carousel-Arrow_Disabled': getIsNextArrowDisabled()
        })}
      >
        <i className="fa fa-angle-right" />
      </div>
    );

    const renderCarouselItem = (item: ReactChild, index: number) => (
      <div key={index} className="Carousel-Item">
        {item}
      </div>
    );

    const renderCarouselItems = () => {
        const carouselItems = [items[items.length - 1], ...items, items[0]];

        return (
          <div
            className="Carousel-Items"
            ref={slidesRef}
            style={{
                width: `${getCarouselWidth()}px`,
                left: getLeftOffset(activeIndex),
                height: '100%'
            }}
          >
            {carouselItems.map((item, index) => renderCarouselItem(item, index))}
          </div>
        );
    };

    return (
      <div
        className="Carousel"
        style={{ width: '100%', height: '50%', ...style }}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={carouselRef}
      >
        {renderPrevArrow()}
        {renderCarouselItems()}
        {renderNextArrow()}
        {renderCarouselIndicators()}
      </div>
    );
};

export default CarouselComponent;
