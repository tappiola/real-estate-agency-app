import React from "react";
import {CityType} from "../../../types";

const PropertyTypeSelect: React.FC<
    {cities: CityType[], selectedCity: string, setSelectedCity: (city: string) => void}
    > = ({cities, selectedCity, setSelectedCity}) => {

    return <>
        <select
            placeholder='City'
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
        >
            <option defaultValue='' value=''>Property type</option>
            {cities.map( ({name, id}) => <option key={id} value={id}>{name}</option>)}
        </select>
    </>
};

export default PropertyTypeSelect;