import React from "react";
import {CityType} from "../../types";
import {AdType} from "../../constants";
import Select from "../Select";
import './BaseSearchForm.style.scss';

const BaseSearchForm: React.FC<
    {cities: CityType[], selectedCity: string, setSelectedCity: (city: string) => void, onButtonClick: (type: AdType) => void}
    > = ({cities, selectedCity, setSelectedCity, onButtonClick}) => {

    return <div className="BaseSearch">
        <h1 className="BaseSearch-Heading">Find your new home</h1>
        <h3 className="BaseSearch-SubHeading"> More than 1000 properties across the UK</h3>
        <div>
        <Select
            options={cities}
            selectedOption={selectedCity}
            onOptionSelect={setSelectedCity}
        placeholder='Select city'/>
        <button onClick={() => onButtonClick(AdType.Sale)}>For sale</button>
        <button onClick={() => onButtonClick(AdType.Rent)}>To rent</button>
    </div>
    </div>
};

export default BaseSearchForm;