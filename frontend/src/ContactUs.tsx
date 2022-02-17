import React, {useState} from "react";
import {HOST} from "./constants";

const ContactUs = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(HOST + '/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName, lastName, email, phoneNumber})
        })
    }

    return <form onSubmit={onFormSubmit}>
        <input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        <input placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        <input type="email" placeholder="Email name" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
        <button type="submit">Send message</button>
    </form>
}

export default ContactUs;
