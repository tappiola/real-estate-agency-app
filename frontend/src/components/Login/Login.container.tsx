import { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login.component';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/user';

const LoginContainer = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const loginHandler: FormEventHandler = async (event) => {
        event.preventDefault();

        await dispatch(loginUser({ email, password }));
        navigate('/', { replace: true });
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
