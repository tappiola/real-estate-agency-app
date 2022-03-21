import clsx from 'clsx';
import React from 'react';
import { UseInputType } from '../../hooks/useInput2';
import './Input.style.scss';

export enum InputType {
    Text = 'text',
    Email = 'email',
    Password = 'password',
    Textarea = 'textarea',
    Phone = 'tel'
}

enum TagType {
    Input = 'input',
    Textarea = 'textarea'
}

const Input : React.FC<{ input: UseInputType }> = ({ input }) => {
    const {
        value,
        valueChangeHandler,
        inputBlurHandler,
        errorMessage,
        type,
        placeholder,
        name
    } = input;

    const hasError = !!errorMessage;

    const Tag = type === InputType.Textarea ? TagType.Textarea : TagType.Input;

    return (
      <>
        <Tag
          className={clsx(hasError && 'InvalidInput')}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={valueChangeHandler}
          onBlur={inputBlurHandler}
        />
        { hasError
            ? <span className="InvalidInputMessage">{errorMessage}</span>
            : <span className="MessagePlaceholder" /> }
      </>
    );
};

export default Input;
