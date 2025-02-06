import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Track if Register button is clicked
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Register or Login
    const url = isRegistering
      ? 'http://localhost:5000/api/auth/register'
      : 'http://localhost:5000/api/auth/login';

    try {
      const data = isRegistering
        ? { name, email, password, confirmPassword }
        : { email, password };

      const response = await axios.post(url, data);
      localStorage.setItem('token', response.data.token);

      navigate('/dashboard');
    } catch (err) {
      setError(isRegistering ? 'Registration failed' : 'Login failed');
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem('guest', 'true');
    navigate('/LimitedFeatures');
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl text-center font-semibold mb-4">{isRegistering ? 'Register' : 'Login'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {isRegistering && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md mb-4"
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-blue-500 mb-2 block"
        >
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </button>

        <button
          onClick={handleGuestLogin}
          className="text-blue-500 block"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
