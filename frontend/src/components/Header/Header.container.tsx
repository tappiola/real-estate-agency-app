import {useLocation, useNavigate} from "react-router-dom";
import {AdType, ToastTypes} from "../../constants";
import './Header.style.scss';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {logoutUser} from "../../redux/user";
import Header from "./Header.component";
import {enqueueToast} from "../../redux/notifier";
import {useIsMobile} from "../IsMobile";
import {useState} from "react";

const HeaderContainer = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isMobile = useIsMobile();
    const [isCurtainActive, setIsCurtainActive] = useState<boolean>(false);

    const { isAuthorized } = useAppSelector(({ user }) => user);

    const onLoginClick = () => {
        navigate('/login');
    }

    const onLogoutClick = async () => {
        await dispatch(logoutUser());

        dispatch(enqueueToast({
            message: 'Logout successful',
            type: ToastTypes.Success,
        }));
    }
    const onWishlistIconClick = () => {
        navigate('/favorites');
    }

    const getSearchType = () => {
        if (pathname === '/' + AdType.Rent){
            return AdType.Rent
        }

        if (pathname === '/' + AdType.Sale){
            return AdType.Sale
        }

        return null;
    }

    return <Header
        onLogoutClick={onLogoutClick}
        onLoginClick={onLoginClick}
        isAuthorized={isAuthorized}
        searchType={getSearchType()}
        isMobile={isMobile}
        onWishlistIconClick={onWishlistIconClick}
        isCurtainActive={isCurtainActive}
        setIsCurtainActive={setIsCurtainActive}
    />;
}

export default HeaderContainer;
