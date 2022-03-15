import { FormEventHandler, useCallback, useState } from 'react';
import { ToastTypes } from '../../constants';
import ContactUs from './ContactUs.component';
import { enqueueToast } from '../../redux/notifier';
import { useAppDispatch } from '../../redux/hooks';
import { saveClientRequest } from '../../queries';

const ContactUsContainer = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useAppDispatch();

    const onFormSubmit: FormEventHandler = useCallback((e) => {
        e.preventDefault();

        saveClientRequest({
            firstName, lastName, email, phoneNumber, message
        }).then(() => dispatch(enqueueToast({
            message: 'Your request has been submitted',
            type: ToastTypes.Success
        })));
    }, [dispatch, email, firstName, lastName, message, phoneNumber]);

    return (
      <ContactUs
        email={email}
        firstName={firstName}
        lastName={lastName}
        message={message}
        onFormSubmit={onFormSubmit}
        phoneNumber={phoneNumber}
        setEmail={setEmail}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setPhoneNumber={setPhoneNumber}
        setMessage={setMessage}
      />
    );
};

export default ContactUsContainer;
