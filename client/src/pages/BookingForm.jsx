import { useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const BookingForm = () => {
    const [formStep,setFormState]= useState(0)
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

  const completeFormStep = ()=>{
    setFormState(formStep+1)
  }
  const renderButton = ()=>{
    if(formStep >1){
      return undefined
    }else if (formStep === 1){
      return(
        <button
        type="submit"
        className="mt-6 bg-green-600 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
       Submit your Booking
      </button>
      )
    }else{
      return(
        <button
        type="button"
        onClick={completeFormStep}
        className="mt-6 bg-green-600 text-white rounded px-6 py-3 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Next
      </button>
      )
    }
  }
  const Submitform = async(e)=>{
    completeFormStep()
    e.preventDefault()
    // const formData = {
    //   phonenumber,
    //   email,
    //   password,
    //   firstname,
    //   secondname,
    //   gender,
    //   checkindate,
    //   checkoutdate,
    //   sharingtype,
    //   withFood,
    //   price  
    // }
    try {
      const res = await axios.post('http://localhost:5000/booking', {
      phonenumber,
      email,
      password,
      firstname,
      secondname,
      gender,
      checkindate,
      checkoutdate,
      sharingtype,
      withFood,
      price  
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
  }
  return (
    <div>
        <div className="px-1 md:px-5  py-10">
          <form onSubmit={Submitform}> 
            {formStep ===0 && (
              <section>
                <h2 className="font-semibold text-3xl mb-8 text-center md:text-start"> Personal Information</h2>
                <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center items-center gap-3'>
                   <div className='flex flex-col'>
                    <label>Email Address</label>
                    <input
                      className="w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400"
                      type="email"
                      placeholder="your@gmail.com"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                   </div>
                   <div className='flex flex-col'>
                    <label>Password</label>
                    <input
                      className="w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400"
                      type="password"
                      placeholder="password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                   </div>
                   <div className='flex flex-col'>
                    <label>First Name</label>
                    <input
                      className="w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400"
                      type="text"
                      placeholder="firstname"
                      value={firstname}
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                   </div>
                   <div className='flex flex-col'>
                    <label>Second Name</label>
                    <input
                      className="w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400"
                      type="text"
                      placeholder="Second name"
                      value={secondname}
                      required
                      onChange={(e) => setSecondname(e.target.value)}
                    />
                   </div>
                   <div className='flex flex-col'>
                    <label>Phone Number</label>
                    <input
                      className="w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400"
                      type="number"
                      placeholder="phone number"
                      value={phonenumber}
                      required
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                   </div>
                   <div className='flex flex-col'>
                    <label>Gender</label>
                    <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-80 my-4 rounded-[10px] py-2 px-3 outline-none border border-gray-400"
                    >
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                    </select>
                   </div>
                </div>
              </section>
            )}
           {/* {formStep ===1 && (
             <div></div>
           )} */}
            {formStep === 1 &&(
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
            )}
            {/* {
              formStep === 2 && (
                <div>
                  <h2 className="font-semibold text-3xl mb-8">
                       Congratulations,you have booked with us
                  </h2>
                  </div>
              )
            } */}
            {renderButton()}
            <pre>
             
            </pre>
             <div>
             </div>
          
          </form>
        </div>

    </div>
   
  )
}

export default BookingForm