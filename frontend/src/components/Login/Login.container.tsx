import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../../queries";
import Login from "./Login.component";
import {TOAST_TYPES} from "../../constants";
import {enqueueToast} from "../../redux/NotifierReducer";
import {useDispatch} from "react-redux";

type LoginDataType = {
    data: {login: {token: string, userId: number}};
}

const LoginContainer = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        let navigate = useNavigate();
    const dispatch = useDispatch();

   const loginHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // this.setState({ authLoading: true });
        // @ts-ignore
       login(email, password)
            .then(res => {
                if (res.status === 422) {
                    throw new Error('Validation failed.');
                }
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Could not authenticate you!');
                }
                return res.json();
            })
            .then(({data: {login}}: LoginDataType) => {
                console.log(login);
                // this.setState({
                //     isAuth: true,
                //     token: resData.token,
                //     authLoading: false,
                //     userId: resData.userId
                // });
                dispatch(enqueueToast({
                    message: 'Login successful',
                    type: TOAST_TYPES.SUCCESS,
                }));
                localStorage.setItem('token', login.token);
                localStorage.setItem('userId', String(login.userId));
                navigate("/", {replace: true});
                // const remainingMilliseconds = 60 * 60 * 1000;
                // const expiryDate = new Date(
                //     new Date().getTime() + remainingMilliseconds
                // );
                // localStorage.setItem('expiryDate', expiryDate.toISOString());
                // this.setAutoLogout(remainingMilliseconds);
            })
            .catch((err: any) => {
                console.log(err);
                dispatch(enqueueToast({
                    message: err.message || 'Failed to login',
                    type: TOAST_TYPES.ERROR,
                }));
                // this.setState({
                //     isAuth: false,
                //     authLoading: false,
                //     error: err
                // });
            });
    };

        return <Login email={email} loginHandler={loginHandler} password={password} setEmail={setEmail} setPassword={setPassword}/>;
};

export default LoginContainer;