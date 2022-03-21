import React, { FormEventHandler } from 'react';
import { Link } from 'react-router-dom';
import './Register.style.scss';
import { UseInputType } from '../../hooks/useInput2';
import Input2 from '../Input2/Input.component';

const Register: React.FC<{
    signupHandler: FormEventHandler,
    formInputs: UseInputType[]
}> = ({
    signupHandler,
    formInputs
}) => (
  <form className="Register" onSubmit={signupHandler} noValidate>
    {formInputs.map((input) => <Input2 key={input.name} input={input} />)}
    <button type="submit">Register</button>
    <p className="AlreadyRegistered">
      Already registered?
      <Link className="LoginLink" to="/login">Login</Link>
    </p>
  </form>
);

export default Register;
