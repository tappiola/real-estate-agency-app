import React, { FormEventHandler } from 'react';
import { Link } from 'react-router-dom';
import './Register.style.scss';
import { UseInputType } from '../../hooks/useInput';
import Input, { InputType } from '../Input/Input.component';

const Register: React.FC<{
    signupHandler: FormEventHandler,
    nameInput: UseInputType,
    emailInput: UseInputType,
    passwordInput: UseInputType
}> = ({
    signupHandler, nameInput, emailInput, passwordInput
}) => (
  <form className="Register" onSubmit={signupHandler} noValidate>
    <Input
      input={nameInput}
      placeholder="Name"
      name="name"
    />
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
    <button type="submit">Register</button>
    <p className="AlreadyRegistered">
      Already registered?
      <Link className="LoginLink" to="/login">Login</Link>
    </p>
  </form>
);

export default Register;
