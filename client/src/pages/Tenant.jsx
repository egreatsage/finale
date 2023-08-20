import React, { useContext, useEffect } from 'react'
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const Tenant = () => {
    const { user} = useContext(UserContext);
 if(user){
    return (
     <div>
           <div className='flex justify-center items-center h-screen'>

          <h1> Tenant Info</h1>
 <h2>Welcome, {user.name}</h2>
<p>Email: {user.email}</p>
<p>Role: {user.role}</p>
</div>
     </div>
      )
 }
}

export default Tenant