import React from 'react';
import Layout from './core/Layout';
import { Helmet } from 'react-helmet';
import './App.css';

const App = () => {
  const head = () => (
    <Helmet>
      <meta charSet='utf-8' />
      <title>MERN Stack</title>
      <link rel='canonical' href='https://mern-stack.com' />
    </Helmet>
  );
  return (
    <Layout>
      {head()}
      <div className='col-md-6 offset-md-3 text-center'>
        <h1 className='hero' style={{width: '50%'}}>React Node MongoDB Authentication Boilerplate</h1>


        <p className='lead'>
          MERN stack login register system with account activation, forgot
          password, reset password, login with facebook and google as well as
          private and protected routes for authenticated user and users with the
          role of admin.
        </p>

        <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_m5qldjlh.json"  background="transparent"  speed="1"  style={{width: '600px', height: '600px', background: 'transparent', position: 'absolute', left: '50%', top: '0%', zIndex: -1}}  loop  autoplay></lottie-player>

        <h4 className='hero'>Bonus</h4>
        <p className='lead'>
          Profile update & deployment to digital ocean cloud servers
        </p>
      </div>
    </Layout>
  );
};

export default App;
