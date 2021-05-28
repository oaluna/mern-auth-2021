import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { authenticate, isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import Google from './Google';
import Facebook from './Facebook';
import 'react-toastify/dist/ReactToastify.min.css';

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    buttonText: 'Submit'
  });

  const { email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const informParent = (response) => {
    authenticate(response, () => {
      isAuth() && isAuth().role === 'admin'
        ? history.push('/admin')
        : history.push('/private');
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password }
    })
      .then((response) => {
        console.log('SIGNIN SUCCESS', response);
        // save the response (user, token) localstorage/cookie
        authenticate(response, () => {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            buttonText: 'Submitted'
          });
          // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
          isAuth() && isAuth().role === 'admin'
            ? history.push('/admin')
            : history.push('/private');
        });
      })
      .catch((error) => {
        console.log('SIGNIN ERROR', error.response.data);
        setValues({ ...values, buttonText: 'Submit' });
        toast.error(error.response.data.error);
      });
  };

  const signinForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Email: </label>
        <input
          onChange={handleChange('email')}
          value={email}
          type='email'
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password: </label>
        <input
          onChange={handleChange('password')}
          value={password}
          type='password'
          className='form-control'
        />
      </div>

      <div className="submit-container">
        <button className='submit' onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className='col-md-6 offset-md-3 text-center mx-auto'>
        <ToastContainer />
        {isAuth() ? <Redirect to='/' /> : null}
        <h1
          className='p-5 text-center'
          style={{ textAlign: 'center', margin: '0 auto', lineHeight: 2 }}>
          Sign In
        </h1>
        <div className='card'>
          {signinForm()}
        <p style={{margin: '25px auto', textAlign: 'center'}}>You can also sign in using your Google or Facebook account: </p>
          <div className='button-container'>
            <Google informParent={informParent} className='button google-button' />
            <Facebook informParent={informParent} className='button facebook-button' />
          </div>
          <br />
          <Link
            to='/auth/password/forgot'
            className='btn btn-sm btn-outline-danger'>
            Forgot Password
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
