import React, {useCallback, useEffect, useRef, useState, TouchEvent, MouseEvent} from 'react';
import {CarouselComponent as Carousel} from "./Carousel.component";

export const CarouselItem: React.FC = ({children}) => {
    return <>{children}</>;
}

const CarouselContainer: React.FC<{
    autoplay: boolean,
    infinite: boolean,
    slideDuration?: number,
    automaticSlideInterval?: number,
    [styleProp: string]: any
}> = (
    {
        children,
        autoplay = true,
        infinite = false,
        slideDuration = 500,
        automaticSlideInterval = 5000,
        ...style
    }) => {
    const carouselRef = useRef<HTMLDivElement>();
    const slidesRef = useRef<HTMLDivElement>();
    const [carouselWidth, setCarouselWidth] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMouseOver, setIsMouseOver] = useState(false);

    const [ touchStartX, setTouchStartX] = useState<number>(0);

     useEffect(() => setCarouselWidth(carouselRef.current?.offsetWidth || 0), [carouselRef]);

     // In order to support infinite scroll, first and last slides are duplicated
    // We need to take these virtual slides into account when calculate offsets
    const virtualSlidesCount = 2;

    const getLeftOffset = useCallback((slideIndex, moveBy = 0) => {
        return `${carouselWidth * -(slideIndex + virtualSlidesCount / 2) + moveBy}px`;
    }, [carouselWidth]);

    const resetPosition = () => adjustPosition(activeIndex, 0);

    const adjustPosition = useCallback((slideIndex, moveBy = 0) => {
        slidesRef.current!.style.left = getLeftOffset(slideIndex, moveBy);
    }, [getLeftOffset]);

    const addAnimation = useCallback(
        () => slidesRef.current!.style.transition = `left ${slideDuration}ms ease 0s`,
    [slideDuration]);
    const removeAnimation = () => slidesRef.current!.style.transition = 'none';

    // @ts-ignore
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

    const toPrevSlide = useCallback((e?: MouseEvent<HTMLDivElement>) => {
        if (e) {
            e.stopPropagation();
        }

        if (!infinite && activeIndex === 0){
            return
        }
        changeSlide(activeIndex - 1);
    }, [activeIndex, changeSlide, infinite]);

    const toNextSlide = useCallback((e?: MouseEvent<HTMLDivElement>) => {
        if (e) {
            e.stopPropagation();
        }

        if (!infinite && activeIndex === items.length - 1){
            return
        }

        changeSlide(activeIndex + 1);
    }, [activeIndex, changeSlide, infinite, items.length]);

    // Automatic switch between slides
    useEffect(() => {
        if (autoplay && !isMouseOver) {
            const id = setTimeout(() => {
                // @ts-ignore
                toNextSlide();
            }, automaticSlideInterval);

            return () => clearTimeout(id);
        }
    }, [activeIndex, automaticSlideInterval, autoplay, isMouseOver, toNextSlide]);

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        setTouchStartX(e.changedTouches[0]?.clientX);
    }

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        const moveBy = e.changedTouches[0]?.clientX - touchStartX;

        removeAnimation();
        adjustPosition(activeIndex, moveBy);
    };

    const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
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

    const getCarouselWidth = () => (items.length + virtualSlidesCount) * carouselWidth;

    const getIsSlideActive = (index: number) => ((activeIndex + items.length) % items.length) === index;

    const getIsNextArrowDisabled = () => !infinite && activeIndex === items.length - 1;

    const getIsPrevArrowDisabled = () => !infinite && activeIndex === 0;

    return <Carousel
        handleTouchEnd={handleTouchEnd}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        toNextSlide={toNextSlide}
        toPrevSlide={toPrevSlide}
        changeSlide={changeSlide}
        activeIndex={activeIndex}
        getLeftOffset={getLeftOffset}
        setIsMouseOver={setIsMouseOver}
        getCarouselWidth={getCarouselWidth}
        getIsSlideActive={getIsSlideActive}
        getIsNextArrowDisabled={getIsNextArrowDisabled}
        getIsPrevArrowDisabled={getIsPrevArrowDisabled}
        style={style}
        items={items}
        carouselRef={carouselRef}
        slidesRef={slidesRef}
    />
}

export default CarouselContainer;
