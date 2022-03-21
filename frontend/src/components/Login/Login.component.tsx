import React, { ChangeEventHandler, FocusEventHandler, FormEventHandler } from 'react';
import './Login.style.scss';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { PASSWORD_MIN_LENGTH } from '../../hooks/useInput';

const Login : React.FC<{
    loginHandler: FormEventHandler,
    email: string,
    emailHasError: boolean,
    setEmail: ChangeEventHandler<HTMLInputElement>,
    emailBlurHandler: FocusEventHandler,
    password: string,
    passwordHasError: boolean,
    setPassword: ChangeEventHandler<HTMLInputElement>,
    passwordBlurHandler: FocusEventHandler,
}> = ({
    loginHandler,
    email,
    emailHasError,
    setEmail,
    emailBlurHandler,
    password,
    passwordHasError,
    setPassword,
    passwordBlurHandler
}) => (
  <form className="Login" onSubmit={loginHandler} noValidate>
    <input
      className={clsx(emailHasError && 'InvalidInput')}
      type="email"
      placeholder="Email"
      name="email"
      value={email}
      onChange={setEmail}
      onBlur={emailBlurHandler}
    />
    {emailHasError && <span className="InvalidInputMessage">Not a valid email</span>}
    <input
      className={clsx(emailHasError && 'InvalidInput')}
      type="password"
      placeholder="Password"
      value={password}
      onChange={setPassword}
      onBlur={passwordBlurHandler}
    />
    {passwordHasError && <span className="InvalidInputMessage">{`Minimum ${PASSWORD_MIN_LENGTH} symbols`}</span>}
    <button type="submit">Login</button>
    <p className="NotRegistered">
      Not registered yet?
      <Link className="RegistrationLink" to="/register">Register</Link>
    </p>
  </form>
);

export default Login;
