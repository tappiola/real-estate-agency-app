import React, { FormEventHandler } from 'react';
import './Login.style.scss';
import { Link } from 'react-router-dom';
import { UseInputType } from '../../hooks/useInput';
import Input from '../../components/Input/Input.component';
import { Path } from '../../constants';

const Login : React.FC<{
    loginHandler: FormEventHandler,
    formInputs: UseInputType[]
}> = ({
    loginHandler,
    formInputs
}) => (
  <form className="Login" onSubmit={loginHandler} noValidate>
    {formInputs.map((input) => <Input key={input.name} input={input} />)}
    <button type="submit">Login</button>
    <p className="NotRegistered">
      Not registered yet?
      <Link className="RegistrationLink" to={Path.Register}>Register</Link>
    </p>
  </form>
);

export default Login;
