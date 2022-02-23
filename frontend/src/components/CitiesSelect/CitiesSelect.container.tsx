import React, {useEffect, useState} from "react";
import {CityType} from "../../types";
import CitiesSelect from "./CitiesSelect.component";
import {fetchCities} from "../../queries";

const CitiesSelectContainer: React.FC = () => {
    const [cities, setCities] = useState<CityType[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>('');

    useEffect(() => {
        const initCities = async () => {
            const response = await fetchCities();
            const {data: {getCities}} = await response.json();
            setCities(getCities);
        };

        initCities();
    }, []);

    return <CitiesSelect cities={cities} selectedCity={selectedCity} setSelectedCity={setSelectedCity}/>
};

export default CitiesSelectContainer;