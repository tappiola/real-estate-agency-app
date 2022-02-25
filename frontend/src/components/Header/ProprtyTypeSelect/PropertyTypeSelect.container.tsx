import React, {useEffect, useState} from "react";
import {CityType} from "../../../types";
import {fetchCities} from "../../../queries";
import PropertyTypeSelect from "./PropertyTypeSelect.component";

const PropertyTypeSelectContainer: React.FC<{city: string, setCity: (city: string) => void}> = ({city, setCity}) => {
    const [cities, setCities] = useState<CityType[]>([]);

    useEffect(() => {
        const initCities = async () => {
            const response = await fetchCities();
            const {data: {getCities}} = await response.json();
            setCities(getCities);
        };

        initCities();
    }, []);

    return <PropertyTypeSelect cities={cities} selectedCity={city} setSelectedCity={setCity}/>
};

export default PropertyTypeSelectContainer;