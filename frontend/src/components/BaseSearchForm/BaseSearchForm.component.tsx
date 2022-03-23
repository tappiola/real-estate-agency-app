import React from 'react';
import { AdType } from '../../constants';
import './BaseSearchForm.style.scss';
import CitiesSelect from '../CitiesSelect';

const BaseSearchForm: React.FC<{
    selectedCity: string,
    setSelectedCity: (city: string) => void,
    onButtonClick: (type: AdType) => void }
> = ({
    selectedCity,
    setSelectedCity,
    onButtonClick
}) => (
  <div className="BaseSearch-Container">
    <div className="BaseSearch">
      <h1 className="BaseSearch-Heading">Find your new home</h1>
      <h3 className="BaseSearch-SubHeading"> More than 1000 properties across the UK</h3>
      <div className="BaseSearch-Fields">
        <CitiesSelect selectedOption={selectedCity} onOptionSelect={setSelectedCity} placeholder="Select city" />
        <button type="button" onClick={() => onButtonClick(AdType.Sale)}>For sale</button>
        <button type="button" onClick={() => onButtonClick(AdType.Rent)}>To rent</button>
      </div>
    </div>
  </div>
);

export default BaseSearchForm;
