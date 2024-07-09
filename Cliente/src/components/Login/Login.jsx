import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { login, token, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='username' className='sr-only'>Username</label>
              <input
                id='username'
                name='username'
                type='text'
                autoComplete='username'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-salmon-500 focus:border-salmon-500 focus:z-10 sm:text-sm'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>Password</label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-salmon-500 focus:border-salmon-500 focus:z-10 sm:text-sm'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 text-salmon-600 focus:ring-salmon-500 border-gray-300 rounded'
              />
              <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <a href='#' className='font-medium text-salmon-600 hover:text-salmon-500'>
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-salmon-600 hover:bg-salmon-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-salmon-500'
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
