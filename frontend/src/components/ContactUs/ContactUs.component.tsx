import React, { FormEventHandler } from 'react';
import './ContactUs.style.scss';

const ContactUsComponent: React.FC<{
    onFormSubmit: FormEventHandler,
    firstName: string,
    setFirstName: (name: string) => void,
    lastName: string,
    setLastName: (name: string) => void,
    email: string,
    setEmail: (email: string) => void,
    phoneNumber: string,
    setPhoneNumber: (phone: string) => void }> = ({
    onFormSubmit, firstName, setFirstName, lastName, setLastName, email, setEmail, phoneNumber, setPhoneNumber
}) => (
  <form className="ContactUs" onSubmit={onFormSubmit}>
    <h2>Contact us</h2>
    <input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
    <input placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <input placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
    <button type="submit">Send message</button>
  </form>
);

export default ContactUsComponent;
