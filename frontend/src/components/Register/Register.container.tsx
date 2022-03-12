import { useMutation } from '@apollo/client';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REGISTER } from '../../apollo/queries';
import { RegistrationResult } from '../../apollo/types';
import { ToastTypes } from '../../constants';
import { useAppDispatch } from '../../redux/hooks';
import { enqueueToast } from '../../redux/notifier';
import Register from './Register.component';

const RegisterContainer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [register] = useMutation<RegistrationResult>(REGISTER);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupHandler: FormEventHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await register({
            variables: { userInput: { email, name, password } },
            onCompleted: (data) => {
                if (!data.createUser.success) {
                    dispatch(enqueueToast({
                        type: ToastTypes.Error,
                        message: data.createUser.errorMessage
                    }));

                    return;
                }

                navigate('/', { replace: true });
            }
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
