import React from 'react';
import Select from '../Select';
import { useAppSelector } from '../../store/hooks';

const PropertyTypesSelect: React.FC<{
    selectedOption: string,
    onOptionSelect: (option: string) => void,
    placeholder: string
}> = ({
    selectedOption,
    onOptionSelect,
    placeholder
}) => {
    const { propertyTypes } = useAppSelector(({ referenceData }) => referenceData);

    return (
      <Select
        placeholder={placeholder}
        options={propertyTypes}
        selectedOption={selectedOption}
        onOptionSelect={onOptionSelect}
      />
    );
};

export default PropertyTypesSelect;
