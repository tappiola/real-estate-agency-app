import React, { MouseEventHandler} from "react";
import {CityType} from "../../types";
import {AdType} from "../../constants";

const CitiesSelect: React.FC<
    {cities: CityType[], selectedCity: string, setSelectedCity: (city: string) => void, onButtonClick: (type: AdType) => void}
    > = ({cities, selectedCity, setSelectedCity, onButtonClick}) => {

    return <>
        <select
            placeholder='City'
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
        >
            <option defaultValue='' value=''>Select city</option>
            {cities.map( ({name, id}) => <option key={id} value={id}>{name}</option>)}
        </select>
        <button onClick={() => onButtonClick(AdType.Sale)}>For sale</button>
        <button onClick={() => onButtonClick(AdType.Rent)}>To rent</button>
        <h1>{selectedCity}</h1>
    </>
};

export default CitiesSelect;