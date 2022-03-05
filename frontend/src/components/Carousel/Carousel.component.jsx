import React from 'react';
import  './Carousel.style.scss';
import clsx from 'clsx';
import ChevronIcon from "../ChevronIcon";
import {Direction} from "../ChevronIcon/ChevronIcon.config";

export const CarouselComponent = (
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
        slidesRef
    }) => {

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
        <div
            onClick={toPrevSlide}
            className={clsx('Carousel-Arrow', 'Carousel-Arrow_InnerLeft', {
                'Carousel-Arrow_Disabled': getIsPrevArrowDisabled(),
            })}
        >
            <i className="fa fa-angle-left"/>
            {/*<ChevronIcon direction={Direction.Left}/>*/}
        </div>


        <div className='Carousel-Items'
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

        <div
            onClick={toNextSlide}
            className={clsx('Carousel-Arrow', 'Carousel-Arrow_InnerRight', {
                'Carousel-Arrow_Disabled': getIsNextArrowDisabled(),
            })}
        >
            <i className="fa fa-angle-right"/>
            {/*<ChevronIcon/>*/}
        </div>

        <div className={clsx('Carousel-Nav', 'Carousel-Nav_Inner')}>
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
    </div>
}
