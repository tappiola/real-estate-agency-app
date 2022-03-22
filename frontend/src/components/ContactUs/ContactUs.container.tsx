import { FormEventHandler } from 'react';
import { ToastTypes } from '../../constants';
import { saveClientRequest } from '../../graphql/queries';
import ContactUs from './ContactUs.component';
import { enqueueToast } from '../../store/notifier';
import { useAppDispatch } from '../../store/hooks';
import useInput from '../../hooks/useInput';
import { ClientRequest } from '../../graphql/types';
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

        const result = await saveClientRequest(transformFormData(formInputs) as ClientRequest);

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
