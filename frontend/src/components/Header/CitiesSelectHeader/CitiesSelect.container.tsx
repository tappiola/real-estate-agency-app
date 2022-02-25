import React, {useEffect, useState} from "react";
import {CityType} from "../../../types";
import CitiesSelect from "./CitiesSelect.component";
import {fetchCities} from "../../../queries";

const CitiesSelectContainer: React.FC<{city: string, setCity: (city: string) => void}> = ({city, setCity}) => {
    const [cities, setCities] = useState<CityType[]>([]);

    useEffect(() => {
        const initCities = async () => {
            const response = await fetchCities();
            const {data: {getCities}} = await response.json();
            setCities(getCities);
        };

        initCities();
    }, []);

    return <CitiesSelect cities={cities} selectedCity={city} setSelectedCity={setCity}/>
};

export default CitiesSelectContainer;