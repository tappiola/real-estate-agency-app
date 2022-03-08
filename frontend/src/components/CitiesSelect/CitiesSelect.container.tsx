import React from "react";
import Select from "../Select";
import {useAppSelector} from "../../redux/hooks";

const CitiesSelect: React.FC<{selectedOption: string, onOptionSelect: (option: string) => void, placeholder: string}> = ({selectedOption, onOptionSelect, placeholder}) => {
    const { cities } = useAppSelector(({ referenceData }) => referenceData);

    return <Select placeholder={placeholder} options={cities} selectedOption={selectedOption} onOptionSelect={onOptionSelect}/>
};

export default CitiesSelect;