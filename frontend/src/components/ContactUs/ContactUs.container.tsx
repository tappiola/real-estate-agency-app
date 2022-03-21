import { FormEventHandler } from 'react';
import { ToastTypes } from '../../constants';
import ContactUs from './ContactUs.component';
import { enqueueToast } from '../../redux/notifier';
import { useAppDispatch } from '../../redux/hooks';
import { saveClientRequest } from '../../queries';
import useInput from '../../hooks/useInput';
import { SaveClientRequest } from '../../types';
import { transformFormData } from '../../util';
import { EmailFormConfig } from './ContactUs.config';

const ContactUsContainer = () => {
    const formInputs = EmailFormConfig.map((config) => useInput(config));

    const dispatch = useAppDispatch();

    const onFormSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        formInputs.forEach((input) => input.validate());

        if (!formInputs.every((input) => input.isValid)) {
            dispatch(enqueueToast({
                message: 'Please, fill in all the fields with valid data',
                type: ToastTypes.Warning
            }));

            return;
        }

        await saveClientRequest(transformFormData(formInputs) as SaveClientRequest);

        dispatch(enqueueToast({
            message: 'Your request has been submitted',
            type: ToastTypes.Success
        }));

        formInputs.forEach((input) => input.reset());
    };

    return (
      <ContactUs
        onFormSubmit={onFormSubmit}
        formInputs={formInputs}
      />
    );
};

export default ContactUsContainer;
