import React from "react";
import {CityType} from "../../types";

const CitiesSelect: React.FC<
    {cities: CityType[], selectedCity: string, setSelectedCity: (city: string)=> void}
    > = ({cities, selectedCity, setSelectedCity}) => {

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