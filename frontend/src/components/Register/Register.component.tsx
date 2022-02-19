import React, {FormEvent} from "react";


const Register: React.FC<{
    signupHandler: (event: FormEvent<HTMLFormElement>) => void,
    name: string,
    setName: (name: string) => void,
    email: string,
    setEmail: (email: string) => void,
    password: string,
    setPassword: (password: string) => void
}> = ({signupHandler, name, setName, email, setEmail, password, setPassword}) => {

    return <form onSubmit={signupHandler}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Register</button>
    </form>
};

export default Register;