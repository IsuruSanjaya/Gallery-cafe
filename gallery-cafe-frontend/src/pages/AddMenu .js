import React, { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import { ToastContainer, toast } from 'react-toastify'; // For toast notifications
import '../common.css'; // Assuming the CSS is already imported


const AddMenu = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        description: '',
        price: '',
        image: '' // This will store the Base64 encoded image string
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({ ...formData, image: reader.result }); // Set Base64 string
            };
            reader.readAsDataURL(file); // Convert image file to Base64
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send formData including Base64-encoded image
            const response = await axios.post('http://localhost:5000/api/menu/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            toast.success('Added Succesfully successfully!');
            console.log(response.data);

            // Clear the form after submission
            setFormData({ name: '', type: '', description: '', price: '', image: '' });
        } catch (error) {
            alert('Error: ' + error.message);
            console.error(error);
        }
    };

    return (
        <><form onSubmit={handleSubmit} className="container mt-4">
            <h2>Add New Menu Item</h2>
            {/* Name Field */}
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter menu item name"
                    value={formData.name}
                    onChange={handleChange}
                    required />
            </div>
            {/* Type Field */}
            <div className="mb-3">
                <label htmlFor="type" className="form-label">Type</label>
                <input
                    type="text"
                    name="type"
                    className="form-control"
                    placeholder="Enter menu type (e.g., Appetizer, Main Course)"
                    value={formData.type}
                    onChange={handleChange}
                    required />
            </div>
            {/* Description Field */}
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    name="description"
                    className="form-control"
                    placeholder="Enter menu item description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            {/* Price Field */}
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="Enter price in USD"
                    value={formData.price}
                    onChange={handleChange}
                    required />
            </div>
            {/* Image Field */}
            <div className="mb-3">
                <label htmlFor="image" className="form-label">Image</label>
                <input
                    type="file"
                    name="image"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                    required />
                {formData.image && (
                    <div className="mt-2">
                        <strong>Preview:</strong>
                        <img
                            src={formData.image}
                            alt="Preview"
                            style={{ width: '200px', height: 'auto', marginTop: '10px' }} />
                    </div>
                )}
            </div>
            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">Add Menu Item</button>
        </form>
        <br></br>  
        <br></br>  
        <br></br>
        <br></br></>
    );
};

export default AddMenu;
