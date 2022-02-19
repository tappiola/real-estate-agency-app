import React, {FormEvent} from "react";

const Login : React.FC<{
    loginHandler: (event: FormEvent<HTMLFormElement>) => void,
    email: string,
    setEmail: (email: string) => void,
    password: string,
    setPassword: (password: string) => void}>
    = ({loginHandler, email, setEmail, password, setPassword}) => {

    return <form onSubmit={loginHandler}>
        <input placeholder="Email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
    </form>
};

export default Login;