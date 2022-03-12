import React, { FormEventHandler } from 'react';
import { Link } from 'react-router-dom';
import './Register.style.scss';

const Register: React.FC<{
    signupHandler: FormEventHandler,
    name: string,
    setName: (name: string) => void,
    email: string,
    setEmail: (email: string) => void,
    password: string,
    setPassword: (password: string) => void
}> = ({
    signupHandler, name, setName, email, setEmail, password, setPassword
}) => (
  <form className="Register" onSubmit={signupHandler}>
    <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
    <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <button type="submit">Register</button>
    <p className="AlreadyRegistered">
      Already registered?
      <Link className="LoginLink" to="/login">Login</Link>
    </p>
  </form>
);

export default Register;
