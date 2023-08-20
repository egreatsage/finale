import { useToast } from '@chakra-ui/react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Index from '.';
import Tenants from './Tenants';
import Rooms from './Rooms';

const Dashboard = () => {
    const [allowed,setAllowed] = useState();
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const toast = useToast();
 useEffect(() => {
         axios.get('http://localhost:5000/dashboard')
         .then(res=>{
            if(res.data === 'ok'){
                 setAllowed('ok')
                 navigate('/dashboard')
            } else{
                toast({
                    description: 'You are not allowed to access this page',
                    status: 'warning',
                    duration: 9000,
                    position:'top'

                })
                navigate('/login')
            }
         }).catch(err=>console.log(err))
 }, [])
  return (
    <div className='overflow-hidden'>
        <div>
        <h1 className='text-center text-xl tracking-wider font-semibold text-slate-700 my-5'>Admin</h1>
        </div>
        <div className='overflow-x-auto'>
        <Tabs>
  <TabList>
    <Tab>Dashboard</Tab>
    <Tab>Tenants</Tab>
    <Tab>Rooms</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Index/>
    </TabPanel>
    <TabPanel>
     <Tenants/>
    </TabPanel>
    <TabPanel>
     <Rooms/>
    </TabPanel>
  </TabPanels>
</Tabs>
        </div>
   
    </div>
  )
}
export default Dashboard