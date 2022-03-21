import { FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { registerUser } from '../../redux/user';
import Register from './Register.component';
import { enqueueToast } from '../../redux/notifier';
import { ToastTypes } from '../../constants';
import useInput, { ValidationType } from '../../hooks/useInput';

const RegisterContainer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const nameInput = useInput(ValidationType.isRequired);
    const emailInput = useInput(ValidationType.isEmail);
    const passwordInput = useInput(ValidationType.isLongEnough);

    const signupHandler: FormEventHandler = async (event) => {
        event.preventDefault();

        if (!emailInput.isValid || !passwordInput.isValid || !nameInput.isValid) {
            dispatch(enqueueToast({
                message: 'Please, fill in all the fields with valid data',
                type: ToastTypes.Warning
            }));

            return;
        }

        const registrationResult = await dispatch(registerUser({
            email: emailInput.value,
            name: nameInput.value,
            password: nameInput.value
        })).unwrap();

        if (registrationResult.createUser.success) {
            navigate('/', { replace: true });
        }
    };

    return (
      <Register
        emailInput={emailInput}
        nameInput={nameInput}
        passwordInput={passwordInput}
        signupHandler={signupHandler}
      />
    );
};

export default RegisterContainer;
