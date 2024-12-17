import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../RegisterPage.css'; // Optional for custom styles

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',  // Default to 'customer' role
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send POST request to backend API for user registration
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/'), 3000); // Redirect after 3 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="operational">Operational Staff</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
        <p>
          Already have an account?{' '}
          <a href="/" className="login-link">
            Login Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
