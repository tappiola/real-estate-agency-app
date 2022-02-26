import React from "react";
import {CityType} from "../../types";
import {AdType} from "../../constants";
import Select from "../Select";

const BaseSearchForm: React.FC<
    {cities: CityType[], selectedCity: string, setSelectedCity: (city: string) => void, onButtonClick: (type: AdType) => void}
    > = ({cities, selectedCity, setSelectedCity, onButtonClick}) => {

    return <>
        <Select
            options={cities}
            selectedOption={selectedCity}
            onOptionSelect={setSelectedCity}
        placeholder='Select city'/>
        <button onClick={() => onButtonClick(AdType.Sale)}>For sale</button>
        <button onClick={() => onButtonClick(AdType.Rent)}>To rent</button>
    </>
};

export default BaseSearchForm;