import {useState} from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:7777/array', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
            .then(() => navigate("/"))
    };

    return <form onSubmit={onSubmit}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Register</button>
    </form>
};

export default Register;