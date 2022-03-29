import './Placeholder.style.scss';
import React from 'react';
import clsx from 'clsx';

export const PlaceholderBlock : React.FC<{
    classes?: string[]
}> = ({
    classes = []
}) => <div className={clsx('Placeholder-Block', ...classes)} />;

export const PlaceholderText : React.FC<{
    classes?: string[]
}> = ({
    classes = []
}) => <div className={clsx('Placeholder-Text', ...classes)} />;
