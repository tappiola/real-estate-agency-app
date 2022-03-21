import React, { FormEventHandler } from 'react';
import './ContactUs.style.scss';
import { UseInputType } from '../../hooks/useInput';
import Input from '../Input/Input.component';

const ContactUsComponent: React.FC<{
    onFormSubmit: FormEventHandler,
    formInputs: UseInputType[],
}> = ({
    onFormSubmit,
    formInputs
}) => (
  <form className="ContactUs" onSubmit={onFormSubmit} noValidate>
    <h2>Contact us</h2>
    {formInputs.map((input) => <Input key={input.name} input={input} />)}
    <button type="submit">Send message</button>
  </form>
);

export default ContactUsComponent;
