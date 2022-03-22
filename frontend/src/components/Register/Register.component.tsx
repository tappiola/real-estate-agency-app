import React, { FormEventHandler } from 'react';
import { Link } from 'react-router-dom';
import './Register.style.scss';
import { UseInputType } from '../../hooks/useInput';
import Input from '../Input/Input.component';

const Register: React.FC<{
    signupHandler: FormEventHandler,
    formInputs: UseInputType[]
}> = ({
    signupHandler,
    formInputs
}) => (
  <form className="Register" onSubmit={signupHandler} noValidate>
    {formInputs.map((input) => <Input key={input.name} input={input} />)}
    <button type="submit">Register</button>
    <p className="AlreadyRegistered">
      Already registered?
      <Link className="LoginLink" to="/login">Login</Link>
    </p>
  </form>
);

export default Register;
