import { FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { loginUser, LoginUserPayload } from '../../store/user';
import Login from './Login.component';
import useInput from '../../hooks/useInput';
import { enqueueToast } from '../../store/notifier';
import { ToastTypes } from '../../constants';
import { LoginFormConfig } from './Login.config';
import { transformFormData } from '../../util';

const LoginContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const formInputs = LoginFormConfig.map((config) => useInput(config));

    const loginHandler: FormEventHandler = async (event) => {
        event.preventDefault();

        formInputs.forEach((input) => input.validate());

        if (!formInputs.every((input) => input.isValid)) {
            dispatch(enqueueToast({
                message: 'Please, fill in all the fields with valid data',
                type: ToastTypes.Warning
            }));

            return;
        }

        const loginResult = await dispatch(loginUser(transformFormData(formInputs) as LoginUserPayload)).unwrap();

        if (loginResult.login.success) {
            navigate('/', { replace: true });
        }
    };

    return (
      <Login
        loginHandler={loginHandler}
        formInputs={formInputs}
      />
    );
};

export default LoginContainer;
