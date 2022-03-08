import './App.style.scss';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useEffect} from "react";
import {getCities, getPropertyTypes} from "../../redux/referenceData";
import App from "./App.component";

const AppContainer = () => {
    const { isAuthorized } = useAppSelector(({ user }) => user);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCities());
        dispatch(getPropertyTypes());
    }, []);

    return <App isAuthorized={isAuthorized}/>
}

export default AppContainer;
