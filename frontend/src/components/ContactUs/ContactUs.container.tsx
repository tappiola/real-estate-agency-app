import React, {FormEvent, useState} from "react";
import {HOST, TOAST_TYPES} from "../../constants";
import ContactUs from './ContactUs.component';
import {enqueueToast} from "../../redux/NotifierReducer";
import {useDispatch} from "react-redux";

const ContactUsContainer = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const dispatch = useDispatch();

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(HOST + '/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName, lastName, email, phoneNumber})
        }).then(() =>
        dispatch(enqueueToast({
            message: 'Your request has been submitted',
            type: TOAST_TYPES.SUCCESS,
        }))
        )
    }

    return <ContactUs
        email={email} firstName={firstName} lastName={lastName} onFormSubmit={onFormSubmit} phoneNumber={phoneNumber}
     setEmail={setEmail} setFirstName={setFirstName} setLastName={setLastName} setPhoneNumber={setPhoneNumber}/>
}

export default ContactUsContainer;
