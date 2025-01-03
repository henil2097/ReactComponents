// src/OtpInput.js
import React, { useState, useRef } from 'react';
import './App.css'; // We'll add some styles to make it look better.

const App = () => {
  // State to hold the OTP values.
  const [otp, setOtp] = useState(["", "", "", ""]);

  // Refs to access the input fields directly.
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Allow only digits.

    // Update OTP state for the specific index.
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // If the value is not empty, move focus to the next input.
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Handle backspace
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <div className="otp-inputs">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            ref={inputRefs[index]}
            className="otp-input"
          />
        ))}
      </div>
      <div className="otp-status">
        {otp.join("") === "1234" && otp.every((digit) => digit !== "") ? (
          <p style={{ color: "green" }}>OTP Verified Successfully!</p>
        ) : otp.some((digit) => digit === "") ? (
          <p>Complete the OTP to verify.</p>
        ) : (
          <p style={{ color: "red" }}>Invalid OTP</p>
        )}
      </div>
    </div>
  );
};

export default App;
