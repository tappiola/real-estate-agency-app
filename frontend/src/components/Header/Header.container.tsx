import {useLocation, useNavigate} from "react-router-dom";
import {AdType, ToastTypes} from "../../constants";
import './Header.style.scss';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {logoutUser} from "../../redux/User";
import Header from "./Header.component";
import {enqueueToast} from "../../redux/Notifier";

const HeaderContainer = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuthorized } = useAppSelector(({ user }) => user);

    const onLoginClick = () => {
        navigate('/login');
    }

    const onLogoutClick = async () => {
        // @ts-ignore
        await dispatch(logoutUser());

        dispatch(enqueueToast({
            message: 'Logout successful',
            type: ToastTypes.Success,
        }));
    }
    const onWishlistIconClick = () => {
        navigate('/favorites');
    }

    return <Header
        onLogoutClick={onLogoutClick}
        onLoginClick={onLoginClick}
        isAuthorized={isAuthorized}
        isRentSearch={pathname === '/' + AdType.Rent}
        isSaleSearch={pathname === '/' + AdType.Sale}
        onWishlistIconClick={onWishlistIconClick}
    />;
}

export default HeaderContainer;
