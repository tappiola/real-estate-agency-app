import { FormEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { registerUser } from '../../redux/user';
import Register from './Register.component';

const RegisterContainer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupHandler: FormEventHandler = useCallback(async (event) => {
        event.preventDefault();

        const registrationResult = await dispatch(registerUser({ email, name, password })).unwrap();

        if (registrationResult.createUser.success) {
            navigate('/', { replace: true });
        }
    }, [email, name, navigate, password]);

    return (
      <Register
        email={email}
        setEmail={setEmail}
        name={name}
        setName={setName}
        password={password}
        setPassword={setPassword}
        signupHandler={signupHandler}
      />
    );
};

export default RegisterContainer;
