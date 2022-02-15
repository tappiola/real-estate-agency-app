import React, {useEffect, useState} from "react";

interface City {
    name: string;
    id: number;
}

const CitiesSelect: React.FC = () => {
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>('');

    const fetchCities = async () => {
        let response = await fetch('http://localhost/cities');
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
            <option selected value=''>Select city</option>
            {cities.map( ({name, id}) => <option key={id}>{name}</option>)}
        </select>
        <h1>{selectedCity}</h1>
    </>
};

export default CitiesSelect;