import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {sendGraphqlRequest} from "./graphql";
import {register} from "./queries";


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     await fetch('http://localhost/array', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({name, email, password})
    //     })
    //         .then(() => navigate("/"))
    // };

    const signupHandler = (event) => {
        event.preventDefault();
        // this.setState({ authLoading: true });

            register(email, name, password).then(res => {
                return res.json();
            })
            .then(resData => {
                if (resData.errors && resData.errors[0].status === 422) {
                    throw new Error(
                        "This email is already registered."
                    );
                }
                if (resData.errors) {
                    throw new Error('User creation failed!');
                }
                console.log(resData);
                // this.setState({ isAuth: false, authLoading: false });
                navigate('/',  { replace: true });
            })
            .catch(err => {
                console.log(err);
                // this.setState({
                //     isAuth: false,
                //     authLoading: false,
                //     error: err
                // });
            });
    };

    return <form onSubmit={signupHandler}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Register</button>
    </form>
};

export default Register;