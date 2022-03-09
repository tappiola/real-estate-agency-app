import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../queries';
import Register from './Register.component';

const RegisterContainer = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const signupHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        register(email, name, password).then((res) => res.json())
            .then((resData) => {
                if (resData.errors && resData.errors[0].status === 422) {
                    throw new Error(
                        'This email is already registered.'
                    );
                }

                if (resData.errors) {
                    throw new Error('User creation failed!');
                }
                navigate('/', { replace: true });
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
