import React, { FormEventHandler } from 'react';
import './Login.style.scss';
import { Link } from 'react-router-dom';
import { UseInputType } from '../../hooks/useInput2';
import Input2 from '../Input2/Input.component';

const Login : React.FC<{
    loginHandler: FormEventHandler,
    formInputs: UseInputType[]
}> = ({
    loginHandler,
    formInputs
}) => (
  <form className="Login" onSubmit={loginHandler} noValidate>
    {formInputs.map((input) => <Input2 key={input.name} input={input} />)}
    <button type="submit">Login</button>
    <p className="NotRegistered">
      Not registered yet?
      <Link className="RegistrationLink" to="/register">Register</Link>
    </p>
  </form>
);

export default Login;
