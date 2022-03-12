import React, { FormEventHandler } from 'react';
import './Login.style.scss';
import { Link } from 'react-router-dom';

const Login : React.FC<{
    loginHandler: FormEventHandler,
    email: string,
    setEmail: (email: string) => void,
    password: string,
    setPassword: (password: string) => void }> = ({
    loginHandler, email, setEmail, password, setPassword
}) => (
  <form className="Login" onSubmit={loginHandler}>
    <input type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <button type="submit">Login</button>
    <p className="NotRegistered">
      Not registered yet?
      <Link className="RegistrationLink" to="/register">Register</Link>
    </p>
  </form>
);

export default Login;
