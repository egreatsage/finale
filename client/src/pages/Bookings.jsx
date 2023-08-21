import React, { useEffect, useState } from 'react'
import {
    useToast,
    
  } from '@chakra-ui/react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {MdAdd} from 'react-icons/md'
import data from '../assets/data.png'
const Bookings = () => {
     const toast = useToast();
     const [bookings, setBookings] = useState([]);
     const [showmodel,setShowModel] = useState(false)
     const [email,setEmail] = useState('')
     const [password,setPassword] = useState('')
     const [firstname,setFirstname] = useState('')
     const [secondname,setSecondname] = useState('')
     const [phonenumber,setPhoneNumber] = useState('')
     const [gender,setGender] = useState('')
     const [checkindate, setCheckindate] = useState('');
     const [checkoutdate, setCheckoutdate] = useState('');
     const [sharingtype, setSharingType] = useState('');
     const [withFood, setWithFood] = useState(true);
     const [price, setPrice] = useState(0);
     const [selectedBooking,setSelectedbooking] = useState(null)
     const calculatePrice = (type) => {
      let basePrice = 0;
      switch (type) {
        case 'Single room':
          basePrice = 5000;
          break;
        case '2 Sharing':
          basePrice = 4000;
          break;
        case '3 Sharing':
          basePrice = 3000;
          break;
        case '4 Sharing':
          basePrice = 2000;
          break;
        default:
          basePrice = 0;
      }
  
      // Add 2000 to the base price if "with food" is selected, otherwise return the base price only
      return withFood ? basePrice + 2000 : basePrice;
    };

    useEffect(() => {
      const calculatedPrice = calculatePrice(sharingtype);
      setPrice(calculatedPrice);
    }, [sharingtype, withFood]);
    
     const fetchBookings = async () => {
        try {
          const response = await axios.get('http://localhost:5000/getbookings');
          setBookings(response.data);
        } catch (error) {
          toast({
            description: `${error}`,
            status: 'error',
            duration: 9000,
            position: 'top',
          });
        }
      };
    
      useEffect(() => {
        fetchBookings();
      }, []);
    
      const deleteBooking = async (bookingId) => {
        try {
          await axios.delete(`http://localhost:5000/deletebooking/${bookingId}`);
          fetchBookings()
          toast({
            description: 'Booking deleted successfully',
            status: 'success',
            duration: 3000,
            position: 'top',
          });
        } catch (error) {
          toast({
            description: `${error}`,
            status: 'error',
            duration: 3000,
            position: 'top',
          });
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (selectedBooking) {
            // Update existing booking
            const response = await axios.put(`http://localhost:5000/updatebooking/${selectedBooking._id}`, {
              email,
              password,
              firstname,
              secondname,
              phonenumber,
              gender,
              checkindate,
              checkoutdate,
              sharingtype,
              withFood,
              price,
            });
      
            if (response.data.status === 'ok') {
              toast({
                description: 'Booking updated',
                status: 'success',
                duration: 4000,
                position: 'top',
              });
            }
          } else {
            // Add new booking
            const res = await axios.post('http://localhost:5000/booking', {
              email,
              password,
              firstname,
              secondname,
              phonenumber,
              gender,
              checkindate,
              checkoutdate,
              sharingtype,
              withFood,
              price,
            });
      
            if (res.data.status === 'ok') {
              toast({
                description: 'Booking successful',
                status: 'success',
                duration: 4000,
                position: 'top',
              });
            }
          }
          
          fetchBookings(); // Fetch bookings after either add or update
          
          // Reset the form inputs
          setEmail('');
          setPassword('');
          setFirstname('');
          setSecondname('');
          setPhoneNumber('');
          setGender('');
          setCheckindate('');
          setCheckoutdate('');
          setSharingType('');
          setWithFood(true);
          setPrice(0);
          setSelectedbooking(null);
          setShowModel(false);
        } catch (error) {
          toast({
            description: `${error}`,
            status: 'error',
            duration: 3000,
            position: 'top',
          });
        }
      };
      
     
      const handleUpdate = (booking) => {
        setSelectedbooking(booking);
        setFirstname(booking.firstname);
        setSecondname(booking.secondname);
        setEmail(booking.email);
        setPhoneNumber(booking.phonenumber);
        setGender(booking.gender);
        setCheckindate(booking.checkindate);
        setCheckoutdate(booking.checkoutdate);
        setSharingType(booking.sharingtype);
        setWithFood(booking.withFood);
        setPrice(booking.price);
      
      };
  return (
    <div>
      <div>
        <h1 className='text-center text-xl tracking-wider font-semibold text-slate-700 my-5'>Bookings</h1>
      </div>


      <div className='md:px-3 py-3' >
      <button onClick={()=>{setShowModel(true)}} className='flex items-center py-1 bg-[#4CAF50] rounded-md px-2 text-white' >
                    <span className='text-md'><MdAdd/></span>
                    <span className='pt-[2px]'>Add a booking</span>
            </button>
       
        {
          showmodel &&
          <form className='shadow-2xl w-full overflow-x-auto z-40  backdrop-blur-lg bg-white' onSubmit={handleSubmit}>
         <div className='grid md:grid-cols-6 gap-2  p-3 '>
          <input className='input' value={email} onChange={e=>setEmail(e.target.value)} type="text" placeholder='email'/>
          <input className='input' value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder='password'/>
          <input className='input' value={firstname} onChange={e=>setFirstname(e.target.value)} type="text" placeholder='firstname'/>
          <input className='input' value={secondname} onChange={e=>setSecondname(e.target.value)} type="text" placeholder='secondname'/>
          <input className='input' value={phonenumber} onChange={e=>setPhoneNumber(e.target.value)} type="text" placeholder='phonenumber'/>
          <select className='input' value={gender} onChange={(e) => setGender(e.target.value)}>
                      <option    value='none' >Select Gender</option>
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
          </select>
          <input className='input' value={checkindate} onChange={e=>setCheckindate(e.target.value)} type="date" placeholder='chekindate'/>
          <input className='input' value={checkoutdate} onChange={e=>setCheckoutdate(e.target.value)} type="date" placeholder='checkoutdate'/>
          <select className='input' value={sharingtype}    onChange={(e) => setSharingType(e.target.value)}  >
                      <option disabled value=''>
                       Select type of room
                      </option>
                      <option value='Single room'>Single room</option>
                      <option value='2 Sharing'>2 Sharing</option>
                      <option value='3 Sharing'>3 Sharing</option>
                      <option value='4 Sharing'>4 Sharing</option>
         </select>
         <div className='flex'>
             <input
               className='input'
               type='radio'
               required
               value='noFood'
               checked={!withFood}
               onChange={() => setWithFood(false)}
             />
             No Food
             <input 
             className='input'
               type='radio'
               value='withFood'
               required
               checked={withFood}
               onChange={() => setWithFood(true)}
             />
             With Food <span className='font-bold'>(+ Ksh 2000)</span>
          
        
         </div>
         </div>
         <div className='flex  gap-2 justify-between items-center m-4 mb-3 '>
        <div>
        <h1 className='text-xl'>Total Amount to be paid</h1>
         {price > 0 && (
           <p className='font-semibold text-md underline'>
            
             Price: Ksh <span className='font-extrabold text-lg'>{price}</span> per head / per month
           </p>
         )}
        </div>
        <div>
        <button  type='submit'  className='bg-[#4CAF50] mb-3  px-8 py-1 rounded-md text-white '>Add</button>
         <button onClick={()=>{setShowModel(false)}} className='bg-[#e36f22] mb-3  px-8 py-1 rounded-md text-white '>Close</button>
        </div>
         </div>
         </form>
        }
         
      </div>
        <div className='md:flex flex-col md:flex-row md:justify-between'>
            <div>
            
            </div>
            <div>
            <input type="search" placeholder='Search by name' />
            </div>
        </div>
        <div>
        <div class="flex flex-col overflow-x-auto">
  <div class="sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8 shadow-2xl">
      <div class="overflow-x-auto">
        <table class="min-w-full text-left text-sm font-light ">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" class="px-6 py-4">#</th>
              <th scope="col" class="px-6 py-4">Firstname</th>
              <th scope="col" class="px-6 py-4">Secondname</th>
              <th scope="col" class="px-6 py-4">Email</th>
              <th scope="col" class="px-6 py-4">Contact</th>
              <th scope="col" class="px-6 py-4">Gender</th>
              <th scope="col" class="px-6 py-4">Chekindate</th>
              <th scope="col" class="px-6 py-4">Checkoutdate</th>
              <th scope="col" class="px-6 py-4">sharingtype</th>
              <th scope="col" class="px-6 py-4">price</th>
              <th scope="col" class="px-6 py-4">withFood</th>
              <th scope="col" class="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
          {
            bookings[0]?(
          bookings.map((booking, index) => (
            <tr key={booking._id} class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
              <td class="whitespace-nowrap px-6 py-4">{booking.firstname}</td>
              <td class="whitespace-nowrap px-6 py-4">{booking.secondname}</td>
              <td class="whitespace-nowrap px-6 py-4">{booking.email}</td>
              <td class="whitespace-nowrap px-6 py-4">{booking.phonenumber}</td>
              <td class="whitespace-nowrap px-6 py-4">{booking.gender}</td>
              <td class="whitespace-nowrap px-6 py-4">{booking.checkindate}</td>
              <td class="whitespace-nowrap px-6 py-4">{booking.checkoutdate}</td>
              <td class="whitespace-nowrap px-6 py-4">{booking.sharingtype}</td>
              <td class="whitespace-nowrap px-6 py-4">{booking.withFood?'With food':'without'}</td>
              <td class="whitespace-nowrap px-6 py-4">{booking.price}</td>
              <td className='flex items-center justify-center pt-4 gap-3'>
              <button  onClick={()=>{
          setShowModel(true),
          handleUpdate(booking)
          
        }}>Edit</button>
              <button className='px-4 py-1 bg-red-500 rounded-lg text-white font-bold' onClick={() => deleteBooking(booking._id)} >Delete</button>
             </td>
            </tr> 
          ))):(
          <h1 className='text-center flex text-md font-bold my-3'>
                   No Data
          </h1>
          )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
        </div>
    </div>
  )
}

export default Bookings