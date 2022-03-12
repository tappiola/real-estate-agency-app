import { useMutation } from '@apollo/client';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../../apollo/queries';
import { LoginResponse } from '../../apollo/types';
import { ToastTypes } from '../../constants';
import { useAppDispatch } from '../../redux/hooks';
import { enqueueToast } from '../../redux/notifier';
import { loginFailed, loginSuccessful } from '../../redux/user';
import Login from './Login.component';

const LoginContainer = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loginUser] = useMutation<LoginResponse>(LOGIN);

    const loginHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await loginUser({
            variables: { email, password },
            onCompleted: (data) => {
                if (data.login.success) {
                    const { login: { token } } = data;

                    dispatch(loginSuccessful(token));
                    dispatch(enqueueToast({
                        type: ToastTypes.Success,
                        message: 'Successfully logged in'
                    }));

                    navigate('/', { replace: true });
                } else {
                    dispatch(loginFailed());
                    dispatch(enqueueToast({
                        type: ToastTypes.Error,
                        message: data.login.errorMessage
                    }));
                }
            }
        });
    };

    return (
      <Login
        email={email}
        loginHandler={loginHandler}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    );
};

export default LoginContainer;
