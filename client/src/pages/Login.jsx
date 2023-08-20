import { Button, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toast = useToast();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      if (response.data.status === 'ok') {
        if(response.data.role ==='admin'){
          toast({
            description: 'logged in as admin',
            status: 'success',
            duration: 4000,
            position: 'top',
          });    
          navigate('/dashboard')
        }else{
          toast({
            description: 'You have successfully Logged in',
            status: 'success',
            duration: 4000,
            position: 'top',
          });
          navigate('/tenant')
        }
       
      } 
    } catch (error) {
      toast({
        description: `${error}`,
        status: 'error',
        duration: 4000,
        position: 'top',
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex items-center justify-center h-screen flex-col gap-4'>
        <h1 className='text-xl tracking-wider font-bold'>Login</h1>
        <input
          className='w-80 border outline-none border-slate-700 rounded-[150px] px-3 py-2'
          type='email'
          placeholder='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='w-80 border outline-none border-slate-700 rounded-[150px] px-3 py-2'
          type='password'
          placeholder='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='bg-slate-700 w-80 py-2 px-2 rounded-[150px] text-white font-semibold ' type='submit'>
          Login
        </button>
        <Link className='flex justify-start underline text-gray-700' to={'/register'}>
          No account, register
        </Link>
      </form>
    </div>
  );
};

export default Login;
