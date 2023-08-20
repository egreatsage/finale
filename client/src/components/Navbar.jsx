import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AiOutlineMenu} from 'react-icons/ai'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    useToast,
  } from '@chakra-ui/react'
import axios from 'axios'

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const toast = useToast();
    const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout');
      toast({
        description: 'Logged out successfully',
        status: 'success',
        duration: 4000,
        position: 'top',
      });
     navigate('/')
    } catch (err) {
      console.log(err);
      toast({
        description: 'Logout failed',
        status: 'error',
        duration: 4000,
        position: 'top',
      });
    }
  };
  return (
    <div>
        <div className='flex justify-between border b border-slate-400 py-3 px-2'>
            <div className='flex items-center'>
                 <h1 className='text-xl font-semibold text-slate-800'> Le Pamus</h1>
            </div>
            <div >
                
                <div className=' gap-2 hidden md:flex item text-slate-700'>
                <Link className='hover:underline hover:text-slate-900' to={'/'}>Home</Link>
                <Link className='hover:underline hover:text-slate-900' to={'/tenant'}>Tenant</Link>
                <Link className='hover:underline hover:text-slate-900' to={'/contacts'}>Contacts</Link>
                <Link className='hover:underline hover:text-slate-900' to={'/booking'}>Book Now</Link>
                <button onClick={handleLogout} className='text-red-800  px-3 py-1 hover:shadow rounded-[150px] '>Logout</button>
                </div>
                <div className='flex md:hidden items-center'>
                <button   ref={btnRef}  onClick={onOpen}>
                <AiOutlineMenu className='text-slate-800 text-xl font-bold mt-1'/>
      </button>
                <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Le Pamus</DrawerHeader>

          <DrawerBody>
            <div className='flex items-center flex-col justify-center mt-16'>
            <Link className='hover:underline hover:text-slate-900 my-4' to={'/'}>Home</Link>
                <Link className='hover:underline hover:text-slate-900 my-4 ' to={'/tenant'}>Tenant</Link>
                <Link className='hover:underline hover:text-slate-900 my-4 ' to={'/contacts'}>Contacts</Link>
                <Link className='hover:underline hover:text-slate-900 my-4 ' to={'/booking'}>Book Now</Link>
                <button onClick={handleLogout}  className='text-red-800  px-3 py-1 hover:shadow rounded-[150px] '>Logout</button>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar