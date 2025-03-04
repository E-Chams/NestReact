import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      const { access_token } = response.data;

      // Save the token in localStorage (or handle it however you want)
      localStorage.setItem('token', access_token);
      
      // Redirect or show success message
      alert('Login successful!');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p >
        Don't have an account?{' '}
        <a onClick={onSwitchToRegister}>Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
