import React, {useEffect, useState} from "react";
import {HOST} from "./constants";

interface City {
    name: string;
    id: number;
}

const CitiesSelect: React.FC = () => {
    const [cities, setCities] = useState<City[]>([]);
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

    return <>
        <select
            placeholder='City'
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
        >
            <option defaultValue='' value=''>Select city</option>
            {cities.map( ({name, id}) => <option key={id}>{name}</option>)}
        </select>
        <h1>{selectedCity}</h1>
    </>
};

export default CitiesSelect;