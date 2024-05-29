import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPinCode, removePinCode } from '../../../redux/features/pincode/pinCode';
import './pinCodeFilterCss.css'
function Login() {
  const [pinCode, setPinCode] = useState('');
  const dispatch = useDispatch();
  const pinCodes = useSelector((state) => state.pinCode.pinCodes);

  const handleAddPinCode = () => {
    // Verify the pin code structure (e.g., must be a 6-digit number)
    const pinCodePattern = /^[0-9]{6}$/;
    if (pinCodePattern.test(pinCode)) {
      dispatch(addPinCode(pinCode));
      setPinCode('');
    } else {
      alert('Invalid pin code. Please enter a 6-digit number.');
    }
  };

  const handleRemovePinCode = (code) => {
    dispatch(removePinCode(code));
  };

  return (
    <div className='pincode-div'>
      <h1>Pin Codes</h1>
      <input
        type="text"
        value={pinCode}
        onChange={(e) => setPinCode(e.target.value)}
        placeholder="Enter pin code"
      />
      <button onClick={handleAddPinCode}>Add Pin Code</button>
      <ul>
        {pinCodes.map((code, index) => (
          <li key={index}>
            {code} <button onClick={() => handleRemovePinCode(code)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Login;
