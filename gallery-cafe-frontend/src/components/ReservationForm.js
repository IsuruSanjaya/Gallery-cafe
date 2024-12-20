import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
const ReservationForm = () => {
    const [formData, setFormData] = useState({
        name: '', // User ID field, ensure this is dynamic in a real app
        date: '',
        time: '',
        guests: '',
        table: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/reservations/', formData)
            .then((response) => {
      toast.success("Added Reservation successfully!");
                console.log(response.data);
            })
            .catch((error) => {
                alert('Error: ' + error.message);
                toast.error("Error");
            });
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <h2>Reserve a Table</h2>
            {/* User ID Input */}
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name "
                    value={formData.name}  // Controlled component
                    onChange={handleChange}
                    required
                />
            </div>
            {/* Date Input */}
            <div className="mb-3">
                <label htmlFor="date" className="form-label">Date</label>
                <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={formData.date}  // Controlled component
                    onChange={handleChange}
                    required
                />
            </div>
            {/* Time Input */}
            <div className="mb-3">
                <label htmlFor="time" className="form-label">Time</label>
                <input
                    type="time"
                    name="time"
                    className="form-control"
                    value={formData.time}  // Controlled component
                    onChange={handleChange}
                    required
                />
            </div>
            {/* Number of Guests Input */}
            <div className="mb-3">
                <label htmlFor="guests" className="form-label">Number of Guests</label>
                <input
                    type="number"
                    name="guests"
                    className="form-control"
                    value={formData.guests}  // Controlled component
                    onChange={handleChange}
                    required
                />
            </div>
            {/* Table Input */}
            <div className="mb-3">
                <label htmlFor="table" className="form-label">Table</label>
                <input
                    type="text"
                    name="table"
                    className="form-control"
                    value={formData.table}  // Controlled component
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default ReservationForm;
