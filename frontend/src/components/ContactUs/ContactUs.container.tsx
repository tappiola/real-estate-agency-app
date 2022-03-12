import { FormEventHandler, useState } from 'react';
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

    const dispatch = useAppDispatch();

    const onFormSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        saveClientRequest({
            firstName, lastName, email, phoneNumber
        }).then(() => dispatch(enqueueToast({
            message: 'Your request has been submitted',
            type: ToastTypes.Success
        })));
    };

    return (
      <ContactUs
        email={email}
        firstName={firstName}
        lastName={lastName}
        onFormSubmit={onFormSubmit}
        phoneNumber={phoneNumber}
        setEmail={setEmail}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setPhoneNumber={setPhoneNumber}
      />
    );
};

export default ContactUsContainer;
