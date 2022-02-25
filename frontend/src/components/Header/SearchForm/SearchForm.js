import CitiesSelect from "../CitiesSelectHeader";
import {useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {enqueueToast} from "../../../redux/Notifier";
import {ToastTypes} from "../../../constants";
import {useAppDispatch} from "../../../redux/store";

const SearchForm = ({searchType}) => {

    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getFilterParams = (params) =>  params.reduce((prev, param) => {
            const value = searchParams.get(param);
            const filterValue = value ? {[param]: value} : {};
            return {...prev, ...filterValue};
        }
    , {});

    const [filterSettings, setFilterSettings] = useState(getFilterParams(['city']));

    const onButtonClick = () => {
        console.log({filterSettings});

        if (!filterSettings.city){
            dispatch(enqueueToast({
                message: 'City is required',
                type: ToastTypes.Warning,
            }));
            return;
        }

        const queryString = new URLSearchParams(filterSettings).toString();

        console.log(queryString);

        navigate('?' + queryString);
    }

    return <>
        <CitiesSelect
        city={filterSettings.city}
        setCity={city => setFilterSettings({...filterSettings, city})}
        setPropertyType={propertyType => setFilterSettings({...filterSettings, propertyType})}
    />
        <CitiesSelect
            propertyType={filterSettings.propertyType}
            setPropertyType={propertyType => setFilterSettings({...filterSettings, propertyType})}
        />
        <button onClick={onButtonClick}>Search</button>
        </>
}

export default SearchForm;
