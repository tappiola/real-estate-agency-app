import { useState, useEffect, useCallback } from 'react';

const useIsMobile = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    const handleWindowSizeChange = useCallback(() => {
        setWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        console.log('use effect');

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, [handleWindowSizeChange]);

    const isMobile = width <= 810;

    return isMobile;
};

export default useIsMobile;
