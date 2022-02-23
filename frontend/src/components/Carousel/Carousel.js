import React, {useCallback, useEffect, useRef, useState} from 'react';
import  './Carousel.style.scss';
import clsx from 'clsx';

export const CarouselItem = ({children}) => {
    return <>{children}</>;
}

export const Carousel = (
    {
        children,
        autoplay = true,
        infinite = false,
        slideDuration = 500,
        automaticSlideInterval = 5000,
        ...style
    }) => {
    const carouselRef = useRef();
    const slidesRef = useRef();
    const [carouselWidth, setCarouselWidth] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMouseOver, setIsMouseOver] = useState(false);

    const [ touchStartX, setTouchStartX] = useState(null);

     useEffect(() => setCarouselWidth(carouselRef.current?.offsetWidth || 0), [carouselRef]);

     // In order to support infinite scroll, first and last slides are duplicated
    // We need to take these virtual slides into account when calculate offsets
    const virtualSlidesCount = 2;

    const getLeftOffset = useCallback((slideIndex, moveBy = 0) => {
        return `${carouselWidth * -(slideIndex + virtualSlidesCount / 2) + moveBy}px`;
    }, [carouselWidth]);

    const resetPosition = () => adjustPosition(activeIndex, 0);

    const adjustPosition = useCallback((slideIndex, moveBy = 0) => {
        slidesRef.current.style.left = getLeftOffset(slideIndex, moveBy);
    }, [getLeftOffset]);

    const addAnimation = useCallback(
        () => slidesRef.current.style.transition = `left ${slideDuration}ms ease 0s`,
    [slideDuration]);
    const removeAnimation = () => slidesRef.current.style.transition = 'none';

    const items = React.Children.toArray(children).filter(child => child.type === CarouselItem);

    const changeSlide = useCallback(newSlideIndex => {

        addAnimation();
        adjustPosition(newSlideIndex);

        let realNewIndex = (newSlideIndex + items.length) % items.length;

        setActiveIndex(newSlideIndex);

        if (realNewIndex !== newSlideIndex){
             setTimeout(() => {
                removeAnimation();
                setActiveIndex(realNewIndex);
            }, slideDuration);
        }
    }, [addAnimation, adjustPosition, items.length, slideDuration]);

    const toPrevSlide = useCallback((e) => {
        e.stopPropagation();

        if (!infinite && activeIndex === 0){
            return
        }
        changeSlide(activeIndex - 1);
    }, [activeIndex, changeSlide, infinite]);

    const toNextSlide = useCallback((e) => {
        e.stopPropagation();

        if (!infinite && activeIndex === items.length - 1){
            return
        }
        changeSlide(activeIndex + 1);
    }, [activeIndex, changeSlide, infinite, items.length]);

    // Automatic switch between slides
    useEffect(() => {
        if (autoplay && !isMouseOver) {
            const id = setTimeout(() => {
                toNextSlide();
            }, automaticSlideInterval);

            return () => clearTimeout(id);
        }
    }, [activeIndex, automaticSlideInterval, autoplay, isMouseOver, toNextSlide]);

    const handleTouchStart = (e) => {
        setTouchStartX(e.changedTouches[0]?.clientX);
    }

    const handleTouchMove = (e) => {
        const moveBy = e.changedTouches[0]?.clientX - touchStartX;

        removeAnimation();
        adjustPosition(activeIndex, moveBy);
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const moveBy = touchEndX - touchStartX;

        // Don't react on screen taps
        if(moveBy === 0){
            return;
        }

        // Decide if we want to switch slide after swipe ended
        if (Math.abs(moveBy) >= carouselWidth * 0.35) {
            if (moveBy < 0) {
                toNextSlide();
            }
            else {
                toPrevSlide();
            }
        }
        else {
            // Restore slide position
            addAnimation();
            resetPosition();
        }
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
        <div
            onClick={toPrevSlide}
            className={clsx('Carousel-Arrow', 'Carousel-Arrow_InnerLeft', {
                'Carousel-Arrow_Disabled': !infinite && activeIndex === 0,
            })}
        >
            <i className="fa fa-angle-left"/>
        </div>


        <div className='Carousel-Items'
             ref={slidesRef}
             style={{
                 width: `${(items.length + virtualSlidesCount) * carouselWidth}px`,
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
                'Carousel-Arrow_Disabled': !infinite && activeIndex === items.length - 1,
            })}
        >
            <i className="fa fa-angle-right"/>
        </div>

        <div className={clsx('Carousel-Nav', 'Carousel-Nav_Inner')}>
            { items.length > 1 && items.map((_, index) =>
                <span
                    className={clsx('Carousel-DotIcon', {
                        // Make dot active immediately, including cases with infinite scroll and virtual slides
                        'Carousel-DotIcon_Active': ((activeIndex + items.length) % items.length) === index
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
