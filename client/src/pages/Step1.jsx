import React, { useState } from 'react'

export default function Step1({ nextStep }) {
    const [firstname, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNext = () => {
        nextStep();
      };
  return (
    <div>
        <div>
        <input type="text" placeholder="Name" value={firstname} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleNext}>Next</button>
        </div>
    </div>
  )
}
