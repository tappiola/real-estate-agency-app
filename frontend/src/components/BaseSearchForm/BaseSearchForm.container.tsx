import React, {useEffect, useState} from "react";
import {CityType} from "../../types";
import CitiesSelect from "./BaseSearchForm.component";
import {fetchCities} from "../../queries";
import {enqueueToast} from "../../redux/Notifier";
import {AdType, ToastTypes} from "../../constants";
import {useAppDispatch} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";

const BaseSearchFormContainer: React.FC = () => {
    const [cities, setCities] = useState<CityType[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const initCities = async () => {
            const response = await fetchCities();
            const {data: {getCities}} = await response.json();
            setCities(getCities);
        };

        initCities();
    }, []);

    const onButtonClick = (adType: AdType) => {
        if (!selectedCity){
            dispatch(enqueueToast({
                message: 'Please, select city',
                type: ToastTypes.Info,
            }));
            return;
        }

        navigate(`/${adType}?city=${selectedCity}`);
    };

    return <CitiesSelect cities={cities} selectedCity={selectedCity} setSelectedCity={setSelectedCity} onButtonClick={onButtonClick}/>
};

export default BaseSearchFormContainer;