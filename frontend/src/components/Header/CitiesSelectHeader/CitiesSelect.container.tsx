import React, {useEffect, useState} from "react";
import {CityType} from "../../../types";
import {fetchCities} from "../../../queries";
import Select from "../Select";

const CitiesSelect: React.FC<{selectedOption: string, onOptionSelect: (option: string) => void, placeholder: string}> = ({selectedOption, onOptionSelect, placeholder}) => {
    const [options, setOptions] = useState<CityType[]>([]);

    useEffect(() => {
        const initCities = async () => {
            const response = await fetchCities();
            const {data: {getCities}} = await response.json();
            setOptions(getCities);
        };

        initCities();
    }, []);

    return <Select placeholder={placeholder} options={options} selectedOption={selectedOption} onOptionSelect={onOptionSelect}/>
};

export default CitiesSelect;