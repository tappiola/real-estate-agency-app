import { ValidationType } from '../../hooks/useInput2';
import { InputType } from '../Input/Input.component';

// eslint-disable-next-line import/prefer-default-export
export const RegisterFormConfig = [
    {
        validationType: ValidationType.isRequired,
        placeholder: 'Name',
        name: 'name'
    },
    {
        validationType: ValidationType.isEmail,
        placeholder: 'Email',
        name: 'email',
        type: InputType.Email
    },
    {
        validationType: ValidationType.isLongEnough,
        placeholder: 'Password',
        name: 'password',
        type: InputType.Password
    }
];
