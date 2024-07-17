import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../../redux/actions';
import Input from '../UI/Input';
import Button from '../UI/Button';

const Login = () => {
  const dispatch = useDispatch();
  const { token, error, loading } = useSelector(state => ({
    token: state.token,
    error: state.error,
    loading: state.loading
  }));

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className='bg-hero-pattern bg-cover bg-center min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl w-full flex justify-center'>
        <div className='flex flex-col sm:flex-row w-full justify-center'>
          {/* Primer div */}
          <div className='bg-hero-pattern bg-cover bg-center p-8 sm:rounded-l-3xl py-8 px-8 w-full sm:max-w-md space-y-8 transform hover:-translate-y-1 hover:shadow-2xl transition duration-300 ease-in-out'>
            <div>
              <h2 className='mt-6 text-center text-3xl font-extrabold font-sans text-gray-900'>Importa seguro Ltda</h2>
              {/*<img src="./src/assets/pngegg.png" className='shadow-xl items-center content-center'/>*/}
            </div>
          </div>

          {/* Segundo div */}
          <div className='bg-golden-sand-500/50 dark:bg-gray-400/50 p-8 sm:rounded-r-3xl py-8 px-8 w-full sm:max-w-md space-y-8 transform hover:translate-y-1 hover:shadow-2xl transition duration-300 ease-in-out'>
            <div>
              <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Acceso Clientes</h2>
            </div>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}
            <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
              <input type='hidden' name='remember' defaultValue='true' />
              <div className='rounded-md shadow-sm space-y-4'>
                <div>
                  <label htmlFor='username' className='sr-only'>Username</label>
                  <Input
                    id='username'
                    name='username'
                    type='text'
                    autoComplete='username'
                    required
                    placeholder='Usuario'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor='password' className='sr-only'>Password</label>
                  <Input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    placeholder='Contraseña'
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
                    Recordarme
                  </label>
                </div>

                <div className='text-sm'>
                  <a href='#' className='font-medium text-salmon-600 hover:text-salmon-500'>
                    recupera tu contraseña
                  </a>
                </div>
              </div>

              <div>
                <Button type='submit'>Ingresar</Button>
                {loading && <p>Cargando...</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
