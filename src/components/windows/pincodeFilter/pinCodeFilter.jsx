import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPinCode, removePinCode } from '../../../redux/features/pincode/pinCode';
import './pinCodeFilterCss.css';

function PinCodeManager() {
  const [pinCode, setPinCode] = useState('');
  const dispatch = useDispatch();
  const pinCodes = useSelector((state) => state.pinCode.pinCodes);

  const handleAddPinCode = () => {
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
    <div className="pin-code-manager-conatiner">
      <div className="pin-code-manager">
        <h1>Manage Pin Codes</h1>
        <div className="input-group">
          <input
            type="text"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            placeholder="Enter pin code"
            className="pin-code-input"
          />
        </div><button onClick={handleAddPinCode} className="add-button">Add Pin Code</button>

      </div>
      <ul className="pin-code-list-home">
        {pinCodes.map((code, index) => (
          <li key={index} className="pin-code-item">
            <button onClick={() => handleRemovePinCode(code)} className="remove-button">+{code}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PinCodeManager;

