import { FormEventHandler, useCallback, useState } from 'react';
import { ToastTypes } from '../../constants';
import { saveClientRequest } from '../../graphql/queries';
import ContactUs from './ContactUs.component';
import { enqueueToast } from '../../redux/notifier';
import { useAppDispatch } from '../../redux/hooks';

const ContactUsContainer = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useAppDispatch();

    const onFormSubmit: FormEventHandler = useCallback(async (e) => {
        e.preventDefault();

        const result = await saveClientRequest({
            firstName, lastName, email, phone: phoneNumber, message
        });

        if (!result.saveClientRequest.success) {
            dispatch(enqueueToast({
                message: `Unable to process request: ${result.saveClientRequest.errorMessage}`,
                type: ToastTypes.Error
            }));

            return;
        }

        dispatch(enqueueToast({
            message: 'Your request has been submitted',
            type: ToastTypes.Success
        }));
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
