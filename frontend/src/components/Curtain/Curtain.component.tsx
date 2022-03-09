import React from 'react';
import './Curtain.style.scss';
import clsx from 'clsx';
import AdvancedSearchForm from '../AdvancedSearchForm';
import { AdType } from '../../constants';

const Curtain: React.FC<{ searchType: AdType, isCurtainActive: boolean, setIsCurtainActive: (status: boolean) => void }> = ({ searchType, isCurtainActive, setIsCurtainActive }) => (
  <div className={clsx('Curtain', isCurtainActive && 'Curtain_isActive')}>
    <AdvancedSearchForm searchType={searchType} setIsCurtainActive={setIsCurtainActive} />
  </div>
);

export default Curtain;
