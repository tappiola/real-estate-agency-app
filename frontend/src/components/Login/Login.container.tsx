import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import Login from "./Login.component";
import {useAppDispatch} from "../../redux/store";
import {loginUser} from "../../redux/User";

const LoginContainer = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        let navigate = useNavigate();
    const dispatch = useAppDispatch();

   const loginHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

       // @ts-ignore
       await dispatch(loginUser({ email, password }));
       navigate('/', {replace: true});
    };

        return <Login email={email} loginHandler={loginHandler} password={password} setEmail={setEmail} setPassword={setPassword}/>;
};

export default LoginContainer;