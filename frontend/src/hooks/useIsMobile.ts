import { useEffect, useCallback } from 'react';
import { setIsMobile } from '../store/config';
import { useAppDispatch } from '../store/hooks';

const useIsMobile = () => {
    const dispatch = useAppDispatch();

    const handleWindowSizeChange = useCallback(() => {
        dispatch(setIsMobile(window.innerWidth <= 810));
    }, [dispatch]);

    useEffect(() => {
        handleWindowSizeChange();
    }, [handleWindowSizeChange]);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, [handleWindowSizeChange]);
};

export default useIsMobile;
