import React, { useState } from 'react';

const Step2 = ({ nextStep, step1Name, step1Email, step1Password }) => {
  const [checkindate, setCheckindate] = useState('');
  const [checkoutdate, setCheckoutdate] = useState('');
  const [period, setPeriod] = useState('');

  const handleNext = () => {
    // Validate fields if needed

    // Proceed to next step
    nextStep();
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Check-in Date"
          value={checkindate}
          onChange={(e) => setCheckindate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Check-out Date"
          value={checkoutdate}
          onChange={(e) => setCheckoutdate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step2;
