import { FormEventHandler, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/user';
import Login from './Login.component';
import useInput, { validators } from '../../hooks/useInput';
import { enqueueToast } from '../../redux/notifier';
import { ToastTypes } from '../../constants';

const LoginContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: setEmail,
        inputBlurHandler: emailBlurHandler
    } = useInput(validators.isEmail);

    const {
        value: password,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: setPassword,
        inputBlurHandler: passwordBlurHandler
    } = useInput(validators.isLongEnough);

    const loginHandler: FormEventHandler = useCallback(async (event) => {
        event.preventDefault();

        if (!emailIsValid || !passwordIsValid) {
            dispatch(enqueueToast({
                message: 'Please, fill in all the fields with valid data',
                type: ToastTypes.Warning
            }));

            return;
        }

        const loginResult = await dispatch(loginUser({ email, password })).unwrap();

        if (loginResult.login.success) {
            navigate('/', { replace: true });
        }
    }, [dispatch, email, emailIsValid, navigate, password, passwordIsValid]);

    return (
      <Login
        email={email}
        setEmail={setEmail}
        emailHasError={emailHasError}
        emailBlurHandler={emailBlurHandler}
        password={password}
        setPassword={setPassword}
        passwordHasError={passwordHasError}
        passwordBlurHandler={passwordBlurHandler}
        loginHandler={loginHandler}
      />
    );
};

export default LoginContainer;
