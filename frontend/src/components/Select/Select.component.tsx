import React from 'react';
import { Direction } from '../ChevronIcon/ChevronIcon.config';
import ChevronIcon from '../ChevronIcon';
import './Select.style.scss';
import { SelectOption } from '../../types';

const Select: React.FC<{
    options: SelectOption[],
    selectedOption: string,
    onOptionSelect: (value: string) => void,
    placeholder: string
}> = ({
    options, selectedOption, onOptionSelect, placeholder
}) => {
    const isExpanded = false;

    return (
      <div className="Select">
        <select
          placeholder={placeholder}
          value={selectedOption}
          onChange={(e) => onOptionSelect(e.target.value)}
        >
          <option defaultValue="" value="">{placeholder}</option>
          {options.map(({ name, id }) => <option key={id} value={id}>{name}</option>)}
        </select>
        <ChevronIcon direction={isExpanded ? Direction.Top : Direction.Bottom} />
      </div>
    );
};

export default Select;
