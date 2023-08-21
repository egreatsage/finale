import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddEditBooking = () => {
    const [phonenumber,setPhoneNumber] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [firstname,setFirstName] = useState('')
    const [secondname,setSecondname] = useState('')
    const [gender,setGender] = useState('')
    const [checkindate, setCheckindate] = useState('');
    const [checkoutdate, setCheckoutdate] = useState('');
    const [sharingtype, setSharingType] = useState('');
    const [withFood, setWithFood] = useState(true); 
    const [price, setPrice] = useState(0); 
  
    const toast = useToast();
    const navigate = useNavigate();
    const { _id } = useParams()
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

      const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedBooking = {
          // Include all the updated fields here
          firstname,
          secondname,
          email,
          password,
          phonenumber,
          gender,
          checkindate,
          checkoutdate,
          sharingtype,
          withFood,
          price,
        };
    
        try {
          const response = await axios.put(
            `http://localhost:5000/updatebooking/${_id}`, // Replace bookingId with the actual booking ID
            updatedBooking
          );
    
          if (response.data.message) {
            toast({
              description: response.data.message,
              status: 'success',
              duration: 3000,
              position: 'top',
            });
            navigate('/'); // Redirect to the bookings list after successful update
          }
        } catch (error) {
          toast({
            description: `${error}`,
            status: 'error',
            duration: 3000,
            position: 'top',
          });
        }
      };
  return (
    <div>
        <form onClick={handleSubmit} className='grid md:grid-cols-3'>
            <input
             type="text" 
             placeholder='Firstname'
             value={firstname}
             onChange={(e) => setFirstName(e.target.value)}
             required
             />
              <input
             type="text" 
             placeholder='Secondname'
             value={secondname}
             onChange={(e) => setSecondname(e.target.value)}
             required
             />
              <input
             type="email" 
             placeholder='Email'
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
             />
              <input
             type="password" 
             placeholder='Password'
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
             />
              <input
             type="text" 
             placeholder='phonenumber'
             value={phonenumber}
             onChange={(e) => setPhoneNumber(e.target.value)}
             required
             />
              <input
             type="gender" 
             placeholder='Gender'
             value={gender}
             onChange={(e) => setGender(e.target.value)}
             required
             />
             <section>
           <h2 className="font-semibold text-3xl mb-8">Booking Information</h2>
           <div className='grid md:grid-cols-2 gap-3'>
         <div className='flex flex-col'>
           <label>Checkin date</label>
           <input
             className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
             type='date'
             placeholder='Enter checkin date'
             value={checkindate}
             required
             onChange={(e) => setCheckindate(e.target.value)}
           />
         </div>
         <div className='flex flex-col'>
           <label>Checkout date</label>
           <input
             className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
             type='date'
             required
             value={checkoutdate}
             onChange={(e) => setCheckoutdate(e.target.value)}
           />
         </div>

         <div className='flex flex-col'>
           <label>Choose your Room Category</label>
           <select
             className='w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400'
             value={sharingtype}
             required
             onChange={(e) => setSharingType(e.target.value)}
           >
             <option disabled value=''>
               Select type of room
             </option>
             <option value='Single room'>Single room</option>
             <option value='2 Sharing'>2 Sharing</option>
             <option value='3 Sharing'>3 Sharing</option>
             <option value='4 Sharing'>4 Sharing</option>
           </select>
         </div>

         <div>
         <label>Food Option:</label>
         <div className='flex pt-6 items-center'>
           <label className='mr-8'>
             <input
               type='radio'
               required
               value='noFood'
               checked={!withFood}
               onChange={() => setWithFood(false)}
             />
             No Food
           </label>
           <label className='mr-5'>
             <input 
               type='radio'
               value='withFood'
               required
               checked={withFood}
               onChange={() => setWithFood(true)}
             />
             With Food <span className='font-bold'>(+ Ksh 2000)</span>
           </label>
         </div>
         </div>

        
              <div>
              <h1 className='text-xl'>Total Amount to be paid</h1>
         {price > 0 && (
           <p className='font-semibold text-md underline'>
            
             Price: Ksh <span className='font-extrabold text-lg'>{price}</span> per head / per month
           </p>
         )}
              </div>
       
       </div>
           </section>
           <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default AddEditBooking