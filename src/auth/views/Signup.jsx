import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startSignup } from '../../store/auth/thunks';

export const Signup = () => {

  const dispatch = useDispatch();
  const {error} = useSelector(state => state.auth);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();  

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value
    }

    dispatch(startSignup(payload));
  }

  return (
    <div className='login-signup-form animated faceInDown'>
      <div className='form'>
        <form onSubmit={onSubmit}>
          <h1 className='title'>Signup for free</h1>

          {error && 
            <div className='alert'>
              <p>{error}</p>
            </div>
          }
          <input ref={nameRef} type='text' placeholder='Full name' />
          <input ref={emailRef} type='email' placeholder='Email Address' />
          <input ref={passwordRef} type='password' placeholder='Password' />
          <input ref={passwordConfirmationRef} type='password' placeholder='Password Confirmation' />
          <button className='btn btn-block'>Signup</button>

          <p className='message'>
            Already Registered? <Link to={'/login'}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
