import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../src/Login.css'; // Optional for custom styles
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      
      const { token, role } = response.data;
  
      // Save token and user role in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
  
      // Redirect users based on their role
      if (role === 'admin') {
        navigate('/home');
      } else if (role === 'staff') {
        navigate('/home');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{' '}
          <a href="/register" className="register-link">
            Register Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
