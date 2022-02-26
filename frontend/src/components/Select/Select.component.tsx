import React from "react";

const Select: React.FC<{options: Array<any>, selectedOption: string, onOptionSelect: (value: string) => void, placeholder: string}> = ({options, selectedOption, onOptionSelect, placeholder}) => {

    return <>
        <select
            placeholder={placeholder}
            value={selectedOption}
            onChange={(e) => onOptionSelect(e.target.value)}
        >
            <option defaultValue='' value=''>{placeholder}</option>
            {options.map( ({name, id}) => <option key={id} value={id}>{name}</option>)}
        </select>
    </>
};

export default Select;