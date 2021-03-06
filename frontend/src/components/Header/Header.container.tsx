import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useMemo, useState } from 'react';
import { AdType, Path, ToastTypes } from '../../constants';
import './Header.style.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutUser } from '../../store/user';
import Header from './Header.component';
import { enqueueToast } from '../../store/notifier';

const HeaderContainer = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isCurtainActive, setIsCurtainActive] = useState<boolean>(false);

    const { isAuthorized } = useAppSelector(({ user }) => user);
    const { isMobile } = useAppSelector(({ config }) => config);

    const onLoginClick = useCallback(() => {
        navigate(Path.Login);
    }, [navigate]);

    const onLogoutClick = useCallback(async () => {
        await dispatch(logoutUser());

        dispatch(enqueueToast({
            message: 'Logout successful',
            type: ToastTypes.Success
        }));
    }, [dispatch]);

    const onWishlistIconClick = useCallback(() => {
        navigate(Path.Wishlist);
    }, [navigate]);

    const searchType = useMemo(() => {
        if (pathname === Path.PropertiesToRent) {
            return AdType.Rent;
        }

        if (pathname === Path.PropertiesForSale) {
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
