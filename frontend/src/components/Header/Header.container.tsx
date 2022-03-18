import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useMemo, useState } from 'react';
import { AdType, ToastTypes } from '../../constants';
import './Header.style.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUser } from '../../redux/user';
import Header from './Header.component';
import { enqueueToast } from '../../redux/notifier';

const HeaderContainer = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isCurtainActive, setIsCurtainActive] = useState<boolean>(false);

    const { isAuthorized } = useAppSelector(({ user }) => user);
    const { isMobile } = useAppSelector(({ config }) => config);

    const onLoginClick = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    const onLogoutClick = useCallback(async () => {
        await dispatch(logoutUser());

        dispatch(enqueueToast({
            message: 'Logout successful',
            type: ToastTypes.Success
        }));
    }, [dispatch]);

    const onWishlistIconClick = useCallback(() => {
        navigate('/favorites');
    }, [navigate]);

    const searchType = useMemo(() => {
        if (pathname === `/${AdType.Rent}`) {
            return AdType.Rent;
        }

        if (pathname === `/${AdType.Sale}`) {
            return AdType.Sale;
        }

        return null;
    }, [pathname]);

    return (
      <Header
        onLogoutClick={onLogoutClick}
        onLoginClick={onLoginClick}
        isAuthorized={isAuthorized}
        searchType={searchType}
        isMobile={isMobile}
        onWishlistIconClick={onWishlistIconClick}
        isCurtainActive={isCurtainActive}
        setIsCurtainActive={setIsCurtainActive}
      />
    );
};

export default HeaderContainer;
