import { FormEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/user';
import Login from './Login.component';

const LoginContainer = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const loginHandler: FormEventHandler = useCallback(async (event) => {
        event.preventDefault();

        const loginResult = await dispatch(loginUser({ email, password })).unwrap();

        if (loginResult.login.success) {
            navigate('/', { replace: true });
        }
    }, [dispatch, email, navigate, password]);

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
