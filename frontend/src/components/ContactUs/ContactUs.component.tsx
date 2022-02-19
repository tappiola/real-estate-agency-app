import React, {FormEvent} from "react";

const ContactUsComponent: React.FC<{
    onFormSubmit: (e: FormEvent<HTMLFormElement>) => void,
    firstName: string,
    setFirstName: (name: string) => void,
    lastName: string,
    setLastName: (name: string) => void,
    email: string,
    setEmail: (email: string) => void,
    phoneNumber: string,
    setPhoneNumber: (phone: string) => void}>
    = ({onFormSubmit, firstName, setFirstName, lastName, setLastName, email, setEmail, phoneNumber, setPhoneNumber}) => {

    return <form onSubmit={onFormSubmit}>
        <input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        <input placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        <input type="email" placeholder="Email name" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
        <button type="submit">Send message</button>
    </form>
}

export default ContactUsComponent;
