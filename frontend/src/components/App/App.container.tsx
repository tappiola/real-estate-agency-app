import './App.style.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCities, getPropertyTypes } from '../../store/referenceData';
import App from './App.component';
import useIsMobile from '../../hooks/useIsMobile';

const AppContainer = () => {
    const { isAuthorized } = useAppSelector(({ user }) => user);

    const dispatch = useAppDispatch();

    useIsMobile();

    useEffect(() => {
        dispatch(getCities());
        dispatch(getPropertyTypes());
    }, [dispatch]);

    return <App isAuthorized={isAuthorized} />;
};

export default AppContainer;
