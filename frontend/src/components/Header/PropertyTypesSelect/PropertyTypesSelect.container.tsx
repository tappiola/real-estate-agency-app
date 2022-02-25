import React, {useEffect, useState} from "react";
import {CityType} from "../../../types";
import { fetchPropertyTypes} from "../../../queries";
import Select from "../Select";

const PropertyTypesSelect: React.FC<{selectedOption: string, onOptionSelect: (option: string) => void, placeholder: string}> = ({selectedOption, onOptionSelect, placeholder}) => {
    const [options, setOptions] = useState<CityType[]>([]);

    useEffect(() => {
        const initPropertyTypes = async () => {
            const response = await fetchPropertyTypes();
            const {data: {getPropertyTypes}} = await response.json();
            setOptions(getPropertyTypes);
        };

        initPropertyTypes();
    }, []);

    return <Select placeholder={placeholder} options={options} selectedOption={selectedOption} onOptionSelect={onOptionSelect}/>
};

export default PropertyTypesSelect;