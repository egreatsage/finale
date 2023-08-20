import { Button, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/register', {
        name,
        email,
        password,
      });
      if(
        res.data.status === 'ok'
      ){
        toast({
          description: 'You have successfully registered',
          status: 'success',
          duration: 4000,
          position: 'top',
        });
        navigate('/login');
      }
  
    } catch (err) {
      toast({
        description: `${err}`,
        status: 'error',
        duration: 9000,
        position:'top'
      });
    
    }
  };

  return (
    <div>
      <div className='flex justify-center items-center  '>
        <form onSubmit={handleSubmit} className='flex items-center justify-center h-screen flex-col gap-4'>
          <h1 className='text-xl tracking-wider font-bold'>Create an account</h1>
          <input
            className='w-80 border outline-none border-slate-700 rounded-[150px] px-3 py-2'
            type='text'
            required
            placeholder='name'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='w-80 border outline-none border-slate-700 rounded-[150px] px-3 py-2'
            type='email'
            placeholder='email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='w-80 border outline-none border-slate-700 rounded-[150px] px-3 py-2'
            type='password'
            placeholder='password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='bg-slate-700 w-80 py-2 px-2 rounded-[150px] text-white font-semibold' type='submit'>
            Submit
          </button>
          <Link className='underline text-gray-700' to={'/login'}>
            yes account, login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
