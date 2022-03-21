import React, { FormEventHandler } from 'react';
import './Login.style.scss';
import { Link } from 'react-router-dom';
import { UseInputType } from '../../hooks/useInput';
import Input, { InputType } from '../Input/Input.component';

const Login : React.FC<{
    loginHandler: FormEventHandler,
    emailInput: UseInputType,
    passwordInput: UseInputType
}> = ({
    loginHandler,
    emailInput,
    passwordInput
}) => (
  <form className="Login" onSubmit={loginHandler} noValidate>
    <Input
      input={emailInput}
      placeholder="Email"
      name="email"
      type={InputType.Email}
    />
    <Input
      input={passwordInput}
      placeholder="Password"
      name="password"
      type={InputType.Password}
    />
    <button type="submit">Login</button>
    <p className="NotRegistered">
      Not registered yet?
      <Link className="RegistrationLink" to="/register">Register</Link>
    </p>
  </form>
);

export default Login;
