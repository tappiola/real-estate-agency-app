import { InputType, ValidationType } from '../Input/Input.config';

// eslint-disable-next-line import/prefer-default-export
export const EmailFormConfig = [
    {
        validationType: ValidationType.isRequired,
        placeholder: 'First name',
        name: 'firstName'
    }, {
        validationType: ValidationType.noValidate,
        placeholder: 'Last name',
        name: 'lastName'
    }, {
        validationType: ValidationType.isEmail,
        placeholder: 'Email',
        name: 'email',
        type: InputType.Email
    }, {
        validationType: ValidationType.noValidate,
        placeholder: 'Phone number',
        name: 'phone',
        apiField: 'phoneNumber',
        type: InputType.Phone
    }, {
        validationType: ValidationType.isRequired,
        placeholder: 'Message',
        name: 'message',
        type: InputType.Textarea
    }
];
