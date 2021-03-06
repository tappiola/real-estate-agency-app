import clsx from 'clsx';
import React from 'react';
import { Direction } from './ChevronIcon.config';

import './ChevronIcon.style.scss';

export const ChevronIcon: React.FC<{ direction?: Direction }> = ({ direction = Direction.Right }) => (
  <svg
    className={clsx('ChevronIcon', `ChevronIcon_${direction}`)}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5.8535 13.707L11.5605 7.99997L5.8535 2.29297L4.4395 3.70697L8.7325 7.99997L4.4395 12.293L5.8535 13.707Z" />
  </svg>
);

export default ChevronIcon;
