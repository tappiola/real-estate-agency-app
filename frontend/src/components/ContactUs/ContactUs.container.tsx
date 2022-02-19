import React, {FormEvent, useState} from "react";
import {HOST} from "../../constants";
import ContactUs from './ContactUs.component';

const ContactUsContainer = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(HOST + '/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName, lastName, email, phoneNumber})
        })
    }

    return <ContactUs
        email={email} firstName={firstName} lastName={lastName} onFormSubmit={onFormSubmit} phoneNumber={phoneNumber}
     setEmail={setEmail} setFirstName={setFirstName} setLastName={setLastName} setPhoneNumber={setPhoneNumber}/>
}

export default ContactUsContainer;
