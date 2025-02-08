import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });
      navigate('/login'); // Redirect to login page after registration
    } catch (err) {
      setError('User already exists or error in registration');
    }
  };

  const handleGuestLogin = () => {
    // Allow guest login and store token or guest flag in localStorage
    localStorage.setItem('guest', 'true'); // Flag to track guest login
    navigate('/LimitedFeatures');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Register</button>
      </form>
      <button onClick={handleGuestLogin}>Continue as Guest</button> {/* Guest login button */}
    </div>
  );
};

export default Register;

