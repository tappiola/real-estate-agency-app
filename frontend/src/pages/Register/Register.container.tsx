import { FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { registerUser, RegisterUserPayload } from '../../store/user';
import Register from './Register.component';
import { enqueueToast } from '../../store/notifier';
import { Path, ToastTypes } from '../../constants';
import useInput from '../../hooks/useInput';
import { RegisterFormConfig } from './Register.config';
import { transformFormData } from '../../util';

const RegisterContainer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formInputs = RegisterFormConfig.map((config) => useInput(config));

    const signupHandler: FormEventHandler = async (event) => {
        event.preventDefault();

        formInputs.forEach((input) => input.validate());

        if (!formInputs.every((input) => input.isValid)) {
            dispatch(enqueueToast({
                message: 'Please, fill in all the fields with valid data',
                type: ToastTypes.Warning
            }));

            return;
        }

        const registrationResult = await dispatch(
            registerUser(transformFormData(formInputs) as RegisterUserPayload)
        ).unwrap();

        if (registrationResult.createUser.success) {
            navigate(Path.HomePage, { replace: true });
        }
    };

    return (
      <Register
        signupHandler={signupHandler}
        formInputs={formInputs}
      />
    );
};

export default RegisterContainer;
