import React, { FormEventHandler } from 'react';
import './ContactUs.style.scss';
import { UseInputType } from '../../hooks/useInput2';
import Input2 from '../Input2/Input.component';

const ContactUsComponent: React.FC<{
    onFormSubmit: FormEventHandler,
    formInputs: UseInputType[],
}> = ({
    onFormSubmit,
    formInputs
}) => (
  <form className="ContactUs" onSubmit={onFormSubmit} noValidate>
    <h2>Contact us</h2>
    {formInputs.map((input) => <Input2 key={input.name} input={input} />)}
    <button type="submit">Send message</button>
  </form>
);

export default ContactUsComponent;
