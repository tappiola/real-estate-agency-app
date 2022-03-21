import { FormEventHandler } from 'react';
import { ToastTypes } from '../../constants';
import ContactUs from './ContactUs.component';
import { enqueueToast } from '../../redux/notifier';
import { useAppDispatch } from '../../redux/hooks';
import { saveClientRequest } from '../../queries';
import useInput, { ValidationType } from '../../hooks/useInput';

const ContactUsContainer = () => {
    const firstNameInput = useInput(ValidationType.isRequired);
    const lastNameInput = useInput(ValidationType.noValidate);
    const emailInput = useInput(ValidationType.isEmail);
    const phoneInput = useInput(ValidationType.noValidate);
    const messageInput = useInput(ValidationType.isRequired);

    const dispatch = useAppDispatch();

    const onFormSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        if (!firstNameInput.isValid || !emailInput.isValid || !messageInput.isValid) {
            dispatch(enqueueToast({
                message: 'Please, fill in all the fields with valid data',
                type: ToastTypes.Warning
            }));

            return;
        }

        await saveClientRequest({
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            phoneNumber: phoneInput.value,
            message: messageInput.value
        });

        dispatch(enqueueToast({
            message: 'Your request has been submitted',
            type: ToastTypes.Success
        }));

        firstNameInput.reset();
        lastNameInput.reset();
        emailInput.reset();
        phoneInput.reset();
        messageInput.reset();
    };

    return (
      <ContactUs
        emailInput={emailInput}
        firstNameInput={firstNameInput}
        lastNameInput={lastNameInput}
        messageInput={messageInput}
        phoneInput={phoneInput}
        onFormSubmit={onFormSubmit}
      />
    );
};

export default ContactUsContainer;
