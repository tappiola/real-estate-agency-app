import React, {ReactChild, RefObject, TouchEvent, MouseEvent} from 'react';
import  './Carousel.style.scss';
import clsx from 'clsx';

export const CarouselComponent: React.FC<{
    handleTouchEnd: (e: TouchEvent<HTMLDivElement>) => void,
    handleTouchStart:  (e: TouchEvent<HTMLDivElement>) => void,
    handleTouchMove: (e: TouchEvent<HTMLDivElement>) => void,
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
    }) => {

    const renderCarouselIndicators = () => {
        if (!showIndicators){
            return null;
        }
        return <div className={clsx('Carousel-Nav', 'Carousel-Nav_Inner')}>
            { items.length > 1 && items.map((_, index) =>
                <span
                    className={clsx('Carousel-DotIcon', {
                        // Make dot active immediately, including cases with infinite scroll and virtual slides
                        'Carousel-DotIcon_Active': getIsSlideActive(index)
                    })}
                    key={index}
                    onClick={() => changeSlide(index)}
                >
                    <i className="fa fa-circle"/>
                </span>
            )}
        </div>
    }

    const renderPrevArrow = () => {
        return <div
            onClick={toPrevSlide}
            className={clsx('Carousel-Arrow', 'Carousel-Arrow_InnerLeft', {
                'Carousel-Arrow_Disabled': getIsPrevArrowDisabled(),
            })}
        >
            <i className="fa fa-angle-left"/>
        </div>
    }

    const renderNextArrow = () => {
        return <div
            onClick={toNextSlide}
            className={clsx('Carousel-Arrow', 'Carousel-Arrow_InnerRight', {
                'Carousel-Arrow_Disabled': getIsNextArrowDisabled(),
            })}
        >
            <i className="fa fa-angle-right"/>
        </div>
    }

    const renderCarouselItems = () => {
        return <div className='Carousel-Items'
                            ref={slidesRef}
                            style={{
                                width: `${getCarouselWidth()}px`,
                                left: getLeftOffset(activeIndex),
                                height: '100%'
                            }}>
            {[items[items.length - 1], ...items, items[0]].map((item, index) =>
                <div key={index} className='Carousel-Item'>{item}</div>
            )}
        </div>
    }

    return <div
        className='Carousel'
        style={{width: '100%', height: '50%', ...style}}
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
}
