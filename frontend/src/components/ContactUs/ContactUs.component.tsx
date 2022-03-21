import React, { FormEventHandler } from 'react';
import './ContactUs.style.scss';
import { UseInputType } from '../../hooks/useInput';
import Input, { InputType } from '../Input/Input.component';

const ContactUsComponent: React.FC<{
    onFormSubmit: FormEventHandler,
    firstNameInput: UseInputType,
    lastNameInput: UseInputType,
    emailInput: UseInputType,
    phoneInput: UseInputType,
    messageInput: UseInputType
}> = ({
    onFormSubmit,
    firstNameInput,
    lastNameInput,
    emailInput,
    phoneInput,
    messageInput
}) => (
  <form className="ContactUs" onSubmit={onFormSubmit}>
    <h2>Contact us</h2>
    <Input input={firstNameInput} placeholder="First name" name="firstName" />
    <Input input={lastNameInput} placeholder="Last name" name="lastName" />
    <Input input={emailInput} placeholder="Email" name="email" type={InputType.Email} />
    <Input input={phoneInput} placeholder="Phone number" name="phone" type={InputType.Phone} />
    <Input input={messageInput} placeholder="Message" name="message" type={InputType.Textarea} />
    <button type="submit">Send message</button>
  </form>
);

export default ContactUsComponent;
