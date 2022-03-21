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

    const onFormSubmit: FormEventHandler = useCallback(async (e) => {
        e.preventDefault();

        if (!firstName.trim()) {
            dispatch(enqueueToast({
                message: 'Please, enter your first name',
                type: ToastTypes.Success
            }));

            return;
        }

        if (!email.trim() && !phoneNumber.trim()) {
            dispatch(enqueueToast({
                message: 'Please, make should you provided phone or email',
                type: ToastTypes.Success
            }));

            return;
        }

        if (!message.trim()) {
            dispatch(enqueueToast({
                message: 'Please, specify the reason for contacting us in Message field',
                type: ToastTypes.Success
            }));

            return;
        }

        await saveClientRequest({
            firstName,
            lastName,
            email,
            phoneNumber,
            message
        });

        dispatch(enqueueToast({
            message: 'Your request has been submitted',
            type: ToastTypes.Success
        }));

        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setMessage('');
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
