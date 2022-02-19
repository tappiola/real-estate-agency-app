import React, {useEffect, useState} from "react";
import {HOST} from "../../constants";
import {CityType} from "../../types";
import CitiesSelect from "./CitiesSelect.component";

const CitiesSelectContainer: React.FC = () => {
    const [cities, setCities] = useState<CityType[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>('');

    const fetchCities = async () => {
        let response = await fetch(HOST + '/cities');
        console.log(response);
        return response.json();
    }

    useEffect(() => {
        const initCities = async () => {
            const cities = await fetchCities();
            setCities(cities);
        };

        initCities();
    }, []);

    return <CitiesSelect cities={cities} selectedCity={selectedCity} setSelectedCity={setSelectedCity}/>
};

export default CitiesSelectContainer;