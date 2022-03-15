import React, {
    useCallback, useEffect, useRef, useState, MouseEvent, ReactChild, ReactElement, TouchEventHandler, useMemo
} from 'react';
import Carousel from './Carousel.component';

export const CarouselItem: React.FC<{ children: ReactElement }> = ({ children }) => children;

const CarouselContainer: React.FC<{
    autoplay?: boolean,
    infinite?: boolean,
    showIndicators?: boolean,
    slideDuration?: number,
    automaticSlideInterval?: number,
    changeHandler?: (index: number) => void,
    initialIndex?: number,
    [styleProp: string]: any
}> = (
    {
        children,
        autoplay = false,
        infinite = false,
        showIndicators = true,
        slideDuration = 500,
        automaticSlideInterval = 5000,
        initialIndex = 0,
        changeHandler,
        ...style
    }
) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<HTMLDivElement>(null);
    const [carouselWidth, setCarouselWidth] = useState(0);
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const [isMouseOver, setIsMouseOver] = useState(false);

    const [touchStartX, setTouchStartX] = useState<number>(0);

    const updateWidth = useCallback(() => setCarouselWidth(carouselRef.current!.offsetWidth), []);

    useEffect(updateWidth, []);

    useEffect(() => {
        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    // In order to support infinite scroll, first and last slides are duplicated
    // We need to take these virtual slides into account when calculate offsets
    const virtualSlidesCount = 2;

    const getLeftOffset = useCallback(
        (slideIndex, moveBy = 0) => `${carouselWidth * -(slideIndex + virtualSlidesCount / 2) + moveBy}px`,
        [carouselWidth]
    );

    const adjustPosition = useCallback((slideIndex, moveBy = 0) => {
        slidesRef.current!.style.left = getLeftOffset(slideIndex, moveBy);
    }, [getLeftOffset]);

    const resetPosition = useCallback(() => adjustPosition(activeIndex, 0), [activeIndex, adjustPosition]);

    const addAnimation = useCallback(
        () => { slidesRef.current!.style.transition = `left ${slideDuration}ms ease 0s`; },
        [slideDuration]
    );
    const removeAnimation = useCallback(() => { slidesRef.current!.style.transition = 'none'; }, []);

    const items: ReactChild[] = React.Children.toArray(children)
        .map((child) => child as ReactElement)
        .filter((child) => child.type === CarouselItem);

    const changeSlide = useCallback((newSlideIndex) => {
        addAnimation();
        adjustPosition(newSlideIndex);

        const realNewIndex = (newSlideIndex + items.length) % items.length;

        setActiveIndex(newSlideIndex);

        if (changeHandler) {
            changeHandler(newSlideIndex);
        }

        if (realNewIndex !== newSlideIndex) {
            setTimeout(() => {
                removeAnimation();
                setActiveIndex(realNewIndex);

                if (changeHandler) {
                    changeHandler(newSlideIndex);
                }
            }, slideDuration);
        }
    }, [addAnimation, adjustPosition, changeHandler, items.length, removeAnimation, slideDuration]);

    const toPrevSlide = useCallback((e?: MouseEvent<HTMLDivElement>) => {
        if (e) {
            e.stopPropagation();
        }

        if (!infinite && activeIndex === 0) {
            return;
        }
        changeSlide(activeIndex - 1);
    }, [activeIndex, changeSlide, infinite]);

    const toNextSlide = useCallback((e?: MouseEvent<HTMLDivElement>) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (!infinite && activeIndex === items.length - 1) {
            return;
        }

        changeSlide(activeIndex + 1);
    }, [activeIndex, changeSlide, infinite, items.length]);

    // Automatic switch between slides
    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (autoplay && !isMouseOver) {
            const id = setTimeout(() => {
                toNextSlide();
            }, automaticSlideInterval);

            return () => clearTimeout(id);
        }
    }, [activeIndex, automaticSlideInterval, autoplay, isMouseOver, toNextSlide]);

    const handleTouchStart: TouchEventHandler<HTMLDivElement> = useCallback((e) => {
        setTouchStartX(e.changedTouches[0]?.clientX);
    }, []);

    const handleTouchMove: TouchEventHandler<HTMLDivElement> = useCallback((e) => {
        const moveBy = e.changedTouches[0]!.clientX - touchStartX;

        removeAnimation();
        adjustPosition(activeIndex, moveBy);
    }, [activeIndex, adjustPosition, touchStartX]);

    const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const moveBy = touchEndX - touchStartX;

        // Don't react on screen taps
        if (moveBy === 0) {
            return;
        }

        // Decide if we want to switch slide after swipe ended
        if (Math.abs(moveBy) >= carouselWidth * 0.35) {
            if (moveBy < 0) {
                toNextSlide();
            } else {
                toPrevSlide();
            }
        } else {
            // Restore slide position
            addAnimation();
            resetPosition();
        }
    };

    const carouselItemsWidth = useMemo(
        () => (items.length + virtualSlidesCount) * carouselWidth,
        [carouselWidth, items.length]
    );

    const getIsSlideActive = (index: number) => ((activeIndex + items.length) % items.length) === index;

    const isNextArrowDisabled = useMemo(
        () => !infinite && activeIndex === items.length - 1,
        [activeIndex, infinite, items.length]
    );

    const isPrevArrowDisabled = useMemo(() => !infinite && activeIndex === 0, [activeIndex, infinite]);

    return (
      <Carousel
        handleTouchEnd={handleTouchEnd}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        toNextSlide={toNextSlide}
        toPrevSlide={toPrevSlide}
        changeSlide={changeSlide}
        activeIndex={activeIndex}
        getLeftOffset={getLeftOffset}
        setIsMouseOver={setIsMouseOver}
        carouselItemsWidth={carouselItemsWidth}
        getIsSlideActive={getIsSlideActive}
        isNextArrowDisabled={isNextArrowDisabled}
        isPrevArrowDisabled={isPrevArrowDisabled}
        style={style}
        items={items}
        carouselRef={carouselRef}
        slidesRef={slidesRef}
        showIndicators={showIndicators}
      />
    );
};

export default React.memo(CarouselContainer);
