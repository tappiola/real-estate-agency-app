import { FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/user';
import Login from './Login.component';
import useInput, { ValidationType } from '../../hooks/useInput';
import { enqueueToast } from '../../redux/notifier';
import { ToastTypes } from '../../constants';

const LoginContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const emailInput = useInput(ValidationType.isEmail);
    const passwordInput = useInput(ValidationType.isLongEnough);

    const loginHandler: FormEventHandler = async (event) => {
        event.preventDefault();

        if (!emailInput.isValid || !passwordInput.isValid) {
            dispatch(enqueueToast({
                message: 'Please, fill in all the fields with valid data',
                type: ToastTypes.Warning
            }));

            return;
        }

        const loginResult = await dispatch(loginUser({
            email: emailInput.value,
            password: passwordInput.value
        })).unwrap();

        if (loginResult.login.success) {
            navigate('/', { replace: true });
        }
    };

    return (
      <Login
        emailInput={emailInput}
        passwordInput={passwordInput}
        loginHandler={loginHandler}
      />
    );
};

export default LoginContainer;
