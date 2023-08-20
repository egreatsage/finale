import React, { useState } from 'react'

export default function Step3({ nextStep }) {
    const [phonenumber, setPhonenumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNext = () => {
        // Validate fields if needed
    
        // Proceed to next step
        nextStep();
      };
  return (
    <div>
        <div>
        <input type="text" placeholder="Enter your Mpesa Number" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
        </div>
    </div>
  )
}
