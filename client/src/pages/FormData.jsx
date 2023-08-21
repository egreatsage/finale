import React, { useEffect, useState } from 'react'

const FormData = ({handleSubmit,setShowModel}) => {
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
  return (
    <div>
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
        <button type='submit'  className='bg-[#4CAF50] mb-3  px-8 py-1 rounded-md text-white '>Add</button>
         <button onClick={()=>{setShowModel(false)}} className='bg-[#e36f22] mb-3  px-8 py-1 rounded-md text-white '>Close</button>
        </div>
         </div>
         </form>
    </div>
  )
}

export default FormData