import './PropertiesLoader.style.scss';
import React from 'react';
import clsx from 'clsx';

export const PlaceholderBlock : React.FC<{
    classes?: string[]
}> = ({
    classes = []
}) => <div className={clsx('Placeholder', ...classes)} />;

export const PlaceholderText : React.FC<{
    classes?: string[]
}> = ({
    classes = []
}) => <div className={clsx('Placeholder', 'Placeholder-Text', ...classes)} />;
