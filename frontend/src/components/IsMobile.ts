import { useState, useEffect } from 'react';

export const useIsMobile = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 810;

    return isMobile;
}
