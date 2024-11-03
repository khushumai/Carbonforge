// SignOut.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>You have been signed out successfully.</h2>
      <button onClick={() => navigate('/')}>Go to Login Page</button>
    </div>
  );
};

export default SignOut;
