import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onSwitchToLogin }) => {
  const [firstName, setFirstName] = useState('');  
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });

      // Redirect or show success message
      alert('Registration successful!');
      onSwitchToLogin();
    } catch (err) {
      setError('Failed to register');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>

      <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}    
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <a onClick={onSwitchToLogin}>Sign In</a>
      </p>
    </div>
  );
};

export default Register;
